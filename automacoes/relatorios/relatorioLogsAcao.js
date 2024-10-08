
var fs = require("fs");
const { loginMoodle } = require("./scriptsAutomacaoGeral/Login");
const { ClicarBotaoEditarADM } = require("./scriptsAutomacaoGeral/AtivarEd");
const { waitUntilThenClickJS, waitUntilThenChangeSelectIndexOption, waitUntilThenChangeSelect, waitElementThenReturnAttrGet, waitElementThenReturnAttrAways, waitElementExistThenReturn } = require("./scriptsAutomacaoGeral/geral");
const { waitUntilThenRunScript, waitUntilThenRunScriptThenReturn, waitUntilThenRunScriptThenReturnElementOrNot3000 } = require("./scriptsAutomacaoGeral/waitUntilThenRunScript");
const {addColumnToLastDownloadedCSV} = require("./scriptsTransformacao/addColumnToLastDownloadedCSV")
const {getCrdownloadFile} = require("./scriptsAutomacaoGeral/waitDownloadFinish")
const {waitForDownloadCompletion} = require("./scriptsAutomacaoGeral/waitDownloadFinish")
const {formatDate} = require("./scriptsTransformacao/formatDateExtenso")
const {formatDateString} = require("./scriptsTransformacao/formatDateExtenso")
const {combineCSVFiles} = require("./scriptsTransformacao/combineCSVFiles")
const {debug, debugX} = require("./test/debug")
const ExcelJS = require('exceljs');
const csv = require('csv-parser');
const fastcsv = require('fast-csv');
const path = require('path')
const XLSX = require('xlsx');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { criarPasta } = require("./scriptsAutomacaoGeral/criarPasta");
const { readExcel, readExcelFileFull } = require("./scriptsAutomacaoGeral/readExcel");

const {getLastDownloadedCSV} = require("./scriptsTransformacao/getLastDownloadedCSV");
const { deleteCSVFiles } = require("./scriptsAutomacaoGeral/deleteCSVFiles");

// Função auxiliar para formatar a data
function formatToBrazilianDate(date) {
  let day = date.getDate().toString().padStart(2, '0');
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let year = date.getFullYear().toString().slice(-2);
  let hours = date.getHours().toString().padStart(2, '0');
  let minutes = date.getMinutes().toString().padStart(2, '0');
  let seconds = date.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
}


