import { parse } from 'csv-parse/sync'
import { cleanCsvHeader, cleanCsvValue, cleanTextForIngestion } from './preprocess'

export type GenericCsvRecord = Record<string, string>

export interface TravelCsvRecord {
  'Trip ID': string
  Destination: string
  'Start date': string
  'End date': string
  'Duration (days)': string
  'Traveler name': string
  'Traveler age': string
  'Traveler gender': string
  'Traveler nationality': string
  'Accommodation type': string
  'Accommodation cost': string
  'Transportation type': string
  'Transportation cost': string
}

export interface TravelCsvIngestItem {
  content: string
  metadata: Record<string, unknown>
}

export function parseCsvRecords(csvText: string): GenericCsvRecord[] {
  return parse(csvText, {
    columns: true,
    skip_empty_lines: true,
  }) as GenericCsvRecord[]
}

export function parseTravelCsv(csvText: string): TravelCsvRecord[] {
  return parseCsvRecords(csvText) as TravelCsvRecord[]
}

// story 6, csv
export function buildGenericCsvIngestItem(
  record: GenericCsvRecord,
  rowIndex: number
): TravelCsvIngestItem | null {
  const entries = Object.entries(record)
    .map(([key, value]) => [cleanCsvHeader(key), cleanCsvValue(value)] as const)
    .filter(([key, value]) => key.length > 0 && value.length > 0)

  if (entries.length < 2) {
    return null
  }

  const content = cleanTextForIngestion(
    entries.map(([key, value]) => `${key}: ${value}.`).join(' ')
  )

  return {
    content,
    metadata: {
      type: 'CSV',
      rowIndex,
      rowData: Object.fromEntries(entries),
      columns: entries.map(([key]) => key),
    },
  }
}

export function buildTravelCsvIngestItem(
  record: TravelCsvRecord
): TravelCsvIngestItem | null {
  const destination = cleanCsvValue(record.Destination)
  const travelerName = cleanCsvValue(record['Traveler name'])

  if (!destination && !travelerName) {
    return null
  }

  const content = cleanTextForIngestion(
    `Traveler ${travelerName} (Age: ${cleanCsvValue(record['Traveler age'])}, Gender: ${cleanCsvValue(record['Traveler gender'])}, Nationality: ${cleanCsvValue(record['Traveler nationality'])}) took a trip to ${destination}. ` +
      `The trip started on ${cleanCsvValue(record['Start date'])} and ended on ${cleanCsvValue(record['End date'])} with a duration of ${cleanCsvValue(record['Duration (days)'])} days. ` +
      `They stayed in a ${cleanCsvValue(record['Accommodation type'])} which cost ${cleanCsvValue(record['Accommodation cost'])}. ` +
      `Transportation was via ${cleanCsvValue(record['Transportation type'])} costing ${cleanCsvValue(record['Transportation cost'])}.`
  )

  if (!content) {
    return null
  }

  return {
    content,
    metadata: {
      tripId: cleanCsvValue(record['Trip ID']),
      destination,
      startDate: cleanCsvValue(record['Start date']),
      endDate: cleanCsvValue(record['End date']),
      travelerName,
    },
  }
}
