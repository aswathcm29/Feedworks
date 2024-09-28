const Router = require('express').Router()
const {signup,login, getuser} = require('../controllers/usercontroller')
const {checkUser} = require('../middlewares/auth')


Router.post('/signup',signup);
Router.post('/login',login);
Router.get('/getUser',checkUser,getuser)

module.exports = Router;
