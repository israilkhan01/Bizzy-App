const express=require('express');
const passpot =require('passport');

const router=express.Router();

const postController=require('../controllers/post_controller');

router.post('/create',passpot.checkAuthentication,postController.create);
router.get('/destroy/:id',passpot.checkAuthentication,postController.destroy);
module.exports=router;