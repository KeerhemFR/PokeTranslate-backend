const axios = require('axios');
const connection = require('../conf');

const statIds = [];
for (let i = 0; i < 8; i += 1) {
  statIds[i] = i + 1;
}

statIds.map((id) => {
  axios.get(`https://pokeapi.co/api/v2/stat/${id}`).then(({ data }) => {
    const nameFr = data.names
      .filter((word) => word.language.name === 'fr')
      .map((stat) => stat.name);

    const nameEn = data.names
      .filter((word) => word.language.name === 'en')
      .map((stat) => stat.name);

    const nameJp = data.names
      .filter((word) => word.language.name === 'ja-Hrkt')
      .map((stat) => stat.name);

    connection.query(
      `INSERT INTO stats (nameFr, nameEn, nameJp) VALUES ("${nameFr}", "${nameEn}", "${nameJp}")`
    );
  });
});
