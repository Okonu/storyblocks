const express = require('express');
const dotenv = require('dotenv');

// load config file

dotenv.config({path: './config/config.env'})

const app =  express()

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))





// PORT = 3000

// MONGO_URI = mongodb+srv://Okonu:IOkonu@1999@cluster0.64glq.mongodb.net/?retryWrites=true&w=majority 