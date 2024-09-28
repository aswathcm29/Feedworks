const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
   feedback:{
         type:String,
         required:true
    },
    category:{
        type:String,
        required:true
    },
    action:{
        type:String,
    }
})

const analysedfeedSchema = new mongoose.Schema({
    user:{
        type:String,
    },
    feedback_name : {
        type:String,
    },
    feedbacks : [feedbackSchema]
}) 

const Feeds = mongoose.model('Feedback',analysedfeedSchema)

module.exports = Feeds;