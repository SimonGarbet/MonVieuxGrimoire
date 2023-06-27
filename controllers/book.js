const Book = require('../models/Book')

exports.getAllBooks = (req, res, next) => {
  Book.find()
  .then (books => res.status(200).json(books))
  .catch(error => res.status(400).json({error}));
  };

exports.getOneBook = (req, res, next) => {
  Book.findOne({_id: req.params.id})
  .then(book => res.status(200).json(book))
  .catch(error => res.status(400).json({error}));
}

exports.getBestBooks = (req, res, next) => {
  Book.find()
  .then(books => (books.sort((a,b) => (a.averageRating < b.averageRating ? 1 : -1))))
  .then (books => res.status(200).json([books[0], books[1], books[2]]))
  .catch(error => res.status(400).json({error}));
}

exports.addBook = (req, res, next) => {
  const bookObject = JSON.parse(JSON.stringify(req.body.book));
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book ({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  book.save()
  .then(() => { res.status(201).json({message: 'Livre enregistré !'})})
  .catch(error => { res.status(400).json( { error })});
};

