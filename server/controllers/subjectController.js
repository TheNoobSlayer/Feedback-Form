const Subject = require('../models/subjectModel');
const _ = require('lodash');
const errorHandler = require('./../helpers/dbErrorHandler');

const create = (req, res, next) => {
    console.log("I am inside create subject");
 
    const subject = new Subject(req.body)
    subject.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                })
            }
            res.status(200).json({
                message: "Successfully created a subject!"
            })
        })
       // let subject = new Subject(fields)
        //subject.teacher = req.profile
    /*
        subject.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                })
            }
            res.status(200).json(result)
        })*/
    
}

const subjectByID = (req, res, next, id) => {
    //console.log(req.body.feedback);
    Subject.findById(id).populate('teacher', '_id name').exec((err, subject) => {
        if (err || !subject)
            return res.status('400').json({
                error: "Subject not found"
            })
        req.subject = subject
        next()
    })
}

const list = (req, res) => {
    Subject.find((err, subjects) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(subjects)
    })
}

const listByTeacher = (req, res) => {
    Subject.find({ teacher: req.profile._id }, (err, subjects) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(subjects)
    }).populate('teacher', '_id name')
}

const read = (req, res) => {
    return res.json(req.subject)
}

const update = (req, res, next) => {
    console.log("Bochya inside update subject");

 
    let subject = req.subject
    console.log(subject);
    subject = _.extend(subject, req.body)
        subject.updated = Date.now()
     
        subject.save((err) => {
            if (err) {
                return res.status(400).send({
                    error: errorHandler.getErrorMessage(err)
                })
            }
            res.json(subject)
        })
    
}
const storeFeedback = (req, res, next) => {
    console.log("Bo inside store feedback");
    let subject = req.subject
    // console.log(subject);
   // subject = _.extend(subject, req.body)
    console.log(subject);
    let feedback = req.body.feedback;
    console.log(feedback);
    
    var i=0;
   /* var subjectFeedback = {
        feedback:[1,3,2,0,3,2]
    }*/
    for (i = 0; i < 6; i++) {
        if (feedback[i] == 0) {
            req.subject.optionA[i]++;
        }
        else if (feedback[i] == 1) {
            req.subject.optionB[i]++;
        }
        else if (feedback[i] == 2) {
            req.subject.optionC[i]++;
        }
        else {
            req.subject.optionD[i]++;
        }
    }
    console.log(req);
    subject = _.extend(subject, req.body)

    subject.updated = Date.now()
    console.log(subject);

    subject.save((err) => {
        if (err) {
            return res.status(400).send({
                error: errorHandler.getErrorMessage(err)
            })
        }
        console.log(subject);
        res.json(subject)
    })

}
const isTeacher = (req, res, next) => {
    const isTeacher = req.subject && req.auth && req.subject.teacher._id == req.auth._id
    if (!isTeacher) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next()
}

const remove = (req, res, next) => {
    let subject = req.subject
    subject.remove((err, deletedSubject) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(deletedSubject)
    })
}

module.exports= {
    create,
    subjectByID,
    list,
    listByTeacher,
    read,
    update,
    storeFeedback,
   // isTeacher,
    remove
}
