const nodemailer=require('../config/nodemailer');


//this is another way of exporting a method;

exports.newComment=(comment)=>{
    console.log('inside newComment Mailer',comment);
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    nodemailer.transporter.sendMail({
        from:'israilkhan.a111@gmail.com',
        to:comment.user.email,
        subject:'New comment Published',
        html:htmlString
    },(err,info)=>{
        if(err){console.log('ERROR in sending email',err); return;}
        console.log('Message sent',info);
        return;
    })
}