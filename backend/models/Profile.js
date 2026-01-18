const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    links: [String] // Array of URLs
});

const WorkSchema = new mongoose.Schema({
    company: String,
    position: String,
    startDate: String,
    endDate: String,
    description: String
});

const ProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    education: String,
    skills: [String],
    projects: [ProjectSchema],
    work: [WorkSchema],
    links: {
        github: String,
        linkedin: String,
        portfolio: String
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);
