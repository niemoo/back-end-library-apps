const router = require('express').Router();
const db = require('../configs/database');
const response = require('../configs/response');
const { users } = require('../controllers/index');

// GET ALL DATA FROM DATABASE
router.get('/', users.getAllDataUsers);

// CHECK IF USERNAME EXISTS OR NOT
router.get('/users/:username', users.getDataUsersByID);

// REGISTER IN SIGN UP
router.post('/register', users.addDataUsers);

module.exports = router;
