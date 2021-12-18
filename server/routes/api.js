var express = require('express');
const { body } = require('express-validator');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
var router = express.Router();
const {v4: uuidv4} = require('uuid');
const auth = require('../authorization/auth')


//Api gets all posts from database and returns them as json
router.get('/posts', function(req, res, next) {
    Post.find({}, (err, posts) => {
        if(err) throw err;
        console.log(posts);
        res.json(posts);
    })
});


//Api uses url parameter to find a specific post from the database and returns it as json
router.get('/post/:postId',  function(req, res, next) {
    console.log(req.params.postId);
    Post.findOne({post_id: req.params.postId}, (err, post) => {
        if(err) throw err;
        if (post){
            console.log(post);
            res.json(post);
        } else {
            res.json({message: "post not found"})
        }
    })
});


//Api queries posts by the author's username.
router.get('/posts/:user', function(req, res, next) {
    console.log(req.params.user);
    Post.find({author: req.params.user}, (err, posts) => {
        if(err) throw err;
        console.log(posts);
        res.json(posts);
    })
});
//Api creates posts and comments to the database uuid is used to create IDs to both comments and posts to identify them easier
router.post('/post',
auth,
body("content").notEmpty(),
function(req, res, next) {
    Post.create({
        post_id: uuidv4(),
        author: req.body.author,
        content: req.body.content
    },
    (err, ok) => {
        if(err) throw err;
        return res.json(ok);
    }
    )
});

//Post's ID is used to link comments to correct posts
router.post('/comment',
body("content").notEmpty(),
auth,
function(req, res, next) {
    Comment.create({
        comment_id: uuidv4(),
        post: req.body.post,
        author: req.body.author,
        content: req.body.content
    },
    (err, ok) => {
        if(err) throw err;
        return res.json(ok);
    }
    )
});


//Api queries all comments from database by post's id provided as url parameter
router.get("/comments/:id", function(req, res, next) {
    Comment.find({post: req.params.id}, (err, comments) => {
        if(err) throw err;
        console.log(comments);
        res.json(comments);
    })
})

module.exports = router;