const express=require('express');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const {userRouter}=require('./routes/user')
const {courseRouter}=require('./routes/course')
const {adminRouter}=require('./routes/admin');
const { DATABASE_URL } = require('./config');
const app=express();
app.use(express.json());
app.use('/api/v1/user',userRouter)
app.use('/api/v1/admin',adminRouter)
app.use('/api/v1/course',courseRouter)
 async function main(){
    await mongoose.connect(DATABASE_URL);
    app.listen(3000);
}
main();
