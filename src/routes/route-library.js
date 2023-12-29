const router = require('express').Router();
const db = require('../configs/database');
const response = require('../configs/response');
const { users } = require('../controllers/index');

// GET ALL DATA FROM DATABASE
router.get('/', users.getAllDataUsers);

// CHECK IF USERNAME EXISTS OR NOT
router.post('/login', users.checkDataUsersByUsername);

// REGISTER IN SIGN UP
router.post('/register', users.addDataUsers);

// UPDATA DATA USERS
router.put('/users/update', users.updateDataUsers);

// DELETE DATA USERS
router.delete('/users/delete/:users_id', users.deleteDataUsers);

module.exports = router;
