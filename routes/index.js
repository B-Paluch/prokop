const express = require('express');
const router = express.Router();
const index = require('../controllers/mainsite');

router.get('/', function(req, res){
    index.index(req,res);
});

module.exports = router;
