const jwt = require('jsonwebtoken');
const secretKey = 'somesupersecretkey';

module.exports = async (req, res, next) => {
  const token = req.get('Authorization');
  jwt.verify(`${token}`, secretKey, (error) => {
    if (error){
      return res.json({message: 'Acceso Denegado!'});
    }
    req.token = token;
    next();
  });
};
