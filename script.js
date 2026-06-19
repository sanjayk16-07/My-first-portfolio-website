/* ----------------------------------------------------
   Sanjay.K Portfolio - Modern Application Logic
---------------------------------------------------- */

const STORAGE_KEY = "sanjay-portfolio-state";
const STORAGE_VERSION = 2;

const DEFAULT_STATE = {
  profile: {
    name: "Sanjay.K",
    tagline: "Frontend Developer & UI/UX & AI Enthusiast",
    intro: "I am a Information Technology student specializing in building interactive and visually appealing web applications. I combine modern web technologies with clean, minimal design patterns.",
    avatar: "profile_placeholder.png",
    phoneVal: "+91 7538811216",
    phoneUrl: "tel:+917538811216",
    emailVal: "sanjayk160727@gmail.com",
    emailUrl: "mailto:sanjayk160727@gmail.com",
    linkedinVal: "https://www.linkedin.com/in/sanjay-k-789494373/",
    linkedinUrl: "https://www.linkedin.com/in/sanjay-k-789494373/",
    githubVal: "https://github.com/sanjayk16-07",
    githubUrl: "https://github.com/sanjayk16-07"
  },
  about: {
    detailedBio: [
      "I am currently pursuing my Bachelor of Technology in Information Technology and I am highly passionate about bridging the gap between elegant layout aesthetics and clean backend logic. I specialize in HTML5, CSS3, vanilla JavaScript, and responsive design systems.",
      "Outside of regular studies, I spend my time exploring modern UI micro-interactions, contributing to open-source utility tools, and participating in hackathons. I believe in writing readable, modular code and building with web accessibility standard in mind with AI."
    ],
    quote: "Simplicity is the ultimate sophistication.",
    quoteAuthor: "— Leonardo da Vinci",
    quickFacts: [
      { label: "Education", value: "Undergraduate Student" },
      { label: "Location", value: "Chennai, India" },
      { label: "Focus Area", value: "Web UI&UX and AITools,Algorithms" },
    ]
  },
  education: [
    {
      id: "edu-1",
      period: "2026 — Present",
      degree: "Bachelor of Technology in Information Technology ",
      College: "St.joseph's Institute of Technology",
      score: "GPA: 8.080/10",
      details: "Focusing on fundamental computer science disciplines including Algorithms, Data Structures, Database Systems, and Software Engineering. Active member and organizer in the student coding community."
    },
    {
      id: "edu-2",
      period: "2009 — 2025",
      degree: "Higher Secondary Certificate (HSC)",
      school: "St.Ann's Mat.Hr.Sec.School",
      score: "Percentage: 81.16%",
      details: "Completed secondary education specializing in Mathematics, Computer Science, and Physics. Received the Principal's Merit List certificate for top academic performance."
    }
  ],
  skills: [
    {
      category: "Frontend Development",
      tags: ["HTML5", "Responsive Web Design", "UI/UX Prototyping","AI Tools"]
    },
    {
      category: "Tools & Methodologies",
      tags: ["Git & GitHub", "Visual Studio Code", "Figma", "Web Accessibility (a11y)", "Vercel / Netlify", "Claude","GPT-5"]
    },
    {
      category: "Core Information Technology Concepts",
      tags: ["Data Structures", "Algorithm Design", "System Design", "Software Engineering"]
    }
  ],
  certs: [
    {
      id: "cert-1",
      title: "Build Multi Agents Systems",
      issuer: "Newton School of Technology(headstart)",
      date: "April 2026"
    },
    {
      id: "cert-2",
      title: "Foundation of Internet of Things",
      issuer: "Swayam(NASSCOM)",
      date: "Nov 2025"
    },
    {
      id: "cert-3",
      title: "Python for Complete Beginners",
      issuer: "Cursa",
      date:"May 2026"
    }
  ],
  extracurricular: [
    {
      id: "extra-1",
      role: "Sports",
      activity: "Badmiton",
      desc: "iam so passionate about badmiton and thsi sports make me focus and enthu"
    },
    {
      id: "extra-2",
      role: "Learn about AI",
      activity: "AI tools works",
      desc: "creating about websites with AI Tools and process."
    },
    {
      id: "extra-3",
      role: "Art and Music",
      activity: "Drawing and singing",
      desc: "i love to draw and sing songs in free times which give me relief"
    }
  ]
};

