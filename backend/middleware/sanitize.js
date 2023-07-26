const { check, validationResult } = require('express-validator');


exports.loginValidate = [check('email', 'L\'email doit être valide').isEmail().trim().escape().normalizeEmail(),
check('password').trim().escape()
/*.isLength({ min: 8 }).withMessage('Le mot de passe doit contenir 8 caractères')
.matches('[0-9]').withMessage('Le mot de passe doit contenir un chiffre')
.matches('[A-Z]').withMessage('Le mot de passe doit contenir une majuscule')*/];

exports.bookValidate = [check('book.title')]


exports.checkError = (req,res,next) => {
    
    const errors = validationResult(req);
    console.log(errors);
	if (!errors.isEmpty()) {

      return res.status(412).json({errors: errors.array()});
	}

    next();
}

