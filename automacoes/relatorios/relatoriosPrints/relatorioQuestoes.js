const { criarPasta } = require("../scriptsAutomacaoGeral/criarPasta");
const { waitUntilThenClickJS, waitElementThenReturnAttrAways, waitElementExistThenReturn } = require("../scriptsAutomacaoGeral/geral");

var fs = require("fs");
const { screenshotElement, screenshotElementParamElement, combineScreenshotsVertically, screenshotFullElement } = require("../scriptsAutomacaoGeral/screenshotElement");
const path = require('path');
const {  waitUntilThenRunScriptThenReturn } = require("../scriptsAutomacaoGeral/waitUntilThenRunScript");
const { screenshothtml2canvas, screenshothtml2canvasElement } = require("../scriptsAutomacaoGeral/screenshothtml2canvas");
const { addTimestampToImage } = require("../scriptsAutomacaoGeral/screenshot");
const { loginMoodle } = require("../scriptsAutomacaoGeral/Login");
const { ClicarBotaoEditarADM } = require("../scriptsAutomacaoGeral/AtivarEd");
async function AtividadeParcial1Teorica(nomeDisciplina,configs){
    //atividade parcial 1 teorica
    await waitUntilThenClickJS(".activity:has(.inplaceeditable[data-value*='Atividade Parcial 1']) .actions .dropdown .dropdown-menu a:nth-child(1)",configs)
    //configuracoes
    await waitUntilThenClickJS(".expandall",configs)
   
    var selectors = ["#id_timing","#id_modstandardgrade","#id_reviewoptionshdr"]
    await combineScreenshotsVertically(selectors, path.join(__dirname,`./screenshots_questoes/Teorica/${nomeDisciplina}/${nomeDisciplina}_AtividadeParcial1_Configuracoes.png`),configs)

    //questoes
    await waitUntilThenClickJS("li[data-key*='mod_quiz_edit'] a",configs)
 
    await screenshothtml2canvas(".mod-quiz-edit-content ul", path.join(__dirname,`./screenshots_questoes/Teorica/${nomeDisciplina}/${nomeDisciplina}_AtividadeParcial1_Questoes.png`),configs)
  
  // bando de questoes
  await waitUntilThenClickJS("li[data-key*='questionbank'] a",configs)
  var valueURL = await waitUntilThenRunScriptThenReturn(".custom-select",`return [...document.querySelectorAll(".custom-select option")].filter((e) => e.textContent.includes("Categorias"))[0].value`,configs)
await configs.driver.get(`https://ead.unifor.br/ava${valueURL}`);
 var element =  await waitUntilThenRunScriptThenReturn("div[role='main']",`return [...document.querySelectorAll("h3")].filter((e) => e.textContent.includes("Disciplina"))[0].parentElement`,configs)
  await screenshotElementParamElement(element,path.join(__dirname,`./screenshots_questoes/Teorica/${nomeDisciplina}/${nomeDisciplina}_AtividadeParcial1_BancoQuestoes.png`),configs);
  
}
async function AtividadeFinalVivencial(nomeDisciplina,configs){
  await waitUntilThenClickJS(".activity:has(.inplaceeditable[data-value*='Proposta de atividade']) .actions .dropdown .dropdown-menu a:nth-child(1)",configs)
 
}
async function AtividadeParcialVivencial(nomeDisciplina,configs){
  await waitUntilThenClickJS(".activity:has(.inplaceeditable[data-value*='Atividade Parcial']) .actions .dropdown .dropdown-menu a:nth-child(1)",configs)
  await criarPasta(path.join(__dirname,`./screenshots_questoes/Vivencial/${nomeDisciplina}`))
  //configuracoes
  await waitUntilThenClickJS(".expandall",configs)
  
  var selectors = ["#id_timing","#id_modstandardgrade","#id_reviewoptionshdr"]
  await combineScreenshotsVertically(selectors, path.join(__dirname,`./screenshots_questoes/Vivencial/${nomeDisciplina}/${nomeDisciplina}_AtividadeParcial_Configuracoes.png`),configs)
  await addTimestampToImage(path.join(__dirname,`./screenshots_questoes/Vivencial/${nomeDisciplina}/${nomeDisciplina}_AtividadeParcial_Configuracoes.png`),path.join(__dirname,`./screenshots_questoes/Vivencial/${nomeDisciplina}/${nomeDisciplina}_AtividadeParcial_Configuracoes.png`),10,40)
  //questoes
 await waitUntilThenClickJS("li[data-key*='mod_quiz_edit'] a",configs)


 await screenshothtml2canvas(".mod-quiz-edit-content ul", path.join(__dirname,`./screenshots_questoes/Vivencial/${nomeDisciplina}/${nomeDisciplina}_AtividadeParcial_Questoes.png`),configs)
   // bando de questoes
await waitUntilThenClickJS("li[data-key*='questionbank'] a",configs)
var valueURL = await waitUntilThenRunScriptThenReturn(".custom-select",`return [...document.querySelectorAll(".custom-select option")].filter((e) => e.textContent.includes("Categorias"))[0].value`,configs)
await configs.driver.get(`https://ead.unifor.br/ava${valueURL}`);
var element =  await waitUntilThenRunScriptThenReturn("div[role='main']",`return [...document.querySelectorAll("h3")].filter((e) => e.textContent.includes("Disciplina"))[0].parentElement`,configs)
await screenshotElementParamElement(element,path.join(__dirname,`./screenshots_questoes/Vivencial/${nomeDisciplina}/${nomeDisciplina}_AtividadeParcial_BancoQuestoes.png`),configs)
await configs.driver.sleep(3000)
await addTimestampToImage(path.join(__dirname,`./screenshots_questoes/Vivencial/${nomeDisciplina}/${nomeDisciplina}_AtividadeParcial_BancoQuestoes.png`),path.join(__dirname,`./screenshots_questoes/Vivencial/${nomeDisciplina}/${nomeDisciplina}_AtividadeParcial_BancoQuestoes.png`),10,40)
}
async function AtividadeParcial1PresencialEad(nomeDisciplina,configs){
  await waitUntilThenClickJS(".activity:has(.inplaceeditable[data-value*='Atividade Parcial']) .actions .dropdown .dropdown-menu a:nth-child(1)",configs)
  await criarPasta(path.join(__dirname,`./screenshots_questoes/presencialEad/${nomeDisciplina}`))
  //configuracoes
  await waitUntilThenClickJS(".expandall",configs)
  
  var selectors = ["#id_timing","#id_modstandardgrade","#id_reviewoptionshdr"]
  await combineScreenshotsVertically(selectors, path.join(__dirname,`./screenshots_questoes/presencialEad/${nomeDisciplina}/${nomeDisciplina}_AtividadeParcial1_Configuracoes.png`),configs)
  await addTimestampToImage(path.join(__dirname,`./screenshots_questoes/presencialEad/${nomeDisciplina}/${nomeDisciplina}_AtividadeParcial1_Configuracoes.png`),path.join(__dirname,`./screenshots_questoes/presencialEad/${nomeDisciplina}/${nomeDisciplina}_AtividadeParcial1_Configuracoes.png`),10,40)
  //questoes
 await waitUntilThenClickJS("li[data-key*='mod_quiz_edit'] a",configs)


 await screenshothtml2canvas(".mod-quiz-edit-content ul", path.join(__dirname,`./screenshots_questoes/presencialEad/${nomeDisciplina}/${nomeDisciplina}_AtividadeParcial_Questoes.png`),configs)
   // bando de questoes
await waitUntilThenClickJS("li[data-key*='questionbank'] a",configs)
var valueURL = await waitUntilThenRunScriptThenReturn(".custom-select",`[...document.querySelectorAll(".custom-select option")].filter((e) => e.textContent.includes("Categorias"))[0].value`,configs)
await configs.driver.get(`https://ead.unifor.br/ava${valueURL}`);
var element =  await waitUntilThenRunScriptThenReturn("div[role='main']",`[...document.querySelectorAll("h3")].filter((e) => e.textContent.includes("Disciplina"))[0].parentElement`,configs)
await screenshotElementParamElement(element,path.join(__dirname,`./screenshots_questoes/presencialEad/${nomeDisciplina}/${nomeDisciplina}_AtividadeParcial_BancoQuestoes.png`),configs)
await configs.driver.sleep(3000)
await addTimestampToImage(path.join(__dirname,`./screenshots_questoes/presencialEad/${nomeDisciplina}/${nomeDisciplina}_AtividadeParcial_BancoQuestoes.png`),path.join(__dirname,`./screenshots_questoes/presencialEad/${nomeDisciplina}/${nomeDisciplina}_AtividadeParcial_BancoQuestoes.png`),10,40)
}
async function AtividadeParcial2Teorica(nomeDisciplina,configs){
   // atividade parcial 2 teorica
         
   await waitUntilThenClickJS(".activity:has(.inplaceeditable[data-value*='Atividade Parcial 2']) .actions .dropdown .dropdown-menu a:nth-child(1)",configs)
   // configuracoes
   await waitUntilThenClickJS(".expandall",configs)
  
   var selectors = ["#id_timing","#id_modstandardgrade","#id_reviewoptionshdr"]
   await combineScreenshotsVertically(selectors, path.join(__dirname,`./screenshots_questoes/Teorica/${nomeDisciplina}/${nomeDisciplina}_AtividadeParcial2_Configuracoes.png`),configs)

   //questoes
   await waitUntilThenClickJS("li[data-key*='mod_quiz_edit'] a",configs)
   await criarPasta(path.join(__dirname,`./screenshots_questoes/Teorica/${nomeDisciplina}`))
   await screenshothtml2canvas(".mod-quiz-edit-content ul", path.join(__dirname,`./screenshots_questoes/Teorica/${nomeDisciplina}/${nomeDisciplina}_AtividadeParcial2_Questoes.png`),configs)

     // bando de questoes
 await waitUntilThenClickJS("li[data-key*='questionbank'] a",configs)
 var valueURL = await waitUntilThenRunScriptThenReturn(".custom-select",`return [...document.querySelectorAll(".custom-select option")].filter((e) => e.textContent.includes("Categorias"))[0].value`,configs)
await configs.driver.get(`https://ead.unifor.br/ava${valueURL}`);
var element =  await waitUntilThenRunScriptThenReturn("div[role='main']",`return [...document.querySelectorAll("h3")].filter((e) => e.textContent.includes("Disciplina"))[0].parentElement`,configs)
 await screenshotElementParamElement(element,path.join(__dirname,`./screenshots_questoes/Teorica/${nomeDisciplina}/${nomeDisciplina}_AtividadeParcial2_BancoQuestoes.png`),configs);
}
async function AtividadeFinalTeorica(nomeDisciplina,configs){
    //atividade final teorica

    await waitUntilThenClickJS(".activity:has(.inplaceeditable[data-value*='Atividade Final']) .actions .dropdown .dropdown-menu a:nth-child(1)",configs)
    //configuracoes
    await waitUntilThenClickJS(".expandall",configs)
  
    var selectors = ["#id_timing","#id_modstandardgrade","#id_reviewoptionshdr"]
    await combineScreenshotsVertically(selectors, path.join(__dirname,`./screenshots_questoes/Teorica/${nomeDisciplina}/${nomeDisciplina}_AtividadeFinal_Configuracoes.png`),configs)
    //questoes
   await waitUntilThenClickJS("li[data-key*='mod_quiz_edit'] a",configs)
   await criarPasta(path.join(__dirname,`./screenshots_questoes/Teorica/${nomeDisciplina}`))
  
   await screenshotElement(".mod-quiz-edit-content ul", path.join(__dirname,`./screenshots_questoes/Teorica/${nomeDisciplina}/${nomeDisciplina}_AtividadeFinal_Questoes.png`),configs)
     // bando de questoes
 await waitUntilThenClickJS("li[data-key*='questionbank'] a",configs)
 var valueURL = await waitUntilThenRunScriptThenReturn(".custom-select",`return [...document.querySelectorAll(".custom-select option")].filter((e) => e.textContent.includes("Categorias"))[0].value`,configs)
await configs.driver.get(`https://ead.unifor.br/ava${valueURL}`);
var element =  await waitUntilThenRunScriptThenReturn("div[role='main']",`return [...document.querySelectorAll("h3")].filter((e) => e.textContent.includes("Disciplina"))[0].parentElement`,configs)
 await screenshotElementParamElement(element,path.join(__dirname,`./screenshots_questoes/Teorica/${nomeDisciplina}/${nomeDisciplina}_AtividadeFinal_BancoQuestoes.png`),configs);
}
async function relatorioQuestoes(configs){
     //teorica
     var linkDisciplina = await configs.driver.getCurrentUrl();
     var nomeDisciplina = await waitElementThenReturnAttrAways(".page-header-headings h1","textContent",configs)

 
//      if(await waitElementExistThenReturn(".activity:has(.cardSub)",configs)){
//       await criarPasta(path.join(__dirname,`./screenshots_questoes/Teorica/${nomeDisciplina}`))
//       await AtividadeParcial1Teorica(nomeDisciplina,configs)
//          //goback
//          await configs.driver.get(linkDisciplina)
//       await AtividadeParcial2Teorica(nomeDisciplina,configs)
// //  //goback
// //  await configs.driver.get(linkDisciplina)
// //        await AtividadeFinalTeorica(nomeDisciplina,configs);
//      }

 


    //  //vivencial
    //  if(!await waitElementExistThenReturn(".activity:has(.cardSub)",configs)){
    //   await criarPasta(path.join(__dirname,`./screenshots_questoes/Vivencial/${nomeDisciplina}`))
     
    //   await AtividadeParcialVivencial(nomeDisciplina,configs)
    //   // await configs.driver.get(linkDisciplina)
    //   // await AtividadeFinalVivencial(nomeDisciplina,configs);
      
    //  }
}

async function relatorioQuestoesPresencial(){
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
    var oneTimeClickEdADM = await ClicarBotaoEditarADM(configs);
    oneTimeClickEdADM();
    const urls = [
      "https://ead.unifor.br/ava/course/view.php?id=74681"
  ];

  for (let index = 0; index < urls.length; index++) {
    const element = urls[index];
    await configs.driver.get(element)
    var nomeDisciplina = await waitElementThenReturnAttrAways(".page-header-headings h1","textContent",configs)
    await AtividadeParcial1PresencialEad(nomeDisciplina,configs)
  }

}
relatorioQuestoesPresencial()
module.exports={relatorioQuestoes}