let state = {};
let workingState = {};
let isEditMode = false;
let isEditModeUnlocked = false;

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadState();
  renderPortfolio();
  initRouter();
  initEditMode();
  setupNavLinks();
  initSecretKeyListener();
});

function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("portfolio-theme") || "light";

  document.documentElement.setAttribute("data-theme", currentTheme);

  themeToggle.addEventListener("click", () => {
    const activeTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = activeTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  });
}

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed?.version !== STORAGE_VERSION) {
        localStorage.removeItem(STORAGE_KEY);
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      } else {
        state = parsed.data;
      }
    } catch (e) {
      console.error("Failed to parse stored state. Reverting to default.", e);
      state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
  } else {
    state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  if (!state.profile) state.profile = { ...DEFAULT_STATE.profile };
  if (!state.profile.avatar) state.profile.avatar = DEFAULT_STATE.profile.avatar;
  if (!state.about) state.about = { ...DEFAULT_STATE.about };
  if (!state.education) state.education = [...DEFAULT_STATE.education];
  if (!state.skills) state.skills = [...DEFAULT_STATE.skills];
  if (!state.certs) state.certs = [...DEFAULT_STATE.certs];
  if (!state.extracurricular) state.extracurricular = [...DEFAULT_STATE.extracurricular];
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, data: state }));
  renderPortfolio();
}

function initRouter() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".portfolio-section");

  function handleRoute() {
    let hash = window.location.hash || "#home";

    if (!document.querySelector(hash)) {
      hash = "#home";
    }

    const targetSection = hash.slice(1);

    sections.forEach(sec => sec.classList.remove("active"));
    navLinks.forEach(link => link.classList.remove("active"));

    const activeSection = document.getElementById(targetSection);
    if (activeSection) {
      activeSection.classList.add("active");
    }

    const activeLink = document.querySelector(`.nav-link[data-section="${targetSection}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  window.addEventListener("hashchange", handleRoute);

  handleRoute();
}

function setupNavLinks() {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionName = link.getAttribute("data-section");
      window.location.hash = `#${sectionName}`;
    });
  });

  document.addEventListener("click", (e) => {
    const jumpBtn = e.target.closest(".nav-jump-btn");
    if (jumpBtn) {
      const sectionName = jumpBtn.getAttribute("data-jump");
      window.location.hash = `#${sectionName}`;
    }
  });
}

