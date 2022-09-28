const express = require('express'); 
const { route } = require('express/lib/application');
const router = express.Router(); 
const adminuserController = require('../../controllers/admin/AdminUser'); 
router.post('/CreateUserAdmin', adminuserController.CreateUserAdmin);
router.post('/LoginUserAdmin', adminuserController.LoginUserAdmin);
module.exports = router;