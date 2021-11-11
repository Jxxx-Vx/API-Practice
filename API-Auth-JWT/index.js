const express = require('express');
const app = express();
const mongoose = require('mongoose');
require ('dotenv/config');

//import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');


//connect to DB
mongoose.connect(process.env.DB_connection, () => {
    console.log('Connected to MongoDB successfully.')
});

//MiddleWare
app.use(express.json());
//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);

app.listen(port = 2000, () => 
console.log('Server currently running on http://localhost:'+port));