function renderPortfolio() {
  const data = isEditMode ? workingState : state;

  const navLogo = document.getElementById("navLogo");
  if (navLogo) navLogo.textContent = data.profile.name;

  const fields = ["name", "tagline", "intro"];
  fields.forEach(field => {
    const element = document.querySelector(`[data-field="${field}"]`);
    if (element) {
      element.textContent = data.profile[field];
    }
  });

  const profileImg = document.getElementById("profileImage");
  if (profileImg) {
    profileImg.src = data.profile.avatar || DEFAULT_STATE.profile.avatar;
    profileImg.onerror = () => {
      profileImg.src = DEFAULT_STATE.profile.avatar;
    };
  }

  const contacts = ["phone", "email", "linkedin", "github"];
  contacts.forEach(contact => {
    const linkEl = document.getElementById(`link-${contact}`);
    const textEl = linkEl ? linkEl.querySelector(".contact-text") : null;
    if (linkEl && textEl) {
      textEl.textContent = data.profile[`${contact}Val`];
      linkEl.href = data.profile[`${contact}Url`];
    }
  });

  const aboutBioEl = document.querySelector('[data-field="detailedBio"]');
  if (aboutBioEl) {
    aboutBioEl.innerHTML = data.about.detailedBio.map(para => `<p>${para}</p>`).join("");
  }

  const quoteText = document.querySelector('[data-field="quote"]');
  if (quoteText) quoteText.textContent = data.about.quote;

  const quoteAuthor = document.querySelector('[data-field="quoteAuthor"]');
  if (quoteAuthor) quoteAuthor.textContent = data.about.quoteAuthor;

  const highlightsList = document.getElementById("highlightsList");
  if (highlightsList) {
    highlightsList.innerHTML = data.about.quickFacts.map((fact, idx) => `
      <li class="highlight-entry">
        <div class="highlight-content">
          <span class="highlight-label editable-value" data-index="${idx}" data-fact-prop="label">${fact.label}</span>
          <span class="highlight-value editable-value" data-index="${idx}" data-fact-prop="value">${fact.value}</span>
        </div>
        <button class="entry-delete-btn edit-only" data-delete-type="fact" data-index="${idx}" title="Delete Fact">×</button>
      </li>
    `).join("");
  }

  const educationTimeline = document.getElementById("educationTimeline");
  if (educationTimeline) {
    educationTimeline.innerHTML = data.education.map((edu, idx) => `
      <div class="timeline-card" data-index="${idx}">
        <button class="entry-delete-btn edit-only" data-delete-type="education" data-index="${idx}" title="Delete Card">×</button>
        <div class="timeline-header">
          <div class="timeline-meta">
            <span class="timeline-period editable-value" data-index="${idx}" data-edu-prop="period">${edu.period}</span>
            <h3 class="timeline-degree editable-value" data-index="${idx}" data-edu-prop="degree">${edu.degree}</h3>
            <span class="timeline-school editable-value" data-index="${idx}" data-edu-prop="school">${edu.school}</span>
          </div>
          <span class="timeline-score editable-value" data-index="${idx}" data-edu-prop="score">${edu.score}</span>
        </div>
        <div class="timeline-details editable-value" data-index="${idx}" data-edu-prop="details">${edu.details}</div>
      </div>
    `).join("");
  }

  const skillsContainer = document.getElementById("skillsContainer");
  if (skillsContainer) {
    skillsContainer.innerHTML = data.skills.map((cat, catIdx) => `
      <div class="skill-category-box" data-cat-index="${catIdx}">
        <button class="entry-delete-btn edit-only" data-delete-type="skill-cat" data-index="${catIdx}" title="Delete Category">×</button>
        <h4 class="skill-cat-title editable-value" data-cat-index="${catIdx}" data-skill-prop="category">${cat.category}</h4>
        <div class="skill-tags-list">
          ${cat.tags.map((tag, tagIdx) => `
            <span class="skill-tag">
              <span class="tag-label editable-value" data-cat-index="${catIdx}" data-tag-index="${tagIdx}">${tag}</span>
              <button class="entry-delete-btn edit-only" data-delete-type="skill-tag" data-cat-index="${catIdx}" data-tag-index="${tagIdx}" title="Remove Tag">×</button>
            </span>
          `).join("")}
          <button class="action-btn-secondary edit-only add-tag-inline-btn" data-cat-index="${catIdx}" style="padding: 0.2rem 0.5rem; font-size: 0.8rem; border-radius: var(--radius-sm);">+ Add Tag</button>
        </div>
      </div>
    `).join("");
  }

  const certsContainer = document.getElementById("certsContainer");
  if (certsContainer) {
    certsContainer.innerHTML = data.certs.map((cert, idx) => `
      <div class="cert-card" data-index="${idx}">
        <button class="entry-delete-btn edit-only" data-delete-type="cert" data-index="${idx}" title="Delete Certificate">×</button>
        <div class="cert-title editable-value" data-index="${idx}" data-cert-prop="title">${cert.title}</div>
        <div class="cert-issuer editable-value" data-index="${idx}" data-cert-prop="issuer">${cert.issuer}</div>
        <div class="cert-meta">
          <span class="editable-value" data-index="${idx}" data-cert-prop="date">${cert.date}</span>
        </div>
      </div>
    `).join("");
  }

  const extracurricularContainer = document.getElementById("extracurricularContainer");
  if (extracurricularContainer) {
    extracurricularContainer.innerHTML = data.extracurricular.map((extra, idx) => `
      <div class="extra-card" data-index="${idx}">
        <button class="entry-delete-btn edit-only" data-delete-type="extracurricular" data-index="${idx}" title="Delete Activity">×</button>
        <div class="extra-header">
          <span class="extra-badge editable-value" data-index="${idx}" data-extra-prop="role">${extra.role}</span>
          <h3 class="extra-title editable-value" data-index="${idx}" data-extra-prop="activity">${extra.activity}</h3>
          <span class="extra-period editable-value" data-index="${idx}" data-extra-prop="period">${extra.period}</span>
        </div>
        <p class="extra-desc editable-value" data-index="${idx}" data-extra-prop="desc">${extra.desc}</p>
      </div>
    `).join("");
  }

  const dashName = document.getElementById("dashName");
  if (dashName) dashName.textContent = data.profile.name;

  const dashTagline = document.getElementById("dashTagline");
  if (dashTagline) dashTagline.textContent = data.profile.tagline;

  const dashIntro = document.getElementById("dashIntro");
  if (dashIntro) dashIntro.textContent = data.profile.intro;

  const dashQuote = document.getElementById("dashQuote");
  if (dashQuote) dashQuote.textContent = `"${data.about.quote}"`;

  const dashQuoteAuthor = document.getElementById("dashQuoteAuthor");
  if (dashQuoteAuthor) dashQuoteAuthor.textContent = data.about.quoteAuthor;

  const dashProfileImgs = document.querySelectorAll(".dash-profile-img");
  dashProfileImgs.forEach(img => {
    img.src = data.profile.avatar || DEFAULT_STATE.profile.avatar;
    img.onerror = () => {
      img.src = DEFAULT_STATE.profile.avatar;
    };
  });

  const statEducation = document.getElementById("statEducation");
  if (statEducation) statEducation.textContent = data.education.length;

  const statSkills = document.getElementById("statSkills");
  if (statSkills) {
    const totalSkillsCount = data.skills.reduce((acc, cat) => acc + cat.tags.length, 0);
    statSkills.textContent = totalSkillsCount;
  }

  const statCerts = document.getElementById("statCerts");
  if (statCerts) statCerts.textContent = data.certs.length;

  const statActivities = document.getElementById("statActivities");
  if (statActivities) statActivities.textContent = data.extracurricular.length;

  if (isEditMode) {
    makeFieldsEditable(true);
  }
}

