import './App.css';

const projects = [
  {
    number: '01',
    title: 'Middleware Integration',
    category: 'Security Automation',
    description:
      'Integrating security platforms and automating the transfer of threat intelligence and alerts between systems.',
    technologies: ['Python', 'Flask', 'REST API'],
  },
  {
    number: '02',
    title: 'SOVA Alert Manager',
    category: 'Security Tooling',
    description:
      'A web interface for querying, reviewing, and managing security alerts with date-based filtering.',
    technologies: ['React', 'Python', 'TheHive'],
  },
  {
    number: '03',
    title: 'Typosquat Detection Pipeline',
    category: 'Threat Intelligence',
    description:
      'A detection workflow that generates domain permutations, enriches TLS certificate information, and processes alerts.',
    technologies: ['Python', 'DNSTwist', 'TLS'],
  },
  {
    number: '04',
    title: 'Playbook Alert Integration',
    category: 'Threat Intelligence',
    description:
      'Processing threat intelligence playbooks and tracking updates to produce distinguishable alerts.',
    technologies: ['Python', 'Flask', 'TheHive'],
  },
];

const skills = [
  'Python',
  'Flask',
  'React',
  'JavaScript',
  'REST APIs',
  'Docker',
  'Linux',
  'SQLite',
  'Elasticsearch',
  'Git',
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function App() {
  return (
    <div className="portfolio">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Huzker home">
          <span className="brand-mark">H</span>
          <span>
            huzker<span className="brand-period">.</span>
          </span>
        </a>

        <nav className="navigation" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a className="nav-contact" href="#contact">
            Contact <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main>
        <section className="hero section-container" id="home">
          <div className="hero-content">
            <div className="availability">
              <span className="status-dot" />
              Portfolio and projects
            </div>

            <p className="hero-intro">HELLO, I'M HUZKER</p>

            <h1>
              Building tools
              <br />
              for a <span>more secure</span>
              <br />
              digital world.
            </h1>

            <p className="hero-description">
              I work on security automation, middleware integrations, and tools that make complex
              workflows simpler and more reliable.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore my work <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-secondary" href="#contact">
                Get in touch
              </a>
            </div>

            <div className="hero-meta">
              <span>Security automation</span>
              <span className="meta-separator" />
              <span>Backend development</span>
              <span className="meta-separator" />
              <span>Integration engineering</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Developer workspace illustration">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />

            <div className="visual-card">
              <div className="visual-card-header">
                <div className="window-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="visual-label">SYSTEM / OVERVIEW</span>
              </div>

              <div className="visual-code">
                <p>
                  <span className="code-muted">01</span> <span className="code-purple">class</span>{' '}
                  <span className="code-blue">SecurityWorkflow</span>:
                </p>
                <p>
                  <span className="code-muted">02</span> &nbsp;&nbsp;
                  <span className="code-purple">def</span>{' '}
                  <span className="code-blue">process</span>(self):
                </p>
                <p>
                  <span className="code-muted">03</span> &nbsp;&nbsp;&nbsp;&nbsp;alerts =
                  self.collect()
                </p>
                <p>
                  <span className="code-muted">04</span> &nbsp;&nbsp;&nbsp;&nbsp;results =
                  self.analyze(alerts)
                </p>
                <p>
                  <span className="code-muted">05</span> &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="code-purple">return</span> results
                </p>
              </div>

              <div className="visual-divider" />

              <div className="system-status">
                <div>
                  <span className="status-indicator" />
                  <span>Workflow status</span>
                </div>
                <strong>Automated</strong>
              </div>
              <div className="status-track">
                <span />
              </div>
              <p className="visual-footer">BUILDING · INTEGRATING · IMPROVING</p>
            </div>

            <div className="floating-badge badge-top">
              <span className="badge-symbol">&lt;/&gt;</span>
              <div>
                <strong>Clean code</strong>
                <small>Built to maintain</small>
              </div>
            </div>

            <div className="floating-badge badge-bottom">
              <span className="badge-symbol badge-symbol-small">API</span>
              <div>
                <strong>Connected systems</strong>
                <small>Reliable integrations</small>
              </div>
            </div>
          </div>

          <a className="scroll-cue" href="#about">
            <span className="scroll-line" />
            SCROLL TO EXPLORE
          </a>
        </section>

        <section className="about section-container" id="about">
          <SectionHeading
            eyebrow="01 / ABOUT ME"
            title="Turning complex workflows into practical solutions."
            description="I focus on building tools that connect systems, automate repetitive tasks, and help technical teams work more efficiently."
          />

          <div className="about-grid">
            <article className="about-card">
              <span className="card-index">01</span>
              <h3>Automation first</h3>
              <p>
                Reduce repetitive manual work through dependable scripts, structured workflows, and
                thoughtful automation.
              </p>
            </article>

            <article className="about-card">
              <span className="card-index">02</span>
              <h3>Systems integration</h3>
              <p>
                Connect APIs and platforms so information can move between systems with consistency
                and control.
              </p>
            </article>

            <article className="about-card">
              <span className="card-index">03</span>
              <h3>Practical engineering</h3>
              <p>
                Build maintainable solutions with clear logic, useful documentation, and room for
                future improvements.
              </p>
            </article>
          </div>
        </section>

        <section className="projects section-container" id="projects">
          <SectionHeading
            eyebrow="02 / SELECTED WORK"
            title="Projects built to solve real problems."
            description="A selection of development and security automation projects. Project descriptions and details can be customized later through the admin dashboard."
          />

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className="project-card-top">
                  <span className="project-number">{project.number}</span>
                  <span className="project-category">{project.category}</span>
                </div>

                <div className="project-card-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>

                <div className="project-tags">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="skills section-container" id="skills">
          <SectionHeading
            eyebrow="03 / TOOLKIT"
            title="Tools I work with."
            description="Technologies used across application development, automation, integrations, and infrastructure."
          />

          <div className="skills-list">
            {skills.map((skill) => (
              <span className="skill-item" key={skill}>
                <span className="skill-marker" />
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="experience section-container" id="experience">
          <SectionHeading
            eyebrow="04 / EXPERIENCE"
            title="Learning by building."
            description="A growing collection of practical experience across security tooling, automation, and software integration."
          />

          <div className="experience-entry">
            <div className="experience-marker">
              <span />
            </div>
            <div className="experience-content">
              <div className="experience-topline">
                <span className="experience-type">TECHNICAL PROJECTS</span>
                <span className="experience-date">Ongoing</span>
              </div>
              <h3>Security Automation & Integration</h3>
              <p>
                Developing Python-based middleware, connecting security platforms, improving alert
                workflows, and creating utilities for threat intelligence processing.
              </p>
              <div className="project-tags">
                <span>Python</span>
                <span>APIs</span>
                <span>Automation</span>
                <span>Linux</span>
              </div>
            </div>
          </div>
        </section>

        <section className="contact section-container" id="contact">
          <div className="contact-panel">
            <span className="eyebrow">05 / CONTACT</span>
            <h2>Have a problem worth solving?</h2>
            <p>
              I'm interested in practical engineering, automation, and opportunities to build useful
              technology.
            </p>
            <a className="button button-primary" href="mailto:your-email@example.com">
              Email me <span aria-hidden="true">↗</span>
            </a>
            <p className="contact-note">
              Replace the sample email address with your real contact address.
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer section-container">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">H</span>
          <span>
            huzker<span className="brand-period">.</span>
          </span>
        </a>
        <p>Designed and built with care.</p>
        <a className="back-to-top" href="#home">
          Back to top ↑
        </a>
      </footer>
    </div>
  );
}

export default App;
