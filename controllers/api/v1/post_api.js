const Post=require('../../../models/post');
module.exports.index=async function(req,res){

    let posts=await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });
    return res.status(200).json({
        message:'list of posts',
        post:posts
    })
}
module.exports.destroy=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        // if(post.user==req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            // if(req.xhr){
            //     return res.status(200).json({
            //         data:{
            //             post_id:req.params.id
            //         },
            //         message:"Post deleted"
            //     })
            // }
            // req.flash('success','Post and associated Comments Deleted')
            return res.status(200).json({
                message:'Post and associated comment deleted'

           })
        //  }else{
        //    return res.redirect('back');
        //  }
    }catch(err){
        // req.flash('error','You can not delete this post')
            // return res.redirect('back');/
            return res.status(500).json({
                    message:'INternal server error'

            })
    }
}