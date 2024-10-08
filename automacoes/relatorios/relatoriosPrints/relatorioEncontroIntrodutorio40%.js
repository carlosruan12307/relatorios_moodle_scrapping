const { ClicarBotaoEditarADM } = require("../scriptsAutomacaoGeral/AtivarEd");
const { waitUntilThenClickJS, waitElementThenReturnAttrAways, waitUntilThenRemoveAttr } = require("../scriptsAutomacaoGeral/geral");
const { loginMoodle } = require("../scriptsAutomacaoGeral/Login");
const { screenshot } = require("../scriptsAutomacaoGeral/screenshot");
const { waitUntilThenRunScriptThenReturnElementOrNot3000 } = require("../scriptsAutomacaoGeral/waitUntilThenRunScript");

var fs = require("fs");
async function relatorioEncontroIntrodutorio40(){
    const { Builder, By, Key,until } = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    // let urlsOutCategoria = [
    //     "https://ead.unifor.br/ava/course/view.php?id=69599",
    //     "https://ead.unifor.br/ava/course/view.php?id=69597",
    //     "https://ead.unifor.br/ava/course/view.php?id=69566",
    //     "https://ead.unifor.br/ava/course/view.php?id=69575",
    //     "https://ead.unifor.br/ava/course/view.php?id=69578",
    //     "https://ead.unifor.br/ava/course/view.php?id=69568",
    //     "https://ead.unifor.br/ava/course/view.php?id=69571",
    //     "https://ead.unifor.br/ava/course/view.php?id=69606",
    //     "https://ead.unifor.br/ava/course/view.php?id=69594",
    //     "https://ead.unifor.br/ava/course/view.php?id=69596",
    //     "https://ead.unifor.br/ava/course/view.php?id=69589",
    //     "https://ead.unifor.br/ava/course/view.php?id=69595",
    //     "https://ead.unifor.br/ava/course/view.php?id=69580",
    //     "https://ead.unifor.br/ava/course/view.php?id=69769",
    //     "https://ead.unifor.br/ava/course/view.php?id=69567",
    //     "https://ead.unifor.br/ava/course/view.php?id=69603",
    //     "https://ead.unifor.br/ava/course/view.php?id=69581",
    //     "https://ead.unifor.br/ava/course/view.php?id=69577",
    //     "https://ead.unifor.br/ava/course/view.php?id=69565",
    //     "https://ead.unifor.br/ava/course/view.php?id=69570",
    //     "https://ead.unifor.br/ava/course/view.php?id=69574",
    //     "https://ead.unifor.br/ava/course/view.php?id=69592",
    //     "https://ead.unifor.br/ava/course/view.php?id=69587",
    //     "https://ead.unifor.br/ava/course/view.php?id=69585",
    //     "https://ead.unifor.br/ava/course/view.php?id=69564",
    //     "https://ead.unifor.br/ava/course/view.php?id=69583",
    //     "https://ead.unifor.br/ava/course/view.php?id=69600",
    //     "https://ead.unifor.br/ava/course/view.php?id=69590",
    //     "https://ead.unifor.br/ava/course/view.php?id=69598",
    //     "https://ead.unifor.br/ava/course/view.php?id=69471",
    //     "https://ead.unifor.br/ava/course/view.php?id=69465",
    //     "https://ead.unifor.br/ava/course/view.php?id=69470",
    //     "https://ead.unifor.br/ava/course/view.php?id=69468",
    //     "https://ead.unifor.br/ava/course/view.php?id=69464",
    //     "https://ead.unifor.br/ava/course/view.php?id=69469",
    //     "https://ead.unifor.br/ava/course/view.php?id=73517",
    //     "https://ead.unifor.br/ava/course/view.php?id=69467",
    //     "https://ead.unifor.br/ava/course/view.php?id=69466",
    //     "https://ead.unifor.br/ava/course/view.php?id=70021",
    //     "https://ead.unifor.br/ava/course/view.php?id=70018",
    //     "https://ead.unifor.br/ava/course/view.php?id=70019",
    //     "https://ead.unifor.br/ava/course/view.php?id=70014",
    //     "https://ead.unifor.br/ava/course/view.php?id=70020",
    //     "https://ead.unifor.br/ava/course/view.php?id=70016",
    //     "https://ead.unifor.br/ava/course/view.php?id=70015",
    //     "https://ead.unifor.br/ava/course/view.php?id=70017",
    //     "https://ead.unifor.br/ava/course/view.php?id=69773",
    //     "https://ead.unifor.br/ava/course/view.php?id=69776",
    //     "https://ead.unifor.br/ava/course/view.php?id=69767",
    //     "https://ead.unifor.br/ava/course/view.php?id=69572",
    //     "https://ead.unifor.br/ava/course/view.php?id=69582",
    //     "https://ead.unifor.br/ava/course/view.php?id=69576",
    //     "https://ead.unifor.br/ava/course/view.php?id=69579",
    //     "https://ead.unifor.br/ava/course/view.php?id=69569",
    //     "https://ead.unifor.br/ava/course/view.php?id=69573",
    //     "https://ead.unifor.br/ava/course/view.php?id=69591",
    //     "https://ead.unifor.br/ava/course/view.php?id=69593",
    //     "https://ead.unifor.br/ava/course/view.php?id=69601",
    //     "https://ead.unifor.br/ava/course/view.php?id=69586",
    //     "https://ead.unifor.br/ava/course/view.php?id=69768",
    //     "https://ead.unifor.br/ava/course/view.php?id=69770",
    //     "https://ead.unifor.br/ava/course/view.php?id=69764",
    //     "https://ead.unifor.br/ava/course/view.php?id=69771",
    //     "https://ead.unifor.br/ava/course/view.php?id=69775",
    //     "https://ead.unifor.br/ava/course/view.php?id=69772",
    //     "https://ead.unifor.br/ava/course/view.php?id=69777",
    //     "https://ead.unifor.br/ava/course/view.php?id=69766",
    //     "https://ead.unifor.br/ava/course/view.php?id=69604",
    //     "https://ead.unifor.br/ava/course/view.php?id=74504"
    // ];
    let urlsOutCategoria = [
        "https://ead.unifor.br/ava/course/view.php?id=69672",
        "https://ead.unifor.br/ava/course/view.php?id=69671",
        "https://ead.unifor.br/ava/course/view.php?id=69669",
        "https://ead.unifor.br/ava/course/view.php?id=69668",
        "https://ead.unifor.br/ava/course/view.php?id=69667",
        "https://ead.unifor.br/ava/course/view.php?id=69666",
        "https://ead.unifor.br/ava/course/view.php?id=69665",
        "https://ead.unifor.br/ava/course/view.php?id=69664"
    ]
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
     for (let index = 0; index < urlsOutCategoria.length; index++) {
        await configs.driver.get(urlsOutCategoria[index])
        oneTimeClickEdADM();


        var nomeDisciplina = await waitElementThenReturnAttrAways(".page-header-headings h1","textContent",configs)
        await waitUntilThenClickJS(".activity:has(.inplaceeditable[data-value*='Encontros Virtuais']) a",configs)
        iframeSRC = await waitElementThenReturnAttrAways("iframe","src",configs)
        await configs.driver.get(iframeSRC)
        if(await waitUntilThenRunScriptThenReturnElementOrNot3000(".item-title",`return [...document.querySelectorAll(".item-title")].some(e => e.textContent.includes("ESTUDOS INTRODUTÓRIOS"))`,configs)){
            await screenshot(configs,`C:/Users/730550955/Desktop/BACKSEPARADO/Automacao_SeleniumJS/automacoes/relatorios/screenshots_encontroIntrodutorio/${nomeDisciplina}_Encontro_Criado.png`,10,50)
        }else{
            await screenshot(configs,`C:/Users/730550955/Desktop/BACKSEPARADO/Automacao_SeleniumJS/automacoes/relatorios/screenshots_encontroIntrodutorio/${nomeDisciplina}_Encontro_Nao_Criado.png`,10,50)
        }
        
     
}
}
relatorioEncontroIntrodutorio40()
module.exports={relatorioEncontroIntrodutorio40}