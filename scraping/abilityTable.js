const axios = require('axios');
const connection = require('../conf');

const abilityIds = [];
for (let i = 0; i < 267; i += 1) {
  abilityIds[i] = i + 1;
}

abilityIds.map((id) => {
  axios.get(`https://pokeapi.co/api/v2/ability/${id}`).then(({ data }) => {
    const nameFr = data.names
      .filter((word) => word.language.name === 'fr')
      .map((ability) => ability.name);

    const nameEn = data.names
      .filter((word) => word.language.name === 'en')
      .map((ability) => ability.name);

    const nameJp = data.names
      .filter((word) => word.language.name === 'ja-Hrkt')
      .map((ability) => ability.name);

    const descFr = data.flavor_text_entries
      .filter(
        (word) =>
          word.language.name === 'fr' &&
          word.version_group.name === 'sword-shield'
      )
      .map((ability) => ability.flavor_text);

    const descEn = data.flavor_text_entries
      .filter(
        (word) =>
          word.language.name === 'en' &&
          word.version_group.name === 'sword-shield'
      )
      .map((ability) => ability.flavor_text);

    const descJp = data.flavor_text_entries
      .filter(
        (word) =>
          word.language.name === 'ja-Hrkt' &&
          word.version_group.name === 'sword-shield'
      )
      .map((ability) => ability.flavor_text);

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
      `INSERT INTO abilities (nameFr, nameEn, nameJp, descFr, descEn, descJp, generation) VALUES ("${nameFr}", "${nameEn}", "${nameJp}", "${descFr}", "${descEn}", "${descJp}", ${gen})`
    );
  });
});
