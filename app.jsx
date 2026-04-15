const { useEffect, useState } = React;

const roles = [
  "Full Stack Developer (Java + React)",
  "Python & Django Specialist",
  "ERP (Odoo) Developer",
  "Database Engineer (PostgreSQL)",
];

const skillGroups = [
  {
    title: "Backend",
    skills: ["Python", "Django", "DRF", "Java", "Spring Boot"],
  },
  {
    title: "Frontend",
    skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind", "Bootstrap"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MySQL", "SQLite", "Query Optimization"],
  },
  {
    title: "ERP & Tools",
    skills: ["Odoo", "AWS EC2", "AWS S3", "Git", "GitHub", "GitLab"],
  },
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
        setTimeout(() => setIsDeleting(true), 900);
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

function App() {
  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <strong>Nasrat Portfolio</strong>
          <div className="nav-links">
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#stats">Stats</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <header className="hero container">
        <div className="hero-card">
          <span className="badge">📍 Kabul, Afghanistan</span>
          <h1>Hi 👋, I'm Nasrat Nasrati</h1>
          <TypingLine />
          <p className="muted">
            I build scalable systems with Java, Spring Boot, React, Python, Django, and
            PostgreSQL. I enjoy solving real-world problems through clean architecture and
            practical engineering.
          </p>
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
        <h2>📈 GitHub Activity</h2>
        <div className="stats-wrap">
          <img
            src="https://github-readme-stats.vercel.app/api?username=Nasrat-Nasrati&show_icons=true&theme=transparent"
            alt="GitHub stats"
          />
          <img
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=Nasrat-Nasrati&layout=compact&theme=transparent"
            alt="Top languages"
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <img
            className="snake"
            src="https://raw.githubusercontent.com/Nasrat-Nasrati/Nasrat-Nasrati/output/snake.svg"
            alt="Contribution snake animation"
          />
        </div>
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
            <a href="https://github.com/Nasrat-Nasrati" target="_blank" rel="noreferrer">
              Nasrat-Nasrati
            </a>
          </p>
        </div>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Nasrat Nasrati — Developer Portfolio SPA
      </footer>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
