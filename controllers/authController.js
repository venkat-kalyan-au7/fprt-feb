import User from "../models/userModel"
import errors from "../errors/dataBaseErrors"
import jwt from "jsonwebtoken"


//user registration
exports.register = (req, res) => {
    console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error:errors.dataBaseErrors(err)
            });
        }
        res.json({
            user
        });
    });
};

//user login
exports.login =(req,res)=>{
    const {email,password}=(req.body)
    User.findOne({email},(err,user)=>{
        if(err|| !user){
            return res.status(400).json({
                error:"User Deosn't Exists,Please Register"
            })
        }
        //checking the password
        if(!user.auth(password)){
            return res.status(401).json({
                error:"Bad Credentials"
            })
        }
        else{
            const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
            //setting the user cookie with token and expiry time
            res.cookie("user",token,{expire:new Date()+11111});
            const {_id,name,email,role}=user; 
            //sending token and required data after succesful login only      
            return res.json({
                token,user:{
                    _id,
                    name,
                    email,
                    role
                }
            })
        }

    })
}

//user logout

exports.logout =(req,res)=>{
    res.clearCookie("user")
    res.json({
        message:"You're Logged Out"
    })
}