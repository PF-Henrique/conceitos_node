// lib utilizada http://pdfkit.org/
// https://blog.rocketseat.com.br/estrategias-pdf-em-nodejs/

const PDFKit = require('pdfkit');
const fs = require('fs');

const pdf = new PDFKit();

pdf
  .font('SourceSansPro-Regular')
  .fontSize('13')
  .fillColor('#6155a4')
  .text('Texto formatado', {
    align: 'center'
  })

pdf.text('Hello Rocketseat PDF');

pdf.pipe(fs.createWriteStream('output.pdf'));
pdf.end();