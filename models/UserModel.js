'use strict'


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/rootConfig');

let userSchema = mongoose.Schema({
	username: String,
	password: String
});

userSchema.methods.hashPsw = function(password){
	return bcrypt.hashSync(password, config.saltRounds);
};

userSchema.methods.checkPsw = function(password){
	console.log('compare');
	return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User',userSchema);