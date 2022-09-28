const express = require('express'); 
const { route } = require('express/lib/application');
const router = express.Router(); 
const knowlegedatabseController = require('../controllers/KnowlegeDatabase'); 
router.post('/CreateKnowlegeDatabase', knowlegedatabseController.CreateKnowlegeDatabase);
router.get('/getKnowlegeDatabase', knowlegedatabseController.getKnowlegeDatabase);
module.exports = router;