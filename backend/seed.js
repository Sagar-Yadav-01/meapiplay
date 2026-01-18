const mongoose = require('mongoose');
const Profile = require('./models/Profile');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/me-api-playground')
    .then(() => console.log('✅ Connected for seeding'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const sampleProfile = {
    name: "Jane Doe",
    email: "jane@example.com",
    education: "BS Computer Science, Tech University",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Python"],
    projects: [
        {
            title: "E-commerce Dashboard",
            description: "A React-based dashboard for managing orders and inventory.",
            links: ["https://github.com/janedoe/dashboard"]
        },
        {
            title: "Weather API Wrapper",
            description: "Node.js library to fetch weather data easily.",
            links: ["https://github.com/janedoe/weather-lib"]
        },
        {
            title: "Portfolio v1",
            description: "My first portfolio site using plain HTML/CSS.",
            links: ["https://janedoe.com"]
        }
    ],
    work: [
        {
            company: "Tech Corp",
            position: "Junior Developer",
            startDate: "2023-01",
            endDate: "Present",
            description: "Working on internal tools."
        }
    ],
    links: {
        github: "https://github.com/janedoe",
        linkedin: "https://linkedin.com/in/janedoe",
        portfolio: "https://janedoe.com"
    }
};

const seedDB = async () => {
    try {
        await Profile.deleteMany({});
        await Profile.create(sampleProfile);
        console.log("🌱 Database seeded!");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
