const router = require('express').Router();
const verify = require('./verifytoken');

router.get('/', verify, (req,res) =>{
    res.json({
        posts: {
            title: "Haha",
            description: "Why am I laughing!"
        }
    });
    res.send(req.user);
    User.findByOne({_id: req.user});
});



module.exports = router;