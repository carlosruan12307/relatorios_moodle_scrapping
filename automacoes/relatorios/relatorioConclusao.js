const { waitUntilThenRunScript } = require("./scriptsAutomacaoGeral/waitUntilThenRunScript");

async function relatorioConclusao(){
    let options = new chrome.Options();
    options.addArguments('--disable-dev-shm-usage');
    var oneTime = false;
    options.setUserPreferences({
        'download.default_directory': path.join(__dirname,'./relatorioLogs'),
        'download.prompt_for_download': false,
        'download.directory_upgrade': true,
        'safebrowsing_for_trusted_sources_enabled': false,
        'safebrowsing.enabled': false,
        'profile.default_content_settings.popups': 0,
        'profile.default_content_setting_values.automatic_downloads': 1,
        'profile.content_settings.exceptions.automatic_downloads.*.setting': 1
  
    });
    let driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
    const configs = { fs, Builder, By, Key, until, chrome, options, driver }
  
    await loginMoodle("730550955", "19082000", configs);
    await driver.get("https://ead.unifor.br/ava/course/view.php?id=68907")
    var oneTimeClickEdADM = await ClicarBotaoEditarADM(configs);
    oneTimeClickEdADM();

    await configs.driver.sleep(3000)
    // clicar relatorios
    await waitUntilThenClickJS("li[data-key*='coursereports'] a", configs)
    // clicar logs e depois clicar em mais se tiver em participantes
    await waitUntilThenRunScript("a", `[...document.querySelectorAll("a")].filter((e) => e.textContent.toLowerCase().includes("Conclusão de atividades"))[0].click()`, configs)
    if(await waitUntilThenRunScriptThenReturnElementOrNot3000("a",`[...document.querySelectorAll("a")].filter((e) => e.textContent.includes("mais"))[0]`,configs)){
      await waitUntilThenRunScript("a",`[...document.querySelectorAll("a")].filter((e) => e.textContent.includes("mais"))[0].click()`,configs)
      
  
    }
    await waitUntilThenRunScript("a",`[...document.querySelectorAll("a")].filter((e) => e.textContent.includes("Download em formato de planilha (UTF-8. csv)"))[0].click()`,configs)

}

module.exports={relatorioConclusao}