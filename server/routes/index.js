var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect(
    'mongodb://admin:password1@ds125486.mlab.com:25486/nba-prediction-data',
    { useNewUrlParser: true }
);

router.get('/players', (req, res) => {
    mongoose.connection.db.collection('players', (err, collection) => {
        collection.find({}).toArray((err, data) => {
            res.send(data);
        });
    });
});

router.get('/teams', (req, res) => {
    mongoose.connection.db.collection('teams', (err, collection) => {
        collection.find({}).toArray((err, data) => {
            res.send(data);
        });
    });
});

router.get('/team/:id', (req, res) => {
    console.log(req.params.id);
    mongoose.connection.db.collection('teams', (err, collection) => {
        collection
            .findOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
            .then(team => res.send(team));
    });
});

router.get('/team/delete/:id', (req, res) => {
    Team.findById(req.params.id, (err, team) => {
        if (!err) {
            team.remove();
            res.send(200);
        } else {
            res.send(404);
        }
    });
});

const schema = new mongoose.Schema({
    keys: [Number],
    name: String,
    rows: [Object]
});

let Team = mongoose.model('Team', schema);

router.post('/team/save', (req, res) => {
    console.log(req.body);
    Team.findOneAndUpdate(
        {
            _id:
                req.body._id != ''
                    ? new mongoose.Types.ObjectId(req.body._id)
                    : new mongoose.Types.ObjectId()
        },
        { name: req.body.name, keys: req.body.keys, rows: req.body.rows },
        { upsert: true, new: true },
        (err, doc) => {
            err ? res.send(err) : res.send(doc);
        }
    );
});

router.post('/predict', (req, res) => {
    Team.findOneAndUpdate({ id: req.body.id }, { name: 'jason bourne' });
    console.log(req.body);
    res.send(req.body);
});

module.exports = router;
