const axios = require('axios');
const connection = require('../conf');

const moveIds = [];
for (let i = 0; i < 827; i += 1) {
  moveIds[i] = i + 1;
}

moveIds.map((id) => {
  axios
    .get(`https://pokeapi.co/api/v2/move/${id}`)
    .then(({ data }) => {
      const nameFr = data.names
        .filter((word) => word.language.name === 'fr')
        .map((move) => move.name);

      const nameEn = data.names
        .filter((word) => word.language.name === 'en')
        .map((move) => move.name);

      const nameJp = data.names
        .filter((word) => word.language.name === 'ja-Hrkt')
        .map((move) => move.name);

      const descFr = data.flavor_text_entries
        .filter(
          (word) =>
            word.language.name === 'fr' &&
            word.version_group.name === 'sword-shield'
        )
        .map((move) => move.flavor_text);

      const descEn = data.flavor_text_entries
        .filter(
          (word) =>
            word.language.name === 'en' &&
            word.version_group.name === 'sword-shield'
        )
        .map((move) => move.flavor_text);

      const descJp = data.flavor_text_entries
        .filter(
          (word) =>
            word.language.name === 'ja-Hrkt' &&
            word.version_group.name === 'sword-shield'
        )
        .map((move) => move.flavor_text);

      const acc = data.accuracy ? data.accuracy : 0;

      const pwr = data.power ? data.power : 0;

      const { pp } = data;

      const moveType = data.type.name;

      const dmgClass = data.damage_class.name;

      let gen;
      switch (data.generation.name) {
        case 'generation-iii':
          gen = 3;
          break;
        case 'generation-iv':
          gen = 4;
          break;
        case 'generation-v':
          gen = 5;
          break;
        case 'generation-vi':
          gen = 6;
          break;
        case 'generation-vii':
          gen = 7;
          break;
        case 'generation-viii':
          gen = 8;
          break;
        default:
          gen = 0;
          break;
      }
      connection.query(
        `INSERT INTO moves (nameFr, nameEn, nameJp, descFr, descEn, descJp, accuracy, power, pp, type, generation, damageClass) VALUES ("${nameFr}", "${nameEn}", "${nameJp}", "${descFr}", "${descEn}", "${descJp}", "${acc}", "${pwr}", "${pp}", "${moveType}", "${gen}", "${dmgClass}")`
      );
    })
    .catch((err) => {
      console.log(err);
    });
});
