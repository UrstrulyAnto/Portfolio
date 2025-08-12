document.addEventListener("DOMContentLoaded", () => {
  // Persistent theme
  if (window.localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    document.getElementById("theme-toggle").textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    document.getElementById("theme-toggle").textContent = "🌙";
  }

  document.getElementById("name").textContent = portfolioData.name;

  // --- ABOUT ---
  document.getElementById("about").innerHTML = `
    <div class="section-flex">
      <div class="about-card">
        <h2>About Me</h2>
        <p>${portfolioData.bio}</p>
        <div class="contact-info-icons">
          <div class="contact-row">
            <span class="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M6.13 3.38a1 1 0 0 1 1.45-.11l2.29 1.93c.44.37.52 1.03.18 1.48l-1.31 1.81a16.05 16.05 0 0 0 6.12 6.12l1.81-1.31a1 1 0 0 1 1.48.18l1.93 2.29c.3.34.28.85-.11 1.14-.82.7-1.77 1.2-2.79 1.33-2.53.33-6.5.15-10.39-3.75a15.91 15.91 0 0 1-3.75-10.39c.13-1.02.63-1.97 1.33-2.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <b>Phone:</b> ${portfolioData.contact.phone}
          </div>
          <div class="contact-row">
            <span class="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 21C12 21 5 13.5 5 9a7 7 0 0 1 14 0c0 4.5-7 12-7 12z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="9" r="2.5" fill="currentColor"/>
              </svg>
            </span>
            <b>Location:</b> 
            <a href="https://www.google.com/maps/place/Tenkasi" target="_blank" rel="noopener noreferrer" class="location-link">
              ${portfolioData.contact.location}
            </a>
          </div>
          <div class="contact-row">
            <span class="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M3.5 5.5L12 13L20.5 5.5" stroke="currentColor" stroke-width="2"/>
              </svg>
            </span>
            <b>Email:</b> 
            <a href="#" class="email-link" id="aboutEmail">${portfolioData.contact.email}</a>
          </div>
        </div>
      </div>
      <div class="about-keywords">
        <span class="about-chip">IoT</span>
        <span class="about-chip">Automation</span>
        <span class="about-chip">Intelligent Systems</span>
        <span class="about-chip">Web</span>
        <span class="about-chip">Embedded</span>
        <span class="about-chip">Robotics</span>
      </div>
    </div>
  `;
  document.getElementById('aboutEmail').onclick = function(e) {
    e.preventDefault();
    const email = portfolioData.contact.email;
    const subject = "Contact from Portfolio";
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}`;
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    let win = window.open(gmailUrl, "_blank");
    setTimeout(() => {
      if (!win || win.closed || typeof win.closed == "undefined") {
        window.location.href = mailtoUrl;
      }
    }, 350);
  };

  // --- EDUCATION ---
  document.getElementById("education").innerHTML = `
    <h2>Education</h2>
    <div class="timeline-vertical">
      ${portfolioData.education.map((ed,i) => `
        <div class="timeline-item ${i%2?'right':'left'}">
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <h3>${ed.degree}</h3>
            <p>${ed.institution}</p>
            <span class="timeline-date">${ed.duration}</span>
            <span class="timeline-gpa">${ed.gpa}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // --- SKILLS ---
  document.getElementById("skills").innerHTML = `
    <h2>Skills</h2>
    <div class="skills-group">${Object.entries(portfolioData.skills).map(([category, arr]) => `
      <div class="skills-block">
        <div class="skills-block-title">${category.charAt(0).toUpperCase() + category.slice(1)}</div>
        <div class="skills-tags">
          ${arr.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
      </div>
    `).join('')}</div>
    <div class="courses-list">
      <h3>Courses & Certifications</h3>
      <ul>
        ${portfolioData.courses.map(course => `<li>${course}</li>`).join('')}
      </ul>
    </div>
  `;

  // --- PROJECTS ---
  document.getElementById("projects").innerHTML = `
    <h2>Projects</h2>
    <div class="projects-grid">
      ${(portfolioData.projects || []).map(project => `
        <div class="project-card">
          <div class="project-img-wrap">
            <img src="${project.image}" alt="${project.name} image" class="project-img">
          </div>
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <a href="${project.github}" target="_blank" class="code-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none">
              <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9.5 17l-6-5 6-5M14.5 7l6 5-6 5"/>
            </svg>
            Code
          </a>
        </div>
      `).join("")}
    </div>
  `;

  // --- EXPERIENCE ---
  document.getElementById("experience").innerHTML = `
    <h2>Experience</h2>
    <div class="experience-list">
      ${portfolioData.experience.map(exp => `
        <div class="experience-card">
          <div class="exp-title-row">
            <span class="exp-company">${exp.company}</span>
            <span class="exp-role">${exp.role}</span>
            <span class="exp-duration">${exp.duration}</span>
          </div>
          <ul class="exp-tasks">
            ${exp.tasks.map(task => `<li>${task}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
  `;

  // --- CERTIFICATIONS ---
  document.getElementById("certifications").innerHTML = `
    <h2>Certifications & Awards</h2>
    <div class="cert-badge-row">
      ${portfolioData.certifications.map(cert => `
        <span class="cert-badge" title="${cert}">🏅 ${cert}</span>
      `).join('')}
    </div>
  `;

  // --- CONTACT ---
  document.getElementById("contact").innerHTML = `
    <h2>Contact Me</h2>
    <div class="contact-restore">
      <form id="contactForm">
        <input type="text" id="userName" placeholder="Your Name" required>
        <input type="email" id="userEmail" placeholder="Your Email" required>
        <textarea id="userMessage" placeholder="Your Message" required></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  `;

  // Theme Toggle
  document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      document.getElementById("theme-toggle").textContent = "☀️";
      window.localStorage.setItem("theme", "dark");
    } else {
      document.getElementById("theme-toggle").textContent = "🌙";
      window.localStorage.setItem("theme", "light");
    }
  });

  // Navbar smooth scroll & active highlight
  document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const section = document.querySelector(link.getAttribute("href"));
      const header = document.querySelector('.header-content');
      const headerOffset = header.offsetHeight || 70;
      const sectionY = section.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: sectionY, behavior: "smooth" });
      document.querySelectorAll("nav ul li a").forEach(btn => btn.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Unique animation for main sections
  const sectionEls = document.querySelectorAll('.section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
      else entry.target.classList.remove('visible');
    });
  }, { threshold: 0.4 });
  sectionEls.forEach(section => sectionObserver.observe(section));

  // Animate EACH project card
  function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    const cardObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('visible');
        else entry.target.classList.remove('visible');
      });
    }, { threshold: 0.2 });
    projectCards.forEach(card => cardObserver.observe(card));
  }
  animateProjectCards();

  // Floating Top button: show only after leaving About (top-most) section
  function showSectionsOnScroll() {
    const aboutSec = document.getElementById("about");
    const topBtn = document.getElementById("top-btn");
    const aboutRect = aboutSec.getBoundingClientRect();
    if (aboutRect.bottom > 70) topBtn.style.display = "none";
    else topBtn.style.display = "flex";
  }
  window.addEventListener("scroll", showSectionsOnScroll);
  showSectionsOnScroll();
  document.getElementById("top-btn").onclick = function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Contact form: Gmail compose or mailto fallback
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("userName").value.trim();
      const email = document.getElementById("userEmail").value.trim();
      const message = document.getElementById("userMessage").value.trim();
      const mailto = `mailto:${portfolioData.contact.email}?subject=Portfolio Contact from ${encodeURIComponent(name)} (${encodeURIComponent(email)})&body=${encodeURIComponent(message)}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(portfolioData.contact.email)}&su=${encodeURIComponent('Portfolio Contact from ' + name + ' (' + email + ')')}&body=${encodeURIComponent(message)}`;
      let gmailWindow = window.open(gmailUrl, "_blank");
      setTimeout(() => {
        if (!gmailWindow || gmailWindow.closed || typeof gmailWindow.closed == 'undefined') {
          window.location.href = mailto;
        }
      }, 300);
    });
  }
});
