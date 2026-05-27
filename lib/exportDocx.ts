import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
} from 'docx'

export async function exportToDocx(cvText: string, filename: string): Promise<Buffer> {
  const lines = cvText.split('\n')
  const paragraphs: Paragraph[] = []

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      paragraphs.push(new Paragraph({ text: '' }))
      continue
    }

    if (trimmed.startsWith('# ')) {
      paragraphs.push(new Paragraph({
        text: trimmed.slice(2),
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
      }))
    } else if (trimmed.startsWith('## ')) {
      paragraphs.push(new Paragraph({
        text: trimmed.slice(3),
        heading: HeadingLevel.HEADING_2,
        border: {
          bottom: { color: '94a3b8', size: 1, style: BorderStyle.SINGLE, space: 1 }
        }
      }))
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      paragraphs.push(new Paragraph({
        bullet: { level: 0 },
        children: [new TextRun({ text: trimmed.slice(2), size: 22 })]
      }))
    } else {
      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: trimmed, size: 22 })]
      }))
    }
  }

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: { top: 720, right: 720, bottom: 720, left: 720 }
        }
      },
      children: paragraphs
    }]
  })

  return Packer.toBuffer(doc)
}
