module.exports.home=function(req,res){

    // return res.end('<h1>Expresss is up for Bizzy App!</h1>');
    console.log(req.cookies);
    return res.render('home',{
        title:"Home"
    })
}