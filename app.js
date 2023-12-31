const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./src/configs/database');
const response = require('./src/configs/response');
const port = 3300;

app.use(bodyParser.json());
app.use(cors());

const appRoute = require('./src/routes/route-library');
app.use('/', appRoute);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
