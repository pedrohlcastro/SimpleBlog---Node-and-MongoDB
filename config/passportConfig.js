'use strict'

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/UserModel');

module.exports = function(passport){

	passport.serializeUser((user,done)=>{
		done(null,user._id);
	});

	passport.deserializeUser((id,done)=>{
		User.findById(id,(err,user)=>{
			done(err,user);
		});
	});
	//Login - Strategy
	passport.use('login',new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback : true
	},(req,name,password,done)=>{
		process.nextTick(()=>{
			User.findOne({username: name},(err,user)=>{
				if(err)
					return done(err);
				if(!user)
					return done(null,false,req.flash('login_message', 'Usuário inválido'));
				if(!user.checkPsw(password))
					return done(null,false,req.flash('login_message', 'Senha inválido'));
				return done(null,user, req.flash('login_message', 'Logado'));

			});
		});
	}
	));

};