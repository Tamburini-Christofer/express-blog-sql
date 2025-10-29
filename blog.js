const chalk = require("chalk");

//todo Creazione di una variabile che possa recuperare express
const express = require("express");

//todo Creiamo una variabile a cui assegnare express
const server = express();

//todo Riferimento porta del server
const PORT = 3000;

const { router: postsRouter, posts } = require("./routers/posts.js");

//todo Middleware per parsing JSON (necessario per POST/PUT che leggono body)
server.use(express.json());

//todo Impostiamo la prima rotta, quella index
server.get("/", (req, res) => {
  res.send(`<h1>Server del mio blog</h1>`);
});

//todo Creo la rotta bacheca
server.get("/bacheca", (req, res) => {
    res.json({posts});
});

server.use("/posts", postsRouter);

//todo Configuriamo gli asset statici sull’applicazione in modo che si possano visualizzare le immagini associate ad ogni post.
server.use(express.static("public"));

//todo Avvio il server sulla porta 3000
server.listen(PORT, () => {
  console.log(chalk.blue(`Server in ascolto sulla porta ${PORT}`));
});

