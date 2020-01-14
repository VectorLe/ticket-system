const router = require('express').Router();

// Project Model
const Project = require('../models/project.model');

// CREATE
router.route('/create').post((req, res) => {
    const name = req.body.name;

    const newProject = new Project({
    	name,
    });

    newProject.save()
        .then(() => res.json('Project successfully created!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// READ
router.route('/').get((req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE
router.route('/:id').delete((req,res) => {
Project.findByIdAndDelete(req.params.id)
    .then(ticket => res.json('Project deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

