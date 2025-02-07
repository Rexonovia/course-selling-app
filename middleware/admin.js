const jwt = require('jsonwebtoken');
const { JWT_ADMIN_SECURE } = require('../config');
const JWT_SECURE = JWT_ADMIN_SECURE
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