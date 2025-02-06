const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECURE = process.env.ADMIN_SECRET_KEY;
function adminMiddleware(req,res,next){
    const token =req.headers.token;
    const decoded=jwt.verify(token,JWT_SECURE);
    if(decoded){
        req.adminId=decoded.adminId;
        next();
    }
    else{
        res.status(403).json({
            msg:"Forbidden"
        })
    }
}
module.exports={
    adminMiddleware:adminMiddleware

}