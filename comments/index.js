const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// store every comments by ID
const commentsByPostId = {};

// Routes

// Get comments
app.get('/posts/:id/comments', (req, res) => {
  // Return comments of Post ID, If post ID is undefined, return empty array
  res.send(commentsByPostId[req.params.id]) || [];
});

// Craete a new comment
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // Return comments of Post ID, If post ID is undefined, return empty array
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
