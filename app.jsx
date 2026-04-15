const { useEffect, useMemo, useState } = React;

const githubUsername = "Nasrat-Nasrati";

const roles = [
  "Full Stack Developer (Java + React)",
  "Python & Django Specialist",
  "ERP (Odoo) Developer",
  "Database Engineer (PostgreSQL)",
];

const skillGroups = [
  { title: "Backend", skills: ["Python", "Django", "DRF", "Java", "Spring Boot"] },
  { title: "Frontend", skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind", "Bootstrap"] },
  { title: "Databases", skills: ["PostgreSQL", "MySQL", "SQLite", "Query Optimization"] },
  { title: "ERP & Tools", skills: ["Odoo", "AWS EC2", "AWS S3", "Git", "GitHub", "GitLab"] },
];

const projects = [
  {
    id: "pms",
    title: "Project Management System",
    type: "Enterprise ERP Project",
    qualityLevel: "Production-Ready",
    summary:
      "A centralized platform in Odoo ERP for task lifecycle, approvals, progress tracking, and cross-team coordination.",
    about:
      "This system digitized manual project operations and provided one source of truth for project managers and departments.",
    technologies: ["Odoo", "Python", "PostgreSQL", "XML Views", "REST Integrations"],
    challenges: [
      "Complex workflow rules across departments",
      "Performance on large records",
      "Data consistency in status transitions",
    ],
    solutions: [
      "Built stage-based workflows with strict validations",
      "Optimized indexes and reduced expensive ORM queries",
      "Added automated reminders and business rules",
    ],
    screenshots: [
      { title: "Dashboard", src: "https://placehold.co/1100x620/0f172a/e2e8f0?text=PMS+Dashboard" },
      { title: "Task Pipeline", src: "https://placehold.co/1100x620/1f2937/e2e8f0?text=Task+Pipeline" },
      { title: "Approval Flow", src: "https://placehold.co/1100x620/111827/e2e8f0?text=Approval+Flow" },
    ],
    repoUrl: "https://github.com/Nasrat-Nasrati",
  },
  {
    id: "fleet",
    title: "Fleet Management System",
    type: "Logistics / Operations",
    qualityLevel: "Scalable",
    summary: "A fleet operations system for tracking vehicles, maintenance, routes, and utilization.",
    about: "Designed to increase transparency in transport operations and reduce vehicle downtime.",
    technologies: ["Odoo", "Python", "PostgreSQL", "JavaScript"],
    challenges: ["Incomplete maintenance logs", "Difficult route-level reporting"],
    solutions: ["Digital checklists and maintenance workflow", "Route analytics and usage dashboard"],
    screenshots: [
      { title: "Fleet Dashboard", src: "https://placehold.co/1100x620/0b132b/e2e8f0?text=Fleet+Dashboard" },
      { title: "Vehicle Detail", src: "https://placehold.co/1100x620/172554/e2e8f0?text=Vehicle+Profile" },
    ],
    repoUrl: "https://github.com/Nasrat-Nasrati",
  },
  {
    id: "ecom",
    title: "Ecommerce Web Application",
    type: "Full Stack Web Platform",
    qualityLevel: "High Quality",
    summary: "A complete ecommerce platform with catalog, cart, checkout, and admin panel.",
    about: "Focused on performance, user experience, and maintainable backend architecture.",
    technologies: ["React", "Spring Boot", "PostgreSQL", "REST API"],
    challenges: ["Slow product list under load", "Session/cart sync edge cases"],
    solutions: ["Pagination + indexing + lazy loading", "Refactor API/session sync logic"],
    screenshots: [
      { title: "Storefront", src: "https://placehold.co/1100x620/111827/e2e8f0?text=Storefront" },
      { title: "Checkout", src: "https://placehold.co/1100x620/1e1b4b/e2e8f0?text=Checkout+Page" },
      { title: "Admin", src: "https://placehold.co/1100x620/1f2937/e2e8f0?text=Admin+Panel" },
    ],
    repoUrl: "https://github.com/Nasrat-Nasrati",
  },
  {
    id: "new-kabul",
    title: "New Kabul System",
    type: "Government Information System",
    qualityLevel: "Mission-Critical",
    summary: "A structured government information system with secure workflows and reporting.",
    about: "Built to support transparent processes, validated data entry, and controlled access.",
    technologies: ["Django", "DRF", "PostgreSQL", "JavaScript", "Bootstrap"],
    challenges: ["Changing stakeholder requirements", "Complex authorization requirements"],
    solutions: ["Iterative planning with milestones", "Layered permissions + strict validation"],
    screenshots: [
      { title: "Main Dashboard", src: "https://placehold.co/1100x620/0f172a/e2e8f0?text=New+Kabul+Dashboard" },
      { title: "Analytics", src: "https://placehold.co/1100x620/1f2937/e2e8f0?text=Analytics" },
    ],
    repoUrl: "https://github.com/Nasrat-Nasrati",
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

        if (!profileRes.ok || !repoRes.ok) throw new Error("GitHub API rate limit or network error");

        setProfile(await profileRes.json());
        const repoJson = await repoRes.json();
        setRepos(Array.isArray(repoJson) ? repoJson : []);
      } catch (err) {
        setError(err.message || "Unable to load GitHub status");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const topRepos = useMemo(() => {
    return [...repos].filter((repo) => !repo.fork).sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 3);
  }, [repos]);

  if (loading) return <p className="muted">Loading live GitHub profile status...</p>;

  if (error || !profile) {
    return (
      <div className="card">
        <p className="muted">Could not load GitHub API data right now.</p>
        <a className="status-link" href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer">Open GitHub Profile →</a>
      </div>
    );
  }

  return (
    <>
      <div className="grid github-stats-grid">
        <article className="card stat-card"><p className="label">Public Repos</p><h3>{profile.public_repos}</h3></article>
        <article className="card stat-card"><p className="label">Followers</p><h3>{profile.followers}</h3></article>
        <article className="card stat-card"><p className="label">Following</p><h3>{profile.following}</h3></article>
        <article className="card stat-card"><p className="label">Created</p><h3>{new Date(profile.created_at).toLocaleDateString()}</h3></article>
      </div>

      <article className="card" style={{ marginTop: "1rem" }}>
        <h3 style={{ marginTop: 0 }}>⭐ Top Repositories</h3>
        {topRepos.length ? (
          <ul className="repo-list">
            {topRepos.map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
                <span>★ {repo.stargazers_count}</span>
              </li>
            ))}
          </ul>
        ) : <p className="muted">No public repositories available.</p>}
      </article>
    </>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close modal">✕</button>

        <h3 className="modal-title">{project.title}</h3>
        <div className="project-meta">
          <span className="meta-pill">Type: {project.type}</span>
          <span className="meta-pill">Quality: {project.qualityLevel}</span>
        </div>

        <h4>Project Summary</h4>
        <p className="muted">{project.summary}</p>

        <h4>About Project</h4>
        <p className="muted">{project.about}</p>

        <div className="details-grid">
          <div>
            <h4>Technologies</h4>
            <div>{project.technologies.map((tech) => <span className="skill-chip" key={tech}>{tech}</span>)}</div>
          </div>
          <div>
            <h4>Challenges</h4>
            <ul>{project.challenges.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>

        <h4>Solutions</h4>
        <ul>{project.solutions.map((item) => <li key={item}>{item}</li>)}</ul>

        <h4>Project Gallery</h4>
        <p className="muted small-note">Replace placeholder images with your real screenshots from each project.</p>
        <div className="gallery-grid">
          {project.screenshots.map((shot) => (
            <figure key={shot.src} className="gallery-item">
              <img src={shot.src} alt={shot.title} loading="lazy" />
              <figcaption>{shot.title}</figcaption>
            </figure>
          ))}
        </div>

        <a className="profile-link" href={project.repoUrl} target="_blank" rel="noreferrer">View repository →</a>
      </div>
    </div>
  );
}

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

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
            On project click, a professional popup opens with summary, about, technologies, challenges, solutions, and screenshot gallery.
          </p>
          <a className="profile-link" href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer">View Full GitHub Profile →</a>
        </div>
      </header>

      <section className="section container" id="skills">
        <h2>🧠 Skills</h2>
        <div className="grid skills-grid">
          {skillGroups.map((group) => (
            <article className="card" key={group.title}>
              <h3>{group.title}</h3>
              <div>{group.skills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section container" id="projects">
        <h2>📌 Professional Projects</h2>
        <p className="muted">Click each project to open popup modal with complete project details and gallery.</p>

        <div className="projects-grid">
          {projects.map((project) => (
            <article className="card project-quick" key={project.id}>
              <h3>{project.title}</h3>
              <p className="muted">{project.summary}</p>
              <button className="open-modal-btn" onClick={() => setSelectedProject(project)}>
                Open Project Details
              </button>
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
          <p>🔗 LinkedIn: <a href="https://www.linkedin.com/in/nasrat-nasrati-691256199/" target="_blank" rel="noreferrer">nasrat-nasrati-691256199</a></p>
          <p>💻 GitHub: <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer">{githubUsername}</a></p>
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} Nasrat Nasrati — Professional Portfolio SPA</footer>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
