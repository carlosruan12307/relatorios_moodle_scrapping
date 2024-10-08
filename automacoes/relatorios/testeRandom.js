const { ClicarBotaoEditarADM } = require("./scriptsAutomacaoGeral/AtivarEd");
const { waitElementExistThenReturn, waitUntilThenClickJS, waitElementThenReturnAttrAways } = require("./scriptsAutomacaoGeral/geral");
const { loginMoodle } = require("./scriptsAutomacaoGeral/Login");
const { waitUntilThenRunScriptThenReturn} = require("./scriptsAutomacaoGeral/waitUntilThenRunScript");

var fs = require("fs");
const { createExcel } = require("../scripts/writeExcel");
async function relatorioQuestoes_R(){
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
      
      await loginMoodle("nteadmin","adminEAD2023!",configs);
      await driver.get("https://ead.unifor.br/ava/course/view.php?id=74531")
      var oneTimeClickEdADM = await ClicarBotaoEditarADM(configs);
      oneTimeClickEdADM();
    var row = []
    var atividade =   {
        nomeAtividade: 'Tabela 1',
        // headers: headers,
        rows: [],
    }
      var disciplina =  {
        sheetName: 'KEK1',
        atividades: [],
    }
    //teorica
    var linkDisciplina = await configs.driver.getCurrentUrl();
    var nomeDisciplina = await waitElementThenReturnAttrAways(".page-header-headings h1","textContent",configs)
     disciplina.sheetName = nomeDisciplina

    if(await waitElementExistThenReturn(".activity:has(.cardSub)",configs)){
        //atividade parcial 1 teorica
        await waitUntilThenClickJS(".activity:has(.inplaceeditable[data-value*='Atividade Parcial 1']) .actions .dropdown .dropdown-menu a:nth-child(1)",configs)
        var atividade1 = JSON.parse(JSON.stringify(atividade));
        atividade1.nomeAtividade = 'Atividade Parcial 1'

        await waitUntilThenClickJS("li[data-key*='mod_quiz_edit'] a",configs)
        var quantidadeQuestoes = await waitUntilThenRunScriptThenReturn("ul.slots ul.section",`return document.querySelectorAll("ul.slots ul.section .activity:not([id*='page'])").length`,configs)

        for (let index = 0; index < quantidadeQuestoes; index++) {
            var rowE = []
            const numeroQuestao = await waitUntilThenRunScriptThenReturn("ul.slots ul.section",`return document.querySelectorAll("ul.slots ul.section .activity:not([id*='page'])")[${index}].querySelector("span[data-itemtype='slotdisplaynumber']").getAttribute("data-value")`,configs)
            console.log("numeroQuestao : " + numeroQuestao)
            rowE.push(numeroQuestao)
            // nome da questao aplicando regex para separar o modo e a categoria da questao
            const nomeQuestao = await waitUntilThenRunScriptThenReturn("ul.slots ul.section",`return document.querySelectorAll("ul.slots ul.section .activity:not([id*='page'])")[${index}].querySelector(".questionname").textContent`,configs)
            // Use regex para separar o modo e a categoria
            console.log("nomeQuestao : " + nomeQuestao)
           
let regex = /(.*?)\s*\((.*?)\)/;
let match = nomeQuestao.match(regex);

let modo = match[1];  // Aleatório
let categoria = match[2];  // Exercício de Fixação 1

console.log("modo : " + modo)
rowE.push(modo)
console.log("categoria : " + categoria)
rowE.push(categoria)
//nota maxima
const notaMaxima = await waitUntilThenRunScriptThenReturn("ul.slots ul.section",`return document.querySelectorAll("ul.slots ul.section .activity:not([id*='page'])")[${index}].querySelector("span[title='Nota máxima']").textContent`,configs)
console.log("notaMaxima : " + notaMaxima)
rowE.push(notaMaxima)

atividade1.rows.push(rowE)

        }
        disciplina.atividades.push(atividade1)
        await configs.driver.get(linkDisciplina);
        // atividade parcial 2 teorica
        await waitUntilThenClickJS(".activity:has(.inplaceeditable[data-value*='Atividade Parcial 2']) .actions .dropdown .dropdown-menu a:nth-child(1)",configs)
        console.log("how")
        console.log(atividade)
        var atividade2 = JSON.parse(JSON.stringify(atividade));
        atividade2.nomeAtividade = 'Atividade Parcial 2'

        await waitUntilThenClickJS("li[data-key*='mod_quiz_edit'] a",configs)
        var quantidadeQuestoes = await waitUntilThenRunScriptThenReturn("ul.slots ul.section",`return document.querySelectorAll("ul.slots ul.section .activity:not([id*='page'])").length`,configs)

        for (let index = 0; index < quantidadeQuestoes; index++) {
            var rowE = []
            const numeroQuestao = await waitUntilThenRunScriptThenReturn("ul.slots ul.section",`return document.querySelectorAll("ul.slots ul.section .activity:not([id*='page'])")[${index}].querySelector("span[data-itemtype='slotdisplaynumber']").getAttribute("data-value")`,configs)
            console.log("numeroQuestao : " + numeroQuestao)
            rowE.push(numeroQuestao)
            // nome da questao aplicando regex para separar o modo e a categoria da questao
            const nomeQuestao = await waitUntilThenRunScriptThenReturn("ul.slots ul.section",`return document.querySelectorAll("ul.slots ul.section .activity:not([id*='page'])")[${index}].querySelector(".questionname").textContent`,configs)
            // Use regex para separar o modo e a categoria
            console.log("nomeQuestao : " + nomeQuestao)
           
let regex = /(.*?)\s*\((.*?)\)/;
let match = nomeQuestao.match(regex);

let modo = match[1];  // Aleatório
let categoria = match[2];  // Exercício de Fixação 1

console.log("modo : " + modo)
rowE.push(modo)
console.log("categoria : " + categoria)
rowE.push(categoria)
//nota maxima
const notaMaxima = await waitUntilThenRunScriptThenReturn("ul.slots ul.section",`return document.querySelectorAll("ul.slots ul.section .activity:not([id*='page'])")[${index}].querySelector("span[title='Nota máxima']").textContent`,configs)
console.log("notaMaxima : " + notaMaxima)
rowE.push(notaMaxima)

atividade2.rows.push(rowE)

        }
        disciplina.atividades.push(atividade2)
        console.log(disciplina.atividades[0].rows)
       await createExcel(disciplina).catch(err => console.error(err));
    }
    //vivencial
    else{

    }
}


module.exports={relatorioQuestoes_R}