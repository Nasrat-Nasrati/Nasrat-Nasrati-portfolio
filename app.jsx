const { useEffect, useMemo, useState } = React;

const githubUsername = "Nasrat-Nasrati";

const roles = [
  "Full Stack Developer (Python + React)",
  "Python & Django Specialist",
  "ERP (Odoo) Developer",
  "Database Engineer (PostgreSQL)",
];

const skillGroups = [
  { title: "Backend", skills: ["Python", "Django", "DRF", "Java"] },
  { title: "Frontend", skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind", "Bootstrap"] },
  { title: "Databases", skills: ["PostgreSQL", "MySQL", "SQLite", "Query Optimization"] },
  { title: "ERP & Tools", skills: ["Odoo", "AWS EC2", "AWS S3", "Git", "GitHub", "GitLab"] },
];

const projects = [
  {
    title: "Project Management System",
    description: "Developed using Odoo ERP for MCIT with custom workflow and modules.",
    url: "https://github.com/Nasrat-Nasrati",
  },
  {
    title: "Fleet Management System",
    description: "ERP-based fleet tracking and management system for operations visibility.",
    url: "https://github.com/Nasrat-Nasrati",
  },
  {
    title: "Ecommerce Web Application",
    description: "Full stack commerce application design and development.",
    url: "https://github.com/Nasrat-Nasrati",
  },
  {
    title: "New Kabul System",
    description: "System analysis, architecture design, and product development.",
    url: "https://github.com/Nasrat-Nasrati",
  },
];

function TypingLine() {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 45 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        setDisplayText(currentRole.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 850);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentRole.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <p className="typed-line">
      {displayText}
      <span className="cursor">|</span>
    </p>
  );
}

function GitHubStatus() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [profileRes, repoRes] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUsername}`),
          fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`),
        ]);

        if (!profileRes.ok || !repoRes.ok) {
          throw new Error("GitHub API rate limit or network error");
        }

        const profileJson = await profileRes.json();
        const reposJson = await repoRes.json();
        setProfile(profileJson);
        setRepos(Array.isArray(reposJson) ? reposJson : []);
      } catch (err) {
        setError(err.message || "Unable to load GitHub status");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const topRepos = useMemo(() => {
    return [...repos]
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 3);
  }, [repos]);

  if (loading) {
    return <p className="muted">Loading live GitHub profile status...</p>;
  }

  if (error || !profile) {
    return (
      <div className="card">
        <p className="muted">Could not load GitHub API data right now.</p>
        <a className="status-link" href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer">
          Open GitHub Profile →
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="grid github-stats-grid">
        <article className="card stat-card">
          <p className="label">Public Repos</p>
          <h3>{profile.public_repos}</h3>
        </article>
        <article className="card stat-card">
          <p className="label">Followers</p>
          <h3>{profile.followers}</h3>
        </article>
        <article className="card stat-card">
          <p className="label">Following</p>
          <h3>{profile.following}</h3>
        </article>
        <article className="card stat-card">
          <p className="label">Account Created</p>
          <h3>{new Date(profile.created_at).toLocaleDateString()}</h3>
        </article>
      </div>

      <article className="card" style={{ marginTop: "1rem" }}>
        <h3 style={{ marginTop: 0 }}>⭐ Top Repositories</h3>
        {topRepos.length ? (
          <ul className="repo-list">
            {topRepos.map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  {repo.name}
                </a>
                <span>★ {repo.stargazers_count}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">No public repositories available.</p>
        )}
      </article>
    </>
  );
}

function App() {
  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <strong>Nasrat Portfolio</strong>
          <div className="nav-links">
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#stats">Status</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <header className="hero container">
        <div className="hero-card">
          <div className="hero-top">
            <img className="avatar" src={`https://github.com/${githubUsername}.png`} alt="Nasrat GitHub profile" />
            <div>
              <span className="badge">📍 Kabul, Afghanistan</span>
              <h1>Hi 👋, I'm Nasrat Nasrati</h1>
              <TypingLine />
            </div>
          </div>

          <p className="muted">
            I build scalable systems with Java, Spring Boot, React, Python, Django, and PostgreSQL.
            I enjoy solving real-world problems through clean architecture and practical engineering.
          </p>

          <a className="profile-link" href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer">
            View Full GitHub Profile →
          </a>
        </div>
      </header>

      <section className="section container" id="skills">
        <h2>🧠 Skills</h2>
        <div className="grid skills-grid">
          {skillGroups.map((group) => (
            <article className="card" key={group.title}>
              <h3>{group.title}</h3>
              <div>
                {group.skills.map((skill) => (
                  <span className="skill-chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section container" id="projects">
        <h2>📌 Featured Projects</h2>
        <div className="grid projects-grid">
          {projects.map((project) => (
            <article className="card project-card" key={project.title}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.url} target="_blank" rel="noreferrer">
                View repository →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section container" id="stats">
        <h2>📈 GitHub Profile Status</h2>
        <GitHubStatus />
      </section>

      <section className="section container" id="contact">
        <h2>📫 Contact</h2>
        <div className="card">
          <p>📧 Email: ehnn2020@gmail.com</p>
          <p>📱 Phone: +93 770 694 437</p>
          <p>
            🔗 LinkedIn:{" "}
            <a href="https://www.linkedin.com/in/nasrat-nasrati-691256199/" target="_blank" rel="noreferrer">
              nasrat-nasrati-691256199
            </a>
          </p>
          <p>
            💻 GitHub:{" "}
            <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer">
              {githubUsername}
            </a>
          </p>
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} Nasrat Nasrati — Developer Portfolio SPA</footer>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
