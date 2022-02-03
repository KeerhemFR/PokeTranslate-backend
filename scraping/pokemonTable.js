const axios = require('axios');
// const connection = require('../conf');

const pokemonIds = [];
for (let i = 0; i < 200; i += 1) {
  pokemonIds[i] = i + 1;
}

pokemonIds.map((id) => {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then(({ data }) => {
      const nameFr = data.names
        .filter((word) => word.language.name === 'fr')
        .map((pokemon) => pokemon.name);

      const nameEn = data.names
        .filter((word) => word.language.name === 'en')
        .map((pokemon) => pokemon.name);

      const nameJp = data.names
        .filter((word) => word.language.name === 'ja-Hrkt')
        .map((pokemon) => pokemon.name);

      const evolveFrom =
        data.evolves_from_species !== null
          ? data.evolves_from_species.name
          : '-';

      const descFr = data.flavor_text_entries
        .filter(
          (word) =>
            word.language.name === 'fr' &&
            (word.version.name === 'sword' ||
              word.version.name === 'alpha-sapphire' ||
              word.version.name === 'x')
        )
        .map((move) => move.flavor_text);

      const descEn = data.flavor_text_entries
        .filter(
          (word) =>
            word.language.name === 'en' &&
            (word.version.name === 'sword' ||
              word.version.name === 'alpha-sapphire' ||
              word.version.name === 'x')
        )
        .map((pokemon) => pokemon.flavor_text);

      const descJp = data.flavor_text_entries
        .filter(
          (word) =>
            word.language.name === 'ja-Hrkt' &&
            (word.version.name === 'sword' ||
              word.version.name === 'alpha-sapphire' ||
              word.version.name === 'x')
        )
        .map((pokemon) => pokemon.flavor_text);

      const natDexId = data.id;

      let gen;
      switch (data.generation.name) {
        case 'generation-i':
          gen = 1;
          break;
        case 'generation-ii':
          gen = 2;
          break;
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
      // connection.query(
      //   `INSERT INTO pokemons (nameFr, nameEn, nameJp) VALUES ("${nameFr}", "${nameEn}", "${nameJp}")`
      // );
      console.log(
        nameFr,
        nameEn,
        nameJp,
        evolveFrom,
        descFr,
        descEn,
        descJp,
        natDexId,
        gen
      );
    })
    .catch((err) => {
      console.log(err);
    });
});
