//this file contains the environments for production and development purposes

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

}
const production={
    name:"production"
}
module.exports=development;