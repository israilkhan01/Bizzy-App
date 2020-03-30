const express=require('express');
const router=express.Router();

const userController=require('../controllers/user_controller');
console.log("User router");
router.get("/profile",userController.profile);
router.get("/signIn",userController.signIn);
router.get("/signUp",userController.signUp);

router.post('/create',userController.create);

router.post('create-session',userController.createsession);
module.exports=router;