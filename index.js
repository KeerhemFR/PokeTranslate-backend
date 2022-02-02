const express = require('express');
const cors = require('cors');
const connection = require('./conf');

const app = express();
const backPort = process.env.PORT;

connection.connect((err) => {
  if (err) {
    console.error(`error connection: ${err.stack}`);
  } else {
    console.log(`connected to database with threadId: ${connection.threadId}`);
  }
});

app.use(express.json);
app.use(cors());

app.listen(connection.backPort, () => {
  console.log(`You are now connected on port ${backPort}`);
});
