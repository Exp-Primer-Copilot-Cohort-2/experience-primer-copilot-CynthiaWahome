// Create web server
// Create a route that accepts POST requests to /comments
// Create a route that accepts GET requests to /comments
// Create a route that accepts GET requests to /comments/:id
// Create a route that accepts PUT requests to /comments/:id
// Create a route that accepts DELETE requests to /comments/:id

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const comments = require('./comments.json');
const path = require('path');

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.get('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    res.json(comment);
});

app.post('/comments', (req, res) => {
    const newComment = {
        id: comments.length + 1,
        name: req.body.name,
        comment: req.body.comment
    }
    comments.push(newComment);
    fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), err => {
        if (err) {
            res.status(500).send('Error saving comment');
        } else {
            res.json(newComment);
        }
    });
});

app.put('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    comment.name = req.body.name;
    comment.comment = req.body.comment;
    fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), err => {
        if (err) {
            res.status(500).send('Error saving comment');
        } else {
            res.json(comment);
        }
    });
});

app.delete('/comments/:id', (req, res) => {
    const index = comments.findIndex(comment => comment.id === parseInt(req.params.id));
    comments.splice(index, 1);
    fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), err => {
        if (err) {
            res.status(500).send('Error saving comment');
        } else {
            res.send('Comment deleted');
        }
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});