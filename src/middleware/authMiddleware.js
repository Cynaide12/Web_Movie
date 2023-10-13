const jwt = require('jsonwebtoken')
const {secret} = require('../config/config')
module.exports = function (req, res, next){
    if (req.method == "OPTIONS") {
        next();
      }

try{
    const token = req.headers.authorization.split(' ')[1]
    if(!token){
        return res.status(200).json({message: "Вы не авторизованы"})
    }
    const decodedData = jwt.verify(token, secret)
    req.user = decodedData
    next()
}
catch(e){
    return res.json({message: "Вы не авторизованы"})
}
}