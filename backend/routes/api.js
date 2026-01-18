const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// GET /api/profile - Get the single profile
router.get('/profile', async (req, res) => {
    try {
        const profile = await Profile.findOne();
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/profile - Create initial profile (Error if exists)
router.post('/profile', async (req, res) => {
    try {
        const existing = await Profile.findOne();
        if (existing) {
            return res.status(400).json({ message: 'Profile already exists. Use PUT to update.' });
        }
        const profile = new Profile(req.body);
        await profile.save();
        res.status(201).json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /api/profile - Update existing profile
router.put('/profile', async (req, res) => {
    try {
        let profile = await Profile.findOne();
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found. Use POST to create.' });
        }
        Object.assign(profile, req.body);
        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET /api/projects?skill=<skillname>
router.get('/projects', async (req, res) => {
    try {
        const { skill } = req.query;
        const profile = await Profile.findOne();
        if (!profile) return res.status(404).json({ message: 'Profile not found' });

        let projects = profile.projects;
        if (skill) {
            // Filter projects that might be related to the skill
            // Since projects don't strictly have a 'skills' array in my schema (User requested 'projects' array of objects with title, description, links)
            // I will search in title or description for the skill, OR I should have added tags/technologies to Project schema.
            // The requirement says "projects (array of objects with title, description, links)".
            // But functionality says "returns projects filtered by skill".
            // I will assume I should filter by matching text in description or title for now, or implicit relation.
            // Re-reading requirements: "projects (array of objects with title, description, links)". 
            // It implies no explicit 'technologies' field. I will filter by text search in title/description.
            const lowerSkill = skill.toLowerCase();
            projects = projects.filter(p =>
                p.title.toLowerCase().includes(lowerSkill) ||
                p.description.toLowerCase().includes(lowerSkill)
            );
        }
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/skills/top - returns all skills
router.get('/skills/top', async (req, res) => {
    try {
        const profile = await Profile.findOne();
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.json(profile.skills);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/search?q=<text> - searches profile by name or skill
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ message: 'Query required' });

        const term = q.toLowerCase();
        const profile = await Profile.findOne();
        if (!profile) return res.status(404).json({ message: 'Profile not found' });

        const matchesName = profile.name.toLowerCase().includes(term);
        const matchesSkill = profile.skills.some(s => s.toLowerCase().includes(term));

        if (matchesName || matchesSkill) {
            res.json(profile);
        } else {
            res.json(null);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
