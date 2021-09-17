const express = require('express');

const app = express();
const port = 3000;

// Middleware #0 pode ser utilizado por todas as rotas disponibilizando suas propriedades
app.use((req, res, next) => {
  res.locals.hello = 'Hello World';
  next();
}); 

// Middleware #1
app.get('/', (req, res, next) => {
  res.locals.hello = 'Hello World!!!';
  next();
}); 

// Middleware #2
app.get('/', (req, res) => {
  return res.send(res.locals.hello);
});

// Middleware #3
app.get('/', (req, res) => {
  res.send('Eu nunca serei chamado! T.T');
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))