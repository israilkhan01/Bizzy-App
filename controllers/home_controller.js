const Post=require('../models/post');
module.exports.home=function(req,res){

    // return res.end('<h1>Expresss is up for Bizzy App!</h1>');
    console.log(req.cookies);
    // Post.find({},function(err,post){
   
    //     return res.render('home',{
    //         title:"Bizzy | Home",
    //         posts:post
    //     });
    // });
    Post.find({}).populate('user').exec(function(err,post){
        return res.render('home',{
            title:"Bizzy | Home",
            posts:post
        });
    })
}