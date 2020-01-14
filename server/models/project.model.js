const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const projectSchema = new Schema({
    name: { type: String, required: true,},
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
