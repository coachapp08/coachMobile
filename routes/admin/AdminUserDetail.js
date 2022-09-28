const express = require('express'); 
const { route } = require('express/lib/application');
const router = express.Router(); 
const adminuserdetailController = require('../../controllers/admin/AdminUserDetail'); 
router.post('/getUserDetailList', adminuserdetailController.getUserDetailList);
module.exports = router;