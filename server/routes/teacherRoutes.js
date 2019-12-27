const express = require('express');
const userCtrl = require('../controllers/teacherController');
const authCtrl = require('../controllers/authController')

const router = express.Router()

router.route('/api/teachers')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('/api/teachers/:teacherId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('teacherId', userCtrl.userByID)

module.exports = router
