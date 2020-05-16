// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#comment-form-${postId}`);

        this.createComment(postId);
        let self = this;
        // call for all the existing comments
        $('#delete-comment', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    console.log(data);
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($('#delete-comment', newComment));

                    // CHANGE :: enable the functionality of the toggle like button on the new comment
                    // new ToggleLike($(' .toggle-like-button', newComment));
                    new Noty({
                        theme: 'metroui',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment){
        // CHANGE :: show the count of zero likes on this comment

        return $(`<li id="comment-${comment._id}">
                    <div class="comments">
                    <div id="comments">
                    <a href="/users/profile/${comment.user._id}">
                       <img class="image-comment" src="${comment.user.avatar}" alt="" height="25" width="25">
                     </a>
                    <small>
                            ${comment.user.name}
                    </small>  
                    <small>
                        <a href="comments/destroy/${comment._id}" id="delete-comment"><i class="far fa-trash-alt"></i></a>
                    </small>
                    </div> 
                        <br>
                    <div class="comment-content">
                        ${comment.content}
                    </div>
                    <br>
                </div>

                </li>`);
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log(data);
                    $(`#comment-${data.data.comment_id}`).remove();
                    
                    new Noty({
                        theme: 'metroui',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
}