'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocal = require('passport-local');
const config = require('./config/rootConfig')
const nunjucks = require('nunjucks');
var flash    = require('connect-flash');

const app = express();
const port = 8000 || port.env.PORT;

//db
mongoose.connect(config.dbUrl,(err)=>{
	if(err)
		console.log(err);
});

//config
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.use('/static',express.static('static/'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(flash());
app.use(session({
    secret: config.secretKey,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); 
require('./config/passportConfig')(passport); //call the passport login config


//routes
app.use('/admin/post', require('./routes/postRoute'));
app.use('/admin/', require('./routes/authRoute'));
app.use('/',require('./routes/blogRoute'));

app.listen(port,()=>{
	console.log('Rodando em >> localhost:'+port);
});