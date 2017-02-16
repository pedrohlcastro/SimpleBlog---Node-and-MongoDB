'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const contatoModel = require('../models/ContatoModel');
const router = express.Router();


router.get('/',(req,res)=>{
	res.render('home.html');
});

router.get('/contact',(req,res)=>{
	res.render('contato.html');
});

router.get('/about',(req,res)=>{
	res.render('about.html');
});

module.exports = router;