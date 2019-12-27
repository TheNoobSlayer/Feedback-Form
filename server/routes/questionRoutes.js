const express = require('express');
const questionCtrl = require('../controllers/questionController');
const authCtrl = require('../controllers/authController');
const subjectCtrl = require('../controllers/subjectController');
const router = express.Router()

router.route('/api/questions/of/:subjectId')
    .post(questionCtrl.create)
    .get(questionCtrl.listBySubject)

router.route('/api/questions')
    .get(questionCtrl.list)

router.route('/api/questions/:questionId')
    .get(questionCtrl.read)

router.route('/api/question/:subjectId/:questionId')
    .put(questionCtrl.update)
    .delete(questionCtrl.remove)

//router.param('questionId', questionCtrl.questionByID)
router.param('subjectId', subjectCtrl.subjectByID)
router.param('questionId', questionCtrl.questionByID)

module.exports= router
