
// var fs = require("fs");
// const { loginMoodle } = require("./scriptsAutomacaoGeral/Login");
// const { ClicarBotaoEditarADM } = require("./scriptsAutomacaoGeral/AtivarEd");
// const { waitUntilThenClickJS, waitUntilThenChangeSelectIndexOption, waitUntilThenChangeSelect, waitElementThenReturnAttrGet, waitElementThenReturnAttrAways, waitElementExistThenReturn } = require("./scriptsAutomacaoGeral/geral");
// const { waitUntilThenRunScript, waitUntilThenRunScriptThenReturn } = require("./scriptsAutomacaoGeral/waitUntilThenRunScript");
// const {addColumnToLastDownloadedCSV} = require("./scriptsTransformacao/addColumnToLastDownloadedCSV")
// const {getLastDownloadedCSV} = require("./scriptsTransformacao/getLastDownloadedCSV")
// const ExcelJS = require('exceljs');
// const csv = require('csv-parser');
// const fastcsv = require('fast-csv');
// const path = require('path');
// const XLSX = require('xlsx');
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const { createExcel } = require("../scripts/writeExcel");
// const { criarPasta } = require("../scripts/criarPasta");





// // Função para obter o nome do arquivo temporário (.crdownload)
// function getCrdownloadFile(downloadDir) {
//   const files = fs.readdirSync(downloadDir);
//   return files.find(file => file.endsWith('.crdownload'));
// }

// // Função para esperar o download terminar (o arquivo .crdownload desaparecer)
// function waitForDownloadCompletion(downloadDir) {
//   return new Promise((resolve, reject) => {
//       const checkInterval = setInterval(() => {
//           const crdownloadFile = getCrdownloadFile(downloadDir);
//           if (!crdownloadFile) {
//               clearInterval(checkInterval);
//               resolve();  // O arquivo .crdownload sumiu, o download está completo
//           }
//       }, 1000); // Verifica a cada 1 segundo
//   });
// }

// async function formatDate(inputDate) {
//   return new Promise((resolve,reject) => {
   
//        // Define um array com os nomes dos meses em português
//     const months = [
//       'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
//       'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
//   ];

//   // Usa regex para capturar o dia, o mês e o ano
//   const regex = /(\d{1,2}) de (\w+) de (\d{4})/;
//   const match = inputDate.match(regex);

//   if (match) {
//       const [_, day, monthName, year] = match;
//       // Encontra o índice do mês no array (começa em 0, então adiciona 1)
//       const monthIndex = months.indexOf(monthName);
      
//       if (monthIndex !== -1) {
//           // Formata o mês para duas casas decimais
//           const formattedMonth = String(monthIndex + 1).padStart(2, '0');
//           // Formata o ano para dois dígitos
//           const formattedYear = year.slice(-2);
//           // Retorna a data no formato desejado
//           return resolve(`${day}/${formattedMonth}/${formattedYear}`);
//       }
//   }

//   throw new Error('Data no formato esperado não encontrada');

//   })
// }
// async function relatorioExcelTeste(dias = [], acoes = ["Ver", "Todas as mudanças"]) {
//   const { Builder, By, Key, until } = require('selenium-webdriver');
//   const chrome = require('selenium-webdriver/chrome');
//   var row = [""];
//   var tabela = {
//       nomeTabela: '',
//       rows: [],
//   }
//   var aba = {
//       sheetName: '',
//       tabelas: []
//   }

//   var sheet = {
//       abas: [],
//       headers: ['Hora', 'Nome completo', 'Usuário afetado', "Contexto do Evento", "Componente", "Nome do evento", "Descrição", "Origem", "endereço IP", "tipoAcao"]
//   }
//   let options = new chrome.Options();
//   options.addArguments('--disable-dev-shm-usage');
//   var oneTime = false;
//   options.setUserPreferences({
//       'download.default_directory': 'C:\\Users\\730550955\\Desktop\\git_automacao\\Automacao_SeleniumJS\\automacoes\\relatorios\\relatorioLogs',
//       'download.prompt_for_download': false,
//       'download.directory_upgrade': true,
//       'safebrowsing_for_trusted_sources_enabled': false,
//       'safebrowsing.enabled': false,
//       'profile.default_content_settings.popups': 0,
//       'profile.default_content_setting_values.automatic_downloads': 1,
//       'profile.content_settings.exceptions.automatic_downloads.*.setting': 1

//   });
//   let driver = new Builder()
//       .forBrowser('chrome')
//       .setChromeOptions(options)
//       .build();
//   const configs = { fs, Builder, By, Key, until, chrome, options, driver }

