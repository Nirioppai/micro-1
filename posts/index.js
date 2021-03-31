const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// store every post created
const posts = {};

// Routes

// Get posts
app.get('/posts', (req, res) => {
  res.send(posts);
});

// Craete new post
app.post('/posts', (req, res) => {
  // random ID
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
