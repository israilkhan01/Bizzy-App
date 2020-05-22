var msg=document.getElementById('message-chatbox');
msg.addEventListener('click',function(event){
    event.preventDefault();
    // var chatbox=document.getElementsByClassName('chatting');
    // console.log(chatbox);
    // chatbox[0].style.visibility="visible";
    var chatbox=document.getElementsByClassName('chatting');
    if (chatbox[0].style.display === "none") {
        chatbox[0].style.display = "block";
    } else {
        chatbox[0].style.display = "none";
    }
});

var removebox=$('.remove-message-box');
removebox.click(function(event){
    console.log($('.chatting'));
    $('.chatting')[0].style.display = "none";
})