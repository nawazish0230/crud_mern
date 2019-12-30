const router = require('express').Router();

const User = require('../model/UserModel');

router.post('/add', (req, res) => {
    User.create({
        username: req.body.username,
        city: req.body.city,
        dob: req.body.dob,
        contact: req.body.contact
    })
    .then(userAdded => res.json(userAdded))
    .catch(err => res.status(400).json(err));
})

// findAll
router.get('/findUsers', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

// findbyId
router.get('/findUser/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

// findbyId and delete
router.post('/deleteUser/:id', (req, res) => {
    User.findOneAndDelete({_id: req.params.id})
        .then(() => res.json('user deleted'))
        .catch(err => res.json(err));
});

// getting id for updating
router.get('/getUser/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.json(err));
})

// updating the user
router.post('/updateUser/:id', (req, res)=>{
    User.findOneAndUpdate({_id: req.params.id}, 
        {$set:{username: req.body.username,
        city: req.body.city,
        dob: req.body.dob,
        contact: req.body.contact}},
        {new: true})
        .then(user => res.json(user))
        .catch(err => res.json(err));
})

module.exports = router;