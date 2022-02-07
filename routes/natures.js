const express = require('express');
const connection = require('../conf');

const router = express.Router();

router.get('/:search', async (req, res) => {
  const enteredName = req.params.search;
  try {
    const [natures] = await connection.query(
      `SELECT nameFr, nameEn, nameJp FROM natures WHERE nameFr LIKE ? OR nameEn LIKE ? OR nameJp LIKE ? LIMIT 20`,
      [`%${enteredName}%`, `%${enteredName}%`, `%${enteredName}%`]
    );
    res.status(200).json(natures);
  } catch (err) {
    res.status(500).send('Error retrieving the natures');
  }
});

router.get('/details/:dataName', async (req, res) => {
  const { dataName } = req.params;
  try {
    const [nature] = await connection.query(
      `SELECT nameFr, nameEn, nameJp, downStat, upStat, likeFlavor, hateFlavor FROM natures WHERE nameEn = ?`,
      [`${dataName}`]
    );
    res.status(200).json(nature);
  } catch (err) {
    res.status(500).send('Error retrieving the nature');
  }
});

module.exports = router;
