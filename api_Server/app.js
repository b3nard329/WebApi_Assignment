// https://aqueous-reef-22809.herokuapp.com/
//test
const express = require('express');
const app = express();
const axios = require('axios');
const Character = require('./Character');
const cors = require('cors');

const port = process.env.PORT || 2000;

app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const characterImage = {
  'Jon Snow':
    'https://drive.google.com/uc?id=1ivXHNz92v4-QC18h2FQQZhcWEspcHaLH',
  'Jaime Lannister':
    'https://drive.google.com/uc?id=1ArFrOeRZQkX1Wh2AfZ31zRiNyGSMXk_B',
  'Margaery Tyrell':
    'https://drive.google.com/uc?id=1mLcnWxMw5phSo2SD0-nwVKR-qWR4XLz5',
  'Tywin Lannister':
    'https://drive.google.com/uc?id=1HebyGUfPtMfsg2EfKR1n4jCcxwFhTLZs',
  'Aemon Targaryen':
    'https://drive.google.com/uc?id=1zB17-SshWlL_LmjZzLhBrCH3mBoGJ8Ez',
  'Balon Greyjoy':
    'https://drive.google.com/uc?id=1I7VjgFplPiRUjIVGaJRd7HrDSRUovdmq',
  'Aron Santagar':
    'https://drive.google.com/uc?id=1kuF6Qbu9tABVbpM5_W--dLkZQYHthCA6',
  'Alyn Estermont':
    'https://drive.google.com/uc?id=149nkFDODr9PpuQCVLdWA5a2DXXhpxFd-',
  'Aerys II':
    'https://drive.google.com/uc?id=1YpLjbhJJ5p_258X_VdeC5KRkqCY96rUH',
  'Aerys I': 'https://drive.google.com/uc?id=1pulJ-Dk8YLL9IhUboXxVFnMpwhdbVMAK'
};
var x = 1;
app.get('/addProfile', (req, res) => {
  const name = req.query.name;
  const querystr = `https://www.anapioficeandfire.com/api/characters?name=${name}`;

  axios
    .get(querystr)
    .then(response => {
      const char_Profile = new Character({
        my_id: x,
        name: response.data[0].name,
        gender: response.data[0].gender,
        culture: response.data[0].culture,
        born: response.data[0].born,
        aliases: response.data[0].aliases,
        father: response.data[0].father,
        mother: response.data[0].mother,
        spouse: response.data[0].spouse,
        character_image: characterImage[name]
      });

      x = x + 1;

      console.log(response);
      if (!char_Profile.name) {
        res.status(200).json('Not found');
        return;
      }
      char_Profile
        .save()
        .then(response => {
          res.status(200).json(response);
        })
        .catch(error => {
          res.status(400).json(error);
        });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.get('/getallProfile', (req, res) => {
  Character.find({})
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

app.get('/deleteProfile', (req, res) => {
  Character.deleteMany({ my_id: req.query.my_id })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
