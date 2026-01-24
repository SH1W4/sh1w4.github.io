/* ==========================================
   SH1W4 | Operational Core v3.0
   JavaScript: Interaction & Logic Engine
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNeuralNetwork();
  initPerformanceMonitor();
  initIntersectionObserver();
  initParallaxEffects();
  initNavigation();
  initStatsCounter();
  updateScrollProgress();
});

/* 1. NEURAL NETWORK ANIMATION */
function initNeuralNetwork() {
  const canvas = document.getElementById("neural-network");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let nodes = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  class Node {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
  }

  for (let i = 0; i < 80; i++) nodes.push(new Node());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff41";
    ctx.lineWidth = 0.5;

    nodes.forEach((node, i) => {
      node.update();
      ctx.beginPath();
      ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.hypot(node.x - nodes[j].x, node.y - nodes[j].y);
        if (dist < 150) {
          ctx.strokeStyle = `rgba(0, 255, 65, ${1 - dist / 150})`;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* 2. REVEAL ENGINE (Intersection Observer) */
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute("data-delay") || 0;
        setTimeout(() => {
          entry.target.classList.add("revealed");
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll("[data-reveal]")
    .forEach((el) => revealObserver.observe(el));
}

/* 3. SMOOTH PARALLAX & SCROLL PROGRESS */
function initParallaxEffects() {
  const wrapper = document.querySelector(".parallax-wrapper");
  const progress = document.querySelector(".scroll-progress");

  if (!wrapper) return;

  wrapper.addEventListener("scroll", () => {
    const scrollTop = wrapper.scrollTop;
    const maxScroll = wrapper.scrollHeight - wrapper.clientHeight;
    const scrollPercent = (scrollTop / maxScroll) * 100;

    if (progress) progress.style.width = scrollPercent + "%";

    // Active Nav Tracking
    updateActiveNav(scrollTop);
  });
}

function updateScrollProgress() {
  // Initial call
}

/* 4. PERFORMANCE MONITOR */
function initPerformanceMonitor() {
  let fps = 0;
  let lastTime = performance.now();
  const fpsVal = document.getElementById("fps-counter");

  function loop() {
    const now = performance.now();
    fps = Math.round(1000 / (now - lastTime));
    lastTime = now;
    if (fpsVal && Math.random() > 0.9) fpsVal.innerText = Math.min(fps, 60);
    requestAnimationFrame(loop);
  }
  loop();
}

/* 5. STATS COUNTER */
function initStatsCounter() {
  const stats = document.querySelectorAll(".stat-number");

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateValue(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  });

  stats.forEach((s) => countObserver.observe(s));
}

function animateValue(obj) {
  const target = parseInt(obj.getAttribute("data-count"));
  let start = 0;
  const duration = 2000;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(progress * target);
    obj.innerText = value;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* 6. NAVIGATION */
function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const wrapper = document.querySelector(".parallax-wrapper");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetEl = document.querySelector(targetId);

      if (targetEl && wrapper) {
        wrapper.scrollTo({
          top: targetEl.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });
}

function updateActiveNav(scrollTop) {
  const sections = document.querySelectorAll("section, header");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentId = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollTop >= sectionTop - 200) {
      currentId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentId}`,
    );
  });
}
