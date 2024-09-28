const {main} = require('../utils/llm');

const categoriesFeedback =  async (req,res) =>{
    var data = req.body.data;
    var prompt = `This is a list which contains the feedback of the teaching of the teachers in the school.
                    i need the response in a way where map the each teedback with the category of that feedback
                    in a json format

                    [
                        {
                            "feedback": "The teaching is good",
                            "category": "Good",
                            "action":"",
                        },
                        {
                            "feedback": "The Teaching is bad",
                            "category": "Bad",
                            "action":""
                        },
                        {
                            "feedback": "Need to improve",
                            "category": "Improvement",
                            "action":""
                        }
                    ]
                    there is no need for explanation not even instructions, just give the response in the json format with key names data
                    recommend the action to be taken for the feedback in the action key
                    don't use \n or any other special character i need that data for data analysis so don't format it for printing in console purpose
                    i said i just need the data in json format don't format it for printing in console purpose`
    try{
        const chatCompletion = await main(data , prompt);
        const cleanedString = chatCompletion.replace(/\n/g, '');
        if(chatCompletion === "") return res.status(400).json({status:"failed", message:"No data found"});
        data = JSON.parse(cleanedString);
        return res.status(200).json({status:"success", data });   
    } catch(err){
        return res.status(500).json({status:"failed", message:err.message});
    }
}


const feedbackQuery = async (req, res) => {
    const data = JSON.stringify(req.body.data);
    console.log(req.body.prompt);

    const prompt = `${req.body.prompt} 
    Based on the given list of feedback data, please provide an accurate and concise answer to the question below in a simple 
    and professional manner.If the answer cannot be determined from the provided data, respond with "Unable to get the answer".Don't
    use any question or 'wh' words in it just give me your analysis and response alone give me well punctuated in a professional and clear manner 
    hence i just understand clearly as if im 10 years old
    Please answer the following question:
    ${req.body.prompt}

    Note: Focus on the feedback, category, and action from each object to provide a precise answer.`;

    try {
        const chatCompletion = await main(data, prompt);
        console.log(chatCompletion);
        const cleanString = (str) => {
            const cleaned = str.replace(/[^\w\s.,]|_/g, "").replace(/\s+/g, " ").trim();            return cleaned;
        };
        const cleanedString = cleanString(chatCompletion);
        try {
            const parsedData = cleanedString;
            if (!parsedData) return res.status(200).json({ error: true, message: err.message });
            return res.status(200).json({ error:false, message: parsedData });
        } catch (parseError) {
            console.error("Parsing error: ", parseError.message);
            return res.status(200).json({ error:true , message:err.message });
        }
    } catch (err) {
        return res.status(200).json({ error:true , message: err.message });
    }
};



module.exports = {categoriesFeedback , feedbackQuery}