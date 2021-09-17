/**
 * Ref: https://nodejs.org/api/fs.html
 *  
    Existem tres conceitos importantes do FS:
    
    * source – o objeto de onde seus dados vêm;
    * pipeline – por onde seus dados passam (você pode filtrar ou modificar eles aqui);
    * sink – onde seus dados vão parar (terminam);
    
    */
   
   const fs = require('fs')
   const zlib = require('zlib')
   
    fs.unlink('./', (err) => { // caminho  
    if (err) {
        return console.log(err)
    }
    console.log('successfully deleted /tmp/hello')
    })

// ---------------------------------------------

/* 
    Uma das vantagens de se usar streams é que você consegue transformar 
    os arquivos enquanto eles estão sendo copiados, como por exemplo, 
    fazer uma descompressão:
*/

    fs.createReadStream('original.txt.gz')  
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('original.txt'))


/*
    Mas e se precisarmos ler um arquivo? Qual método utilizar?
*/ 

    fs.readFile('arquivo.txt', (err, data) => {
        if (err) throw err;
        console.log(data);
    });

    // Assincrono 
    const data = fs.readFileSync('arquivo.txt');

/*
    O método fs.appendFile() anexa o conteúdo especificado a um arquivo. 
    Se o arquivo não existir, ele será criado. Crie um novo arquivo chamado 
    appendFile.js e faça o seguinte:
*/

    fs.appendFile('meuNovoArquivo.txt', 'Eu sou o novo conteudo', function (err){
        // Se ocorrer um erro, especifique
        if (err) throw err;
        // Senão, logue no console = salvo!
        console.log("salvo!")
    })

/*
    O método writeFile() substitui o arquivo e conteúdo especificados, 
    se existirem. Se o arquivo não existir, ele será criado:
*/

    fs.writeFile('meuNovoArquivo2.txt', 'Novo conteúdo!', function (err){
        if (err) throw err;
        console.log('Salvo!')
    })

/* 
    O propósito da função fs.access é verificar se um usuário possui permissões 
    para um dado arquivo ou caminho, o segundo parâmetro espera uma ou mais 
    constantes para verificação de permissão. São elas:

    fs.constants.F_OK – verifica se o path é visível para esse processo;
    fs.constants.R_OK – verifica se o path pode ser lido por esse processo;
    fs.constants.W_OK – verifica se o path pode ser escrito por esse processo;
    fs.constants.X_OK – verifica se o path pode ser executado por esse processo;

*/ 
    fs.access('/etc/passwd', fs.constants.R_OK | fs.constants.W_OK, (err) => {  
          if (err) {
            return console.error('no access')
          }
          console.log('access for read/write')
        })

/*
    A função fs.watch é usada para escutar/observar por alterações em um arquivo ou pasta. 
    No entanto a API fs.watch não é 100% consistente entre as diferentes plataformas 
    e em alguns sistemas nem mesmo é disponível
*/
    fs.watch('some/path', (eventType, filename) => {  
          if (!filename) {
            //filename não foi fornecido
          } 
        })
            