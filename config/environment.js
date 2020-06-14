//this file contains the environments for production and development purposes
const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');
const dotenv=require('dotenv');
const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream=rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});
console.log(path.join(__dirname,'../'))
const result=dotenv.config({path:__dirname+'/../.env'});
if (result.error) {
    throw result.error
  }
   
  console.log(result.parsed)
const development={
     name:'devlopment',
     static_path:'./assets',
     session_cokkie_key:'somethingYouNeverKnow',
     db:'Bizzy_development',
     smtp:{
        service:'gmail',
        host:'smtp@gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'israilkhan.a111@gmail.com',
            pass:'My name@1998'
        }
    },
    Google_clientID:'122581324455-1mrb67rp0blhoqhgv5hei6lkasfnijmg.apps.googleusercontent.com',
    Google_clientSecret:'-GgJH7vojfWE-CFjd8EBAsF2',
    Google_callbackURL:'http://localhost:8000/users/auth/google/callback',
    jwt_Secret:'bizzy',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }

}

//kaoschats
const production={
    name:'production',
    static_path:process.env.Bizzy_asset_path,
    session_cokkie_key:process.env.Bizzy_session_cokkie_key,
     db:process.env.Bizzy_DB,
     smtp:{
        service:'gmail',
        host:'smtp@gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.Bizzy_Gmail_username,
            pass:process.env.Bizzy_Email_password,
        }
    },
    Google_clientID:process.env.Bizzy_Google_clientID,
    Google_clientSecret:process.env.Bizzy_Google_clientSecret,
    Google_callbackURL:process.env.Bizzy_Google_callbackURL,
    jwt_Secret:process.env.Bizzy_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}

console.log("!!!!!_____----",process.env.NODE_ENV,"------");
if(eval(process.env.NODE_ENV)==production){
    module.exports=production;
}else{
    module.exports=development;
}

