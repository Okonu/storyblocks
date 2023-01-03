const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan'); //for logging, showing requests made in the console
const exphbs = require('express-handlebars'); //UI template engine
const connectDB= require('./config/db');

// load config file
dotenv.config({path: './config/config.env'})

connectDB()

const app =  express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')) 
}

// Handlebars
app.engine('.hbs', exphbs.engine ({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))