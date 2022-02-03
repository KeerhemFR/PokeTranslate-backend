const express = require('express');
const cors = require('cors');
const pokemonsRoutes = require('./routes/pokemons');
const movesRoutes = require('./routes/moves');
const abilitiesRoutes = require('./routes/abilities');
const itemsRoutes = require('./routes/items');
const typesRoutes = require('./routes/types');
const naturesRoutes = require('./routes/natures');

const app = express();
const backPort = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/pokemons', pokemonsRoutes);
app.use('/moves', movesRoutes);
app.use('/abilities', abilitiesRoutes);
app.use('/items', itemsRoutes);
app.use('/types', typesRoutes);
app.use('/natures', naturesRoutes);

app.use('/', (req, res) => {
  res.status(404).send(`Route not found: ${req.method} ${req.url}`);
});

app.listen(backPort, () => {
  console.log(`You are now connected on port ${backPort}`);
});
