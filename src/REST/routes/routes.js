const express = require('express');
const { register } = require('../controllers/register');
const { createBlog } = require('../controllers/createBlogs');
const { likeBlog } = require('../controllers/likes');
const router = express.Router();

router.get('/hello', (req, res) => { res.send('hello') });

router.post('/register', register);

router.post("/createblogs", createBlog);

router.post('/like/:userId/:blogId', likeBlog);

module.exports = router;