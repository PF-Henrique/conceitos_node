# Node Conceitos

###### tags: `introducao a Arquitetura node JS`

## Sobre
Node.js é um ambiente de tempo de execução de plataforma cruzada de código aberto para o desenvolvimento de aplicativos do lado do servidor e de rede. Os aplicativos Node.js são escritos em JavaScript e podem ser executados no tempo de execução do Node.js no 
OS X, Microsoft Windows e Linux.
NodeJS usa um modelo orientado a evento, não blocante de “I/O” o que faz dele leve e eficiente. I/O significa “input” e “output”. Isso quer dizer que qualquer tarefa, seja uma chamada HTTP até leitura de um arquivo em disco.

## Arquitetura
Sua arquitetura é de pilha ou seja o ultimo que entra é o primeiro que sai, sua estrutura é single thread , ele processa esta thread dentro do event loop (executor de pilha de processos) sua base não é compilada e sim interpretada ou seja ela esta mais afastada do processador (linguagem natural de maquina "binário") diferentemente de um Java, rust, c++.


- [x] Assíncrono e orientado a eventos - Todas as APIs da biblioteca Node.js são assíncronas, ou seja, sem bloqueio. Basicamente, isso significa que um servidor baseado em Node.js nunca espera que uma API retorne dados. O servidor passa para a próxima API após chamá-la e um mecanismo de notificação de Eventos de Node.js ajuda o servidor a obter uma resposta da chamada de API anterior.

- [x] Muito rápido - Sendo construído no motor JavaScript V8 do Google Chrome, a biblioteca Node.js é muito rápida na execução de código.

- [x] Single Threaded, mas altamente escalonável - Node.js usa um modelo single threaded com loop de eventos. O mecanismo de eventos ajuda o servidor a responder de forma não bloqueadora e torna o servidor altamente escalonável, ao contrário dos servidores tradicionais que criam threads limitados para lidar com as solicitações. O Node.js usa um único programa threaded e o mesmo programa pode fornecer serviço a um número muito maior de solicitações do que servidores tradicionais como o Apache HTTP Server.

- [x] Sem buffer - os aplicativos Node.js nunca armazenam nenhum dado em buffer. Esses aplicativos simplesmente geram os dados em blocos


## Event Loop
<p align="center">
  <strong>Event Loop</strong> <br />
  <img src="https://github.com/PF-Henrique/conceitos_node/blob/master/.docs/Untitled.png" alt="event loop" />
</p>

Basicamente ele é um loop infinito de thread única, sem bloqueio e de forma assíncrona, que em cada iteração verifica se existem novos eventos em sua fila de eventos (call -stack- pilha). Tais eventos somente aparecem nesSa fila quando são emitidos durante as emissões de eventos na aplicação.

:::info
:bulb: **Exemplo:** Imagine uma solicitação web que faz uma pesquisa no banco de dados. Uma única thread só pode fazer uma coisa de cada vez. Em vez de aguardar a resposta do banco de dados, ele continua a selecionar outras tarefas na fila. No event loop, o loop principal desenrola a pilha de chamadas e não espera os retornos de chamada. Como o loop não bloqueia, é tranquilo fazer mais de uma solicitação web por vez. Várias solicitações podem ser enfileiradas ao mesmo tempo, o que as torna simultâneas. O event loop não espera que uma solicitação seja concluído, mas pega retornos de chamada conforme eles vêm, sem bloqueio.
:::

Quando um determinado código emite um evento, o mesmo é enviado para a fila de eventos para que o Event-loop execute-o, e em seguida retorne seu resultado em um callback. Tal callback geralmente é executado através de uma função de escuta, ou mais conhecida como funções de listen, semanticamente conhecida pelas funções: on(), listen() e outras.

O **EventEmitter**, é o módulo responsável por emitir eventos, e a maioria das bibliotecas do Node.js herdam desSe módulo suas funcionalidades de emit e listen de eventos.

O **Libuv**  é uma biblioteca open source que lida com a thread-pool, sinalização e comunicação entre processos, e toda a mágica necessária para fazer com que as tarefas assíncronas funcionem. O Libuv foi desenvolvido originalmente para o próprio Node.js como uma abstração em torno do libev, no entanto, hoje em dia, vários projetos já estão usando ela.

