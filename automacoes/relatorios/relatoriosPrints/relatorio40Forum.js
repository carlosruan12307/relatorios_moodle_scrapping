const { ClicarBotaoEditarADM } = require("../../scripts/AtivarEd");
const { waitUntilThenClickJS, waitElementThenReturnAttrAways, waitElementExistThenReturn } = require("../../scripts/geral");
const { loginMoodle } = require("../../scripts/login");
const { screenshot, screenshotElementWithTimestampWhiteBar } = require("../../scripts/screenshot")
var fs = require("fs");
const { screenshotElementParamElement } = require("../../scripts/screenshotElement");
const { waitUntilThenRunScriptThenReturn } = require("../../scripts/waitUntilThenRunScript");
const path = require('path');
async function relatorio40Forum(){

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

    const urls = [
      "https://ead.unifor.br/ava/course/view.php?id=69599",
      "https://ead.unifor.br/ava/course/view.php?id=69597",
      "https://ead.unifor.br/ava/course/view.php?id=69566",
      "https://ead.unifor.br/ava/course/view.php?id=69575",
      "https://ead.unifor.br/ava/course/view.php?id=69578",
      "https://ead.unifor.br/ava/course/view.php?id=69568",
      "https://ead.unifor.br/ava/course/view.php?id=69571",
      "https://ead.unifor.br/ava/course/view.php?id=69606",
      "https://ead.unifor.br/ava/course/view.php?id=69594",
      "https://ead.unifor.br/ava/course/view.php?id=69596",
      "https://ead.unifor.br/ava/course/view.php?id=69589",
      "https://ead.unifor.br/ava/course/view.php?id=69595",
      "https://ead.unifor.br/ava/course/view.php?id=69580",
      "https://ead.unifor.br/ava/course/view.php?id=69769",
      "https://ead.unifor.br/ava/course/view.php?id=69567",
      "https://ead.unifor.br/ava/course/view.php?id=69603",
      "https://ead.unifor.br/ava/course/view.php?id=69581",
      "https://ead.unifor.br/ava/course/view.php?id=69577",
      "https://ead.unifor.br/ava/course/view.php?id=69565",
      "https://ead.unifor.br/ava/course/view.php?id=69570",
      "https://ead.unifor.br/ava/course/view.php?id=69574",
      "https://ead.unifor.br/ava/course/view.php?id=69592",
      "https://ead.unifor.br/ava/course/view.php?id=69587",
      "https://ead.unifor.br/ava/course/view.php?id=69585",
      "https://ead.unifor.br/ava/course/view.php?id=69564",
      "https://ead.unifor.br/ava/course/view.php?id=69583",
      "https://ead.unifor.br/ava/course/view.php?id=69600",
      "https://ead.unifor.br/ava/course/view.php?id=69590",
      "https://ead.unifor.br/ava/course/view.php?id=69598",
      "https://ead.unifor.br/ava/course/view.php?id=69471",
      "https://ead.unifor.br/ava/course/view.php?id=69465",
      "https://ead.unifor.br/ava/course/view.php?id=69470",
      "https://ead.unifor.br/ava/course/view.php?id=69468",
      "https://ead.unifor.br/ava/course/view.php?id=69464",
      "https://ead.unifor.br/ava/course/view.php?id=69469",
      "https://ead.unifor.br/ava/course/view.php?id=73517",
      "https://ead.unifor.br/ava/course/view.php?id=69467",
      "https://ead.unifor.br/ava/course/view.php?id=69466",
      "https://ead.unifor.br/ava/course/view.php?id=70021",
      "https://ead.unifor.br/ava/course/view.php?id=70018",
      "https://ead.unifor.br/ava/course/view.php?id=70019",
      "https://ead.unifor.br/ava/course/view.php?id=70014",
      "https://ead.unifor.br/ava/course/view.php?id=70020",
      "https://ead.unifor.br/ava/course/view.php?id=70016",
      "https://ead.unifor.br/ava/course/view.php?id=70015",
      "https://ead.unifor.br/ava/course/view.php?id=70017",
      "https://ead.unifor.br/ava/course/view.php?id=69773",
      "https://ead.unifor.br/ava/course/view.php?id=69776",
      "https://ead.unifor.br/ava/course/view.php?id=69767",
      "https://ead.unifor.br/ava/course/view.php?id=69572",
      "https://ead.unifor.br/ava/course/view.php?id=69582",
      "https://ead.unifor.br/ava/course/view.php?id=69576",
      "https://ead.unifor.br/ava/course/view.php?id=69579",
      "https://ead.unifor.br/ava/course/view.php?id=69569",
      "https://ead.unifor.br/ava/course/view.php?id=69573",
      "https://ead.unifor.br/ava/course/view.php?id=69591",
      "https://ead.unifor.br/ava/course/view.php?id=69593",
      "https://ead.unifor.br/ava/course/view.php?id=69601",
      "https://ead.unifor.br/ava/course/view.php?id=69586",
      "https://ead.unifor.br/ava/course/view.php?id=69768",
      "https://ead.unifor.br/ava/course/view.php?id=69770",
      "https://ead.unifor.br/ava/course/view.php?id=69764",
      "https://ead.unifor.br/ava/course/view.php?id=69771",
      "https://ead.unifor.br/ava/course/view.php?id=69775",
      "https://ead.unifor.br/ava/course/view.php?id=69772",
      "https://ead.unifor.br/ava/course/view.php?id=69777",
      "https://ead.unifor.br/ava/course/view.php?id=69766",
      "https://ead.unifor.br/ava/course/view.php?id=69604",
      "https://ead.unifor.br/ava/course/view.php?id=74504"
  ];
  
  for (let index = 0; index < urls.length; index++) {
    await configs.driver.get(urls[index])
    oneTimeClickEdADM();
    if(await waitElementExistThenReturn(".activity:has(.inplaceeditable[data-value*='Fórum Tira-dúvidas'])",configs)){
      var nomeDisciplina = await waitElementThenReturnAttrAways(".page-header-headings h1","textContent",configs)
      await waitUntilThenClickJS(".activity:has(.inplaceeditable[data-value*='Fórum Tira-dúvidas']) a",configs)
      if(await waitElementExistThenReturn(".discussion-list",configs)){
        await screenshotElementWithTimestampWhiteBar(".discussion-list",configs,path.join(__dirname,`./screenshots_forum/${nomeDisciplina}.png`))
      }else{
        await screenshotElementWithTimestampWhiteBar(".forumnodiscuss",configs,path.join(__dirname,`./screenshots_forum/${nomeDisciplina}.png`))
      }
      
   
      // await screenshot(configs,`C:/Users/730550955/Desktop/BACKSEPARADO/Automacao_SeleniumJS/automacoes/relatorios/screenshots_forum/${nomeDisciplina}.png`,10,40)
      // await screenshotElementWithTimestampWhiteBar()
    }
  }


    
}
relatorio40Forum()
module.exports={relatorioForum}