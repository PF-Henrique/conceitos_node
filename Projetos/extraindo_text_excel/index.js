
// https://josiaspereira.com.br/como-extrair-texto-de-arquivo-pdf-em-nodejs/
const express = require('express');

const Pdf = require('./readerPDF2text')
const fs = require('fs')

const app = express();

const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => res.send('pong'));

app.get('/file/:filename/:password', async (req, res) => {
	
  const fileBuffer = fs.readFileSync(req.params.filename);
  let pdfRow = null
  if (req.params.password){
	pdfRow = await Pdf.getPDFText(fileBuffer, req.params.password)
  }else {
	pdfRow = await Pdf.getPDFText(fileBuffer)
  }
  
  
  res.send(pdfRow);
  
});

app.listen(3333); 

module.exports = app;
