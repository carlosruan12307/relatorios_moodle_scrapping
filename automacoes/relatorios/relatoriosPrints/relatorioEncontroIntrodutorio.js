const { ClicarBotaoEditarADM } = require("../scriptsAutomacaoGeral/AtivarEd");
const { waitUntilThenClickJS, waitElementThenReturnAttrAways, waitUntilThenRemoveAttr, waitElementExistThenReturn } = require("../scriptsAutomacaoGeral/geral");
const { loginMoodle } = require("../scriptsAutomacaoGeral/Login");
const { screenshot } = require("../scriptsAutomacaoGeral/screenshot");
const { waitUntilThenRunScriptThenReturnElementOrNot3000 } = require("../scriptsAutomacaoGeral/waitUntilThenRunScript");

var fs = require("fs");
async function relatorioEncontroIntrodutorio(configs){


        if(await waitElementExistThenReturn(".activity:has(.grupoOlaNomeSobrenomeIcon)",configs)){
            var nomeDisciplina = await waitElementThenReturnAttrAways(".page-header-headings h1","textContent",configs)
            await waitUntilThenClickJS(".activity:has(.inplaceeditable[data-value*='Encontros Virtuais']) a",configs)
            iframeSRC = await waitElementThenReturnAttrAways("iframe","src",configs)
            await configs.driver.get(iframeSRC)
            if(await waitUntilThenRunScriptThenReturnElementOrNot3000(".item-title",`return [...document.querySelectorAll(".item-title")].some(e => e.textContent.includes("ESTUDOS INTRODUTÓRIOS"))`,configs)){
                await screenshot(configs,`C:/Users/730550955/Desktop/git_automacao/Automacao_SeleniumJS/automacoes/relatorios/screenshots_encontroIntrodutorio/${nomeDisciplina}_Encontro_Criado.png`,10,50)
            }else{
                await screenshot(configs,`C:/Users/730550955/Desktop/git_automacao/Automacao_SeleniumJS/automacoes/relatorios/screenshots_encontroIntrodutorio/${nomeDisciplina}_Encontro_Nao_Criado.png`,10,50)
            }
        }
     
        
     
}

module.exports={relatorioEncontroIntrodutorio}