const express = require('express');
const connection = require('../conf');

const router = express.Router();

router.get('/:search', async (req, res) => {
  const enteredName = req.params.search;
  try {
    const [moves] = await connection.query(
      `SELECT nameFr, nameEn, nameJp FROM moves WHERE nameFr LIKE ? OR nameEn LIKE ? OR nameJp LIKE ? LIMIT 20`,
      [`%${enteredName}%`, `%${enteredName}%`, `%${enteredName}%`]
    );
    res.status(200).json(moves);
  } catch (err) {
    res.status(500).send('Error retrieving the moves');
  }
});

module.exports = router;
