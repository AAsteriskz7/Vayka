import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { buildTravelCsvIngestItem, parseTravelCsv } from '../lib/travel-csv';

// Load .env.local manually since we are running via a standalone script
// This MUST run before anything else accesses process.env
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const CSV_FILE_PATH = path.join(process.cwd(), 'Travel details dataset.csv');

async function run() {
  if (!fs.existsSync(CSV_FILE_PATH)) {
    console.error(`Error: Could not find CSV at ${CSV_FILE_PATH}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(CSV_FILE_PATH, 'utf-8');
  const records = parseTravelCsv(fileContent);

  console.log(`Found ${records.length} records. Beginning ingestion...`);

  // Dynamically import ingestDocument so that dotenv.config() runs FIRST
  const { ingestDocument } = await import('../lib/ingest');

  let successCount = 0;
  for (const record of records) {
    const item = buildTravelCsvIngestItem(record)
    if (!item) continue;

    try {
      await ingestDocument({
        source: 'Travel details dataset.csv',
        content: item.content,
        metadata: item.metadata,
      });
      successCount++;
      if (successCount % 10 === 0) {
        console.log(`Ingested ${successCount} records so far...`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      const stack = error instanceof Error ? error.stack : undefined
      fs.writeFileSync('error.json', JSON.stringify({ message, stack }, null, 2));
      process.exit(1);
    }
  }

  console.log(`\nFinished ingestion! Successfully ingested: ${successCount}.`);
}

run().catch((e) => {
  console.error("Fatal error during script execution:", e);
  process.exit(1);
});
