const db = require('../configs/database');
const response = require('../configs/response');

module.exports = {
  // GET ALL DATA FROM DATABASE
  getAllDataUsers: (req, res) => {
    const sql = 'select * from users';

    db.query(sql, (err, result) => {
      if (err) {
        response(500, err, err.message, res);
        return;
      }
      response(200, result, 'success get all data from users', res);
    });
  },

  // CHECK IF USERNAME EXISTS OR NOT
  getDataUsersByID: (req, res) => {
    const username = req.params.username;

    const sql = 'select * from users where username = ?';

    db.query(sql, [username], (err, result) => {
      if (err) {
        response(500, err, err.message, res);
        return;
      }

      if (result.length > 0) {
        response(200, result, `Username ${username} exists in the database.`, res);
      } else {
        response(200, result, `Username ${username} does not exist in the database.`, res);
      }
    });
  },

  // REGISTER IN SIGN UP
  addDataUsers: (req, res) => {
    const { email, username, name, password } = req.body;

    const sql = 'insert into users (email, username, name, password) values (?, ?, ?, ?)';

    db.query(sql, [email, username, name, password], (err, result) => {
      if (err) {
        response(500, err, err.message, res);
        return;
      }

      response(200, result, 'success add new user', res);
    });
  },
};
