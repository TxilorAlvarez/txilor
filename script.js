// ==================== MATRIX RAIN EFFECT (DUAL LAYER / CASCADING) ====================
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Dimensions
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

// Character sets for Matrix effect (binary + extended ASCII + katakana)
const binaryChars = "01";
const extendedChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
const allChars = binaryChars + extendedChars;
const charsArray = allChars.split('');

// Configuration
const fontSize = 18;
const columns = Math.floor(width / fontSize);
const drops = [];

// Initialize drops - each column gets a starting Y position
for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * -height);
}

// Speed control (lower = faster)
const frameDelay = 45;

// Opacity variables for fading effect
let opacity = 0.16; // Base opacity for Matrix background

// Draw function
function drawMatrix() {
    // Semi-transparent black to create fading trail effect
    ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
    ctx.fillRect(0, 0, width, height);
    
    // Matrix green/cyan color
    ctx.fillStyle = "#00ffd5";
    ctx.font = `${fontSize}px "Courier New", monospace`;
    
    for (let i = 0; i < drops.length; i++) {
        // Select random character
        const char = charsArray[Math.floor(Math.random() * charsArray.length)];
        // Draw character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        // Random brightness variation for some characters
        if (Math.random() > 0.98) {
            ctx.fillStyle = "#ffffff";
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            ctx.fillStyle = "#00ffd5";
        }
        
        // Reset drop when it reaches bottom, with some randomness
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        // Move drop down
        drops[i]++;
    }
}

// Start animation
setInterval(drawMatrix, frameDelay);

// Handle window resize
window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    // Recalculate columns and drops array
    const newColumns = Math.floor(width / fontSize);
    for (let i = 0; i < newColumns; i++) {
        if (drops[i] === undefined) {
            drops[i] = Math.floor(Math.random() * -height);
        }
    }
    // Trim excess drops
    if (drops.length > newColumns) {
        drops.length = newColumns;
    }
});

// ==================== ADDITIONAL MATRIX STYLE VARIATIONS ====================
// Optional: Change matrix intensity on scroll
window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const newOpacity = 0.12 + (scrollPercent * 0.1);
    canvas.style.opacity = Math.min(0.25, newOpacity);
});

// ==================== SYSTEM TERMINAL REAL-TIME UPDATES ====================
// This complements the inline script in HTML
// Update system info dynamically
function updateSystemStats() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    const loadSpan = document.getElementById('systemLoad');
    if(loadSpan) {
        const fakeLoad = Math.floor(Math.random() * 30) + 15;
        loadSpan.innerText = `${fakeLoad}%`;
    }
}

setInterval(updateSystemStats, 5000);

// ==================== ANIMATED TYPING EFFECT FOR TERMINAL (Optional) ====================
// Not essential but adds flair - run once on load
document.addEventListener('DOMContentLoaded', () => {
    console.log("[MATRIX] System initialized | Txilor Alvarez Portfolio");
    
    // Add a small glitch effect to header on load
    const header = document.querySelector('header h1');
    if(header) {
        let originalText = header.innerText;
        let glitchInterval = setTimeout(() => {
            header.style.textShadow = "2px 2px 0px #00ffd5";
            setTimeout(() => {
                header.style.textShadow = "none";
            }, 150);
        }, 500);
    }
});

// ==================== MATRIX MOUSE INTERACTION (Bonus Effect) ====================
// Characters react slightly to mouse movement (creates a wave effect)
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Optional: Change canvas opacity briefly on mouse move (subtle)
    if(canvas) {
        canvas.style.opacity = "0.2";
        setTimeout(() => {
            canvas.style.opacity = "0.16";
        }, 200);
    }
});

// ==================== FALLBACK FOR MOBILE (Reduce performance impact) ====================
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Reduce frame rate for mobile
    clearInterval(window._matrixInterval);
    window._matrixInterval = setInterval(drawMatrix, 80);
    // Lower opacity for battery saving
    if(canvas) canvas.style.opacity = "0.1";
}
