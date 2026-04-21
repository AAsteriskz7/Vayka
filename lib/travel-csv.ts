import { parse } from 'csv-parse/sync'

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

export function buildGenericCsvIngestItem(
  record: GenericCsvRecord,
  rowIndex: number
): TravelCsvIngestItem | null {
  const entries = Object.entries(record)
    .map(([key, value]) => [key.trim(), String(value ?? '').trim()] as const)
    .filter(([key, value]) => key.length > 0 && value.length > 0)

  if (entries.length === 0) {
    return null
  }

  const content = entries.map(([key, value]) => `${key}: ${value}.`).join(' ')

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
  const destination = record.Destination?.trim()
  const travelerName = record['Traveler name']?.trim()

  if (!destination && !travelerName) {
    return null
  }

  const content =
    `Traveler ${record['Traveler name']} (Age: ${record['Traveler age']}, Gender: ${record['Traveler gender']}, Nationality: ${record['Traveler nationality']}) took a trip to ${record.Destination}. ` +
    `The trip started on ${record['Start date']} and ended on ${record['End date']} with a duration of ${record['Duration (days)']} days. ` +
    `They stayed in a ${record['Accommodation type']} which cost ${record['Accommodation cost']}. ` +
    `Transportation was via ${record['Transportation type']} costing ${record['Transportation cost']}.`

  return {
    content,
    metadata: {
      tripId: record['Trip ID'],
      destination: record.Destination,
      startDate: record['Start date'],
      endDate: record['End date'],
      travelerName: record['Traveler name'],
    },
  }
}
