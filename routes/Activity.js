const express = require('express'); 
const { route } = require('express/lib/application');
const router = express.Router(); 
const ActivityController = require('../controllers/Activity'); 
router.post('/CreateActivity', ActivityController.CreateActivity);
router.get('/getActivity', ActivityController.getActivity);
router.delete("/DeleteActivity/:id", ActivityController.DeleteActivity);
router.patch("/UpdateActivity", ActivityController.UpdateActivity);
module.exports = router;