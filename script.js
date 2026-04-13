// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("open");
    document.body.classList.toggle("menu-open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      document.body.classList.remove("menu-open");
    });
  });
}

// Active nav link on scroll
const sections = document.querySelectorAll("main section[id]");

function updateActiveNav() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

// Reveal animation
const revealElements = document.querySelectorAll(
  ".section-kicker, .section-title, .section-text, .hero-left, .hero-right, .experience-card, .timeline-item, .skill-card, .project-card, .cert-card, .edu-item, .contact-card, .contact-panel"
);

revealElements.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Skills filter
const filterButtons = document.querySelectorAll(".filter-chip");
const skillCards = document.querySelectorAll(".skill-card");
const skillDetailBox = document.querySelector(".skill-detail-box");

const filterDescriptions = {
  all: "Showing all skills across tools, analytics, and business capability.",
  tools: "Technical tools used for coding, querying, data handling, and reporting.",
  analytics: "Core analytical strengths used in modelling, forecasting, validation, and insight generation.",
  business: "Professional strengths that support teamwork, communication, and delivery."
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    skillCards.forEach((card) => {
      const group = card.getAttribute("data-group");
      const shouldShow = filter === "all" || group === filter;
      card.style.display = shouldShow ? "flex" : "none";
    });

    if (skillDetailBox && filterDescriptions[filter]) {
      skillDetailBox.textContent = filterDescriptions[filter];
    }
  });
});
