const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation}= require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//VALIDATION
const Joi = require('@hapi/joi');
const schema = Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});

router.post('/register', async (req,res) => {
    
    //Validation process before adding user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //Check if user is already in database
    const existingEmail = await User.findOne({ email: req.body.email });
    if(existingEmail) return res.status(400).send('Email already exists.');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new User
    const user = new User({
        name: req.body.name,            
        email: req.body.email,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch(err){
        res.status(400).send(err);
    }
});

//Login
router.post('/login', async (req,res) => {
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if email exists
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Email is not found.');
    
    //Correct Password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password.')

    //Create JWT Token
    const token = jwt.sign({_id: user._id}, process.env.token_sec);
    res.header('auth-token', token).send('Logged in. Token = '+token);

});

module.exports = router;