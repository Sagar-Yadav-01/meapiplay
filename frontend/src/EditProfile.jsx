import React, { useState } from 'react';
import api from './api';

function EditProfile({ profile, onUpdate, onCancel }) {
    const [formData, setFormData] = useState({
        name: profile.name,
        email: profile.email,
        education: profile.education,
        github: profile.links.github || '',
        linkedin: profile.links.linkedin || '',
        portfolio: profile.links.portfolio || '',
    });

    // Arrays state
    const [skills, setSkills] = useState(profile.skills || []);
    const [projects, setProjects] = useState(profile.projects || []);
    const [work, setWork] = useState(profile.work || []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- Skills Handlers ---
    const handleSkillChange = (idx, val) => {
        const newSkills = [...skills];
        newSkills[idx] = val;
        setSkills(newSkills);
    };
    const addSkill = () => setSkills([...skills, '']);
    const removeSkill = (idx) => setSkills(skills.filter((_, i) => i !== idx));

    // --- Projects Handlers ---
    const handleProjectChange = (idx, field, val) => {
        const newProjects = [...projects];
        if (field === 'links') {
            // Simple split by comma for links since it's an array of strings
            newProjects[idx] = { ...newProjects[idx], [field]: val.split(',').map(s => s.trim()) };
        } else {
            newProjects[idx] = { ...newProjects[idx], [field]: val };
        }
        setProjects(newProjects);
    };
    const addProject = () => setProjects([...projects, { title: '', description: '', links: [] }]);
    const removeProject = (idx) => setProjects(projects.filter((_, i) => i !== idx));

    // --- Work Handlers ---
    const handleWorkChange = (idx, field, val) => {
        const newWork = [...work];
        newWork[idx] = { ...newWork[idx], [field]: val };
        setWork(newWork);
    };
    const addWork = () => setWork([...work, { company: '', position: '', startDate: '', endDate: '', description: '' }]);
    const removeWork = (idx) => setWork(work.filter((_, i) => i !== idx));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProfile = {
                ...profile,
                name: formData.name,
                email: formData.email,
                education: formData.education,
                links: {
                    github: formData.github,
                    linkedin: formData.linkedin,
                    portfolio: formData.portfolio
                },
                skills: skills.filter(s => s.trim() !== ''),
                projects: projects,
                work: work
            };

            const res = await api.put('/profile', updatedProfile);
            onUpdate(res.data);
        } catch (err) {
            alert('Failed to update profile');
            console.error(err);
        }
    };

    return (
        <div className="edit-form-container">
            <h3>Edit Profile</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Education:</label>
                    <input name="education" value={formData.education} onChange={handleChange} />
                </div>

                <h4>Links</h4>
                <div className="form-group">
                    <label>GitHub:</label>
                    <input name="github" value={formData.github} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>LinkedIn:</label>
                    <input name="linkedin" value={formData.linkedin} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Portfolio:</label>
                    <input name="portfolio" value={formData.portfolio} onChange={handleChange} />
                </div>

                <h4>Skills</h4>
                {skills.map((skill, i) => (
                    <div key={i} className="array-item">
                        <input value={skill} onChange={(e) => handleSkillChange(i, e.target.value)} placeholder="Skill name" />
                        <button type="button" onClick={() => removeSkill(i)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addSkill} className="add-btn">Add Skill</button>

                <h4>Projects</h4>
                {projects.map((proj, i) => (
                    <div key={i} className="card-editor">
                        <input value={proj.title} onChange={(e) => handleProjectChange(i, 'title', e.target.value)} placeholder="Project Title" />
                        <textarea value={proj.description} onChange={(e) => handleProjectChange(i, 'description', e.target.value)} placeholder="Description" />
                        <input value={proj.links.join(', ')} onChange={(e) => handleProjectChange(i, 'links', e.target.value)} placeholder="Links (comma separated)" />
                        <button type="button" onClick={() => removeProject(i)} className="delete-btn">Delete Project</button>
                    </div>
                ))}
                <button type="button" onClick={addProject} className="add-btn">Add Project</button>

                <h4>Work Experience</h4>
                {work.map((job, i) => (
                    <div key={i} className="card-editor">
                        <input value={job.company} onChange={(e) => handleWorkChange(i, 'company', e.target.value)} placeholder="Company" />
                        <input value={job.position} onChange={(e) => handleWorkChange(i, 'position', e.target.value)} placeholder="Position" />
                        <div className="date-row">
                            <input value={job.startDate} onChange={(e) => handleWorkChange(i, 'startDate', e.target.value)} placeholder="Start Date" />
                            <input value={job.endDate} onChange={(e) => handleWorkChange(i, 'endDate', e.target.value)} placeholder="End Date" />
                        </div>
                        <textarea value={job.description} onChange={(e) => handleWorkChange(i, 'description', e.target.value)} placeholder="Description" />
                        <button type="button" onClick={() => removeWork(i)} className="delete-btn">Delete Job</button>
                    </div>
                ))}
                <button type="button" onClick={addWork} className="add-btn">Add Work</button>

                <div className="form-actions" style={{ marginTop: '2rem' }}>
                    <button type="submit" className="save-btn">Save Changes</button>
                    <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditProfile;
