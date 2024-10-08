const { ClicarBotaoEditarADM } = require("../../scripts/AtivarEd");
const { waitUntilThenClickJS, waitElementThenReturnAttrAways, waitElementExistThenReturn } = require("../../scripts/geral");
const { loginMoodle } = require("../../scripts/login");
const { screenshot, screenshotElementWithTimestampWhiteBar } = require("../../scripts/screenshot")
var fs = require("fs");
const { screenshotElementParamElement } = require("../../scripts/screenshotElement");
const { waitUntilThenRunScriptThenReturn } = require("../../scripts/waitUntilThenRunScript");
const path = require('path');
async function relatorio100Forum(configs){

  
 
    if(await waitElementExistThenReturn(".activity:has(.inplaceeditable[data-value*='Fórum Tira-dúvidas'])",configs) && await waitElementExistThenReturn(".activity:has(.grupoOlaNomeSobrenomeIcon)",configs)){
      var nomeDisciplina = await waitElementThenReturnAttrAways(".page-header-headings h1","textContent",configs)
      await waitUntilThenClickJS(".activity:has(.inplaceeditable[data-value*='Fórum Tira-dúvidas']) a",configs)
      if(await waitElementExistThenReturn(".discussion-list",configs)){
        await screenshotElementWithTimestampWhiteBar(".discussion-list",configs,path.join(__dirname,`../screenshots_forum/${nomeDisciplina}_Criado.png`))
      }else{
        await screenshotElementWithTimestampWhiteBar(".forumnodiscuss",configs,path.join(__dirname,`../screenshots_forum/${nomeDisciplina}_NaoCriado.png`))
      }
      
   
      // await screenshot(configs,`C:/Users/730550955/Desktop/BACKSEPARADO/Automacao_SeleniumJS/automacoes/relatorios/screenshots_forum/${nomeDisciplina}.png`,10,40)
      // await screenshotElementWithTimestampWhiteBar()
    }
  


    
}

module.exports={relatorio100Forum}