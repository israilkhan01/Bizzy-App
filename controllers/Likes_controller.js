const Like=require('../models/like');
const Comment=require('../models/comment');
const Post=require('../models/post');
module.exports.toggleLike=async function(req,res){
      try{
            //likes/toggle/?id=abszinw92dn&type=Post
            let Likeable;
            let deleted=false;
            if(req.query.type='Post'){
                 Likeable=await Post.findById(req.query.id).populate('likes');
            }else{
                 Likeable=await Comment.findById(req.query.id).populate('likes');
            }
            //check if like is already exists 
            let existingLike=await Like.findOne({
                likeable:req.query.id,
                onModel:req.query.type,
                user:req.user._id
            })
            //if a like already exist then delete it
            if(existingLike){
                   Likeable.likes.pull(existingLike._id);
                   Likeable.save();
                   existingLike.remove();
                   deleted:true;
            }else{
                //make a new like
                let newlike=await Like.create({
                    user:req.user._id,
                    likeable:req.query.id,
                    onModel:req.query.type,
                })
                Likeable.likes.push(newlike._id);
                Likeable.save();
            }
            return res.json(200,{
                message:'request successful',
                data:{
                    deleted:deleted
                }
            })
      }catch(err){
          console.log(err);
          return res.status(500).json({
              message:"Imternal server error"
          })
      }
}