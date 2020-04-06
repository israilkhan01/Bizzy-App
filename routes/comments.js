const express=require('express');
const passpot =require('passport');

const router=express.Router();

const commentController=require('../controllers/comment_controller');

router.post('/create',passpot.checkAuthentication,commentController.create);

module.exports=router;