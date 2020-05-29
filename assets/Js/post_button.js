class postOptions{
    constructor(postId){
        this.postId = postId;
        this.clicking(postId);
      }
    clicking(postId){
        let option =document.getElementById(`post-option-${postId}`);
        console.log(option);
        option.addEventListener('click',function(){
              let del=document.getElementById(`post-delete-${postId}`);
              console.log("del",del,postId);
              del.style.display='block';    
        });
        
      }
}