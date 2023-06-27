const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')

const bookControl= require('../controllers/book');

router.get('/', bookControl.getAllBooks);
router.post('/', auth, bookControl.addBook);
router.get('/bestrating', bookControl.getBestBooks);
router.get('/:id', bookControl.getOneBook);

module.exports = router;