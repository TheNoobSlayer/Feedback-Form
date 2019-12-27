const express = require('express');
const userCtrl = require('../controllers/studentController');
const authCtrl = require('../controllers/authController')

const router = express.Router()

router.route('/api/students')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('/api/students/:studentId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('studentId', userCtrl.userByID)

module.exports= router
