import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import * as dotenv from 'dotenv';

// Load .env.local manually since we are running via a standalone script
// This MUST run before anything else accesses process.env
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const CSV_FILE_PATH = path.join(process.cwd(), 'Travel details dataset.csv');

interface TripRecord {
  'Trip ID': string;
  Destination: string;
  'Start date': string;
  'End date': string;
  'Duration (days)': string;
  'Traveler name': string;
  'Traveler age': string;
  'Traveler gender': string;
  'Traveler nationality': string;
  'Accommodation type': string;
  'Accommodation cost': string;
  'Transportation type': string;
  'Transportation cost': string;
}

async function run() {
  if (!fs.existsSync(CSV_FILE_PATH)) {
    console.error(`Error: Could not find CSV at ${CSV_FILE_PATH}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(CSV_FILE_PATH, 'utf-8');
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  }) as TripRecord[];

  console.log(`Found ${records.length} records. Beginning ingestion...`);

  // Dynamically import ingestDocument so that dotenv.config() runs FIRST
  const { ingestDocument } = await import('../lib/ingest');

  let successCount = 0;
  let failCount = 0;

  for (const record of records) {
    const tripId = record['Trip ID'];
    const dest = record['Destination'];
    
    // Check if the record is entirely empty
    if (!dest && !record['Traveler name']) continue;

    // Build the text chunk representing this trip
    const content = `Traveler ${record['Traveler name']} (Age: ${record['Traveler age']}, Gender: ${record['Traveler gender']}, Nationality: ${record['Traveler nationality']}) took a trip to ${dest}. ` +
      `The trip started on ${record['Start date']} and ended on ${record['End date']} with a duration of ${record['Duration (days)']} days. ` +
      `They stayed in a ${record['Accommodation type']} which cost ${record['Accommodation cost']}. ` +
      `Transportation was via ${record['Transportation type']} costing ${record['Transportation cost']}.`;

    const metadata = {
      tripId,
      destination: dest,
      startDate: record['Start date'],
      endDate: record['End date'],
      travelerName: record['Traveler name']
    };

    try {
      await ingestDocument({
        source: 'Travel details dataset.csv',
        content,
        metadata,
      });
      successCount++;
      if (successCount % 10 === 0) {
        console.log(`Ingested ${successCount} records so far...`);
      }
    } catch (e: any) {
      fs.writeFileSync('error.json', JSON.stringify({ message: e.message, stack: e.stack }, null, 2));
      process.exit(1);
    }
  }

  console.log(`\nFinished ingestion! Successfully ingested: ${successCount}.`);
}

run().catch((e) => {
  console.error("Fatal error during script execution:", e);
  process.exit(1);
});
