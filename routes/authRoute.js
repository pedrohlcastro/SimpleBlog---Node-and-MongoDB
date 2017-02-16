'use strict'

const express = require('express');
const bcrypt = require('bcrypt');
const config = require('../config/rootConfig');
const bodyParser = require('body-parser');
const passport = require('passport');
const UserModel = require('../models/UserModel')
const router = express.Router();

router.post('/',passport.authenticate('login', {
	successRedirect : '/admin/post/',
	failureRedirect : '/admin',
	failureFlash : true 
}));

router.get('/', (req,res)=>{
	if(req.isAuthenticated()){
		res.redirect('/admin/post/');
	}
	res.render('adminLogin.html', { messages: req.flash('login_message')});
});


router.get('/logout',(req,res)=>{
	req.logout();
	res.redirect('/');
});

//simple register route --> We have to improve this
router.post('/register',(req,res)=>{
	var newUser = new UserModel();
	newUser.username = req.body.username;
	newUser.password = newUser.hashPsw(req.body.password);
	console.log(newUser);
	newUser.save((err)=>{
		if(err){
			return res.json({status: err});
		}
		return res.json({status: 'ok'});
	});
});

module.exports = router;