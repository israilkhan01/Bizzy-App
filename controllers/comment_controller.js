const Comment=require('../models/comment');
const Post=require('../models/post')
const commentsMailer=require('../mailers/comment_mailer');
const queue=require('../config/kue');
const commentEmailWorker=require('../workers/comment_email_worker');
module.exports.create=async function(req,res){
    try{
        let post=await Post.findById(req.body.post);
        if(post){
            let comment=await Comment.create({
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
                 });
            post.comments.push(comment);
            post.save();
            comment=await comment.populate('user','name email').execPopulate();
           let job= queue.create('emails',comment).save(function(error){
               if(error){
                   console.log('error in creating a queue',error)
                   return;
               }
               console.log('Job Enqueued',job.id);
           })
            //this function need to be send into the queue
            // commentsMailer.newComment(comment); 
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment:comment,
                    },
                    message:'comment Created'
                })
            }
            req.flash('success','Comment Added!!');
            return res.redirect('/');
        }
    }catch(err){
        req.flash('error',err);
        return;
    }
}
module.exports.destroy=async function(req,res){
   try{
        let comment=await Comment.findById(req.params.id);
        if(comment.user==req.user.id || comment.post){
            let postId=comment.post;
            comment.remove();
            let post=await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
            req.flash('success','Comment Deleted!!');
            return res.redirect('back');
        }
        else{
            req.flash('error','You can-t Delete this Comment');
            return res.redirect('back');
        }
   }catch(err){
         req.flash('error','You cant Delete this Comment');
         return res.redirect('back')
   }
}