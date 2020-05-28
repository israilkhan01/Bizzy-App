// let Button=document.getElementsByClassName('post-option-button');
// console.log(Button,"button");
// for(let but of Button){
//     but.addEventListener("click",function(){
//         let del=document.getElementsByClassName(`post-delete-${post.id}`);
//         console.log(del);
//     })
// }
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
            
          })
      }
}