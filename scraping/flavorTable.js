const axios = require('axios');
const connection = require('../conf');

const flavorIds = [];
for (let i = 0; i < 5; i += 1) {
  flavorIds[i] = i + 1;
}

flavorIds.map((id) => {
  axios.get(`https://pokeapi.co/api/v2/berry-flavor/${id}`).then(({ data }) => {
    const nameFr = data.names
      .filter((word) => word.language.name === 'fr')
      .map((flavor) => flavor.name);

    const nameEn = data.names
      .filter((word) => word.language.name === 'en')
      .map((flavor) => flavor.name);

    const nameJp = data.names
      .filter((word) => word.language.name === 'ja-Hrkt')
      .map((flavor) => flavor.name);

    connection.query(
      `INSERT INTO flavors (nameFr, nameEn, nameJp) VALUES ("${nameFr}", "${nameEn}", "${nameJp}")`
    );
  });
});
