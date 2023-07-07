const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sharp = require('../middleware/sharp-config');

const bookControl= require('../controllers/book');

router.post('/', auth, multer, sharp, bookControl.addBook);
router.get('/', bookControl.getAllBooks);
router.get('/bestrating', bookControl.getBestBooks);
router.post('/:id/rating', auth, bookControl.rateBook);
router.get('/:id', bookControl.getOneBook);
router.put('/:id', auth, multer, sharp, bookControl.modifyBook);
router.delete('/:id', auth, bookControl.deleteBook);


module.exports = router;