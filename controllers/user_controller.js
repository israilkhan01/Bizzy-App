const User=require('../models/user')

module.exports.profile=function(req,res){

    return res.render('user_profile',{
        title:"Profile"
    });
}
//these are actions
module.exports.signIn=function(req,res){

    return res.render('user_signin',{
        title:"Bizzy | SignIn"
    })
}
module.exports.signUp=function(req,res){

    return res.render('user_signup',{
        title:"Bizzy | SignUp"
    })
}

//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

   User.findOne({email:req.body.email},function(err,user){
       if(err){
           console.log('error in finding user in signing up'); return;} 
        if(!user){
                 User.create(req.body,function(err,user){
                     if(err){console.log('error in creating user while signing Up');return;}
                     return res.redirect('/users/signin');
                 })
        }else{ return res.redirect('back');}
        })
}

//sign in nad create the session for the user

module.exports.createsession=function(req,res){
    //later on
}