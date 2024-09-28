const jwt = require('jsonwebtoken')


const generateToken = (username,email) => {
   console.log(username,email,'ingen')
   return jwt.sign({username,email},process.env.JWT_SECRET,{expiresIn:'7d'});
}

module.exports = {generateToken};