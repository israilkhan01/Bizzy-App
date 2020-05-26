
let handler=false;
let editButton=$('.edit-profile-button');
editButton.click(function(){
    $('.profile-page').css('opacity','0.6');
    $('.edit-pops').css('display','block');
    $('.edit-pops').css('opacity','1');
    handler=true;
    // console.log(handler);
});
let removebutton=$('.remv');
console.log(removebutton);
removebutton.click(function(){
    $('.profile-page').css('opacity','1');
    $('.edit-pops').css('display','none');
    handler=false;
    // console.log(handler);
});
// console.log(handler);
$(document).mouseup(function (event) { 
    console.log($(event.target).closest(".edit-pops").length)
    if ($(event.target).closest(".edit-pops").length=== 0) { 
        $(".edit-pops").hide(); 
        $('.profile-page').css('opacity','1');
    } 
}); 
