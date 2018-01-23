const express = require('express');
const Sequelize = require('sequelize');
var Blogs = require('../db').blog;

const router = express.Router();

router.get('/', (req, res) => {
    res.render('post');
});

router.post('/', (req, res) => {
    Blogs.sync()
    .then(()=>{
        return Blogs.create({
            title: req.body.title,
            body: req.body.body
        });
    })
    .then(()=>{
        res.redirect('/');
    })
});

module.exports = router;