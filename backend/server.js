import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';

import Issue from './models/Issue';

const app = express();
const router = express.Router();

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(path.dirname(__dirname), 'frontend', 'dist', 'frontend')));

// DATABASE
mongoose.connect(`mongodb://${process.env.IP}:27017/issues`, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Mongo connection established');
});


// Get all issues
router.route('/issues').get((req, res) => {
  Issue.find((err, issues) => {
    if (err) console.log(err);
    else {
      res.json(issues);
    }
  });
});

// Find specific issue by id
router.route('/issues/:id').get((req, res) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (err) console.log(err);
    else res.json(issue);
  });
});

// Add issue to database
router.route('/issues/add').post((req, res) => {
  let issue = new Issue(req.body);
  issue.save().then(issue => res.status(200).json({ 'issue': 'Added successfully' })).catch(err => res.status(400).send('Failed to create new issue'));
});

// Update existing issue
router.route('/issues/update/:id').put((req, res, next) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (!issue) next(new Error('Could not load document'));
    else {
      issue.title = req.body.title;
      issue.responsible = req.body.responsible;
      issue.description = req.body.description;
      issue.severity = req.body.severity;
      issue.status = req.body.status;
      
      issue.save().then(issue => res.status(200).json('Update done')).catch(err => res.status(500).send('Update failed'));
    }
  });
});

// Delete an issue
router.route('/issues/delete/:id').get((req, res) => {
  Issue.findByIdAndRemove({ _id: req.params.id }, (err, issue) => {
    if (err) res.status(500).send(err);
    else res.json(issue);
  }); 
});

app.use('/', router);
app.use('/*', express.static(path.join(path.dirname(__dirname), 'frontend', 'dist', 'frontend')));

const port = 8080;
app.listen(port, () => console.log(`Express server listening on port ${port}`));