// implement your API here
const db = require('./data/db.js');
const express = require('express');

const server = express();
server.use(express.json());

// Post stuff
server.post('/api/users', (req, res) => {
    const newHobbit = req.body;

    if (!newHobbit.name || !newHobbit.bio) {
        console.log(req);
        res.status(400).json({ message: 'Please provide name and bio for the user.' });
    } else {
        console.log(req);
        db.insert(newHobbit)
            .then(addedHobbit => {
                res.status(201).json(addedHobbit);
            })
            .catch(err => {
                res.status(500).json({ err: err, message: 'There was an error while saving the user to the database.' });
            });
    }
});

// Put stuff
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const hobbitToEdit = req.body;

    if (!hobbitToEdit.name || !hobbitToEdit.bio) {
        console.log(req);
        res.status(400).json({ message: 'Please provide name and bio for the user.' });
    } else {
        console.log(req);
        db.update(id, hobbitToEdit)
            .then(editedHobbit => {
                if (!editedHobbit) {
                    res.status(404).json({ err: err, message: 'The user with the specified ID does not exist.' });
                } else {
                    res.json(editedHobbit);
                }
            })
            .catch(err => {
                res.status(500).json({ err: err, message: 'There was an error while saving the user to the database.' });
            });
    }
});

// Get stuff
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ err: err, message: 'The users information could not be retrieved.' });
        });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).json({ err: err, message: 'The user with the specified ID does not exist.' });
            } else {
                res.json(user);
            }
        })
        .catch(err => {
            res.status(500).json({ err: err, message: 'The users information could not be retrieved.' });
        });
});

// Delete stuff
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(user => {
            if (!user) {
                res.status(404).json({ err: err, message: 'The user with the specified ID does not exist.' });
            } else {
                res.json(user);
            }
        })
        .catch(err => {
            res.status(500).json({ err: err, message: 'The user could not be removed.' });
        });
});

server.listen(5000, () => {
    console.log('Listening on port 5000');
});
