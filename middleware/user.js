const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECURE = process.env.USER_SECRET_KEY;
function userMiddleware(req,res,next){
    const token =req.headers.token;
    const decoded=jwt.verify(token,JWT_SECURE);
    if(decoded){
        req.userId=decoded.userId;
        next();
    }
    else{
        res.status(403).json({
            msg:"Forbidden"
        })
    }

}
module.exports={
    userMiddleware:userMiddleware   
}