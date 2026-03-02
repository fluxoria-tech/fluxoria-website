/* =============================================
   FLUXORIA LLP — Main JavaScript
   ============================================= */

'use strict';

// ─── Helpers ──────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ─── AOS Init ────────────────────────────────
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60,
});

// ─── Footer Year ─────────────────────────────
const yearEl = $('#footerYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ─── Scroll Progress Bar ─────────────────────
const scrollProgress = $('#scrollProgress');
function updateScrollProgress() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = `${progress}%`;
}

// ─── Header Scroll Effect ─────────────────────
const header = $('#header');
function handleHeaderScroll() {
  const scrolled = window.scrollY > 40;
  header?.classList.toggle('scrolled', scrolled);
}

// ─── Back to Top ─────────────────────────────
const backToTop = $('#backToTop');
function handleBackToTop() {
  backToTop?.classList.toggle('visible', window.scrollY > 400);
}
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ─── Consolidated scroll listener ────────────
window.addEventListener('scroll', () => {
  updateScrollProgress();
  handleHeaderScroll();
  handleBackToTop();
  updateActiveNavLink();
}, { passive: true });

// ─── Mobile Nav ──────────────────────────────
const navToggle = $('#navToggle');
const navMenu   = $('#navMenu');

navToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('active');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close on nav link click
$$('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('open');
    navToggle?.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ─── Smooth Scroll for anchor links ──────────
$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = $(targetId);
    if (target) {
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── Active Nav Link on Scroll ───────────────
const sections  = $$('section[id]');
const navLinks  = $$('.nav__link');

function updateActiveNavLink() {
  const scrollY = window.scrollY + (header?.offsetHeight ?? 72) + 40;
  let current = '';
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop) current = sec.id;
  });
  navLinks.forEach(link => {
    const href = link.getAttribute('href')?.replace('#', '');
    link.classList.toggle('active', href === current);
  });
}

// ─── Counter Animation ────────────────────────
function animateCounter(el, target, duration = 1800) {
  const start = performance.now();
  const initial = 0;
  function step(timestamp) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(initial + (target - initial) * eased);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const counterEls = $$('.stat__number[data-target]');
if (counterEls.length) {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target, parseInt(entry.target.dataset.target, 10));
      }
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => counterObserver.observe(el));
}

// ─── Typing Effect ────────────────────────────
const typingEl = $('#typingText');
const phrases = [
  'Flow + Innovation + Power',
  'Cloud. DevOps. AI. Growth.',
  'Digital Transformation Experts',
  'Building Scalable Systems',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingTimer = null;

function typeEffect() {
  if (!typingEl) return;
  const current = phrases[phraseIndex];
  const displayed = isDeleting
    ? current.substring(0, charIndex - 1)
    : current.substring(0, charIndex + 1);

  // Inject text + cursor
  typingEl.innerHTML = displayed + '<span class="typing-cursor" aria-hidden="true"></span>';

  if (!isDeleting && displayed.replace('<span class="typing-cursor" aria-hidden="true"></span>', '').length === current.length) {
    // Full phrase typed — wait before deleting
    isDeleting = true;
    typingTimer = setTimeout(typeEffect, 2200);
    return;
  }

  if (isDeleting && displayed.replace('<span class="typing-cursor" aria-hidden="true"></span>', '').length === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    charIndex   = 0;
    typingTimer = setTimeout(typeEffect, 500);
    return;
  }

  charIndex += isDeleting ? -1 : 1;
  const speed = isDeleting ? 40 : 80;
  typingTimer = setTimeout(typeEffect, speed);
}

// Start typing after a short delay
setTimeout(typeEffect, 800);

// ─── Hero Canvas — Connected Nodes Animation ──
const canvas = $('#heroCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let nodes = [];
  let animFrame;
  let W, H;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createNodes(count) {
    nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x:   Math.random() * W,
        y:   Math.random() * H,
        vx:  (Math.random() - 0.5) * 0.4,
        vy:  (Math.random() - 0.5) * 0.4,
        r:   Math.random() * 2.5 + 1,
        hue: Math.random() < 0.5 ? 240 : 280, // blue or purple
      });
    }
  }

  function drawFrame() {
    ctx.clearRect(0, 0, W, H);

    const MAX_DIST = 160;

    // Update & draw nodes
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;

      // Node dot
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 2.5);
      grad.addColorStop(0, `hsla(${n.hue}, 80%, 75%, 0.9)`);
      grad.addColorStop(1, `hsla(${n.hue}, 80%, 75%, 0)`);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${n.hue}, 80%, 75%, 0.8)`;
      ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.25;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(150, 120, 230, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    animFrame = requestAnimationFrame(drawFrame);
  }

  function initCanvas() {
    resize();
    const nodeCount = Math.min(Math.floor((W * H) / 16000), 80);
    createNodes(nodeCount);
    cancelAnimationFrame(animFrame);
    drawFrame();
  }

  initCanvas();

  const resizeObserver = new ResizeObserver(() => {
    initCanvas();
  });
  resizeObserver.observe(canvas.parentElement);
}

// ─── Contact Form ─────────────────────────────
const contactForm = $('#contactForm');
const submitBtn   = $('#submitBtn');

contactForm?.addEventListener('submit', e => {
  e.preventDefault();

  // Basic validation
  const name    = contactForm.querySelector('#name').value.trim();
  const email   = contactForm.querySelector('#email').value.trim();
  const message = contactForm.querySelector('#message').value.trim();

  if (!name || !email || !message) {
    showFormMessage('Please fill in all required fields.', 'error');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFormMessage('Please enter a valid email address.', 'error');
    return;
  }

  // Simulate send
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Sending…</span> <i class="fas fa-spinner fa-spin"></i>';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
    showFormMessage('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
    contactForm.reset();
  }, 2000);
});

function showFormMessage(msg, type) {
  let el = $('#formMessage');
  if (!el) {
    el = document.createElement('div');
    el.id = 'formMessage';
    el.style.cssText = `
      padding: 14px 20px;
      border-radius: 10px;
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 16px;
      text-align: center;
      transition: opacity 0.3s;
    `;
    contactForm.prepend(el);
  }
  el.textContent = msg;
  if (type === 'success') {
    el.style.background = 'rgba(76,175,80,0.15)';
    el.style.border     = '1px solid rgba(76,175,80,0.4)';
    el.style.color      = '#a5d6a7';
  } else {
    el.style.background = 'rgba(244,67,54,0.1)';
    el.style.border     = '1px solid rgba(244,67,54,0.35)';
    el.style.color      = '#ef9a9a';
  }
  el.style.opacity = '1';
  setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 300); }, 5000);
}

// ─── Service card subtle parallax on mouse ────
$$('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-6px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ─── AI feature card subtle tilt ─────────────
$$('.ai-feature').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-6px) rotateX(${-dy * 2}deg) rotateY(${dx * 2}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ─── Tech badge hover shuffle effect ─────────
$$('.tech-badge').forEach(badge => {
  badge.style.transition = 'all 0.25s cubic-bezier(0.4,0,0.2,1)';
});

// ─── Initial calls ────────────────────────────
handleHeaderScroll();
updateScrollProgress();
