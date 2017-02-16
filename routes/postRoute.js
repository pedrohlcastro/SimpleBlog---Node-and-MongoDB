'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const postModel = require('../models/PostModel');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();

router.get('/',isLoggedIn,(req,res)=>{
	res.render('postControl.html');
});

module.exports = router;