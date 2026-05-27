export async function parsePDF(buffer: Buffer): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pdfParse = require('pdf-parse')
  const data = await pdfParse(buffer)
  return data.text
}

export async function parseDOCX(buffer: Buffer): Promise<string> {
  const mammoth = await import('mammoth')
  const result = await mammoth.extractRawText({ buffer })
  return result.value
}

export async function parseFile(buffer: Buffer, filename: string): Promise<string> {
  const ext = filename.toLowerCase().split('.').pop()
  if (ext === 'pdf') return parsePDF(buffer)
  if (ext === 'docx' || ext === 'doc') return parseDOCX(buffer)
  if (ext === 'txt') return buffer.toString('utf-8')
  throw new Error(`Unsupported file type: .${ext}`)
}
