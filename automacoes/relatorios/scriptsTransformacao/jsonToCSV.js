const { parse } = require('json2csv');
const fs = require('fs').promises;
async function jsonToCSV(jsonData,dirOutput){
    try {
        const csv = parse(jsonData);
    
        // Salva o arquivo CSV
        await fs.writeFile(dirOutput, csv, 'utf8');
        console.log('Arquivo CSV criado com sucesso!');
      } catch (err) {
        console.error('Erro ao converter JSON para CSV:', err);
      }
}

module.exports={jsonToCSV}