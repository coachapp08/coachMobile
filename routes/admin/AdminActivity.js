const express = require('express'); 
const { route } = require('express/lib/application');
const router = express.Router(); 
const adminactivityController = require('../../controllers/admin/AdminActivity'); 
router.post('/getActivityList', adminactivityController.getActivityList);
module.exports = router;