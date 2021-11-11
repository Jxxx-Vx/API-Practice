const mongoose = require('mongoose');

const adminschema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Level: {
        type: String,
        required: true
    }  
});

module.exports = mongoose.model('Admin', adminschema);