const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require ('dotenv/config');

//MiddleWare
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const adminroutes = require('./routes/admin');
const admin = require('./models/admin');

app.use('/admin', adminroutes) 

//routes
app.get('/', (req, res) => {
    res.send('All my homies hate this home page...');
});


//connect to DB
mongoose.connect(process.env.DB_connection, () => {
    console.log('Connected to MongoDB...')
});

app.listen(3000);
