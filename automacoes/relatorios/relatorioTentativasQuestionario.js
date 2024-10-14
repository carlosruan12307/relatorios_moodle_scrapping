const { ClicarBotaoEditarADM } = require('./scriptsAutomacaoGeral/AtivarEd');
const { waitUntilThenClickJS } = require('./scriptsAutomacaoGeral/geral');
const { loginMoodle } = require('./scriptsAutomacaoGeral/Login');
const { waitUntilThenRunScript, waitUntilThenRunScriptThenReturn } = require('./scriptsAutomacaoGeral/waitUntilThenRunScript');
const { tableHTMLToCSV } = require('./scriptsTransformacao/tableHTMLToCSV');

async function relatorioTentativasQuestionario(){
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
      
       await waitUntilThenClickJS(".activity:has(.inplaceeditable[data-value*='Atividade Parcial' i]) a",configs)
        await waitUntilThenClickJS("#quizattemptcounts",configs)
        await waitUntilThenRunScript("button",`[...document.querySelectorAll("button")].filter((e) => e.textContent.includes("Download"))[0].click()`,configs)
    
            console.log('CSV NOTAS gerado e salvo em:', filePath);
            var urlEstatistica = await waitUntilThenRunScriptThenReturn("select",`[...document.querySelectorAll("option")].filter((e) => e.textContent.includes("Estatísticas"))[0].value`,configs)
            await configs.driver.get(`https://ead.unifor.br/ava${urlEstatistica}`)
            await waitUntilThenRunScript("button",`[...document.querySelectorAll("button")].filter((e) => e.textContent.includes("Download"))[1].click()`,configs)
    }