function initSecretKeyListener() {
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === "E") {
      e.preventDefault();
      isEditModeUnlocked = !isEditModeUnlocked;
      const openEditModeBtn = document.getElementById("openEditModeBtn");
      const dashEditBtn = document.getElementById("dashEditBtn");
      
      if (isEditModeUnlocked) {
        if (openEditModeBtn) openEditModeBtn.style.display = "flex";
        if (dashEditBtn) dashEditBtn.style.display = "block";
        console.log("Edit mode unlocked!");
      } else {
        if (openEditModeBtn) openEditModeBtn.style.display = "none";
        if (dashEditBtn) dashEditBtn.style.display = "none";
        console.log("Edit mode locked!");
      }
    }
  });
}

function initEditMode() {
  const openEditModeBtn = document.getElementById("openEditModeBtn");
  const dashEditBtn = document.getElementById("dashEditBtn");
  const cancelEditsBtn = document.getElementById("cancelEditsBtn");
  const saveEditsBtn = document.getElementById("saveEditsBtn");
  
  function safeAddEvent(element, event, callback) {
    if (element) {
      element.addEventListener(event, callback);
    }
  }

  if (openEditModeBtn) openEditModeBtn.style.display = "none";
  if (dashEditBtn) dashEditBtn.style.display = "none";

  function startEditing() {
    if (isEditMode) return;
    isEditMode = true;

    workingState = JSON.parse(JSON.stringify(state));

    document.body.classList.add("edit-mode");

    injectLinkEditForms();

    renderPortfolio();
    makeFieldsEditable(true);
  }

  function stopEditing(save) {
    if (!isEditMode) return;

    if (save) {
      gatherCurrentEdits();
      state = JSON.parse(JSON.stringify(workingState));
      isEditMode = false;
      document.body.classList.remove("edit-mode");
      removeLinkEditForms();
      saveState();
    } else {
      isEditMode = false;
      document.body.classList.remove("edit-mode");
      removeLinkEditForms();
      workingState = {};
      renderPortfolio();
    }
  }

  safeAddEvent(openEditModeBtn, "click", startEditing);
  safeAddEvent(dashEditBtn, "click", startEditing);

  safeAddEvent(cancelEditsBtn, "click", () => stopEditing(false));
  safeAddEvent(saveEditsBtn, "click", () => stopEditing(true));

  const profileImageInput = document.getElementById("profileImageInput");
  const imageUploadOverlay = document.getElementById("imageUploadOverlay");

  if (imageUploadOverlay && profileImageInput) {
    imageUploadOverlay.addEventListener("click", () => {
      profileImageInput.click();
    });

    profileImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = event.target.result;
        workingState.profile.avatar = base64Data;

        const profileImageEl = document.getElementById("profileImage");
        if (profileImageEl) profileImageEl.src = base64Data;

        document.querySelectorAll(".dash-profile-img").forEach(img => {
          img.src = base64Data;
        });
      };
      reader.readAsDataURL(file);
    }
  });
  }

  setupAddingHandlers();
  setupDeletingHandlers();
}

