
var handler=false;
let editButton=$('.edit-profile-button');
editButton.click(function(){
    $('.profile-page').css('opacity','0.6');
    $('.edit-pops').css('display','block');
    // $('.edit-pops').css("slow");
    $('.edit-pops').css('opacity','1');
    handler=true;
});
let removebutton=$('.remv');
console.log(removebutton);
removebutton.click(function(){
    $('.profile-page').css('opacity','1');
    $('.edit-pops').css('display','none');
    handler=false;
});
if(handler){
    $('body').click(function(){
        $('.profile-page').css('opacity','1');
        $('.edit-pops').css('display','none');
    });
}

