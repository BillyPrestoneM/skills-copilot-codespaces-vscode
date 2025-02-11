// Create web server
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { getComments, addComment, updateComment, deleteComment } = require('./comments');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  const comments = getComments();
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const comment = req.body;
  addComment(comment);
  res.status(201).json(comment);
});

app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = req.body;
  updateComment(id, comment);
  res.json(comment);
});

app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  deleteComment(id);
  res.status(204).end();
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});