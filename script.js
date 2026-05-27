/* ==================================================
   AMAN ARORA — script.js
   ================================================== */

// ─── CUSTOM CURSOR ───────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smooth follower
function animateCursor() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effects on interactive elements
document.querySelectorAll('a, button, .skill-card, .about-card, .hobby-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    cursor.style.background = 'rgba(167,139,250,0.5)';
    cursorFollower.style.width  = '60px';
    cursorFollower.style.height = '60px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = 'var(--primary-light)';
    cursorFollower.style.width  = '38px';
    cursorFollower.style.height = '38px';
  });
});

// ─── NAVBAR ──────────────────────────────────────────
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(l => l.classList.remove('active'));
      const id = entry.target.id;
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ─── PARTICLE CANVAS ─────────────────────────────────
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x  = Math.random() * canvas.width;
    this.y  = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r  = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.4 + 0.1;
    this.color = Math.random() > 0.5 ? '124,58,237' : '6,214,160';
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        ctx.strokeStyle = `rgba(124,58,237,${0.08 * (1 - dist/100)})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
    particles[i].update();
    particles[i].draw();
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ─── TYPEWRITER ───────────────────────────────────────
const phrases = [
  'BCA Student 📖',
  'Web Developer 🌐',
  'Python Learner 🐍',
  'Tech Enthusiast 🚀',
  'Computer Scientist 💻',
];
let pIdx = 0, cIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');

function typeWrite() {
  const phrase = phrases[pIdx];
  if (!deleting) {
    tw.textContent = phrase.slice(0, cIdx + 1);
    cIdx++;
    if (cIdx === phrase.length) {
      deleting = true;
      setTimeout(typeWrite, 1800);
      return;
    }
  } else {
    tw.textContent = phrase.slice(0, cIdx - 1);
    cIdx--;
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeWrite, deleting ? 55 : 100);
}
typeWrite();

// ─── GREETING ────────────────────────────────────────
(function setGreeting() {
  const hour = new Date().getHours();
  let greet = 'Hello, I\'m';
  if (hour < 12) greet = 'Good Morning! I\'m';
  else if (hour < 17) greet = 'Good Afternoon! I\'m';
  else greet = 'Good Evening! I\'m';
  const el = document.querySelector('.hero-greeting');
  if (el) el.textContent = greet;
})();

// ─── REVEAL ON SCROLL ────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// Also observe skill cards for skill bars when sections scroll in
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('#skills').forEach(el => skillObserver.observe(el));

// ─── CONTACT FORM ────────────────────────────────────
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn  = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Simulate sending
  submitBtn.disabled = true;
  submitText.textContent = 'Sending…';
  submitBtn.style.opacity = '0.7';

  setTimeout(() => {
    form.reset();
    submitBtn.disabled = false;
    submitText.textContent = 'Send Message';
    submitBtn.style.opacity = '1';
    formSuccess.style.display = 'block';

    setTimeout(() => {
      formSuccess.style.display = 'none';
    }, 5000);
  }, 1500);
});

// ─── SMOOTH SCROLL OFFSET FOR FIXED NAV ──────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── HERO ENTRANCE ANIMATION ─────────────────────────
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-greeting, .hero-name, .typewriter-wrap, .hero-bio, .hero-cta, .hero-avatar-wrap').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 + i * 150);
  });
});

console.log('%c👋 Hey there! Portfolio built by Aman Arora.', 'color: #7c3aed; font-size: 1rem; font-weight: bold;');
