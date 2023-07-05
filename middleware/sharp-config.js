const sharp = require('sharp');
const fs = require('fs');

module.exports = async(req, res, next) => {

const prefix = 'processed_';

  await sharp(req.file.path)
  .resize(206,260, { fit : 'cover' })
  .toFile(`images/${prefix}${req.file.filename}`);

  fs.unlink(`images/${req.file.filename}`, (err => {
    if (err) console.log(err);
    else {
      console.log("Deleted Symbolic Link: symlinkToFile");
    }
  }));

  next();

}