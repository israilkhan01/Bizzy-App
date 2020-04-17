const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');
const userSchema=new mongoose.Schema({
         email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
      
    }

},{
    timestamps:true
});
//defined the storage where file get stored while a user uploads
//database only  stored the path of files using a key avatar not a whole file
//file will be stored in a bucket(cloud like AWS) or a local storage  (like your mac where server is-
// running
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join( __dirname,'..',AVATAR_PATH))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

userSchema.statics.uploadedAvatar = multer({storage: storage }).single('avatar'); //avatar is fieldname here
userSchema.statics.avatarPath=AVATAR_PATH;
  
const User=mongoose.model('User',userSchema);

module.exports=User;