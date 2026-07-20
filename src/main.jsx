import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  ArrowUpRight,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import "./styles.css";

const work = [
  {
    year: "2025",
    award: "1st place · ARB Builder House",
    name: "ScholFii",
    description:
      "A decentralized GameFi and staking protocol built with Solidity, Chainlink VRF, and secure oracle routing.",
    tools: "Solidity · Chainlink · GameFi",
  },
  {
    year: "2025",
    award: "1st place · ApeChain Africa",
    name: "Cetawave",
    description:
      "A full-stack savings and lending platform with channel-based liquidity, community-led loan governance, and a web-to-mobile ecosystem.",
    tools: "Next.js · React Native · Solidity",
  },
  {
    year: "2025",
    award: "1st runner-up · Innovation Hackathon",
    name: "Crop disease detection",
    description:
      "An AI-powered agricultural tool using multimodal vision models to identify and diagnose crop diseases from images.",
    tools: "React · AI vision · AgriTech",
  },
];

const experience = [
  {
    period: "2025 — now",
    role: "Frontend Engineer",
    company: "AmaliTech",
    note: "Building production-ready interfaces with React, component-driven architecture, and modern engineering practices.",
  },
  {
    period: "2024",
    role: "Software Developer Intern",
    company: "Noni Hub",
    note: "Led frontend delivery for an ERP system and mentored junior developers through practical training sessions.",
  },
  {
    period: "2023",
    role: "Frontend Developer Intern",
    company: "Noni Hub",
    note: "Led web development sessions for trainees.",
  },
  {
    period: "2021 — 2022",
    role: "Frontend Developer",
    company: "Xcelsz Property Solutions · Northway Commerce Hub",
    note: "Built responsive web experiences and helped ship an MVP dashboard in close collaboration with product teams.",
  },
];

const skills = [
  "JavaScript",
  "React",
  "Next.js",
  "React Native",
  "Flutter",
  "Tailwind CSS",
  "REST APIs",
  "MongoDB",
  "Solidity",
  "AWS",
  "Figma",
  "Git",
];

