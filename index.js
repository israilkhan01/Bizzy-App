const express =require("express");
const app=express();
const port= 8000;
const expressLayouts=require('express-ejs-layouts');
var cookieParser = require('cookie-parser');
const db=require('./config/mongoose');
//used for session cokiee
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
app.use(express.urlencoded());
app.use(cookieParser());
//use express router
app.use(express.static('./assets'))
app.use(expressLayouts);
//extracts layouts and scripts from subpages into the layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)


//setting up view Engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'Bizzy',
    //TODO change the secret before the deployment in production mode
    secret:'Aliyreal',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on Port : ${port}`)
});
