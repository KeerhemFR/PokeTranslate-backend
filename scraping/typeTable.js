const axios = require('axios');
const connection = require('../conf');

const typeIds = [];
for (let i = 0; i < 18; i += 1) {
  typeIds[i] = i + 1;
}

typeIds.map((id) => {
  axios.get(`https://pokeapi.co/api/v2/type/${id}`).then(({ data }) => {
    const nameFr = data.names
      .filter((word) => word.language.name === 'fr')
      .map((type) => type.name);

    const nameEn = data.names
      .filter((word) => word.language.name === 'en')
      .map((type) => type.name);

    const nameJp = data.names
      .filter((word) => word.language.name === 'ja-Hrkt')
      .map((type) => type.name);

    connection.query(
      `INSERT INTO types (nameFr, nameEn, nameJp) VALUES ("${nameFr}", "${nameEn}", "${nameJp}")`
    );
  });
});