function makeFieldsEditable(enabled) {
  const editables = document.querySelectorAll(".editable-field, .editable-value");
  editables.forEach(el => {
    el.setAttribute("contenteditable", enabled ? "true" : "false");
    el.removeEventListener("click", preventDefaultLinkClick);
    if (enabled) {
      el.addEventListener("click", preventDefaultLinkClick);
    }
  });
}

function preventDefaultLinkClick(e) {
  if (e.target.closest("a")) {
    e.preventDefault();
  }
}

function injectLinkEditForms() {
  const contactLinks = document.getElementById("contactLinksContainer");
  if (!contactLinks) return;

  const dialog = document.createElement("div");
  dialog.className = "edit-link-dialog edit-only";
  dialog.id = "contactUrlsEditor";

  const contacts = [
    { label: "Phone Link (tel:+1234...)", key: "phoneUrl" },
    { label: "Gmail Link (mailto:abc@...)", key: "emailUrl" },
    { label: "LinkedIn URL", key: "linkedinUrl" },
    { label: "GitHub URL", key: "githubUrl" }
  ];

  dialog.innerHTML = contacts.map(c => `
    <div style="margin-bottom: 0.5rem; display: flex; flex-direction: column; gap: 0.25rem;">
      <label>${c.label}</label>
      <input type="text" data-url-field="${c.key}" value="${workingState.profile[c.key]}">
    </div>
  `).join("");

  contactLinks.parentNode.insertBefore(dialog, contactLinks.nextSibling);
}

function removeLinkEditForms() {
  const form = document.getElementById("contactUrlsEditor");
  if (form) form.remove();
}