//   await loginMoodle("730550955", "19082000", configs);
//   await driver.get("https://ead.unifor.br/ava/course/view.php?id=69427")
//   var oneTimeClickEdADM = await ClicarBotaoEditarADM(configs);
//   oneTimeClickEdADM();
//   await configs.driver.sleep(3000)
//   await waitUntilThenClickJS("li[data-key*='participants'] a", configs)
//   if(await waitElementExistThenReturn("a[data-action='showcount']",configs)){
//     await waitUntilThenClickJS("a[data-action='showcount']",configs)
//     await configs.driver.sleep(3000)
//     var filterUsers = await waitUntilThenRunScriptThenReturn("table",`[...document.querySelectorAll("table tbody tr th a span")].map((e) => e.title)`,configs)
//   }else{
//     var filterUsers = await waitUntilThenRunScriptThenReturn("table",`[...document.querySelectorAll("table tbody tr th a span")].map((e) => e.title)`,configs)
//   }
//   console.log(filterUsers)
//   await configs.driver.sleep(3000)
//   await waitUntilThenClickJS("li[data-key*='coursereports'] a", configs)

//   await waitUntilThenRunScript("a", `[...document.querySelectorAll("a")].filter((e) => e.textContent.toLowerCase().includes("logs"))[0].click()`, configs)
//   var usuarios = await waitUntilThenRunScriptThenReturn("#menuuser", `[...document.querySelectorAll("#menuuser option")].map((e) => e.textContent)`, configs)

//   var datas = await waitUntilThenRunScriptThenReturn("#menudate", `[...document.querySelectorAll("#menudate option")].map((e) => e.textContent).slice(1,8)`, configs)
//   var nomeDisciplina = await waitElementThenReturnAttrAways(".page-header-headings h1", "textContent", configs)

//   aba.sheetName = nomeDisciplina;

//   for (let indexT = 0; indexT < 2; indexT++) {

//       await waitUntilThenChangeSelectIndexOption("#menuuser", 0, configs)
//       await waitUntilThenChangeSelectIndexOption("#menudate", 0, configs)
//       await waitUntilThenChangeSelect("#menumodaction", acoes[indexT], configs)
//       await waitUntilThenClickJS("input[value*='Obter estes logs']", configs)
//       await waitUntilThenClickJS(".dataformatselector button", configs)
     
//       await waitForDownloadCompletion("./relatorioLogs")

//       await addColumnToLastDownloadedCSV("./relatorioLogs", "tipoAcao", acoes[indexT])
//       await configs.driver.sleep(5000)

//       const latestCSVFilePath = await getLastDownloadedCSV("./relatorioLogs");
//       const workbook = XLSX.readFile(latestCSVFilePath, { type: 'binary', cellText: false, cellDates: true });

//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];

//       var data = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, dateNF: 'dd/mm/yy, hh:mm:ss' });

  

//       var combinations = [];
//       const columnXName = 'Nome completo';
//       const columnYName = '﻿Hora';
//       const columnZName = 'tipoAcao';

//       for (let index = 0; index < usuarios.length; index++) {
//           var usuarioName = usuarios[index];

//           for (let index1 = 0; index1 < datas.length; index1++) {
//               const dataX = datas[index1];
//               var combination = {
//                   searchValueX: usuarioName,
//                   searchValueY: await formatDate(dataX)
//               };
//               combinations.push(combination)
//           }
//       }

//       const header = data[0];
//       const columnXIndex = header.indexOf(columnXName);
//       const columnYIndex = header.indexOf(columnYName);
//       const columnZIndex = header.indexOf(columnZName);

//       if (columnXIndex === -1 || columnYIndex === -1) {
//           console.error('Coluna X ou Y não encontrada.');
//           process.exit(1);
//       }

//       combinations.forEach(({ searchValueX, searchValueY }) => {
//           let found = false;

//           for (let i = 1; i < data.length; i++) {
//               if (data[i][columnXIndex] === searchValueX && data[i][columnYIndex].split(",")[0] === searchValueY) {
//                   found = true;
//                   break;
//               }
//           }

//           if (!found) {
//               const newRow = Array(header.length).fill(0);
//               newRow[columnXIndex] = searchValueX;
//               newRow[columnYIndex] = searchValueY + ", 00:00:00";
//               newRow[columnZIndex] = acoes[indexT];
//               data.push(newRow);
//           }
//       });

//        // Split "Hora" column into "Data" and "Tempo"
//        const horaColumnIndex = header.indexOf('﻿Hora');
//        header.splice(horaColumnIndex + 1, 0, 'Data', 'Tempo');

//        for (let i = 1; i < data.length; i++) {
//            const hora = data[i][horaColumnIndex];
//            if (hora) {
//                const [date, time] = hora.split(', ');
//                data[i].splice(horaColumnIndex + 1, 0, date, time);
//            } else {
//                data[i].splice(horaColumnIndex + 1, 0, '', '');
//            }
//        }

//       // await data.filter(row => usuarios.includes(row["Nome completo"]));
// // Converter de volta para o formato da planilha
// const newWorksheet = XLSX.utils.aoa_to_sheet(data);

