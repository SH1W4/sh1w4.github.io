// ==========================================
// NEO_SH1W4 | Adaptive Symbiosis Engine
// JavaScript Implementation
// ==========================================

// Neural Network Background Animation
class NeuralNetwork {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.nodes = [];
    this.connections = [];
    this.resize();
    this.init();

    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    // Create nodes
    const nodeCount = Math.floor(
      (window.innerWidth * window.innerHeight) / 20000
    );
    for (let i = 0; i < nodeCount; i++) {
      this.nodes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
  }

  update() {
    // Update node positions
    this.nodes.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;
      node.pulsePhase += 0.02;

      // Bounce off edges
      if (node.x <= 0 || node.x >= this.canvas.width) node.vx *= -1;
      if (node.y <= 0 || node.y >= this.canvas.height) node.vy *= -1;

      // Keep in bounds
      node.x = Math.max(0, Math.min(this.canvas.width, node.x));
      node.y = Math.max(0, Math.min(this.canvas.height, node.y));
    });

    // Update connections
    this.connections = [];
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dist = Math.hypot(
          this.nodes[i].x - this.nodes[j].x,
          this.nodes[i].y - this.nodes[j].y
        );

        if (dist < 150) {
          this.connections.push({
            from: this.nodes[i],
            to: this.nodes[j],
            strength: 1 - dist / 150,
          });
        }
      }
    }
  }

  draw() {
    this.ctx.fillStyle = "rgba(10, 10, 15, 0.05)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw connections
    this.connections.forEach((conn) => {
      this.ctx.beginPath();
      this.ctx.moveTo(conn.from.x, conn.from.y);
      this.ctx.lineTo(conn.to.x, conn.to.y);
      this.ctx.strokeStyle = `rgba(0, 255, 136, ${conn.strength * 0.2})`;
      this.ctx.lineWidth = conn.strength * 2;
      this.ctx.stroke();
    });

    // Draw nodes
    this.nodes.forEach((node) => {
      const pulse = Math.sin(node.pulsePhase) * 0.5 + 0.5;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius + pulse, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 255, 136, ${0.5 + pulse * 0.5})`;
      this.ctx.fill();
    });
  }

  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize Neural Network
const canvas = document.getElementById("neural-network");
if (canvas) {
  const network = new NeuralNetwork(canvas);
  network.animate();
}

// Performance Monitor
let fps = 60;
let lastTime = performance.now();
let frames = 0;

function updateFPS() {
  frames++;
  const currentTime = performance.now();

  if (currentTime >= lastTime + 1000) {
    fps = Math.round((frames * 1000) / (currentTime - lastTime));
    frames = 0;
    lastTime = currentTime;

    const fpsCounter = document.getElementById("fps-counter");
    if (fpsCounter) {
      fpsCounter.textContent = fps;
    }

    const nodesCounter = document.getElementById("nodes-counter");
    if (nodesCounter && window.network) {
      nodesCounter.textContent = window.network.nodes.length;
    }
  }

  requestAnimationFrame(updateFPS);
}
updateFPS();

// Smooth Counter Animation
function animateCounter(element, target) {
  const duration = 2000;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const update = () => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
    } else {
      element.textContent = Math.floor(current);
      requestAnimationFrame(update);
    }
  };

  update();
}

// Initialize Counters
document.addEventListener("DOMContentLoaded", () => {
  // Animate stat counters
  document.querySelectorAll(".stat-number").forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(counter, target);
          observer.unobserve(counter);
        }
      });
    });
    observer.observe(counter);
  });

  // Navigation Active State
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");

  const observerOptions = {
    root: null,
    rootMargin: "-50% 0px",
    threshold: 0,
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    navObserver.observe(section);
  });

  // Scroll Animations
  const scrollElements = document.querySelectorAll(".section");

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add("visible");
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
      }
    });
  };

  window.addEventListener("scroll", () => {
    handleScrollAnimation();
  });

  // Initial check
  handleScrollAnimation();

  // System Status Updates
  const systemStatus = document.getElementById("system-status");
  const syncStatus = document.getElementById("sync-status");
  const evolutionStatus = document.getElementById("evolution-status");

  // Simulate system status changes
  setInterval(() => {
    const rand = Math.random();
    if (rand > 0.95) {
      systemStatus.textContent = "SH1W4 [SYNCING]";
      setTimeout(() => {
        systemStatus.textContent = "SH1W4 [ACTIVE]";
      }, 2000);
    }
  }, 5000);

  // Simulate sync percentage
  setInterval(() => {
    const sync = Math.floor(Math.random() * 5 + 96);
    syncStatus.textContent = `${sync}%`;
  }, 3000);

  // Terminal Animation
  const terminal = document.querySelector(".terminal-window.compact");
  if (terminal) {
    const terminalBody = terminal.querySelector(".terminal-body");
    const commands = [
      { type: "command", text: "ssh core@sh1w4.io" },
      { type: "output", text: "Connecting to SH1W4 primary node..." },
      { type: "success", text: "Uplink established. System ready." },
    ];

    let commandIndex = 0;

    function typeCommand() {
      if (commandIndex < commands.length) {
        const cmd = commands[commandIndex];
        const line = document.createElement("div");
        line.className = cmd.type;

        if (cmd.type === "command") {
          line.innerHTML = `<span class="prompt">$</span> <span class="command">${cmd.text}</span>`;
        } else {
          line.innerHTML = `<span class="${cmd.type}">${cmd.text}</span>`;
        }

        terminalBody.appendChild(line);
        commandIndex++;

        setTimeout(typeCommand, 1000);
      } else {
        // Add cursor at the end
        const cursor = document.createElement("span");
        cursor.className = "cursor";
        cursor.textContent = "_";
        terminalBody.appendChild(cursor);
      }
    }

    // Start terminal animation when visible
    const terminalObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(typeCommand, 500);
          terminalObserver.unobserve(terminal);
        }
      });
    });

    terminalObserver.observe(terminal);
  }
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offset = 100; // Account for sticky nav
      const targetPosition = target.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Easter Egg - Konami Code
const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let konamiIndex = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateEasterEgg() {
  document.body.style.animation = "matrixMode 3s";

  const message = document.createElement("div");
  message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #00ff88;
        font-family: 'Fira Code', monospace;
        font-size: 2rem;
        text-shadow: 0 0 30px #00ff88;
        z-index: 10000;
        animation: glitchText 3s;
        pointer-events: none;
    `;
  message.textContent = "SYMBIOSIS MODE ACTIVATED";
  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
    document.body.style.animation = "";
  }, 3000);
}

// Add Easter Egg Styles
const easterEggStyle = document.createElement("style");
easterEggStyle.textContent = `
    @keyframes matrixMode {
        0%, 100% { filter: hue-rotate(0deg) brightness(1) contrast(1); }
        25% { filter: hue-rotate(90deg) brightness(1.2) contrast(1.2); }
        50% { filter: hue-rotate(180deg) brightness(1.5) contrast(1.5); }
        75% { filter: hue-rotate(270deg) brightness(1.2) contrast(1.2); }
    }
    
    @keyframes glitchText {
        0%, 100% { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
            text-shadow: 0 0 30px #00ff88;
        }
        10%, 30%, 50%, 70%, 90% {
            transform: translate(-50%, -50%) scale(1.05);
            text-shadow: -2px 0 #ff00aa, 2px 0 #00aaff, 0 0 30px #00ff88;
        }
        20%, 40%, 60%, 80% {
            transform: translate(-50%, -50%) scale(0.95);
            text-shadow: 2px 0 #ff00aa, -2px 0 #00aaff, 0 0 30px #00ff88;
        }
    }
`;
document.head.appendChild(easterEggStyle);
