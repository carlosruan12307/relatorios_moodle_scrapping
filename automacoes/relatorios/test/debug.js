async function debugX(data,configs){
    return new Promise(async (resolve,reject) => {
      await configs.fs.writeFile('./test/debug.json', JSON.stringify(data,null,4), (err) => {
        if (err) {
            console.error('Ocorreu um erro ao escrever o arquivo:', err);
            return;
        }else{
          resolve()
        }
      })
    })
  }

  module.exports={debugX}