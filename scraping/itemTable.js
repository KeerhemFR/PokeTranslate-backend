const axios = require('axios');
const connection = require('../conf');

const itemIds = [];
for (let i = 1600; i < 1660; i += 1) {
  itemIds[i] = i + 1;
}
itemIds.map((id) => {
  axios
    .get(`https://pokeapi.co/api/v2/item/${id}`)
    .then(({ data }) => {
      const nameFr = data.names
        .filter((word) => word.language.name === 'fr')
        .map((item) => item.name);

      const nameEn = data.names
        .filter((word) => word.language.name === 'en')
        .map((item) => item.name);

      const nameJp = data.names
        .filter((word) => word.language.name === 'ja-Hrkt')
        .map((item) => item.name);

      const descFr = data.flavor_text_entries
        .filter(
          (word) =>
            word.language.name === 'fr' &&
            word.version_group.name === 'sword-shield'
        )
        .map((item) => item.text);

      const descEn = data.flavor_text_entries
        .filter(
          (word) =>
            word.language.name === 'en' &&
            word.version_group.name === 'sword-shield'
        )
        .map((item) => item.text);

      const descJp = data.flavor_text_entries
        .filter(
          (word) =>
            word.language.name === 'ja-Hrkt' &&
            word.version_group.name === 'sword-shield'
        )
        .map((item) => item.text);

      const sprite = data.sprites.default;

      connection.query(
        `INSERT INTO items (nameFr, nameEn, nameJp, descFr, descEn, descJp, visual) VALUES ("${nameFr}", "${nameEn}", "${nameJp}", "${descFr}", "${descEn}", "${descJp}", "${sprite}")`
      );
    })
    .catch((err) => {
      console.log(err);
    });
});
