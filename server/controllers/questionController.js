const Question = require('../models/questionModel');
const _ = require('lodash');
const errorHandler = require('./../helpers/dbErrorHandler');

const create = (req, res, next) => {

    const question = new Question(req.body);

    question.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(result)
    })
}

const questionByID = (req, res, next, id) => {
    Question.findById(id).populate('subject', '_id name').exec((err, question) => {
        if (err || !question)
            return res.status('400').json({
                error: "Question not found"
            })
        req.question = question;
        next()
    })
}


const read = (req, res) => {
    return res.json(req.question)
}

const update = (req, res, next) => {
    console.log("Bochya inside update question")
    let question = req.question
    question = _.extend(question, req.body)
    question.updated = Date.now()

    question.save((err, result) => {
            if (err) {
                return res.status(400).send({
                    error: errorHandler.getErrorMessage(err)
                })
            }
            res.json(result)
        })
  
}

const remove = (req, res, next) => {
    let question = req.question
    question.remove((err, deletedQuestion) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(deletedQuestion)
    })
}

const listBySubject = (req, res) => {
    Question.find({ subject: req.subject._id }, (err, question) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(question)
    }).populate('subject', '_id name')
}



const list = (req, res) => {
    /*const query = {}
    if (req.query.search)
        query.name = { '$regex': req.query.search, '$options': "i" }
    if (req.query.category && req.query.category != 'All')
        query.category = req.query.category*/
    Question.find((err, questions) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(questions)
    }).populate('subject', '_id name')
}

module.exports= {
    create,
    questionByID,
    read,
    update,
    remove,
    listBySubject,
   
    list
   
}
