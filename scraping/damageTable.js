const axios = require('axios');
const connection = require('../conf');

const damageIds = [];
for (let i = 0; i < 3; i += 1) {
  damageIds[i] = i + 1;
}

damageIds.map((id) => {
  axios
    .get(`https://pokeapi.co/api/v2/move-damage-class/${id}`)
    .then(({ data }) => {
      const nameFr = data.names
        .filter((word) => word.language.name === 'fr')
        .map((damage) => damage.name);

      const nameEn = data.names
        .filter((word) => word.language.name === 'en')
        .map((damage) => damage.name);

      const nameJp = data.names
        .filter((word) => word.language.name === 'ja-Hrkt')
        .map((damage) => damage.name);

      connection.query(
        `INSERT INTO damages (nameFr, nameEn, nameJp) VALUES ("${nameFr}", "${nameEn}", "${nameJp}")`
      );
    });
});
