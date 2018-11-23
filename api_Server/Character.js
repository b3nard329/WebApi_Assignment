const mongoose = require('mongoose');
const db =
  'mongodb://bernard123:bernard123@ds027761.mlab.com:27761/bbapi_assignment';

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

const schema = mongoose.Schema({
  my_id: { type: Number },
  name: { type: String },
  gender: { type: String },
  culture: { type: String },
  born: { type: String },
  aliases: { type: String },
  father: { type: String },
  mother: { type: String },
  spouse: { type: String },
  character_image: { type: String }
});

const Character = mongoose.model('Character', schema, 'assignment_api');

module.exports = Character;
