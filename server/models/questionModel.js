const mongoose = require('mongoose');
//import crypto from 'crypto'
const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        trim: true,
        required: 'Question is required',
        unique: 'Question already exists'
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    },
    option: {
        type: Array,
        default:["Very Good", "Good", "Bad", "Very Bad"]
    },
    subject: { type: mongoose.Schema.ObjectId, ref: 'Subject' }
})

module.exports = mongoose.model('Question', QuestionSchema)
