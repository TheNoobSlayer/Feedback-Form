const express = require('express');
const authCtrl = require('../controllers/authController');
const cors = require('cors');


const router = express.Router()

router.route('/auth/signin')
    .post(cors(),authCtrl.signin)
router.route('/auth/signout')
    .get(authCtrl.signout)

module.exports = router;
