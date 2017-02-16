'use strict'
const bcrypt = require('bcrypt');


let  salt = bcrypt.genSaltSync(10);

module.exports = {
	dbUrl: 'mongodb://localhost:27017/poderosoTab',
	secretKey: 'mulequeDoide',
	saltRounds : salt
}