async function relatorioExcelTeste(dias = [], acoes = ["Ver", "Todas as mudanças"]) {
  const { Builder, By, Key, until } = require('selenium-webdriver');
  const chrome = require('selenium-webdriver/chrome');
  var row = [""];
  var tabela = {
      nomeTabela: '',
      rows: [],
  }
  var aba = {
      sheetName: '',
      tabelas: []
  }

  var sheet = {
      abas: [],
      headers: ['Hora', 'Nome completo', 'Usuário afetado', "Contexto do Evento", "Componente", "Nome do evento", "Descrição", "Origem", "endereço IP", "tipoAcao"]
  }
  let options = new chrome.Options();
  options.addArguments('--disable-dev-shm-usage');
  var oneTime = false;
  options.setUserPreferences({
      'download.default_directory': 'C:\\Users\\730550955\\Desktop\\clean-git\\automacoes\\relatorios\\relatorioLogs',
      'download.prompt_for_download': false,
      'download.directory_upgrade': true,
      'safebrowsing_for_trusted_sources_enabled': false,
      'safebrowsing.enabled': false,
      'profile.default_content_settings.popups': 0,
      'profile.default_content_setting_values.automatic_downloads': 1,
      'profile.content_settings.exceptions.automatic_downloads.*.setting': 1

  });
  let driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  const configs = { fs, Builder, By, Key, until, chrome, options, driver }

  await loginMoodle("730550955", "19082000", configs);
  await driver.get("https://ead.unifor.br/ava/course/view.php?id=69412")
  var oneTimeClickEdADM = await ClicarBotaoEditarADM(configs);
  oneTimeClickEdADM();
  await configs.driver.sleep(3000)
  await waitUntilThenClickJS("li[data-key*='participants'] a", configs)
  if(await waitElementExistThenReturn("a[data-action='showcount']",configs)){
    await waitUntilThenClickJS("a[data-action='showcount']",configs)
    await configs.driver.sleep(3000)
    var filterUsers = await waitUntilThenRunScriptThenReturn("table",`[...document.querySelectorAll("table tbody tr th a span")].map((e) => e.title)`,configs)
  }else{
    var filterUsers = await waitUntilThenRunScriptThenReturn("table",`[...document.querySelectorAll("table tbody tr th a span")].map((e) => e.title)`,configs)
  }
  console.log(filterUsers)
  await configs.driver.sleep(3000)
  await waitUntilThenClickJS("li[data-key*='coursereports'] a", configs)

  await waitUntilThenRunScript("a", `[...document.querySelectorAll("a")].filter((e) => e.textContent.toLowerCase().includes("logs"))[0].click()`, configs)
  if(await waitUntilThenRunScriptThenReturnElementOrNot3000("a",`[...document.querySelectorAll("a")].filter((e) => e.textContent.includes("mais"))[0]`,configs)){
    await waitUntilThenRunScript("a",`[...document.querySelectorAll("a")].filter((e) => e.textContent.includes("mais"))[0].click()`,configs)
    

  }
  var usuarios = await waitUntilThenRunScriptThenReturn("#menuuser", `[...document.querySelectorAll("#menuuser option")].map((e) => e.textContent)`, configs)

  var datas = await waitUntilThenRunScriptThenReturn("#menudate", `[...document.querySelectorAll("#menudate option")].map((e) => e.textContent).slice(1,31)`, configs)
  var nomeDisciplina = await waitElementThenReturnAttrAways(".page-header-headings h1", "textContent", configs)

  aba.sheetName = nomeDisciplina;

  for (let indexT = 0; indexT < 2; indexT++) {

      await waitUntilThenChangeSelectIndexOption("#menuuser", 0, configs)
      await waitUntilThenChangeSelectIndexOption("#menudate", 0, configs)
      await waitUntilThenChangeSelect("#menumodaction", acoes[indexT], configs)
      await waitUntilThenClickJS("input[value*='Obter estes logs']", configs)
      await waitUntilThenClickJS(".dataformatselector button", configs)
     
      await waitForDownloadCompletion(path.join(__dirname,"./relatorioLogs"))
    

      await addColumnToLastDownloadedCSV(path.join(__dirname,"./relatorioLogs"), "tipoAcao", acoes[indexT])
      await configs.driver.sleep(5000)
    
      const latestCSVFilePath = await getLastDownloadedCSV(path.join(__dirname,"./relatorioLogs"));
     var data = await readExcelFileFull(latestCSVFilePath)

      // data = await changeL(data)
    var datasFormat =[]
  
    
      var combinations = [];
      const columnXName = 'Nome completo';
      const columnYName = '﻿Hora';
      const columnZName = 'tipoAcao';

      for (let index = 0; index < usuarios.length; index++) {
          var usuarioName = usuarios[index];

          for (let index1 = 0; index1 < datas.length; index1++) {
              const dataX = datas[index1];
              var combination = {
                  searchValueX: usuarioName,
                  searchValueY: await formatDate(dataX)
              };
             
              datasFormat.push(formatDateString(await formatDate(dataX)))
              combinations.push(combination)
          }
      }
      console.log(datasFormat)
      const header = data[0];
      const columnXIndex = header[columnXName]
      const columnYIndex = header[columnYName]
      const columnZIndex = header[columnZName]

      if (columnXIndex === -1 || columnYIndex === -1) {
          console.error('Coluna X ou Y não encontrada.');
          process.exit(1);
      }

      combinations.forEach(({ searchValueX, searchValueY }) => {
          let found = false;

          for (let i = 1; i < data.length; i++) {
              if (data[i]["Nome completo"] === searchValueX && data[i]["﻿Hora"].split(",")[0] === searchValueY) {
                  found = true;
                  break;
              }
          }

          if (!found) {
            // console.log("NOT FOUND")
            // const novoObjeto = Object.keys(data[0]).reduce((obj, key) => {
            //     obj[key] = 0;  // Definindo valor padrão como 0
            //     return obj;
            //   }, {});
            //   novoObjeto[columnXName] = searchValueX;
            //   novoObjeto[columnYName] = searchValueY + ", 00:00:00";
            //   novoObjeto[columnZName] = acoes[indexT];
            //   data.push(novoObjeto);
            //   dataF.push(novoObjeto)
          }
      });
    //   if(indexT == 0){
    //     await debug(configs,data)
    //    }
       // Split "Hora" column into "Data" and "Tempo"

     
       function formatNumber(number) {
        return number.toString().padStart(2, '0');
    }
    
    for (let i = 1; i < data.length; i++) {
        const hora = data[i]["﻿Hora"];
        if (hora) {
            const [date, time] = hora.split(', ');
            const [day, month, year] = date.split('/').map(formatNumber); // Formata dia e mês
            const [hours, minutes, seconds] = time.split(':').map(formatNumber); // Formata hora, minuto e segundo
            
            data[i] = {
                ...data[i],
                Data: `${day}/${month}/${year}`,  // Formato: 01/10/24
                Time: `${hours}:${minutes}:${seconds}` // Formato: 01:31:54
            };
        } else {
            data[i] = {
                ...data[i],
                Data: 'T',
                Time: 'T'
            };
        }
    }
       const fs = require('fs');
       const { createObjectCsvWriter } = require('csv-writer');
// Configuração do escritor CSV
var la = await getLastDownloadedCSV(path.join(__dirname,"./relatorioLogs"))
const csvWriter = createObjectCsvWriter({
  path: la, // Caminho para o arquivo CSV de saída
  header: [
      { id: 'Data', title: 'Data' },
      { id: 'Time', title: 'Time' },
      { id: 'Nome completo', title: 'Nome completo' },
      { id: 'Usuário afetado', title: 'Usuário afetado' },
      { id: 'Contexto do Evento', title: 'Contexto do Evento' },
      { id: 'Componente', title: 'Componente' },
      { id: 'Nome do evento', title: 'Nome do evento' },
      { id: 'Descrição', title: 'Descrição' },
      { id: 'Origem', title: 'Origem' },
      { id: 'endereço IP', title: 'endereço IP' },
      { id: 'tipoAcao', title: 'Tipo de Ação' },
  ],
});

// Escrever os dados processados no arquivo CSV
csvWriter.writeRecords(data)
    .then(() => {
        console.log('Arquivo CSV foi escrito com sucesso!');
    })
    .catch((err) => {
        console.error('Erro ao escrever o arquivo CSV:', err);
    });
       if(indexT == indexT.length - 1){
        await debugX(data,configs)
       }
      console.log('Processamento concluído.');

  }
  

  await criarPasta(path.join(__dirname,`./relatorioLogs/${nomeDisciplina}`))
  await combineCSVFiles(path.join(__dirname,"./relatorioLogs"), path.join(__dirname,`./relatorioLogs/${nomeDisciplina}`),filterUsers,datasFormat,configs)

//   await deleteCSVFiles(path.join(__dirname,"./relatorioLogs"));
}



  

relatorioExcelTeste()

