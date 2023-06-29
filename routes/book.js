const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const bookControl= require('../controllers/book');

router.post('/', auth, multer, bookControl.addBook);
router.get('/', bookControl.getAllBooks);
router.get('/bestrating', bookControl.getBestBooks);
router.get('/:id', bookControl.getOneBook);
router.put('/:id', auth, multer, bookControl.modifyBook);
router.delete('/:id', auth, bookControl.deleteBook);

module.exports = router;