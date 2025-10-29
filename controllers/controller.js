//todo Importo i post
const posts = require("../data/postsArray");

const connection = require('../data/db');

function index(req, res) {
  const tag = req.query.tags;

function show(req, res) {
      connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
  const id = parseInt(req.params.id);

    connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {

        if (err) 
          return res.status(500).json({ error: 'Failed to delete post' });
        res.sendStatus(204)
    });
function store(req, res) {

  const newId = posts[posts.length - 1].id + 1;

  const { titolo, contenuto, immagine, tags } = req.body;

  posts.push({
    id: newId,
    titolo,
    contenuto,
    immagine,
    tags,
  });

console.log(req.body);

  res
    .status(201)
    .json({ result: true, message: "Inserimento avvenuto con successo" });
}


function update(req, res) {
  const id = parseInt(req.params.id);
  const post = posts.find(item => item.id === id);

  if (!post) {
    res.status(404);
    return res.json({ error: "Not Found", message: "Post non trovato" });
  }

  post.titolo = req.body.titolo;
  post.contenuto = req.body.contenuto;
  post.immagine = req.body.immagine;
  post.tags = req.body.tags;

  res.json(post);
  console.log("Aggiornato:", post);
}

function modify(req, res) {
  res.send("Modifica parziale post" + req.params.id);
}

function destroy(req, res) {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) {
    res.status(404);
    return res.json({
      status: 404,
      error: "Not Found",
      message: "Post non trovato",
    });
  }

  const deleted = posts.splice(index, 1);
  console.log("Eliminato:", deleted);
  res.sendStatus(204);
}


module.exports = { index, show, store, update, modify, destroy };
