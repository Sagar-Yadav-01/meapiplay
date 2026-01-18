import React, { useEffect, useState } from 'react';
import api from './api';
import EditProfile from './EditProfile';
import './App.css';

function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [searchSkill, setSearchSkill] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchProjects();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/profile');
      setProfile(res.data);
    } catch (err) {
      console.error("Failed to fetch profile", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async (skill = '') => {
    try {
      const url = skill ? `/projects?skill=${skill}` : '/projects';
      const res = await api.get(url);
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) {
      fetchProfile();
      return;
    }
    try {
      const res = await api.get(`/search?q=${searchTerm}`);
      if (res.data) {
        setProfile(res.data);
      } else {
        alert('No profile found matching query');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    fetchProfile();
  }

  const handleUpdateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  if (loading) return <div className="loading">Loading Profile...</div>;
  if (!profile) return <div className="error">Profile not found. Make sure backend is running/seeded.</div>;

  return (
    <div className="container">
      <header className="header">
        <h1>{profile.name} API Playground</h1>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search profile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
            {searchTerm && <button type="button" onClick={clearSearch}>Clear</button>}
          </form>
        </div>
      </header>

      <div className="main-content">
        <section className="profile-section">
          <h2>
            About Me
            {!isEditing && <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>}
          </h2>

          {isEditing ? (
            <EditProfile
              profile={profile}
              onUpdate={handleUpdateProfile}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Education:</strong> {profile.education}</p>

              <div className="links">
                {profile.links.github && <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>}
                {profile.links.linkedin && <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
                {profile.links.portfolio && <a href={profile.links.portfolio} target="_blank" rel="noreferrer">Portfolio</a>}
              </div>

              <h3>Skills</h3>
              <div className="skills-list">
                {profile.skills.map(skill => (
                  <span
                    key={skill}
                    className="skill-tag"
                    onClick={() => {
                      setSearchSkill(skill);
                      fetchProjects(skill);
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </>
          )}
        </section>

        <section className="projects-section">
          <div className="projects-header">
            <h2>Projects</h2>
            {searchSkill && (
              <div className="filter-badge">
                Filtered by: <strong>{searchSkill}</strong>
                <button onClick={() => { setSearchSkill(''); fetchProjects(''); }}>x</button>
              </div>
            )}
          </div>

          <div className="projects-grid">
            {projects.length === 0 ? (
              <p>No projects found.</p>
            ) : projects.map((project, idx) => (
              <div key={idx} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-links">
                  {project.links.map((link, i) => (
                    <a key={i} href={link} target="_blank" rel="noreferrer">View</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="work-section">
          <h2>Experience</h2>
          {profile.work.map((job, idx) => (
            <div key={idx} className="job-card">
              <h3>{job.position} @ {job.company}</h3>
              <span className="date">{job.startDate} - {job.endDate}</span>
              <p>{job.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
