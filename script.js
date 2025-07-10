// Matrix Rain Effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff00';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

// Terminal Typing Effect
const terminalText = [
    'Initializing system...',
    'Loading AI modules...',
    'Connecting to neural networks...',
    'Establishing data pipelines...',
    'System ready.',
    'Welcome to NEO_SH1W4 terminal.',
    '> AI Engineer & Data Architect',
    '> Building symbiotic intelligence',
    '> Systems that evolve with you'
];

let currentLine = 0;
let currentChar = 0;
const typedTextElement = document.getElementById('typed-text');
const terminalContent = document.getElementById('terminal-content');

function typeText() {
    if (currentLine < terminalText.length) {
        if (currentChar < terminalText[currentLine].length) {
            typedTextElement.textContent += terminalText[currentLine][currentChar];
            currentChar++;
            setTimeout(typeText, 50 + Math.random() * 50);
        } else {
            // Line completed
            const completedLine = document.createElement('div');
            completedLine.innerHTML = `<span class="prompt">$</span> ${terminalText[currentLine]}`;
            terminalContent.insertBefore(completedLine, terminalContent.lastElementChild);
            
            typedTextElement.textContent = '';
            currentChar = 0;
            currentLine++;
            
            if (currentLine < terminalText.length) {
                setTimeout(typeText, 500);
            }
        }
    }
}

// Start typing after page load
window.addEventListener('load', () => {
    setTimeout(typeText, 1000);
    animateSkillBars();
});

// Skill Bar Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
            }
        });
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Window Resize Handler
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Easter Egg - Konami Code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
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
    document.body.style.animation = 'matrixIntensify 2s';
    
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #00ff00;
        font-size: 3rem;
        text-shadow: 0 0 20px #00ff00;
        z-index: 9999;
        animation: fadeInOut 3s;
    `;
    message.textContent = 'ACCESSING MAINFRAME...';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
        document.body.style.animation = '';
    }, 3000);
}

// Add CSS animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes matrixIntensify {
        0%, 100% { filter: hue-rotate(0deg) brightness(1); }
        50% { filter: hue-rotate(180deg) brightness(1.5); }
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
    }
`;
document.head.appendChild(style);

// Add random glitch effect
setInterval(() => {
    if (Math.random() > 0.95) {
        document.querySelector('.glitch').style.animation = 'none';
        setTimeout(() => {
            document.querySelector('.glitch').style.animation = '';
        }, 100);
    }
}, 3000);
