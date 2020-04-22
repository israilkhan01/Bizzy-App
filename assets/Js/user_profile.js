// let editButton=document.getElementsByClassName('edit-profile-button');
// editButton.onclick(function(event){
//     event.preventDefault();

// })
let editButton=$('.edit-profile-button');
editButton.click(function(){
    $('.editform').slideToggle("slow");
})
console.log(popup);