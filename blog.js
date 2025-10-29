//todo Importazione del pacchetti Chalk
const chalk = require("chalk");

//todo Creazione di una variabile che possa recuperare express
const express = require("express");

//todo Creiamo una variabile a cui assegnare express
const server = express();

//todo Riferimento porta del server
const PORT = 3000;

const postRouter = require("./routers/posts.js");

//todo Middleware
server.use(express.static("public"));

//todo Creazione Body-parser
server.use(express.json());

//todo Impostiamo la prima rotta, quella home
server.get("/", (req, res) => {
  res.send(`<h1>Server del mio blog</h1>`);
});

server.use("/posts", postRouter);

//todo Avvio il server sulla porta 3000
server.listen(PORT, () => {
  console.log(chalk.blue(`Server in ascolto sulla porta ${PORT}`));
});

