//validating user data while registration


exports.userDataValidation=(req,res,next)=>{
    
    req.check('name','Name Field Is Required').notEmpty()
    req.check("email","email is not valid")
    .matches(/.+\@.+\..+/).withMessage('Please Enter A Valid Email')
    req.check(
        "password",
        "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. ",
      )
  .isLength({ min: 8 })
  .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
          )
    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map(error=>error.msg)[0]
        return res.status(400).json({error:firstError})
    }
    next()
}

