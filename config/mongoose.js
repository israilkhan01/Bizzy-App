const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/Bizzy_development');

const db=mongoose.connection;
db.on('error',console.error.bind(console,'Error connnecting to the mongoDb'));


db.once('open',function(){
    console.log("Connecting to Database::MongoDB");
});


// To make this file usable we need to export this
module.exports=db;