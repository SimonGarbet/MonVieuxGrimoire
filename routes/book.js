const express = require('express');
const router = express.Router();

const bookControl= require('../controllers/book');

router.get('/api/books', bookControl.getAllBooks);

module.exports = router;