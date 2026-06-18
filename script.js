/* =============================================
   ABHISHEK TADE — PORTFOLIO  script.js
   Enhanced: Typed.js, Tabs, Cursor, Nav scroll,
   Mobile menu, Scroll reveal, Smooth UX
   ============================================= */

/* ---------- Typed.js ---------- */
document.addEventListener("DOMContentLoaded", function () {
  if (window.Typed && document.getElementById("element")) {
    new Typed("#element", {
      strings: [
        "Full MERN Stack Developer.",
        "and a Programmer.",
        "A DSA Enthusiast.",
        "Competitive Programmer",
      ],
      typeSpeed: 52,
      backSpeed: 28,
      backDelay: 1200,
      startDelay: 400,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });
  }

  /* ---------- Tab Switching ---------- */
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;

      tabBtns.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      const panel = document.getElementById(target);
      if (panel) panel.classList.add("active");
    });
  });

  /* ---------- Mobile Hamburger ---------- */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", String(mobileMenu.classList.contains("open")));
    });

    // Close on nav link click
    mobileMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  const header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = "0 4px 30px rgba(0,0,0,0.4)";
      } else {
        header.style.boxShadow = "none";
      }
    }, { passive: true });
  }

  /* ---------- Scroll Reveal ---------- */
  const revealEls = document.querySelectorAll(
    ".project-card, .note-card, .about-inner, .stat-item, .chip, .timeline-list li, .footer-brand, .footer-links-col"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal", "visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${(i % 5) * 0.06}s`;
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    revealEls.forEach((el) => el.classList.add("reveal", "visible"));
  }

  /* ---------- Custom Cursor ---------- */
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursor-follower");

  if (cursor && follower && window.matchMedia("(hover: hover)").matches) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let running = false;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";

      if (!running) {
        running = true;
        requestAnimationFrame(animateFollower);
      }
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + "px";
      follower.style.top = followerY + "px";

      if (Math.abs(mouseX - followerX) > 0.5 || Math.abs(mouseY - followerY) > 0.5) {
        requestAnimationFrame(animateFollower);
      } else {
        running = false;
      }
    }

    // Hide cursor when leaving window
    document.addEventListener("mouseleave", () => {
      cursor.style.opacity = "0";
      follower.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
      cursor.style.opacity = "1";
      follower.style.opacity = "1";
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              link.style.color = "";
              if (link.getAttribute("href") === `#${id}`) {
                link.style.color = "var(--text-primary)";
              }
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => sectionObserver.observe(s));
  }
});