A maioria das pessoas pensa que o libuv é o event loop em si, isso não é verdade, o libuv implementa um event loop com todos os recursos, mas também é a casa de várias outras partes principais do Node, como:

Sockets TCP e UDP do pacote net
Resoluções DNS assíncronas
Operações assíncronas de arquivos e file system
Eventos do file system
IPC
Child processes e controle de shell
Controle de threads
Sinalização
Relógio de alta resolução


**Microtarefas**: process.nextTick, Promises, Object.observe, MutationObserver

**Macrotasks**: setTimeout, setInterval, setImmediate, requestAnimationFrame, I / O, renderização de IU

Mas qual a diferença prática entre os dois? Podemos resumir na seguinte afirmação:
Se alguma Microtask estiver pendente na fila para o Loop de evento, ela será executada antes do início do próximo loop (sem final do loop atual). Já as Macrotask serão executadas apenas no próximo loop .
ex:
```
console.log ('01 -Console ');
setTimeout (_ => console.log ('02 -Timeout '), 0);
Promise.resolve (). Then (_ => console.log ('03 -Promise '));
console.log ('04 -Console ');
```
Saida
```
01-Console 
04-Console 
03-Promessa 
02-Timeout
```

ê sempre deve procurar usar a API assíncrona quando desenvolver código que vai para produção, uma vez que esta API Não bloqueia o event loop e permite que você construa aplicações com maior performance.

**Visão geral das fases**
temporizadores : esta fase executa callbacks agendados por setTimeout() e setInterval().

callbacks pendentes : executa callbacks de I / O adiados para a próxima iteração do loop.

idle, prepare : usado apenas internamente.

poll : recupera novos eventos de I / O; executar callbacks relacionados a E / S (quase todos com exceção de callbacks de fechamento, aqueles agendados por temporizadores e setImmediate()); o nó será bloqueado aqui quando apropriado.

check : setImmediate()callbacks são invocados aqui.

close callbacks : alguns close callbacks, por exemplo socket.on('close', ...).
Entre cada execução do loop de evento, o Node.js verifica se está aguardando qualquer I / O ou temporizador assíncrono e desliga de forma limpa se não houver nenhum.



intro: https://www.youtube.com/watch?time_continue=186&v=ptUbpIoxrQc&feature=emb_logo&ab_channel=ez.devs

**Blocante e nao-Blocante**
Ser bloqueante é quando a execução do código do resto do código JavaScript no processo do Node.js precisa esperar até que uma operação não-JavaScript seja completada. Isso acontece porque o event loop é incapaz de continuar executando JavaScript enquanto uma operação bloqueante está sendo executada.

Métodos bloqueantes executam de forma síncrona e métodos não-bloqueantes executam de forma assíncrona.


## Metodos HTTP

- O método `GET` solicita a representação de um recurso específico. Requisições utilizando o método `GET` devem retornar apenas dados.

- O método `HEAD` solicita uma resposta de forma idêntica ao método `GET`, porém sem conter o corpo da resposta pois ele solicita os cabeçalhos que seriam retornados se o HEADURL da solicitação fosse solicitado com o GET método HTTP.

- O método `POST` é utilizado para submeter uma entidade a um recurso específico, frequentemente causando uma mudança no estado do recurso ou efeitos colaterais no servidor.

- O método `PUT` substitui #**todas** as atuais representações do recurso de destino pela carga de dados da requisição. representa-se com ('/projects/:id', (request, response) ⇒ { }

- O método `DELETE` remove um recurso específico. representa-se com:

 ('/projects/:id', (request, response) ⇒ { }

- O método `CONNECT` estabelece um túnel para o servidor identificado pelo recurso de destino.

- O método `OPTIONS` é usado para descrever as opções de comunicação com o recurso de destino.

- O método `TRACE` executa um teste de chamada *loop-back* junto com o caminho para o recurso de destino.

- O método `PATCH` é utilizado para aplicar modificações parciais em um recurso.

## HTTP Status Code

- 1xx - **informacional**
- 2xx - **Success**
    - 200 - success
    - 201 - created
- 3xx - **Redirection**
    - 301 - moved permanently
    - 302 - moved
- 4xx - **Client Error**
    - 400 - Bad Request
    - 401 -  Unauthorized
    - 404 - Not Foud
- 5xx - **Server Error**
    - 500 - Internal Server Error

## child process

[fazer]
