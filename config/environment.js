//this file contains the environments for production and development purposes
require('dotenv').config();

const development={
     name:'devlopment',
     static_path:'./assets',
     session_cokkie_key:'somethingYouNeverKnow',
     db:process.env.Bizzy_DB,
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
}
// module.exports=development;
module.exports=eval(process.env.Bizzy_Environment) == undefined ? development : eval(process.env.Bizzy_Environment);

// Bizzy_Email_password='My name@1998',
// Bizzy_Gmail_username='israilkhan.a111@gmail.com',
// Bizzy_Google_callbackURL= 'http://kaoschats.com/users/auth/google/callback',
// Bizzy_Google_clientID= '122581324455-1mrb67rp0blhoqhgv5hei6lkasfnijmg.apps.googleusercontent.com',
// Bizzy_Google_clientSecret= '-GgJH7vojfWE-CFjd8EBAsF2',
// Bizzy_JWT_SECRET='975R1VmtCqVsdXtUVWf4CV958RNPgjx9',
// Bizzy_session_cokkie_key='IN9kss8Pj9XRq8KLdnCmOJGHHteBqXsJ',