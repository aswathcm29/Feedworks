const express = require('express');
const Router = express.Router();
const {categoriesFeedback,feedbackQuery} = require('../controllers/llmController')
const {checkUser} = require('../middlewares/auth');

Router.route('/categories').post(categoriesFeedback)
Router.route('/feedchat').post(checkUser,feedbackQuery)

module.exports=Router