const axios = require('axios');
const connection = require('../conf');

const natureIds = [];
for (let i = 0; i < 25; i += 1) {
  natureIds[i] = i + 1;
}

natureIds.map((id) => {
  axios.get(`https://pokeapi.co/api/v2/nature/${id}`).then(({ data }) => {
    const nameFr = data.names
      .filter((word) => word.language.name === 'fr')
      .map((nature) => nature.name);

    const nameEn = data.names
      .filter((word) => word.language.name === 'en')
      .map((nature) => nature.name);

    const nameJp = data.names
      .filter((word) => word.language.name === 'ja-Hrkt')
      .map((nature) => nature.name);

    const downStat =
      data.decreased_stat !== null ? data.decreased_stat.name : '-';

    const upStat =
      data.increased_stat !== null ? data.increased_stat.name : '-';

    const hateFlavor =
      data.hates_flavor !== null ? data.hates_flavor.name : '-';

    const likeFlavor =
      data.likes_flavor !== null ? data.likes_flavor.name : '-';

    connection.query(
      `INSERT INTO natures (nameFr, nameEn, nameJp, downStat, upStat, hateFlavor, likeFlavor) VALUES ("${nameFr}", "${nameEn}", "${nameJp}", "${downStat}", "${upStat}", "${hateFlavor}", "${likeFlavor}")`
    );
  });
});
