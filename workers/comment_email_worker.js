//for each job yoou have created seperated worker so that your code remains clean
const queue=require('../config/kue');

const commentsMailer=require('../mailers/comment_mailer');
//process function tells the user that when the new task is added into your queue,you need to run-
//the code inside the process function
//1st arg :name of queue
queue.process('emails',function(job,done){
   console.log('emails worker is processing a job',job.data);
   commentsMailer.newComment(job.data);
   done();
})