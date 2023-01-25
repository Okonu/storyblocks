const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan'); //for logging, showing requests made in the console
const exphbs = require('express-handlebars'); //UI template engine
const passport = require('passport');
// const session = require('cookie-session');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB= require('./config/db');

// load config file
dotenv.config({path: './config/config.env'})

//passport config
require('./config/passport')(passport) 

connectDB()

const app =  express()

//logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))  
}

// Handlebars
app.engine('.hbs', exphbs.engine ({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//session middleware
app.use(session({
    secret: 'keyboard cat',
    // cookie: {maxAge:60000},
    resave: false,          //don't save a session if nothing is modified
    saveUninitialized: false, //don't create a session untill something is initialized
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session()) 

//static folder
app.use(express.static(path.join(__dirname, 'public')))


//Routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))


const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))