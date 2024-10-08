const { ClicarBotaoEditarADM } = require('./scriptsAutomacaoGeral/AtivarEd');
const { waitUntilThenClickJS, waitElementExistThenReturn, waitElementExistThenReturnHTML } = require('./scriptsAutomacaoGeral/geral');
const { loginMoodle } = require('./scriptsAutomacaoGeral/Login');
const { waitUntilthenClickFromTextEqual } = require('./scriptsAutomacaoGeral/waitUntilthenClickFromFileEqual');
const { waitUntilThenRunScriptThenReturn, waitUntilThenRunScriptThenReturnElementOrNot3000, waitUntilThenRunScript } = require('./scriptsAutomacaoGeral/waitUntilThenRunScript');
var fs = require("fs");
const path = require("path");
const ExcelJS = require('exceljs');
const csv = require('csv-parser');
const fastcsv = require('fast-csv');

const XLSX = require('xlsx');
const { tableHTMLToCSV } = require('./scriptsTransformacao/tableHTMLToCSV');
async function relatorioDeAtividades(){
    const { Builder, By, Key,until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let options = new chrome.Options();
options.addArguments('--disable-dev-shm-usage');
var oneTime = false;
let driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();
  const configs = {fs,Builder,By,Key,until,chrome,options,driver}
  
  await loginMoodle("730550955","19082000",configs);
  await driver.get("https://ead.unifor.br/ava/course/view.php?id=69923")
  var oneTimeClickEdADM = await ClicarBotaoEditarADM(configs);
  oneTimeClickEdADM();
  
   await waitUntilThenClickJS(".activity:has(.inplaceeditable[data-value*='Atividade Final' i]) a",configs)
 
  await waitUntilThenRunScript("a",`[...document.querySelectorAll("a")].filter((e) => e.textContent.includes("Ver todos os envios"))[0].click()`,configs)
  await configs.driver.sleep(3000)
  var tableHTML = await waitUntilThenRunScriptThenReturn("table",`document.querySelector("table").outerHTML`,configs)
  console.log(tableHTML)


        // Agora, processamos o HTML para gerar o CSV
        const csv = await tableHTMLToCSV(tableHTML);

        // Salvar o CSV em um arquivo
        const filePath = path.join(__dirname, './relatorioLogs/relatorioTarefa.csv');
        fs.writeFileSync(filePath, csv);

        console.log('CSV gerado e salvo em:', filePath);
}

relatorioDeAtividades()
module.exports={relatorioDeAtividades}