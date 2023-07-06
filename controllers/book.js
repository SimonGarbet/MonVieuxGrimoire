const fs = require('fs');
const Book = require('../models/Book')

const prefix = 'processed_';


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

exports.addBook = async(req, res, next) => {


  console.log(req.body)

  const bookObject = JSON.parse(req.body.book);
  delete bookObject.userId;
  const book = new Book ({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${prefix}${req.file.filename}`
  });


  book.save()
  .then(() => { res.status(201).json({message: 'Livre enregistré !'})})
  .catch(error => { res.status(400).json( { error })});
};

exports.modifyBook = (req, res, next) => {

  console.log(req.body);
  console.log(req.file);

  const bookObject = req.file ? {
      ...JSON.parse(req.body.book),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${prefix}${req.file.filename}`
  } : { ...req.body };

  delete bookObject.userId;
  Book.findOne({_id: req.params.id})
      .then((book) => {
          if (book.userId != req.auth.userId) {
              res.status(401).json({ message : 'Action non autorisée, veuillez vous connecter'});
          } else {

              if (req.file === undefined) {

                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
                
              } else {

                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => 
                {Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));})
              }
              
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};


exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id})
      .then(book => {
          if (book.userId != req.auth.userId) {
              res.status(401).json({message: 'Action non autorisée, veuillez vous connecter'});
          } else {
              const filename = book.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Book.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};

exports.rateBook = (req, res, next) => {
  console.log(req.body);
  const rateObject = {
    userId : `${req.body.userId}`,
    grade : req.body.rating
  }

  Book.findOne({_id: req.params.id})
  .then((book) => {
      const mapRateId = book.ratings.map(rate => rate.userId)
    if (mapRateId.includes(req.auth.userId) === true){

      res.status(401).json({message: 'Action non autorisée, note déjà attribuée'});

    } else {

        const newAverage = (book.averageRating*book.ratings.length+rateObject.grade)/(book.ratings.length+1)

        Book.updateOne({ _id: req.params.id}, { $push: {ratings : rateObject}, $set: {averageRating : newAverage}})
        .then(() => res.status(200).json(book))
        .catch(error => res.status(401).json({ error }));
    }
  })
  .catch((error) => {
      res.status(400).json({ error });
  });
    
};
