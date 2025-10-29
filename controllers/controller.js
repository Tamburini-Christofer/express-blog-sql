import connection from '../data/db.js';

export function index(req, res) {
  const sql = 'SELECT * FROM posts';
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Errore nella query' });
    res.json(results);
  });
}

export function show(req, res) {
  const id = parseInt(req.params.id);

  const postSql = 'SELECT * FROM posts WHERE id = ?';
  const tagsSql = `
    SELECT tags.*
    FROM tags
    JOIN post_tag ON tags.id = post_tag.tag_id
    WHERE post_tag.post_id = ?
  `;

  connection.query(postSql, [id], (err, postResults) => {
    if (err) return res.status(500).json({ error: 'Errore nella query post' });
    if (postResults.length === 0)
      return res.status(404).json({ error: 'Post non trovato' });

    const post = postResults[0];

    // BONUS → recupero dei tag
    connection.query(tagsSql, [id], (err, tagResults) => {
      if (err) return res.status(500).json({ error: 'Errore nella query tag' });
      post.tags = tagResults;
      res.json(post);
    });
  });
}

export function destroy(req, res) {
  const id = parseInt(req.params.id);
  const sql = 'DELETE FROM posts WHERE id = ?';

  connection.query(sql, [id], err => {
    if (err) return res.status(500).json({ error: 'Errore nella cancellazione' });
    res.sendStatus(204);
  });
}
