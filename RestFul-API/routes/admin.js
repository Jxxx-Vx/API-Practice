const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');


//returns all users
router.get('/', async (req, res) => {
    try{
        const admin = await Admin.find();
        res.json(admin);
    }
    catch(err){
        res.json({ message : err });
    }
});

//submits user
router.post('/', async (req,res) => {
    console.log(req.body);
    const admin = new Admin({
        Name: req.body.Name,
        Level: req.body.Level
    });
    try{
        const save = await admin.save();
        res.json(save);
    }
    catch(err){
        res.json({ message : err });
    }
       
});
//specific user post
router.get('/:adminId', async (req,res) =>{
    try{
        const admin = await Admin.findById(req.params.adminId);
        res.json(admin);
    }
    catch(err){
        res.json({ Message : err});
    }
});

//delete user
router.delete('/:adminId', async (req,res) => {
    try{
        const remove = await Admin.remove({ _id: req.params.adminId });
        res.json(remove);
    }
    catch(err){
        res.json({ Message : err});
    }
});

//update user
router.patch('/:adminId', async (req, res) => {
    try{
       const updateUser = await Admin.updateOne(
            { _id: req.params.adminId },
            {$set: { Name: req.body.title } }
        );
        res.json(updateUser);
    }
    catch(err){
        res.json({ Message : err});
    }
});




module.exports = router;