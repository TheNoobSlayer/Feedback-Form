const express = require('express');
const userCtrl = require('../controllers/teacherController');
const authCtrl = require('../controllers/authController');
const subjectCtrl = require('../controllers/subjectController');

const router = express.Router()

router.route('/api/subjects')
    .get(subjectCtrl.list)

router.route('/api/subject/:subjectId')
    .get(subjectCtrl.read)

router.route('/api/subjects/by/:userId')
    .post(subjectCtrl.create)
    .get(subjectCtrl.listByTeacher)

router.route('/api/subject/:subjectId')
    .put(subjectCtrl.update)
    .delete(subjectCtrl.remove)

router.route('/api/subjects/feedback/:subjectId')
    .put(subjectCtrl.storeFeedback)

router.param('subjectId', subjectCtrl.subjectByID)
router.param('userId', userCtrl.userByID)

module.exports= router
