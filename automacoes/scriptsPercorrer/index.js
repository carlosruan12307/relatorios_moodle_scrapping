
const {RotinaPercorrer, CalcFirstChildList} = require('./percorrerCategoria');

const { ClicarBotaoEditarADM } = require('./AtivarEd');
const path = require('path');
const { combineXLSXFiles } = require('../relatorios/scriptsTransformacao/combineCSVFiles');
async function run(){
  

    const { Builder, By, Key,until } = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    let options = new chrome.Options();
    options.addArguments("--disable-dev-shm-usage");
    var fs = require("fs");
        options.setUserPreferences({
        'download.default_directory': path.join(__dirname,"/relatorios/relatorioLogs/relatorioAgendamento"), // Define o diretório de download
        'download.prompt_for_download': false, // Desativa a pergunta de onde salvar os downloads
        'download.directory_upgrade': true, // Permite mudanças no diretório de download
        'safebrowsing_for_trusted_sources_enabled': false, // Desativa o Safe Browsing para fontes confiáveis
        'safebrowsing.enabled': false // Desativa o Safe Browsing
   
  
      });
    let driver = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    const configs = {fs,Builder,By,Key,until,chrome,options,driver}
    var oneTimeClickEdADM = await ClicarBotaoEditarADM(configs);
    var oneTimeCalcFirstChild = await CalcFirstChildList();


   await RotinaPercorrer(oneTimeClickEdADM,oneTimeCalcFirstChild,configs)
      // await combineXLSXFiles(path.join(__dirname,"/relatorios/relatorioLogs/relatorioAgendamento/relatorioModificado"),path.join(__dirname,"/relatorios/relatorioLogs/relatorioAgendamento/relatorioModificado"))

}
run();