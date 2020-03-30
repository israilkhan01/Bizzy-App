const express =require("express");
const app=express();
const port= 8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose')
var cookieParser = require('cookie-parser');
app.use(express.urlencoded());
app.use(cookieParser());
//use express router
app.use(express.static('./assets'))
app.use(expressLayouts);
//extracts layouts and scripts from subpages into the layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

app.use('/',require('./routes'));
//setting up view Engine
app.set('view engine','ejs');
app.set('views','./views');
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on Port : ${port}`)
});
