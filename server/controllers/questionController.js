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


/*
const listRelated = (req, res) => {
    Question.find({ "_id": { "$ne": req.question }, "category": req.question.category }).limit(5).populate('subject', '_id name').exec((err, questions) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(questions)
    })
}

const listCategories = (req, res) => {
    Question.distinct('category', {}, (err, questions) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(questions)
    })
}
*/
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
/*
const decreaseQuantity = (req, res, next) => {
    let bulkOps = req.body.order.products.map((item) => {
        return {
            "updateOne": {
                "filter": { "_id": item.product._id },
                "update": { "$inc": { "quantity": -item.quantity } }
            }
        }
    })
    Product.bulkWrite(bulkOps, {}, (err, products) => {
        if (err) {
            return res.status(400).json({
                error: "Could not update product"
            })
        }
        next()
    })
}

const increaseQuantity = (req, res, next) => {
    Product.findByIdAndUpdate(req.product._id, { $inc: { "quantity": req.body.quantity } }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                })
            }
            next()
        })
}
*/
module.exports= {
    create,
    questionByID,
    read,
    update,
    remove,
    listBySubject,
   // listLatest,
   // listRelated,
    //listCategories,
    list,
   // decreaseQuantity,
    //increaseQuantity
}
