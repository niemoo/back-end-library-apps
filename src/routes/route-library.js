const router = require('express').Router();
const db = require('../configs/database');
const response = require('../configs/response');

app.get('/', (req, res) => {
  const sql = 'select * from users';

  db.query(sql, (err, result) => {
    if (err) {
      response(500, err, err.message, res);
      return;
    }
    response(200, result, 'success get all data from users', res);
  });
});
