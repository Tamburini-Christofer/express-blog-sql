//todo Importo i post
const posts = require("../data/postsArray");

function index(req, res) {
  const tag = req.query.tags;

  let filteredPosts = posts;

  if(tag){
    filteredPosts = posts.filter(item => item.tags.includes(tag.toLowerCase()));
  };

  res.json(filteredPosts);
}

function show(req, res) {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    res.status(404);
    return res.json({
      error: "Not Found",
      message: "Post non trovato",
    });
  }
  res.json(post);
}

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
