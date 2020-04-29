const express=require('express');
const passpot =require('passport');

const router=express.Router();

const LikesController=require('../controllers/Likes_controller');

router.post('/toggle',passpot.checkAuthentication,LikesController.toggleLike);
module.exports=router;