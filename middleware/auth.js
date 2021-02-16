import expressJwt from "express-jwt"

exports.loggedIn=expressJwt({
    secret:"SECRETUIUUB",
    algorithms: ["HS256"], 
    userProperty: "auth",
})

exports.currentUser=(req,res,next)=>{
    let user = req.profile && req.auth && req.profile._id==req.auth._id
    if(!user){
        res.status(403).json({
            error:'Unauthorized Request'
        })
    }
    next()
}

exports.Admin=(req,res,next)=>{
    if(req.profile.role===0){
        res.status(403).json({
            error:'Access Only for Admin'
        })
    }
    next()
}

