{  //method to submit the form data for new post using AJax 
    let createPost=function(){
        let newpostForm=$('#new-post-form');
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
                    deletePost($(' .delete-post',newpost));
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
         <p> 
             <small class="post-user"> ${ post.user.name } </small>
            <small>
                <a href="posts/destroy/${post._id}" class="delete-post"><i class="far fa-trash-alt"></i></a>
            </small>
        
                <li class="post-content">
                 :)- ${post.content}
             </li>
         </p>
     
         <div class="post-comments">
            
                 <form action="/comments/create"  class="comment-form" method="POST">
                     <input type="text" name="content" placeholder="Write a comment..." required>
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
    let deletePost=function(deletelink){
        $(deletelink).click(function(event){
            event.preventDefault();
            $.ajax({
                type:'get',
                url:$(deletelink).prop('href'),
                success:function(data){
                    console.log($(`#post-${data.data.post_id}`)[0]);
                    $(`#post-${data.data.post_id}`).remove();
                },
                error:function(error){
                    console.log(error.responseText);
                }

            })
        })
    }
    createPost();
}