const express = require('express');
const connection = require('../conf');

const router = express.Router();

router.get('/:search', async (req, res) => {
  const enteredName = req.params.search;
  try {
    const [pokemons] = await connection.query(
      `SELECT nameFr, nameEn, nameJp FROM pokemons WHERE nameFr LIKE ? OR nameEn LIKE ? OR nameJp LIKE ? LIMIT 20`,
      [`%${enteredName}%`, `%${enteredName}%`, `%${enteredName}%`]
    );
    res.status(200).json(pokemons);
  } catch (err) {
    res.status(500).send('Error retrieving the pokemons');
  }
});

router.get('/details/:dataName', async (req, res) => {
  const { dataName } = req.params;
  try {
    const [pokemon] = await connection.query(
      `SELECT nameFr, nameEn, nameJp, evolveFrom, pkmnDescFr, pkmnDescEn, pkmnDescJp, nationalDexId, visual, visualShiny, officialArt, type1, type2, generation FROM pokemons WHERE nameEn = ?`,
      [`${dataName}`]
    );
    res.status(200).json(pokemon);
  } catch (err) {
    res.status(500).send('Error retrieving the pokemon');
  }
});

module.exports = router;
