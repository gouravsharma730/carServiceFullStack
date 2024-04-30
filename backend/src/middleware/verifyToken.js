const jwt = require('jsonwebtoken');
const verifyToken = async(req,res,next)=>{
    let token = req.header('Authorization');
    if(!token) return res.status(401).json({error:"No token provided"});
    token = token.replace('Bearer ', '');
    try {
        const decoded = await jwt.verify(token, 'your_secret_key');
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({message: error.message})
    }
}
module.exports = verifyToken;