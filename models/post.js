const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/PostAvatar');
const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    postImage:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //include the array of ids of all comments in  the post schema itself
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    likes:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
      }
    ],
 },
{
    timestamps:true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join( __dirname,'..',AVATAR_PATH))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

postSchema.statics.uploadedAvatar = multer({storage: storage }).single('postImage'); //avatar is fieldname here
postSchema.statics.avatarPath=AVATAR_PATH;
const Post=mongoose.model('Post',postSchema);
module.exports=Post;