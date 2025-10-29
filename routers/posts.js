const express = require("express");

const router = express.Router();

const postsController = require('../controllers/controller');

//?INDEX
router.get('/', postsController.index);

//?SHOW
router.get('/:id', postsController.show);

//?STORE
router.post('/', postsController.store);

//?UPDATE
router.put('/:id', postsController.update);

//?MODIFY
router.patch('/:id', postsController.modify);

//?DESTROY
router.delete('/:id', postsController.destroy);

module.exports = router;