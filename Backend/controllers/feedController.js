const Feeds = require('../models/feedModel');

const addFeedbacks = async (req, res) => {
    try {
        const { feedback_name, feedbacks } = req.body;
        console.log(feedback_name)
        // Ensure feedbacks is an array
        if (!Array.isArray(feedbacks)) {
            return res.status(400).json({ error: true, message: "Feedbacks should be an array of objects" });
        }

        // Construct an array of feedback objects
        const feedbackObjects = feedbacks.map(({ feedback, category, action }) => ({ feedback, category, action }));

        // Create a new feed document
        const newFeed = new Feeds({user:req.user.email,feedback_name:feedback_name, feedbacks: feedbackObjects });
        await newFeed.save();

        res.status(201).json({ error: false, message: "Feedbacks added successfully", feedbacks: newFeed.feedbacks });
    } catch (err) {
        console.error("Error saving feedbacks:", err);
        res.status(500).json({ error: true, message: err.message});
    }
};


const getUserFeedbacks = async (req, res) => {
    try {
        const analysied_feedbacks = await Feeds.find({user:req.user.email});

        if(!analysied_feedbacks){
            return res.status(404).json({ error: true, message: "No feedbacks found" });
        }

        res.status(201).json({ error: false, message: "Feedbacks added successfully", analysied_feedbacks });
    } catch (err) {
        console.error("Error saving feedbacks:", err);
        res.status(500).json({ error: true, message: err.message });
    }
};

const getAfeedback = async (req,res) =>{
    const {feed_id} = req.query;
    try {
        const result = await Feeds.findOne({_id:feed_id});
        return res.status(200).json({error:false, feed_data: result})
    } catch (err) {
        return res.status(500).json({error: true, message: err.message})  
    }   
}


const deleteFeedback = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await Feeds.deleteOne({ _id: id });
        console.log(id)
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: true, message: "Feedback not found" });
        }
        return res.status(200).json({ error: false, message: "Feedback deleted successfully" });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: true, message: err.message });
    }
}

module.exports = { addFeedbacks, getUserFeedbacks , getAfeedback,deleteFeedback };
