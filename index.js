// implement your API here
const db = require('./data/db.js');
const express = require('express');

const server = express();

// Post stuff
server.post('/api/users', (req, res) => {});

// Get stuff
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ err: 'The users information could not be retrieved.' });
        });
});

server.get('/api/users/:id', (req, res) => {
    db.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ err: 'The users information could not be retrieved.' });
        });
});

server.listen(5000, () => {
    console.log('Listening on port 5000');
});
