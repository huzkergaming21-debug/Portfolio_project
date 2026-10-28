import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownToLine, ArrowRight, BriefcaseBusiness, Check, Code2, Coffee,
  ExternalLink, MapPin, Menu, ShieldCheck, X, Zap
} from 'lucide-react';

type AnyRecord = Record<string, any>;
type Project = { title: string; description: string; tags: string[]; symbol?: string; tone?: string; details: string };

const fallback: AnyRecord = {
  profile: { name: 'Huzker', headline: 'Security Automation Developer', intro: 'I build automation, integrations, and tools that make security operations more efficient.', about: "I'm a security-focused developer with experience in building integrations, automation, and custom tools for threat intelligence and incident response.", location: 'Singapore (GMT+8)', email: 'huzker@example.com', cvUrl: '' },
  aboutDetails: [{label:'Location',value:'Singapore (GMT+8)'},{label:'Team / Focus',value:'SOC / Threat Intel'},{label:'Technologies',value:'Python · Flask · Docker · Elasticsearch'},{label:'Personal Note',value:'Always learning new things'}],
  quickFacts: [{label:'Name',value:'Huzker'},{label:'Role',value:'Security Automation Developer'},{label:'Focus',value:'SOAR, Integrations, Threat Intel'},{label:'Languages',value:'Python, JavaScript, Bash'},{label:'Tools',value:'TheHive, Elasticsearch, Docker'},{label:'Interests',value:'Cybersecurity, Automation, Open Source, Games, Anime'}],
  projects: [
    {title:'Mitch Middleware',description:'TheHive → RT integration middleware with webhook processing, data transformation, and ticket creation.',tags:['Python','Flask','TheHive','RT'],symbol:'↔',tone:'violet',details:'Connects TheHive case workflows with Request Tracker.'},
    {title:'SOVA Alert Manager',description:'Web UI and scripts for querying and deleting TheHive alerts and cases by date range and batch.',tags:['React','Python','TheHive','API'],symbol:'▤',tone:'red',details:'A retention utility and interface for date-scoped alert inventory, dry runs, exports, and controlled deletion.'},
    {title:'Allyza Typosquat Pipeline',description:'Automated typosquatting detection using DNSTwist, TLS inspection, and TheHive alerting.',tags:['Python','PowerShell','DNSTwist'],symbol:'◎',tone:'blue',details:'Combines domain permutation discovery, DNS checks, TLS enrichment, and TheHive alert processing.'},
    {title:'RF2TheHive',description:'Recorded Future intelligence and playbook alert integration for TheHive.',tags:['Python','Threat Intel','TheHive'],symbol:'◈',tone:'cyan',details:'Transforms Recorded Future data into TheHive alerts.'},
    {title:'Bifrost & Truffle',description:'Security platform connectors that route external detections into TheHive workflows.',tags:['Integrations','Webhooks','SOAR'],symbol:'⌘',tone:'amber',details:'Middleware connector work focused on reliable event ingestion and field normalization.'},
    {title:'Threat Intelligence Toolkit',description:'Utilities for extracting, normalizing, and deduplicating historical threat data.',tags:['Python','Pandas','Automation'],symbol:'⌬',tone:'green',details:'Tools for date-range extraction, domain parsing, and deduplication.'}
  ],
  skills:['Python','Flask','Docker','TheHive','Elasticsearch','Kibana','Linux','Git','JavaScript','React','Bash','AWS'],
  experience:[
    {role:'Security Automation Developer',group:'SOC / Threat Intelligence',period:'2023 – Present',detail:'Building integrations, automations, and tools for security operations.'},
    {role:'TheHive Integrations & Middleware',group:'Mitch, Truffle, Bifrost, RF2TheHive',period:'2022 – 2023',detail:'Connecting security platforms through webhooks, APIs, and field mapping.'},
    {role:'Threat Intelligence Tools',group:'SOVA, Allyza, DNSTwist, Custom Scripts',period:'2021 – 2022',detail:'Developing workflows for alert management and threat enrichment.'},
    {role:'Security & Infrastructure',group:'ELK, Linux, Automation, Scripting',period:'2020 – 2021',detail:'Supporting systems and practical security tooling.'}
  ],
  contacts:[{label:'Email',value:'huzker@example.com',url:'mailto:huzker@example.com'},{label:'GitLab',value:'git.soc.rrsi.int/huzker',url:'https://git.soc.rrsi.int/huzker'},{label:'LinkedIn',value:'linkedin.com/in/huzker',url:'https://www.linkedin.com/in/huzker'}]
};

