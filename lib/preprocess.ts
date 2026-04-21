const PLACEHOLDER_VALUES = new Set([
  '',
  'n/a',
  'na',
  'null',
  'none',
  'unknown',
  'undefined',
  '-',
  '--',
  'tbd',
])

function normalizeWhitespace(value: string) {
  return value.replace(/\r\n/g, '\n').replace(/\t/g, ' ').replace(/[ ]{2,}/g, ' ').trim()
}

// story 7
export function cleanTextForIngestion(text: string) {
  const lines = text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => normalizeWhitespace(line))
    .filter((line) => line.length > 0)

  const dedupedLines: string[] = []
  for (const line of lines) {
    if (dedupedLines[dedupedLines.length - 1] !== line) {
      dedupedLines.push(line)
    }
  }

  return dedupedLines.join('\n').replace(/\n{2,}/g, '\n').trim()
}

export function cleanCsvHeader(header: string) {
  return normalizeWhitespace(header).replace(/[_-]+/g, ' ')
}

export function cleanCsvValue(value: unknown) {
  const normalized = normalizeWhitespace(String(value ?? ''))
  if (PLACEHOLDER_VALUES.has(normalized.toLowerCase())) {
    return ''
  }
  return normalized
}
