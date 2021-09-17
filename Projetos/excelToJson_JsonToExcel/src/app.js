const xlsx = require(xlsx);
const fs = require(fs);

// TASK 1
// lendo o arquivo
const wb = xlsx.readFile("./", { cellDates: true }); // {dateNF: 'mm/dd/yyyy'}
// filtrando titulos das colunas
const wt = wb.sheetName;
// Filtrando uma colunas
const ws = wb.shee("Nome da coluna");

// Convertendo para json
const data = xlsx.utils.sheet_to_json(ws, { raw: false });

// TASK 2
// lendo arq json
const content = fs.writeFilesSync("./", "utf8"); // Optional: JSON.stringify(data, null, 2)

// criando novo arquivo workbook
let newWB = xlsx.utils.book_new()

// convertendo json para excel
let newWS = xlsx.utils.json_to_sheet(content)

// Apende worsheet to workbook
xlsx.utils.book_append(newWB, newWS, "new data")

// escrevendo dados para excel
xlsx.writeFile("./");