async function api(path: string, method = 'GET', body?: unknown) {
  const response = await fetch(path, { method, credentials: 'include', headers: body ? {'Content-Type':'application/json'} : undefined, body: body ? JSON.stringify(body) : undefined });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
}

function SectionTitle({children}: {children: React.ReactNode}) {
  return <div className="section-heading"><h2>{children}</h2><span className="heading-line" /></div>;
}

export default function App() {
  const [content, setContent] = useState<AnyRecord>(fallback);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [editor, setEditor] = useState('');
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/api/portfolio').then(data => setContent({...fallback, ...data.content, profile:{...fallback.profile,...data.content.profile}})).catch(() => undefined);
    api('/api/admin/session').then(data => setAuthenticated(Boolean(data.authenticated))).catch(() => undefined);
  }, []);

  const profile = content.profile || fallback.profile;
  const projects: Project[] = Array.isArray(content.projects) ? content.projects : fallback.projects;
  const skills = Array.isArray(content.skills) ? content.skills : fallback.skills;
  const experience = Array.isArray(content.experience) ? content.experience : fallback.experience;
  const facts = Array.isArray(content.quickFacts) ? content.quickFacts : fallback.quickFacts;
  const aboutDetails = Array.isArray(content.aboutDetails) ? content.aboutDetails : fallback.aboutDetails;
  const contacts = Array.isArray(content.contacts) ? content.contacts : fallback.contacts;
  const yearsExperience = useMemo(() => {
    const starts = experience.map((item: AnyRecord) => String(item.period || '').match(/\b(?:19|20)\d{2}\b/)).filter(Boolean).map((match: any) => Number(match[0]));
    return starts.length ? Math.max(0, new Date().getFullYear() - Math.min(...starts)) : 0;
  }, [experience]);

  const go = (name: string) => {
    setActiveNav(name); setMenuOpen(false);
    document.getElementById(name.toLowerCase())?.scrollIntoView({behavior:'smooth',block:'start'});
  };
  const openAdmin = async () => {
    setAdminOpen(true); setError('');
    try {
      const status = await api('/api/admin/session');
      setAuthenticated(Boolean(status.authenticated));
      if (status.authenticated) setEditor(JSON.stringify((await api('/api/admin/content')).content, null, 2));
    } catch (e) { setError((e as Error).message); }
  };
  const login = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true); setError('');
    try {
      await api('/api/admin/login','POST',{username,password});
      const result = await api('/api/admin/content');
      setAuthenticated(true); setEditor(JSON.stringify(result.content,null,2)); setPassword('');
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  };
  const save = async () => {
    setBusy(true); setError(''); setSaved(false);
    try {
      const parsed = JSON.parse(editor);
      await api('/api/admin/content','PUT',{content:parsed});
      setContent(parsed); setSaved(true);
    } catch (e) { setError((e as Error).message || 'Could not save content.'); }
    finally { setBusy(false); }
  };
  const logout = async () => {
    try { await api('/api/admin/logout','POST',{}); } catch {}
    setAuthenticated(false); setEditor(''); setPassword('');
  };

  return <div className="site-shell">
    <header className="topbar">
      <a className="brand" href="#home" onClick={e=>{e.preventDefault();go('Home')}}><span className="brand-mark">H</span>uzker</a>
      <button className="mobile-menu-toggle" aria-label={menuOpen?'Close navigation':'Open navigation'} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X size={21}/>:<Menu size={21}/>}</button>
      <nav className={menuOpen?'main-nav nav-open':'main-nav'} aria-label="Main navigation">{['Home','About','Projects','Experience','Skills','Contact'].map(item=><button key={item} className={activeNav===item?'nav-link active':'nav-link'} onClick={()=>go(item)}>{item}</button>)}</nav>
      <div className="topbar-actions"><button className="admin-entry" onClick={openAdmin}>Admin</button><a className="cv-button" href={profile.cvUrl || `mailto:${profile.email || 'huzker@example.com'}?subject=CV%20Request`}>Download CV <ArrowDownToLine size={15}/></a></div>
    </header>
    <main>
      <div className="top-grid">
        <section className="hero panel" id="home">
          <div className="hero-copy">
            <p className="eyebrow">IT / CYBERSECURITY / AUTOMATION</p>
            <h1 className="hero-greeting"><span className="hero-greeting-label">Hi, I’m</span><span className="hero-greeting-name">{profile.name || 'Huzker'}</span></h1>
            <p className="hero-lead">{profile.intro}</p>
            <p className="hero-text">I work on SOAR integrations, threat intelligence pipelines, alert management, and custom tools to support security operations and incident response.</p>
            <div className="hero-actions"><button className="button button-primary" onClick={()=>go('Projects')}>View My Projects <ArrowRight size={16}/></button><button className="button button-secondary" onClick={()=>go('Contact')}>Contact Me</button></div>
          </div>
          <div className="hero-art" role="img" aria-label="Illustrated dark cybersecurity workstation with monitoring screens">
            <div className="art-grid"/><div className="screen screen-one"><span>THREAT MONITOR</span><i/><i/><i/><b/></div><div className="screen screen-two"><span>NETWORK ACTIVITY</span><div className="map-orbit"><div/></div><b/></div><div className="screen screen-three"><span>EVENT STREAM</span><i/><i/><i/><i/></div><div className="desk-glow"/><div className="plant"><span/><span/><span/></div><div className="desk"/><div className="chair"><div className="chair-back"/><div className="chair-seat"/><div className="chair-leg"/></div><div className="art-caption"><span className="live-dot"/> SECURITY OPERATIONS <span>SYS / 01</span></div>
          </div>
        </section>
        <section className="about panel" id="about">
          <div className="about-main"><SectionTitle>About Me</SectionTitle><p className="about-copy">{profile.about}</p><div className="fact-list">{aboutDetails.map((item:AnyRecord,index:number)=>{const Icon=[MapPin,BriefcaseBusiness,Code2,Coffee][index%4];return <div key={`${item.label}-${index}`}><Icon/><span>{item.value}</span></div>})}</div></div>
          <aside className="quick-facts"><h3>Quick Facts</h3><dl>{facts.map((item:AnyRecord,index:number)=><div key={`${item.label}-${index}`}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></aside>
        </section>
      </div>
      <div className="middle-grid">
        <div className="left-stack">
          <section className="stats-row panel" aria-label="Portfolio highlights">
            <div className="stat"><div className="stat-icon"><Code2/></div><div><strong>{projects.length}</strong><span>Projects</span></div></div>
            <div className="stat"><div className="stat-icon"><Zap/></div><div><strong>{yearsExperience}+</strong><span>Years Experience</span></div></div>
            <div className="stat"><div className="stat-icon"><ShieldCheck/></div><div><strong>Security</strong><span>Focused</span></div></div>
            <div className="stat"><div className="stat-icon"><Zap/></div><div><strong>Automation</strong><span>Driven</span></div></div>
          </section>
          <section className="projects-section panel" id="projects"><div className="section-topline"><SectionTitle>Featured Projects</SectionTitle><button className="text-link" onClick={()=>setShowAllProjects(!showAllProjects)}>{showAllProjects?'Show Featured':'View All Projects'} <ArrowRight size={15}/></button></div>
            <div className="projects-grid">{(showAllProjects?projects:projects.slice(0,3)).map(project=><article className="project-card" key={project.title}><div className={`project-symbol ${project.tone||'blue'}`}>{project.symbol||'◇'}</div><div className="project-content"><h3>{project.title}</h3><p>{project.description}</p></div><div className="tag-row">{(project.tags||[]).map(tag=><span key={tag}>{tag}</span>)}</div><button className="project-link" onClick={()=>setSelectedProject(project)}>View Project <ArrowRight size={14}/></button></article>)}</div>
          </section>
        </div>
        <section className="skills-section panel" id="skills"><SectionTitle>Skills &amp; Tools</SectionTitle><div className="skills-grid">{skills.map((skill:any)=>{const name=typeof skill==='string'?skill:skill.name;const mark=typeof skill==='string'?skill.slice(0,2):(skill.mark||skill.name.slice(0,2));const color=typeof skill==='string'?'python':(skill.color||'python');return <div className="skill-card" key={name} title={name}><div className={`skill-mark ${color}`}>{mark}</div><span>{name}</span></div>})}</div></section>
      </div>
      <div className="bottom-grid">
        <section className="experience-section panel" id="experience"><SectionTitle>Experience</SectionTitle><div className="timeline">{experience.map((item:AnyRecord)=><article className="timeline-item" key={item.role}><div className="timeline-marker"/><div className="timeline-body"><h3>{item.role}</h3><p>{item.group}</p><span className="timeline-detail">{item.detail}</span></div><div className="timeline-meta"><span>{item.period}</span><small>{profile.location||'Singapore'}</small></div></article>)}</div></section>
        <section className="contact-section panel" id="contact"><div className="contact-art"><div className="city-window">{Array.from({length:9},(_,i)=><span key={i}/>)}</div><div className="contact-monitor"><b>01</b><i/><i/><i/><i/></div><div className="contact-chair"/></div><div className="contact-content"><SectionTitle>Get In Touch</SectionTitle><p>Feel free to reach out if you want to collaborate, discuss a project, or just say hi. I'm always open to new opportunities and interesting ideas.</p><div className="contact-cards">{contacts.map((item:AnyRecord,index:number)=><a key={`${item.label}-${index}`} href={item.url||'#contact'} target={item.url?.startsWith('http')?'_blank':undefined} rel={item.url?.startsWith('http')?'noreferrer':undefined} className="contact-card"><span className="contact-icon">{item.label?.slice(0,2)||'↗'}</span><span><strong>{item.label}</strong><small>{item.value||item.url}</small></span><ExternalLink size={12} className="external-icon"/></a>)}</div></div></section>
      </div>
    </main>
    <footer className="footer"><a className="brand" href="#home" onClick={e=>{e.preventDefault();go('Home')}}><span className="brand-mark">H</span>uzker</a><p>Built with curiosity. Secured with care.</p><span>© {new Date().getFullYear()} Huzker</span></footer>

    {adminOpen && <div className="admin-backdrop" role="presentation" onClick={()=>setAdminOpen(false)}><section className="admin-panel" role="dialog" aria-modal="true" aria-labelledby="admin-title" onClick={e=>e.stopPropagation()}><button className="admin-close" aria-label="Close admin dashboard" onClick={()=>setAdminOpen(false)}>×</button><p className="eyebrow">PORTFOLIO CONTROL</p><h2 id="admin-title">Admin dashboard</h2>
      {!authenticated ? <form className="admin-login" onSubmit={login}><p>Sign in to manage your portfolio content.</p><label>Username<input autoComplete="username" value={username} onChange={e=>setUsername(e.target.value)} required/></label><label>Password<input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required/></label><button className="button button-primary" type="submit" disabled={busy}>{busy?'Signing in…':'Sign in'}</button></form> :
      <div className="admin-editor"><div className="admin-editor-heading"><div><h3>Portfolio content</h3><p>Edit profile, About Me details, Quick Facts, projects, skills, experience, and contact links as JSON. About Me details use an aboutDetails array of label/value pairs; Quick Facts use quickFacts.</p></div><button className="admin-logout" onClick={logout}>Sign out</button></div><textarea aria-label="Portfolio content JSON editor" spellCheck={false} value={editor} onChange={e=>{setEditor(e.target.value);setSaved(false)}}/><div className="admin-editor-actions"><span>{saved?'Saved to persistent storage.':'Changes are not public until saved.'}</span><button className="button button-primary" onClick={save} disabled={busy}>{busy?'Saving…':'Save changes'}</button></div></div>}
      {error && <p className="admin-error" role="alert">{error}</p>}
    </section></div>}

    {selectedProject && <div className="modal-backdrop" role="presentation" onClick={()=>setSelectedProject(null)}><section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={e=>e.stopPropagation()}><button className="modal-close" aria-label="Close project details" onClick={()=>setSelectedProject(null)}><X size={19}/></button><div className={`project-symbol modal-symbol ${selectedProject.tone||'blue'}`}>{selectedProject.symbol||'◇'}</div><p className="eyebrow">PROJECT / CASE STUDY</p><h2 id="project-modal-title">{selectedProject.title}</h2><p>{selectedProject.details}</p><div className="tag-row">{(selectedProject.tags||[]).map(tag=><span key={tag}>{tag}</span>)}</div><button className="button button-primary modal-done" onClick={()=>setSelectedProject(null)}>Close details <Check size={15}/></button></section></div>}
  </div>;
}
