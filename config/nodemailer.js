const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');
let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp@gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'aliyreal',
        pass:'codingninjas'
    }
});

let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('Error in rendering',err);
            }
            mailHTML=template;

        }
    );
    return mailHTML;
}
module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}