// // Substituir a planilha original
// workbook.Sheets[sheetName] = newWorksheet;
//       XLSX.writeFile(workbook, latestCSVFilePath);

//       console.log('Processamento concluído.');

//   }

//   await criarPasta(`./relatorioLogs/${nomeDisciplina}`)
//   await combineCSVFiles("./relatorioLogs", `./relatorioLogs/${nomeDisciplina}`,filterUsers,configs)
// }



// async function splitDateTimeInCSV(directoryPath) {
//   // Get the path of the latest (or only) CSV file in the directory
//   const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.csv'));
  
//   if (files.length === 0) {
//       console.error(`Nenhum arquivo CSV encontrado no diretório: ${directoryPath}`);
//       return;
//   }

//   // Assuming there's only one CSV file in the directory
//   const latestCSVFilePath = path.join(directoryPath, files[0]);

//   const workbook = XLSX.readFile(latestCSVFilePath, { type: 'binary', cellText: false, cellDates: true });
//   const sheetName = workbook.SheetNames[0];
//   const worksheet = workbook.Sheets[sheetName];

//   // Convert the worksheet to an array of arrays (AoA)
//   var data = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, dateNF: 'dd/mm/yy hh:mm:ss' });

//   // Identify the index of the "Hora" column
//   const header = data[0];
//   const horaColumnIndex = header.indexOf('Hora');

//   if (horaColumnIndex === -1) {
//       console.error('Coluna "Hora" não encontrada.');
//       return;
//   }

//   // Insert new headers for Date and Time
//   header.splice(horaColumnIndex + 1, 0, 'Data', 'Tempo');

//   // Iterate over the rows to split "Hora" into "Data" and "Tempo"
//   for (let i = 1; i < data.length; i++) { // Start from 1 to skip header
//       const hora = data[i][horaColumnIndex];
//       if (hora) {
//           const [date, time] = hora.split(', ');
//           data[i].splice(horaColumnIndex + 1, 0, date, time);
//       } else {
//           // If "Hora" is empty, add empty values for Date and Time
//           data[i].splice(horaColumnIndex + 1, 0, '', '');
//       }
//   }

//   // Convert back the data to the worksheet format
//   const newWorksheet = XLSX.utils.aoa_to_sheet(data);

//   // Replace the original sheet
//   workbook.Sheets[sheetName] = newWorksheet;

//   // Save the updated workbook
//   XLSX.writeFile(workbook, latestCSVFilePath);

//   console.log('A coluna "Hora" foi dividida em "Data" e "Tempo".');
// }
// async function deleteCSVFiles(directoryPath) {
//   return new Promise((resolve,reject) => {
//     fs.readdir(directoryPath, (err, files) => {
//       if (err) {
//           console.error('Erro ao ler o diretório:', err);
//           return;
//       }

//       files.forEach(file => {
//           if (path.extname(file) === '.csv') {
//               const filePath = path.join(directoryPath, file);

//               fs.unlink(filePath, err => {
//                   if (err) {
//                       console.error('Erro ao deletar o arquivo:', err);
//                   } else {
//                       resolve("deletados")
//                   }
//               });
//           }
//       });
//   });
//   })
// }
// async function combineCSVFiles(directoryPath,outputPath,filterUsers,configs) {
//   const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.csv'));
//   var data = [];

//   for (const file of files) {
//     const filePath = path.join(directoryPath, file);
//     const fileData = [];

//     await new Promise((resolve, reject) => {
//       fs.createReadStream(filePath)
//         .pipe(csv())
//         .on('data', (row) => fileData.push(row))
//         .on('end', () => {
//           data.push(...fileData);
//           resolve();
//         })
//         .on('error', reject);
//     });
//   }
  
//    data = await t(data,filterUsers,configs)
//   // Cria o arquivo combinado
//   const outputFilePath = path.join(outputPath, 'combined.csv');
//   const ws = fs.createWriteStream(outputFilePath);
//   fastcsv.write(data, { headers: true }).pipe(ws);

//   console.log('CSV files have been combined into', outputFilePath);
// }

// async function t(data,filterUsers,configs){
//   return new Promise(async (resolve, reject) => {
//     try {
//       const filteredData = data.filter(row => filterUsers.includes(row["Nome completo"]));



    
//        await configs.fs.writeFile('./relatorioLogs/teste.json', JSON.stringify(filteredData,null,4), (err) => {
//     if (err) {
//         console.error('Ocorreu um erro ao escrever o arquivo:', err);
//         return;
//     }
//     console.log('Arquivo JSON escrito com sucesso!');
// });

//       resolve(filteredData);
//     } catch (error) {
//       reject(error); // Lida com erros e rejeita a Promise
//     }
//   });
// }
// relatorioExcelTeste()