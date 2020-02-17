const mongoose = require('mongoose');
//import crypto from 'crypto'
const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    description: {
        type: String,
        trim: true
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    },
   
    question: [{ type: mongoose.Schema.ObjectId, ref: 'Question' }],
    teacher: { type: mongoose.Schema.ObjectId, ref: 'Teacher' },
    optionA: {
        type: Array,
        default:[0, 0, 0, 0, 0, 0]
    },
    optionB: {
        type: Array,
        default: [0, 0, 0, 0, 0, 0]
    },
    optionC: {
        type: Array,
        default: [0, 0, 0, 0, 0, 0]
    },
    optionD: {
        type: Array,
        default: [0, 0, 0, 0, 0, 0]
    },
})

module.exports= mongoose.model('Subject', SubjectSchema)
