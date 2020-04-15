{
    let createcomment=function(){
        let newcommentform=$('.comment-form');
       
        newcommentform.submit(function(event){
             event.preventDefault();
             $.ajax({
                 type:'post',
                 url:'/comments/create',
                 data:newcommentform.serialize(),
                 success:function(data){
                    console.log(data);
                    let newcomment=newcommentDom(data.data.comment);
                    $(`.post-comment-${post._id}`).prepend(newcomment);
                 },
                 error:function(error){
                    console.log(error.responseText);
                     
                 }
             })
        })
    }
    let newcommentDom=function(comment){
        return $(`<p class="comments">
                <li id="comments">
                    <small>
                        ${comment.user.name}
                    </small>
                    
                    <small>
                         <a href="comments/destroy/${comment.id}"><i class="far fa-trash-alt"></i></a>
                    </small>
                    
                </li> 
                    <br>
                <li class="comment-content">
                    ${comment.content}
                </li>
            </p>`);
        }

  createcomment();
}