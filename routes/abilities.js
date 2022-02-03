const express = require('express');
const connection = require('../conf');

const router = express.Router();

router.get('/:search', async (req, res) => {
  const enteredName = req.params.search;
  try {
    const [abilities] = await connection.query(
      `SELECT nameFr, nameEn, nameJp FROM abilities WHERE nameFr LIKE ? OR nameEn LIKE ? OR nameJp LIKE ? LIMIT 20`,
      [`%${enteredName}%`, `%${enteredName}%`, `%${enteredName}%`]
    );
    res.status(200).json(abilities);
  } catch (err) {
    res.status(500).send('Error retrieving the abilities');
  }
});

module.exports = router;
