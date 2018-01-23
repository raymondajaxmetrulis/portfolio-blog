const express = require('express');
const Sequelize = require('sequelize');
var Blogs = require('../db').blog;

const router = express.Router();

router.get('/', (req, res) => {
    Blogs.findAll()
    .then(blogs => {
        var posts = [];
        blogs.forEach(function(entry) {
            var post = {
                'title': `${entry.dataValues.title}`,
                'body': `${entry.dataValues.body}`,
                'created': `${entry.dataValues.createdAt}`
            }
            posts.push(post);
        });
        res.render('blog', { posts: posts });
    });   
});

module.exports = router;
