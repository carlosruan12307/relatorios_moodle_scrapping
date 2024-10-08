const fs = require('fs');
const path = require('path')
const csv = require('csv-parser');
const fastcsv = require('fast-csv');
const {filterData} = require("../scriptsTransformacao/filterData")
const {debugX} = require("../test/debug")
async function combineCSVFiles(directoryPath, outputPath,filterUsers,filterDatas,configs) {
    const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.csv'));
    let data = [];
  
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const fileData = [];
  
      await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (row) => fileData.push(row))
          .on('end', () => {
            // Use Array.prototype.push.apply() para evitar o operador spread
            Array.prototype.push.apply(data, fileData);
            resolve();
          })
          .on('error', reject);
      });
    }
  
    // Chama a função `t` para manipular os dados
    data = await filterData(data,filterUsers,filterDatas)
    // await debugX(data,configs)
    // Cria o arquivo CSV combinado
    const outputFilePath = path.join(outputPath, 'RelatorioLogs.csv');
    const ws = fs.createWriteStream(outputFilePath);
    fastcsv.write(data, { headers: true }).pipe(ws);
  

    // //ws
    // const outputFilePathWS = path.join(outputPath, 'RelatorioLogsWS.csv');
    // const wsWS = fs.createWriteStream(outputFilePathWS);
    // fastcsv.write(dataWS, { headers: true }).pipe(wsWS);


    
    console.log('Os arquivos CSV foram combinados em', outputFilePath);
  }

  module.exports={combineCSVFiles}