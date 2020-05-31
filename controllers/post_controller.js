const Post=require('../models/post');
const Comment=require('../models/comment');
const fs=require('fs');
const path=require('path');

module.exports.create= async function(req,res){
    try{

        let post =await Post.create({
            content:req.body.content,
            user:req.user._id,
            postImage:""
        });
        await Post.uploadedAvatar(req,res,function(err){
                
            if(err){console.log('****multer error:',err); }

            console.log("req---****----",req.file);
            console.log("req---****----",Post.avatarPath);

          
            if(req.file){
                // if(user.avatar){
                //     console.log(user.avatar);
                //     fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                // }
              
                //this is the path of the uploaded file into the avatar filled in the user
                post.postImage= Post.avatarPath + '/' + req.file.filename;
            }
            post.save();
           
        });

        await post.populate({path:'user'}).execPopulate();
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post,
                },
                message:'Post Created'
            })
        }
        req.flash('success','Post Published')
        return res.redirect('back');
    }catch(err){
        req.flash('error',err)
        console.log('error',err);
    }
}
module.exports.destroy=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        if(post.user==req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post deleted"
                })
            }
            req.flash('success','Post and associated Comments Deleted')
            return res.redirect('back');
         }else{
           return res.redirect('back');
         }
    }catch(err){
        req.flash('error','You can not delete this post')
            return res.redirect('back');
    }
}