function XIcon({ size = 19, strokeWidth = 1.5 }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <path
        d="M5 4 19 20M19 4 5 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}

const socials = [
  {
    name: "Instagram",
    handle: "@a.j_mczorwi",
    href: "https://instagram.com/a.j_mczorwi",
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    handle: "/in/ajzorwi",
    href: "https://linkedin.com/in/ajzorwi",
    icon: Linkedin,
  },
  {
    name: "X",
    handle: "@_nerdjemah",
    href: "https://x.com/_nerdjemah",
    icon: XIcon,
  },
  {
    name: "Email",
    handle: "devjimah@gmail.com",
    href: "mailto:devjimah@gmail.com",
    icon: Mail,
  },
];

function ExperienceRoadmap() {
  const roadmapRef = useRef(null);
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    const roadmap = roadmapRef.current;
    if (!roadmap) return undefined;

    const items = Array.from(roadmap.querySelectorAll(".roadmap-item"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const itemIndex = Number(entry.target.dataset.index);
          entry.target.classList.add("is-revealed");
          setRevealedCount((current) => Math.max(current, itemIndex + 1));
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -22% 0px", threshold: 0.25 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const progress = experience.length > 1
    ? Math.max(0, (revealedCount - 1) / (experience.length - 1))
    : 1;

  return (
    <div
      className="roadmap"
      ref={roadmapRef}
      style={{ "--roadmap-progress": progress }}
    >
      <div className="roadmap-track" aria-hidden="true">
        <span />
      </div>
      {experience.map((item, index) => (
        <article
          className="roadmap-item"
          data-index={index}
          key={`${item.company}-${item.period}`}
        >
          <div className="roadmap-marker" aria-hidden="true">
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div className="roadmap-content">
            <p className="period">{item.period}</p>
            <h3>{item.role}</h3>
            <p className="company">{item.company}</p>
            <p className="note">{item.note}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function ContactForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = formRef.current;
    if (!form || status === "sending") return;

    const formData = new FormData(form);
    if (formData.get("company")) {
      form.reset();
      setStatus("sent");
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");

    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const message = {
    sent: "Thanks — your message is on its way.",
    error: "The message could not be sent. Please try again or email me directly.",
    unconfigured: "Email delivery is not connected yet. Please email me directly.",
  }[status];

  return (
    <div className="contact-layout">
      <div className="contact-intro">
        <p className="label">Have a project in mind?</p>
        <h2 id="contact-title">Let’s make it useful.</h2>
        <p>
          Tell me what you’re building, where you’re stuck, or simply say hello.
          I’ll get back to you as soon as I can.
        </p>
        <a href="mailto:devjimah@gmail.com">devjimah@gmail.com</a>
      </div>

      <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            <span>Name</span>
            <input name="from_name" type="text" autoComplete="name" required />
          </label>
          <label>
            <span>Email</span>
            <input name="from_email" type="email" autoComplete="email" required />
          </label>
        </div>
        <label>
          <span>Message</span>
          <textarea name="message" rows="5" required />
        </label>
        <label className="form-trap" aria-hidden="true">
          <span>Company</span>
          <input name="company" type="text" tabIndex="-1" autoComplete="off" />
        </label>
        <div className="form-footer">
          <button className="button primary submit-button" type="submit" disabled={status === "sending"}>
            <Mail size={17} />
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          {message ? (
            <p className={`form-status ${status}`} role="status">{message}</p>
          ) : (
            <p className="form-note">Your details are only used to reply.</p>
          )}
        </div>
      </form>
    </div>
  );
}

function App() {
  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Back to top">
          AJZ<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#socials">Socials</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="eyebrow reveal">
            <span className="status-dot" />
            Kumasi, Ghana · Available for meaningful work
          </div>
          <h1 id="hero-title" className="reveal delay-1">
            I build interfaces
            <br />
            that feel <em>obvious.</em>
          </h1>
          <div className="hero-bottom reveal delay-2">
            <p>
              I’m <strong>Abraham Jimah Zorwi</strong>, a frontend engineer creating
              responsive products across web, mobile, and emerging technology.
            </p>
            <a className="round-link" href="#work" aria-label="View selected work">
              <ArrowDown size={20} strokeWidth={1.5} />
            </a>
          </div>
        </section>

        <section className="section" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="label">01 / Selected work</p>
            <h2 id="work-title">Built to solve real problems.</h2>
          </div>
          <div className="work-list">
            {work.map((project, index) => (
              <article className="project" key={project.name}>
                <div className="project-number">0{index + 1}</div>
                <div>
                  <p className="award">{project.award}</p>
                  <h3>{project.name}</h3>
                </div>
                <p className="project-description">{project.description}</p>
                <p className="tools">{project.tools}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section split-section" id="experience" aria-labelledby="experience-title">
          <div className="section-heading sticky-heading">
            <p className="label">02 / Experience</p>
            <h2 id="experience-title">Learning by shipping.</h2>
          </div>
          <ExperienceRoadmap />
        </section>

        <section className="section capabilities" aria-labelledby="capabilities-title">
          <div>
            <p className="label">03 / Capabilities</p>
            <h2 id="capabilities-title">A practical toolkit for product work.</h2>
          </div>
          <div className="skill-list">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
          <div className="credentials">
            <p>AWS Certified Cloud Practitioner · 2026</p>
            <p>Microsoft Learn Student Ambassador · 2023</p>
            <p>Information Technology · C.K. Tedam University</p>
          </div>
        </section>

        <section className="section socials" id="socials" aria-labelledby="socials-title">
          <div className="section-heading">
            <p className="label">04 / Elsewhere</p>
            <h2 id="socials-title">Find me on the internet.</h2>
          </div>
          <div className="social-composition">
            <div className="fragmented-image" aria-label="A phone connected by a looping orange cable">
              <figure className="image-source">
                <img
                  src="/images/social-connect.webp"
                  alt="A phone and orange cable arranged as an editorial still life"
                  loading="lazy"
                />
              </figure>
              <figure className="image-fragment" aria-hidden="true">
                <img src="/images/social-connect.webp" alt="" loading="lazy" />
              </figure>
              <span className="fragment-line" aria-hidden="true" />
              <span className="fragment-index" aria-hidden="true">01</span>
            </div>
            <div className="social-list">
              {socials.map(({ name, handle, href, icon: Icon }) => (
                <a
                  className="social-link"
                  href={href}
                  key={name}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <span className="social-icon"><Icon size={19} strokeWidth={1.5} /></span>
                  <span className="social-name">{name}</span>
                  <span className="social-handle">{handle}</span>
                  <ArrowUpRight className="social-arrow" size={20} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" aria-labelledby="contact-title">
          <ContactForm />
        </section>
      </main>

      <footer>
        <p>Abraham Jimah Zorwi</p>
        <p>Frontend Engineer · 2026</p>
        <a href="#top">Back to top <ArrowUpRight size={14} /></a>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
