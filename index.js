const express =require("express");
const app=express();
const port= 8000;
const env=require('./config/environment');
const expressLayouts=require('express-ejs-layouts');
var cookieParser = require('cookie-parser');
const db=require('./config/mongoose');
//used for session cokiee
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJwt=require('./config/passpost-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const MongoStore=require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');
//setup a chat server used with socket.io
const chatserver=require('http').Server(app);
const chatsockets=require('./config/chat_sockets').chatsockets(chatserver);
const path=require('path');
require('dotenv').config();
chatserver.listen(5000);
console.log("chat server is listening on port:5000")
app.use(sassMiddleware({
  src:path.join(__dirname,env.static_path,'/scss'),
  dest:path.join(__dirname,env.static_path,'/css'),
  debug:true,
  outputStyle:'extended',
  prefix:'/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());
//use express router
app.use(express.static(env.static_path));
//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(expressLayouts);
//extracts layouts and scripts from subpages into the layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)


//setting up view Engine
app.set('view engine','ejs');
app.set('views','./views');
console.log("*************",process.env.Bizzy_DB);
//mongo store is used to store the session cookie in the db bcz unlike it will expire when server rst.
app.use(session({
    name:'Bizzy',
    //TODO change the secret before the deployment in production mode
    secret:env.session_cokkie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err){
       console.log(err||'connect mongo db setup ok!')
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)
app.use(flash());
app.use(customMware.setFlash);
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on Port : ${port}`)
});
