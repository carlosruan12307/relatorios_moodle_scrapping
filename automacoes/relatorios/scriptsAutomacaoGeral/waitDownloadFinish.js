// Função para obter o nome do arquivo temporário (.crdownload)
const fs = require('fs');
function getCrdownloadFile(downloadDir) {
    const files = fs.readdirSync(downloadDir);
    return files.find(file => file.endsWith('.crdownload'));
  }
  
  // Função para esperar o download terminar (o arquivo .crdownload desaparecer)
  function waitForDownloadCompletion(downloadDir) {
    return new Promise((resolve, reject) => {
        const checkInterval = setInterval(() => {
            const crdownloadFile = getCrdownloadFile(downloadDir);
            if (!crdownloadFile) {
                clearInterval(checkInterval);
                resolve();  // O arquivo .crdownload sumiu, o download está completo
            }
        }, 1000); // Verifica a cada 1 segundo
    });
  }

  module.exports={getCrdownloadFile,waitForDownloadCompletion}