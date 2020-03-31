const User=require('../models/user');

module.exports.profile=function(req,res){
     if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title:'User profile',
                    user:user
                })
            }
        })
     }else{
         return res.redirect('/users/signin')
     }
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
                     return res.redirect('/users/signIn');
                 })
        }else{ return res.redirect('back');}
        });
}

//sign in nad create the session for the user

module.exports.createSession=function(req,res){
    //steps to authenticate
    //find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){ console.log("error in Findinig the user in signin"); 
        return;
     }
        //handle user found
        if(user){ 

            console.log(user);
            if(user.password!=req.body.password){
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id',user.id);
            // return res.redirect('/users/profile')
            return res.redirect('/users/profile');
        }
        else{
        //handle user not found
        return res.redirect('back');
        }
    //handle passwords which don't match
    });

}