function setupAddingHandlers() {
  const addHighlightBtn = document.getElementById("addHighlightBtn");
  const addEducationBtn = document.getElementById("addEducationBtn");
  const addSkillBtn = document.getElementById("addSkillBtn");
  const addCertBtn = document.getElementById("addCertBtn");
  const addExtraBtn = document.getElementById("addExtraBtn");

  if (addHighlightBtn) {
    addHighlightBtn.addEventListener("click", () => {
      workingState.about.quickFacts.push({ label: "Fact Label", value: "Fact Detail" });
      renderPortfolio();
    });
  }

  if (addEducationBtn) {
    addEducationBtn.addEventListener("click", () => {
      const newId = `edu-${Date.now()}`;
      workingState.education.push({
        id: newId,
        period: "2025 — Present",
        degree: "Enter Degree Name",
        school: "Enter Institution Name",
        score: "GPA: 9.0/10",
        details: "Write details or syllabus milestones about this degree record."
      });
      renderPortfolio();
    });
  }

  if (addSkillBtn) {
    addSkillBtn.addEventListener("click", () => {
      workingState.skills.push({
        category: "New Skill Group",
        tags: ["HTML", "CSS", "JS"]
      });
      renderPortfolio();
    });
  }

  if (addCertBtn) {
    addCertBtn.addEventListener("click", () => {
      const newId = `cert-${Date.now()}`;
      workingState.certs.push({
        id: newId,
        title: "Certification Title",
        issuer: "Credential Authority",
        date: "Month Year"
      });
      renderPortfolio();
    });
  }

  if (addExtraBtn) {
    addExtraBtn.addEventListener("click", () => {
      const newId = `extra-${Date.now()}`;
      workingState.extracurricular.push({
        id: newId,
        role: "Lead Coordinator",
        activity: "Activity Name / Organization",
        period: "Period Dates",
        desc: "Provide details of your involvement, responsibilities, and achievements."
      });
      renderPortfolio();
    });
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList && e.target.classList.contains("add-tag-inline-btn")) {
      const catIdx = parseInt(e.target.getAttribute("data-cat-index"), 10);
      if (!Number.isNaN(catIdx) && workingState.skills[catIdx]) {
        workingState.skills[catIdx].tags.push("New Skill");
        renderPortfolio();
      }
    }
  });
}

function setupDeletingHandlers() {
  document.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".entry-delete-btn");
    if (!deleteBtn || !isEditMode) return;

    const deleteType = deleteBtn.getAttribute("data-delete-type");
    const index = parseInt(deleteBtn.getAttribute("data-index"), 10);

    if (deleteType === "fact") {
      workingState.about.quickFacts.splice(index, 1);
    } else if (deleteType === "education") {
      workingState.education.splice(index, 1);
    } else if (deleteType === "cert") {
      workingState.certs.splice(index, 1);
    } else if (deleteType === "extracurricular") {
      workingState.extracurricular.splice(index, 1);
    } else if (deleteType === "skill-cat") {
      workingState.skills.splice(index, 1);
    } else if (deleteType === "skill-tag") {
      const catIdx = parseInt(deleteBtn.getAttribute("data-cat-index"), 10);
      const tagIdx = parseInt(deleteBtn.getAttribute("data-tag-index"), 10);
      workingState.skills[catIdx].tags.splice(tagIdx, 1);
    }

    renderPortfolio();
  });
}

