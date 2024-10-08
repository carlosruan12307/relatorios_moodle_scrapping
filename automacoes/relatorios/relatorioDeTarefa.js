const { ClicarBotaoEditarADM } = require('./scriptsAutomacaoGeral/AtivarEd');
const { waitUntilThenClickJS, waitElementExistThenReturn, waitElementExistThenReturnHTML, waitUntilThenChangeSelect } = require('./scriptsAutomacaoGeral/geral');
const { loginMoodle } = require('./scriptsAutomacaoGeral/Login');
const { waitUntilthenClickFromTextEqual } = require('./scriptsAutomacaoGeral/waitUntilthenClickFromFileEqual');
const { waitUntilThenRunScriptThenReturn, waitUntilThenRunScriptThenReturnElementOrNot3000, waitUntilThenRunScript } = require('./scriptsAutomacaoGeral/waitUntilThenRunScript');
var fs = require("fs");
const path = require("path");
const ExcelJS = require('exceljs');
const csv = require('csv-parser');
const fastcsv = require('fast-csv');
const moment = require('moment');
require('moment/locale/pt-br');
const XLSX = require('xlsx');
const { tableHTMLToCSV } = require('./scriptsTransformacao/tableHTMLToCSV');
const { debugX } = require('./test/debug');
const { jsonToCSV } = require('./scriptsTransformacao/jsonToCSV');
async function relatorioDeAtividades(){
    const { Builder, By, Key,until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
var data = []
var user = {
  "NomeSobrenome" : "",
  "EnderecoDeEmail" : "",
  "Envio" : "",
  "Status" : "",
  "PermitirEnviosAPartirDe(DATA)" : "",
  "PermitirEnviosAPartirDe(HORA)" : "",
  "DataDaEntrega" : "",
  "HoraDaEntrega" : "",
  "DataLimite" : "",
  "HoraLimite" : "",
  "Nota" : "",
  "UltimaModificacaoEnvioData" : "",
  "UltimaModificacaoEnvioHora" : ""
}
let options = new chrome.Options();
options.addArguments('--disable-dev-shm-usage');
var oneTime = false;
let driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();
  const configs = {fs,Builder,By,Key,until,chrome,options,driver}
  
  await loginMoodle("730549654","20200911",configs);
  await driver.get("https://ead.unifor.br/ava/course/view.php?id=69923")
  var oneTimeClickEdADM = await ClicarBotaoEditarADM(configs);
  oneTimeClickEdADM();
  
   await waitUntilThenClickJS(".activity:has(.inplaceeditable[data-value*='Atividade Final' i]) a",configs)
   var Abertura = await waitUntilThenRunScriptThenReturn(".description-inner div",`document.querySelector(".description-inner div").textContent.replace(/^\s+|\s+$/g,'')`,configs)
  await waitUntilThenRunScript("a",`[...document.querySelectorAll("a")].filter((e) => e.textContent.includes("Ver todos os envios"))[0].click()`,configs)
  await configs.driver.sleep(3000)
  await waitUntilThenChangeSelect("#id_perpage","Todos",configs)
 
  
  // Remove o dia da semana
  Abertura = Abertura.replace(/^[^\d]+/, '');

// Cria um objeto Moment, especificando o formato original
const dataConvertida = moment(Abertura, "DD MMM. YYYY, HH:mm");

// Formata a data e a hora
const dataAbertura = dataConvertida.format('DD-MM-YYYY'); // "2024-08-23"
const horaAbertura = dataConvertida.format('HH:mm');      // "00:00"
  // var tableHTML = await waitUntilThenRunScriptThenReturn("table",`document.querySelector("table").outerHTML`,configs)
  // console.log(tableHTML)


  //       // Agora, processamos o HTML para gerar o CSV
  //       const csv = await tableHTMLToCSV(tableHTML);

  //       // Salvar o CSV em um arquivo
  //       const filePath = path.join(__dirname, './relatorioLogs/relatorioTarefa.csv');
  //       fs.writeFileSync(filePath, csv);

  //       console.log('CSV gerado e salvo em:', filePath);

  var obj = Object.keys(user).length
  var quantidadeUsuarios = await waitUntilThenRunScriptThenReturn("table",`document.querySelectorAll("tbody > tr.unselectedrow").length`,configs)
   for (let index = 1; index < quantidadeUsuarios + 1; index++) {
    let currentUser = {...user}
      currentUser.NomeSobrenome = await waitUntilThenRunScriptThenReturn(`tbody tr:nth-child(${index}) .c2`,`document.querySelector("tbody tr:nth-child(${index}) .c2").textContent`,configs)
      currentUser.EnderecoDeEmail = await waitUntilThenRunScriptThenReturn(`tbody tr:nth-child(${index}) .c3`,`document.querySelector("tbody tr:nth-child(${index}) .c3").textContent`,configs)
      currentUser.Envio = await waitUntilThenRunScriptThenReturn(`tbody tr:nth-child(${index}) .c4 `,`document.querySelector("tbody tr:nth-child(${index}) .c4 div:nth-child(1)").textContent`,configs)
      if(currentUser.Envio == "Nenhum envio"){
 currentUser.Status = "NaoAvaliado"
      }else{
        if(!await waitUntilThenRunScriptThenReturn(`tbody tr:nth-child(${index}) .c4 `,`document.querySelector("tbody tr:nth-child(${index}) .c4 div:nth-child(2)").textContent`,configs)){
          currentUser.Status = "NaoAvaliado"
        }else{
          currentUser.Status = await waitUntilThenRunScriptThenReturn(`tbody tr:nth-child(${index}) .c4 `,`document.querySelector("tbody tr:nth-child(${index}) .c4 div:nth-child(2)").textContent`,configs)
        }
      }
    
      //format
    
  
       currentUser['PermitirEnviosAPartirDe(DATA)'] = dataAbertura;
       currentUser['PermitirEnviosAPartirDe(HORA)'] = horaAbertura
     //
      //format
      var Entrega = await waitUntilThenRunScriptThenReturn(`tbody tr:nth-child(${index}) .c6`,`document.querySelector("tbody tr:nth-child(${index}) .c6").textContent`,configs)

      var formatDateEntrega = await FormatDateTarefa(Entrega)
  // console.log("Data reformatada completa:", dataFormatada);
  // console.log("Data:", data);
  // console.log("Hora:", hora);
    currentUser.DataDaEntrega = formatDateEntrega.data;
    currentUser.HoraDaEntrega = formatDateEntrega.hora


    //
    //format
      var Limite = await waitUntilThenRunScriptThenReturn(`tbody tr:nth-child(${index}) .c7`,`document.querySelector("tbody tr:nth-child(${index}) .c7").textContent`,configs)


      var formatDateLimite = await FormatDateTarefa(Limite)
      currentUser.DataLimite = formatDateLimite.data;
      currentUser.HoraLimite = formatDateLimite.hora;
//
      currentUser.Nota = await waitUntilThenRunScriptThenReturn(`tbody tr:nth-child(${index}) .c8`,`document.querySelector("tbody tr:nth-child(${index}) .c8").textContent.replace("Nota",'')`,configs)
      //format
      var UltimaModificacaoEnvio = await waitUntilThenRunScriptThenReturn(`tbody tr:nth-child(${index}) .c10`,`document.querySelector("tbody tr:nth-child(${index}) .c10").textContent`,configs)
      var formatDateUM = await FormatDateTarefa(UltimaModificacaoEnvio)
      currentUser.UltimaModificacaoEnvioData = formatDateUM.data;
      currentUser.UltimaModificacaoEnvioHora = formatDateUM.hora;
      //
      data = await pushcurrentUser(data,currentUser)
    
    }
    await debugX(data,configs)
    await jsonToCSV(data,path.join(__dirname,"./relatorioLogs/relatorioTarefa.csv"))
}
async function pushcurrentUser(data,currentUser){
  return new Promise(async (resolve,reject) => {
    await data.push(currentUser)
    resolve(data)
  })
}
async function FormatDateTarefa(Data) {
  // Converte a string para um objeto de data com o formato especificado
  const dataConvertida = moment(Data, 'dddd, D MMM. YYYY, HH:mm', 'pt-br');
  
  // Verifica se a data é válida
  if (!dataConvertida.isValid()) {
    return { data: "0", hora: "0" };
  }
  
  // Reformatando a data para "YYYY-MM-DD HH:mm"
  const dataFormatada = dataConvertida.format('YYYY-MM-DD HH:mm');
  
  // Separando a data e a hora
  const data = dataConvertida.format('DD-MM-YYYY'); // "2024-09-18"
  const hora = dataConvertida.format('HH:mm');      // "23:59"
  
  return { data, hora };
}
relatorioDeAtividades()
module.exports={relatorioDeAtividades}