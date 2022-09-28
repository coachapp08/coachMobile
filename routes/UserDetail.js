const express = require('express'); 
const { route } = require('express/lib/application');
const router = express.Router(); 
const userdetailController = require('../controllers/UserDetail'); 
router.post('/UpdateUserDetail', userdetailController.UpdateUserDetail); 
router.post('/CreateUserDetail', userdetailController.CreateUserDetail);
router.get("/getUserDetail/:id", userdetailController.getUserDetail);
module.exports = router;