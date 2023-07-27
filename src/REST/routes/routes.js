const express = require('express');
const { register } = require('../controllers/register');
const { createBlog } = require('../controllers/createBlogs');
const router = express.Router();

router.get('/hello', (req, res) => { res.send('hello') });

router.post('/register', register);

router.post("/createblogs", createBlog);

module.exports = router;