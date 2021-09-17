## middlewares

Para ficar mais claro, vou associar o Express a brincadeira de telefone sem fio. Sim, isso mesmo, mas o que uma coisa tem a ver com a outra? Bom o Express é aquele que passa a primeira informação e nela contém tudo que é relacionado ao serviços Web e a seus protocolos e métodos.

Vindo a primeira informação ela passa por uma fila, e assim como na brincadeira, o middleware pode alterar, adicionar ou apagarinformações. **É importante dizer que no meio do caminho pode-se “acabar” com a brincadeira, como é o caso do res.render, res.send ou res.end que emitem os cabeçalhos de respostas (protocolo HTTP). Vejamos esses códigos**.

É importante entender que as variáveis req e res fazem parte das requisições e respostas respectivamente. Tanto é que com o req.body conseguimos os valores vindos de um formulário e com o res.render conseguimos renderizar uma página.

Na segunda rota, resgatamos o valor inserido no primeiro middleware (rota) e usamos ele no res.send.  Quando utilizamos esse res.send estamos montando o nosso cabeçalho e ele não pode ser reescrito. Por isso é altamente recomendado prefixar o return como fizemos acabando com o fluxo da brincadeira sem erros.

Middlewares genéricos
Podemos fazer com que um middleware seja utilizado por vários métodos(GET, POST por exemplo) e também definirmos se será utilizado qualquer rota ou a partir de uma rota específica para suas sub-rotas. Utilizaremos o método app.use para fazer isso.

```
// Middleware #1
app.use((req, res, next) => {
  res.locals.hello = 'Hello World';
  next();
}); 

// Middleware #2
app.get('/', (req, res) => {
  return res.send(res.locals.hello);
});
```

Veja que com app.use não utilizamos uma rota, apenas pegamos as informações que ele possui, alteramos e mandamos para o próximo. É assim que a grande maioria de middlewares externos trabalham no Express.js. O interessante é que todas as rotas que acessarmos depois desse middleware teremos essa informação disponível para todos os métodos.

Caso de uso

app.use('/app', (req, res, next) => {
  if (!usuariologado) {
    return res.redirect();
  }
  next();
});