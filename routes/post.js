const express = require('express');
const Sequelize = require('sequelize');
var Blogs = require('../db').blog;
require('dotenv').config();

const router = express.Router();

router.get('/', (req, res) => {
    let route = process.env.POST_ROUTE;
    res.render('post', { route: route });
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