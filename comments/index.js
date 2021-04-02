const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

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
app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  // Return comments of Post ID, If post ID is undefined, return empty array
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content, status: 'pending' });

  commentsByPostId[req.params.id] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending',
    },
  });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  console.log('Received Event', req.body.type);

  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { postid, id, status } = data;

    // Get comments associated with post ID
    const comments = commentsByPostId[postId];

    // Find the comment we want to update from comments
    // By finding comment ID equal to event ID
    const comment = comments.find(comment => {
      return comment.id === id;
    });

    comment.status = status;
  }

  await axios.post('http://localhost:4005/events', {
    type: 'CommentUpdated',
    data: {
      id,
      content,
      postId,
      status,
    },
  });

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
