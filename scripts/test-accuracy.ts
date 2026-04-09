import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

// Since we are not running this in a browser, we can mock a fetch to the actual API if it was running.
// BUT instead of relying on the Next.js server to be running, let's just make an HTTP request to localhost:3000
// OR we can directly test the route.

async function testQuery(query: string) {
  console.log(`\n=================================\nTesting Query: "${query}"`);
  
  try {
    const res = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: query })
    });
    
    if (!res.ok) {
      console.error(`Failed with status ${res.status}:`, await res.text());
      return;
    }
    
    const data = await res.json();
    console.log(`\n[AI Response]`);
    console.log(data.response);
    
    if (data.sources && data.sources.length > 0) {
      console.log(`\n[Sources Used]`);
      data.sources.forEach((src: string) => console.log(`- ${src}`));
    } else {
      console.log(`\n[Sources Used]\nNone.`);
    }
  } catch (e) {
    console.error('Test failed to run. Make sure the Next.js development server is running (`npm run dev`) on port 3000.', e);
  }
}

async function runTests() {
  const testQuestions = [
    "Who traveled to Rio de Janeiro, Brazil in 2024?",
    "What kind of accommodation did Sarah Johnson use when she went to New York?",
    "Are there any trips to Bali that involved a train?",
    "Tell me about someone who went to Cape Town."
  ];

  for (const q of testQuestions) {
    await testQuery(q);
  }
}

runTests();
