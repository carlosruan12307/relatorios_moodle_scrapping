const {  loginMoodle } = require("./Login");

var response = [];
var response1 = "";
const sleep = 3000;
var cursosPorPage = 0;
const have = false;
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
let options = new chrome.Options();
options.addArguments("--disable-dev-shm-usage");
var fs = require("fs");
const {
  waitElementExistThenReturn,
  waitUntilThenClickJS,
  waitUntilThenQuerySelectorAllThenReturnAttr,
  waitElementThenReturnAttrCheck,
} = require("../relatorios/scriptsAutomacaoGeral/geral");


const { subsConfig } = require("../fluxos/subsConfig");
const { relatorioAgendamento } = require("../relatorios/relatorioAgendamento");






async function CalcFirstChildList() {
  var oneTimeFirstC = false;

  return async function (countChild, configs) {
    console.log("o que entra:" + countChild);
    if (!oneTimeFirstC) {
      var countChildC = countChild;
      const pagination = await configs.driver.executeScript(
        `return document.querySelector(".pagination")`
      );
      if (pagination) {
        countChildC = 2;
        oneTimeFirstC = true;
      } else {
        countChildC = 1;
        oneTimeFirstC = true;
      }
    } else {
      oneTimeFirstC = true;
      countChildC = countChild;
    }
    return countChildC;
  };
}
async function PercorrerCursos(
  enderecoCursos,
  oneTimeClickEdADM,
  oneTimeCalcFirstChild,
  funcaoCadaCurso,
  configs,
  countChild = 2,
  page = 0
) {
  var childPages = 1;
  var enderecoCursosWithPage =
    enderecoCursos + `&browse=courses&perpage=20&page=${page}`;
  await configs.driver.get(enderecoCursosWithPage);
  // calc numero de pagins
 if(await waitElementExistThenReturn(".courses .pagination:nth-child(1) ul li",configs) || childPages == 0){
  childPages = 0;
   childPages = await waitUntilThenQuerySelectorAllThenReturnAttr(
    ".courses .pagination:nth-child(1) ul li",
    "length",
    configs
  );
 }
  console.log("childDD : " + childPages);
  const Qpages = childPages - 1;
  //
  cursosPorPage = await CalcQuantidadeCursosPorPage(configs);
  console.log("cursos por page" + cursosPorPage);
  //uma vez
  console.log("é o que vem:" + countChild);
  countChild = await oneTimeCalcFirstChild(countChild, configs);

  // uma vez
  console.log(countChild + "this");
  if (countChild <= cursosPorPage) {
    await waitUntilThenClickJS(
      `.courses .coursebox:nth-child(${countChild}) .info .coursename a`,
      configs
    );
    await configs.driver.sleep(sleep);
    // uma vez

    await oneTimeClickEdADM();
    // oneTimeEd = false;  // faz botao editar 1 vez clicar
    //uma vez

    // await configs.driver.sleep(sleep)
    // const expand = await configs.driver.findElement(configs.By.id('expand-all-btn'))
    // expand.click()
    // await configs.driver.sleep(sleep)
    // const expandR = await configs.driver.executeScript(`return document.querySelector("#section-${2} .content .tile_bar .expand-section").click()`)

    await configs.driver.sleep(sleep);
    //  await   percurso(1,2)
    countChild = countChild + 1;
    // rotina fazer aparecer botao atividade avaliativa
    var url = await configs.driver.getCurrentUrl();
    // await funcaoCadaCurso(possiveisTEO,configs,have); // colocar funçao para executar dentro de cada curso (nesse momento ja esta dentro dos cursos)
    //
    console.log("é o que vai: " + countChild);
    // await goToCodeMirror("Avaliação da Disciplina",configs)
    // await waitUntilThenAddClassList("section .jornada__rotulos-avaliadisciplina","d-none",configs)
    // await waitUntilThenClickJS(".atto_html_button",configs)
    // await waitUntilThenClick("#id_submitbutton2",configs)
    await funcaoCadaCurso();
    // await configs.driver.sleep(sleep);
    await PercorrerCursos(
      enderecoCursos,
      oneTimeClickEdADM,
      oneTimeCalcFirstChild,
      funcaoCadaCurso,
      configs,
      countChild,
      page
    );
  } else {
    page = page + 1;
    if (page < Qpages) {
      countChild = 2; // se tiver mais de 1 pagina existe entao vai para o 2
      PercorrerCursos(
        enderecoCursos,
        oneTimeClickEdADM,
        oneTimeCalcFirstChild,
        funcaoCadaCurso,
        configs,
        countChild,
        page
      );
    } else {
      await configs.driver.sleep(sleep);
    }
  }
}

async function CalcQuantidadeCursosPorPage(configs) {
  // const calc = await configs.driver.executeScript(
  //   `return document.querySelector('.courses').childNodes.length`
  // );
  const calc = await waitElementThenReturnAttrCheck(
    ".courses",
    "childNodes.length",
    configs
  );
  // const pagination = await configs.driver.executeScript(
  //   `return document.querySelector(".pagination")`
  // );
  const pagination = await waitElementExistThenReturn(".pagination", configs);
  if (pagination) {
    cursosPorPage = calc - 1;
  } else {
    cursosPorPage = calc;
  }
  return cursosPorPage;
}


async function RotinaPercorrer(
  oneTimeClickEdADM,
  oneTimeCalcFirstChild,
  configs
) {
  try {
    await loginMoodle("730549335", "12345678", configs);
    var enderecoCursos =
      "https://ead.unifor.br/ava/course/index.php?categoryid=2928";
    await PercorrerCursos(
      enderecoCursos,
      oneTimeClickEdADM,
      oneTimeCalcFirstChild,
      () => relatorioAgendamento(configs),
      configs
    );
    // let arrayDeFuncoes = [() => OcultarRotulo('Avaliação da Disciplina',configs), funcao2, funcao3];
    // await teste(arrayDeFuncoes)

    //A

    ///next
  } finally {
    await configs.driver.sleep(300000000000);
  }
}

module.exports = { RotinaPercorrer, CalcFirstChildList };
