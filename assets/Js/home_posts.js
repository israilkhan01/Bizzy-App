{  //method to submit the form data for new post using AJax 
    let createPost=function(){
        let newpostForm=$('#new-post-form');
        console.log(newpostForm);
        newpostForm.submit(function(event){
            event.preventDefault();
            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newpostForm.serialize(),
                success:function(data){
                    let newpost=newpostDom(data.data.post);
                    $('.posts>ul').prepend(newpost);
                    
                    // console.log($(' .delete-post',newpost));
                    deletePost($('.delete-post'));
                    new PostComments(data.data.post._id);
                },
                error:function(error){
                   console.log(error.responseText);
                    
                }
                
            })   
               
        });
    }
    //method to create the post in Dom
    let newpostDom=function(post){
         return $(`<div class="post-s" id="post-${post._id}">
                <div class='post-header'>  
                    <img class="image" src="${post.user.avatar}" alt="" height="25" width="25">
                    <small class="post-user"> ${ post.user.name } </small>
                    <small>
                        <a href="posts/destroy/${post._id}" class="delete-post"><i class="far fa-trash-alt"></i></a>
                    </small>
                
                        <li class="post-content">
                        :)- ${post.content}
                    </li>
                </div>
            
                <div class="post-comments">
                    
                        <form action="/comments/create"  class="comment-form" method="POST">
                            <input type="text" name="content" id="write-comment" placeholder="Write a comment..." required>
                            <input type="hidden" name="post" value= "${post._id} ">
                            <input type="submit" class="add-comment" value="Add Comment"> 
                        </form>
                
                        <div class="post-comments-list">
                            <ul id="post-comment-${post._id}">
                                    
                            </ul>
                        </div>
                </div>
                </div>`)
    }
    //method to delete post
    let deletePost=function(deletelink){
        $(deletelink).click(function(event){
            event.preventDefault();
            $.ajax({
                type:'get',
                url:$(deletelink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error:function(error){
                    console.log(error.responseText);
                }

            })
        })
    }
    let convertPostsToAjax = function(){
        $('.post-s').each(function(){
            let self = $(this);
            let deleteButton = $('.delete-post',self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1];
            console.log(postId)
            new PostComments(postId);
        });
    }
    createPost();
    // deletePost($('.delete-post'));
    convertPostsToAjax();

    
}