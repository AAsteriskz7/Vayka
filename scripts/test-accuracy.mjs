import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const BASE_URL = process.env.ACCURACY_BASE_URL || 'http://localhost:3000'
const CASES_PATH = path.join(process.cwd(), 'scripts', 'accuracy-cases.json')

function loadCases() {
  if (!fs.existsSync(CASES_PATH)) {
    throw new Error(`Missing accuracy case file at ${CASES_PATH}`)
  }

  const raw = fs.readFileSync(CASES_PATH, 'utf-8')
  const parsed = JSON.parse(raw)

  if (!Array.isArray(parsed)) {
    throw new Error('accuracy-cases.json must contain a JSON array')
  }

  return parsed
}

async function runCase(testCase) {
  const response = await fetch(`${BASE_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: testCase.question }),
  })

  if (!response.ok) {
    const body = await response.text()
    return {
      ok: false,
      failures: [`API returned ${response.status}: ${body}`],
      answer: '',
      sources: [],
      intent: null,
    }
  }

  const data = await response.json()
  const answer = String(data.response || '')
  const sources = Array.isArray(data.sources) ? data.sources : []
  const intent = typeof data.intent === 'string' ? data.intent : null
  const answerLower = answer.toLowerCase()
  const failures = []

  for (const expected of testCase.expectedSubstrings || []) {
    if (!answerLower.includes(String(expected).toLowerCase())) {
      failures.push(`Missing expected substring: ${expected}`)
    }
  }

  for (const forbidden of testCase.forbiddenSubstrings || []) {
    if (answerLower.includes(String(forbidden).toLowerCase())) {
      failures.push(`Contains forbidden substring: ${forbidden}`)
    }
  }

  if (testCase.requireSources === true && sources.length === 0) {
    failures.push('Expected at least one source')
  }

  if (testCase.requireSources === false && sources.length > 0) {
    failures.push('Expected no sources')
  }

  if (testCase.expectedIntent && intent !== testCase.expectedIntent) {
    failures.push(`Expected intent "${testCase.expectedIntent}" but got "${intent}"`)
  }

  return {
    ok: failures.length === 0,
    failures,
    answer,
    sources,
    intent,
  }
}

async function main() {
  const cases = loadCases()
  let passed = 0

  for (const [index, testCase] of cases.entries()) {
    const label = testCase.name || `Case ${index + 1}`
    console.log(`\n=== ${label} ===`)
    console.log(`Question: ${testCase.question}`)

    const result = await runCase(testCase)

    console.log(`Intent: ${result.intent ?? 'none'}`)
    console.log(`Sources: ${result.sources.length}`)
    console.log(`Answer: ${result.answer}`)

    if (result.ok) {
      passed += 1
      console.log('Result: PASS')
    } else {
      console.log('Result: FAIL')
      for (const failure of result.failures) {
        console.log(`- ${failure}`)
      }
    }
  }

  const total = cases.length
  console.log(`\nSummary: ${passed}/${total} passed`)

  if (passed !== total) {
    process.exit(1)
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`Accuracy test run failed: ${message}`)
  process.exit(1)
})