function gatherCurrentEdits() {
  const nameEl = document.querySelector('[data-field="name"]');
  if (nameEl) workingState.profile.name = nameEl.textContent.trim();

  const taglineEl = document.querySelector('[data-field="tagline"]');
  if (taglineEl) workingState.profile.tagline = taglineEl.textContent.trim();

  const introEl = document.querySelector('[data-field="intro"]');
  if (introEl) workingState.profile.intro = introEl.textContent.trim();

  const contacts = ["phone", "email", "linkedin", "github"];
  contacts.forEach(contact => {
    const linkEl = document.getElementById(`link-${contact}`);
    if (!linkEl) return;
    const textEl = linkEl.querySelector(".contact-text");
    if (textEl) {
      workingState.profile[`${contact}Val`] = textEl.textContent.trim();
    }
  });

  const urlInputs = document.querySelectorAll("[data-url-field]");
  urlInputs.forEach(input => {
    const key = input.getAttribute("data-url-field");
    workingState.profile[key] = input.value.trim();
  });

  const aboutBioEl = document.querySelector('[data-field="detailedBio"]');
  if (aboutBioEl) {
    const paragraphs = aboutBioEl.querySelectorAll("p");
    workingState.about.detailedBio = Array.from(paragraphs).map(p => p.textContent.trim());
  }

  const quoteText = document.querySelector('[data-field="quote"]');
  if (quoteText) workingState.about.quote = quoteText.textContent.trim();

  const quoteAuthor = document.querySelector('[data-field="quoteAuthor"]');
  if (quoteAuthor) workingState.about.quoteAuthor = quoteAuthor.textContent.trim();

  const highlightsList = document.getElementById("highlightsList");
  if (highlightsList) {
    const facts = highlightsList.querySelectorAll(".highlight-entry");
    workingState.about.quickFacts = Array.from(facts).map(factEl => {
      const labelEl = factEl.querySelector('[data-fact-prop="label"]');
      const valEl = factEl.querySelector('[data-fact-prop="value"]');
      return {
        label: labelEl ? labelEl.textContent.trim() : "Fact Label",
        value: valEl ? valEl.textContent.trim() : "Fact Value"
      };
    });
  }

  const eduCards = document.querySelectorAll("#educationTimeline .timeline-card");
  workingState.education = Array.from(eduCards).map(card => {
    const idx = parseInt(card.getAttribute("data-index"), 10);
    const periodEl = card.querySelector('[data-edu-prop="period"]');
    const degreeEl = card.querySelector('[data-edu-prop="degree"]');
    const schoolEl = card.querySelector('[data-edu-prop="school"]');
    const scoreEl = card.querySelector('[data-edu-prop="score"]');
    const detailsEl = card.querySelector('[data-edu-prop="details"]');
    return {
      id: state.education[idx] ? state.education[idx].id : `edu-${Date.now()}-${Math.random()}`,
      period: periodEl ? periodEl.textContent.trim() : "",
      degree: degreeEl ? degreeEl.textContent.trim() : "",
      school: schoolEl ? schoolEl.textContent.trim() : "",
      score: scoreEl ? scoreEl.textContent.trim() : "",
      details: detailsEl ? detailsEl.textContent.trim() : ""
    };
  });

  const skillBoxes = document.querySelectorAll("#skillsContainer .skill-category-box");
  workingState.skills = Array.from(skillBoxes).map(box => {
    const titleEl = box.querySelector('[data-skill-prop="category"]');
    const tagEls = box.querySelectorAll(".skill-tag .tag-label");
    return {
      category: titleEl ? titleEl.textContent.trim() : "Skill Category",
      tags: Array.from(tagEls).map(el => el.textContent.trim())
    };
  });

  const certCards = document.querySelectorAll("#certsContainer .cert-card");
  workingState.certs = Array.from(certCards).map(card => {
    const idx = parseInt(card.getAttribute("data-index"), 10);
    const titleEl = card.querySelector('[data-cert-prop="title"]');
    const issuerEl = card.querySelector('[data-cert-prop="issuer"]');
    const dateEl = card.querySelector('[data-cert-prop="date"]');
    return {
      id: state.certs[idx] ? state.certs[idx].id : `cert-${Date.now()}-${Math.random()}`,
      title: titleEl ? titleEl.textContent.trim() : "Certificate",
      issuer: issuerEl ? issuerEl.textContent.trim() : "Issuer",
      date: dateEl ? dateEl.textContent.trim() : "Date"
    };
  });

  const extraCards = document.querySelectorAll("#extracurricularContainer .extra-card");
  workingState.extracurricular = Array.from(extraCards).map(card => {
    const idx = parseInt(card.getAttribute("data-index"), 10);
    const roleEl = card.querySelector('[data-extra-prop="role"]');
    const activityEl = card.querySelector('[data-extra-prop="activity"]');
    const periodEl = card.querySelector('[data-extra-prop="period"]');
    const descEl = card.querySelector('[data-extra-prop="desc"]');
    return {
      id: state.extracurricular[idx] ? state.extracurricular[idx].id : `extra-${Date.now()}-${Math.random()}`,
      role: roleEl ? roleEl.textContent.trim() : "",
      activity: activityEl ? activityEl.textContent.trim() : "",
      period: periodEl ? periodEl.textContent.trim() : "",
      desc: descEl ? descEl.textContent.trim() : ""
    };
  });
}
