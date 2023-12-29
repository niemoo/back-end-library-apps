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
  checkDataUsersByUsername: (req, res) => {
    const { username, password } = req.body;

    const sql = 'select * from users where username = ? and password = ?';

    db.query(sql, [username, password], (err, result) => {
      if (err) {
        response(500, err, err.message, res);
        return;
      }

      if (result.length > 0) {
        response(200, result, `Login Sukses!`, res);
      } else {
        response(404, null, `Username atau password salah.`, res);
      }
    });
  },

  // REGISTER IN SIGN UP
  addDataUsers: (req, res) => {
    const { email, username, name, password } = req.body;

    // QUERY TO CHECK the existence of email and username
    const checkEmailQuery = 'select count(*) as emailCount from users where email = ?';
    const checkUsernameQuery = 'select count(*) as usernameCount from users where username = ?';

    db.query(checkEmailQuery, [email], (emailErr, emailResult) => {
      if (emailErr) {
        response(500, emailErr, emailErr.message, res);
        return;
      }

      db.query(checkUsernameQuery, [username], (usernameErr, usernameResult) => {
        if (usernameErr) {
          response(500, usernameErr, usernameErr.message, res);
          return;
        }

        const emailCount = emailResult[0].emailCount;
        const usernameCount = usernameResult[0].usernameCount;

        // Check if email or username already exists
        if (emailCount > 0) {
          response(404, null, 'Email already exists', res);
        } else if (usernameCount > 0) {
          response(404, null, 'Username already exists', res);
        } else {
          const sql = 'insert into users (email, username, name, password) values (?, ?, ?, ?)';
          db.query(sql, [email, username, name, password], (postErr, postResult) => {
            if (postErr) {
              response(500, postErr, postErr.message, res);
              return;
            }

            response(200, postResult, 'Successfully added new users', res);
          });
        }
      });
    });
  },

  // UPDATE USERS
  updateDataUsers: (req, res) => {
    const { users_id, email, username, name, password } = req.body;

    const sql = 'update users set email = ?, username = ?, name = ?, password = ? where users_id = ?';

    db.query(sql, [email, username, name, password, users_id], (err, result) => {
      if (err) {
        response(500, err, err.message, res);
        return;
      }

      response(200, result, 'Successfully updated users', res);
    });
  },
};
