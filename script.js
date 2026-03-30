/* ============================================================
   Animated Storyteller Portfolio – script.js
   Katam Nani | ECE Portfolio
   ============================================================ */

// ─── Story chapters ─────────────────────────────────────────
const chapters = [
    {
        speech: "Hey there! 👋 Welcome! I'm Nani – an ECE enthusiast who loves building cool stuff. Let me walk you through my journey!",
        infoTitle: "🎓 Welcome to My Portfolio",
        infoBody: `<p>Hi! I'm <strong>Katam Nani</strong>, a passionate BTech student studying Electronics and Communication Engineering at <strong>Lovely Professional University</strong>.</p>
<p style="margin-top:10px">This portfolio is your interactive guide to my world — from my projects to my skills. Click the dots at the top or use the buttons to navigate.</p>`,
        state: 'wave'
    },
    {
        speech: "A little about me – I'm a second-year BTech student who is eager to learn, innovate, and make a real impact with technology!",
        infoTitle: "👤 About Me",
        infoBody: `<ul>
  <li>BTech 2nd Year student at <strong>Lovely Professional University</strong></li>
  <li>Specializing in <strong>Electronics & Communication Engineering</strong></li>
  <li>Passionate about <strong>Robotics, IoT, and Embedded Systems</strong></li>
  <li>Always eager to learn new technologies and tackle challenging problems</li>
  <li>Team player with strong problem-solving mindset</li>
</ul>`,
        state: 'talking'
    },
    {
        speech: "Education shapes everything I do. Let me share my academic path with you!",
        infoTitle: "📚 Education",
        infoBody: `<ul>
  <li><strong>BTech – Electronics & Communication Engineering</strong><br>
      Lovely Professional University, Punjab<br>
      <span class="info-tag">2023 – Present</span></li>
  <li style="margin-top:10px"><strong>Intermediate (12th Grade)</strong><br>
      Science stream with Physics, Chemistry, Mathematics<br>
      <span class="info-tag">Completed 2023</span></li>
</ul>`,
        state: 'pointing'
    },
    {
        speech: "Here are some cool projects I've built! From robots that follow hand gestures to drone detection systems – let's check them out!",
        infoTitle: "🚀 Projects",
        infoBody: `<ul>
  <li><strong>🤖 Gesture Control Robot</strong><br>
      A robot controlled by hand gestures using flex sensors and an RF module. Combines hardware and software for real-time control.</li>
  <li style="margin-top:10px"><strong>🛸 Drone Detection System</strong><br>
      An AI-assisted system to detect unauthorized drones in restricted airspace using signal processing and computer vision.</li>
</ul>`,
        state: 'excited'
    },
    {
        speech: "My specializations span across ECE – from embedded systems to IoT and robotics. Here's what I focus on!",
        infoTitle: "⚡ Specialization",
        infoBody: `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px">
  <span class="info-tag">Embedded Systems</span>
  <span class="info-tag">IoT</span>
  <span class="info-tag">Robotics</span>
  <span class="info-tag">Signal Processing</span>
  <span class="info-tag">Circuit Design</span>
  <span class="info-tag">Microcontrollers</span>
  <span class="info-tag">VLSI Basics</span>
</div>
<p>Focused on bridging hardware and software to build smart, connected systems that solve real-world problems.</p>`,
        state: 'pointing'
    },
    {
        speech: "Want to connect? I'd love to hear from you! Here's how you can reach me. Let's build something amazing together! 🌟",
        infoTitle: "📬 Contact Info",
        infoBody: `<ul>
  <li>📧 <strong>Email:</strong> <a href="mailto:knaninani6281@gmail.com">knaninani6281@gmail.com</a></li>
  <li style="margin-top:8px">💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/yourprofile" target="_blank">linkedin.com/in/yourprofile</a></li>
  <li style="margin-top:8px">🎓 <strong>University:</strong> Lovely Professional University, Punjab</li>
</ul>
<p style="margin-top:14px;font-size:0.9rem;color:#aad4f5">Open to internships, collaborations, and exciting ECE projects!</p>`,
        state: 'wave'
    }
];

// ─── Constants ───────────────────────────────────────────────
const AUTO_PLAY_DELAY        = 8000; // ms between auto-advancing chapters
const TYPEWRITER_DELAY_MS    = 30;   // ms per character in typing effect
const PARTICLE_DENSITY_DIVISOR = 8000; // lower = more particles (pixels² per particle)
const MAX_CONNECTION_DISTANCE  = 90;   // px: max distance to draw particle connections

// ─── State ───────────────────────────────────────────────────
let currentChapter = 0;
let autoPlayTimer   = null;
let typeTimer       = null;
let isPlaying       = true;

// ─── DOM refs ────────────────────────────────────────────────
const characterWrapper = document.getElementById('character-wrapper');
const speechBubble     = document.getElementById('speech-bubble');
const speechText       = document.getElementById('speech-text');
const infoCard         = document.getElementById('info-card');
const infoCardTitle    = document.getElementById('info-card-title');
const infoCardBody     = document.getElementById('info-card-body');
const dotsContainer    = document.getElementById('chapter-dots');
const prevBtn          = document.getElementById('prev-btn');
const nextBtn          = document.getElementById('next-btn');
const playBtn          = document.getElementById('play-btn');

// ─── Build SVG character ─────────────────────────────────────
function buildCharacter() {
    characterWrapper.innerHTML = `
<svg id="character" viewBox="0 0 200 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animated character">

  <!-- Shadow -->
  <ellipse cx="100" cy="412" rx="52" ry="9" fill="rgba(0,0,0,0.30)"/>

  <!-- All animated parts wrapped for bob -->
  <g class="char-body-group">

    <!-- ── Legs ── -->
    <g id="char-left-leg">
      <rect x="68" y="265" width="28" height="88" rx="14" fill="#1a2340"/>
      <rect x="56" y="337" width="42" height="18" rx="9" fill="#0f1a30"/>
    </g>
    <g id="char-right-leg">
      <rect x="104" y="265" width="28" height="88" rx="14" fill="#1a2340"/>
      <rect x="102" y="337" width="42" height="18" rx="9" fill="#0f1a30"/>
    </g>

    <!-- ── Body / shirt ── -->
    <rect x="58" y="162" width="84" height="118" rx="22" fill="#1565c0"/>
    <!-- Shirt detail: collar V -->
    <polygon points="90,162 100,178 110,162" fill="#0d47a1"/>
    <!-- Shirt pocket -->
    <rect x="65" y="195" width="24" height="18" rx="5" fill="#0d47a1"/>

    <!-- ── Left arm ── -->
    <g id="char-left-arm">
      <rect x="28" y="170" width="34" height="22" rx="11" fill="#1565c0"/>
      <!-- Hand -->
      <ellipse cx="28" cy="181" rx="14" ry="13" fill="#f5c592"/>
    </g>

    <!-- ── Right arm ── -->
    <g id="char-right-arm">
      <rect x="138" y="170" width="34" height="22" rx="11" fill="#1565c0"/>
      <!-- Hand -->
      <ellipse cx="172" cy="181" rx="14" ry="13" fill="#f5c592"/>
    </g>

    <!-- ── Neck ── -->
    <rect x="86" y="144" width="28" height="24" rx="12" fill="#f5c592"/>

    <!-- ── Head ── -->
    <ellipse cx="100" cy="108" rx="48" ry="48" fill="#f5c592"/>

    <!-- Hair -->
    <path d="M52 95 Q56 48 100 52 Q144 48 148 95 Q134 64 100 66 Q66 64 52 95Z" fill="#1a0a00"/>
    <!-- Hair side bits -->
    <ellipse cx="55" cy="95" rx="7" ry="10" fill="#1a0a00"/>
    <ellipse cx="145" cy="95" rx="7" ry="10" fill="#1a0a00"/>

    <!-- Ears -->
    <ellipse cx="52" cy="110" rx="9" ry="12" fill="#f5c592"/>
    <ellipse cx="148" cy="110" rx="9" ry="12" fill="#f5c592"/>
    <!-- Ear inner -->
    <ellipse cx="52" cy="110" rx="5" ry="7" fill="#e8a878"/>
    <ellipse cx="148" cy="110" rx="5" ry="7" fill="#e8a878"/>

    <!-- ── Eyes ── -->
    <!-- Left eye -->
    <ellipse cx="82" cy="106" rx="10" ry="12" fill="white"/>
    <ellipse cx="82" cy="109" rx="6" ry="7" fill="#2c1810"/>
    <ellipse cx="84" cy="106" rx="3" ry="3" fill="white"/>
    <!-- Eyelid for blink -->
    <ellipse id="char-left-eye-lid" cx="82" cy="100" rx="11" ry="4" fill="#f5c592"/>

    <!-- Right eye -->
    <ellipse cx="118" cy="106" rx="10" ry="12" fill="white"/>
    <ellipse cx="118" cy="109" rx="6" ry="7" fill="#2c1810"/>
    <ellipse cx="120" cy="106" rx="3" ry="3" fill="white"/>
    <!-- Eyelid for blink -->
    <ellipse id="char-right-eye-lid" cx="118" cy="100" rx="11" ry="4" fill="#f5c592"/>

    <!-- ── Eyebrows ── -->
    <path id="char-left-brow"  d="M72 90 Q82 85 92 90"  stroke="#1a0a00" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path id="char-right-brow" d="M108 90 Q118 85 128 90" stroke="#1a0a00" stroke-width="3.5" fill="none" stroke-linecap="round"/>

    <!-- ── Mouth ── -->
    <path class="char-mouth" id="char-mouth-path"
          d="M82 126 Q100 136 118 126"
          stroke="#1a0a00" stroke-width="3" fill="none" stroke-linecap="round"/>

    <!-- Cheeks (blush) -->
    <ellipse cx="70" cy="120" rx="10" ry="7" fill="rgba(255,120,100,0.25)"/>
    <ellipse cx="130" cy="120" rx="10" ry="7" fill="rgba(255,120,100,0.25)"/>

    <!-- Nose -->
    <ellipse cx="100" cy="116" rx="4" ry="3" fill="#e8a878"/>

  </g><!-- end char-body-group -->
</svg>`;
}

// ─── Build chapter dots ───────────────────────────────────────
function buildDots() {
    dotsContainer.innerHTML = '';
    chapters.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === currentChapter ? ' active' : '');
        dot.title = chapters[i].infoTitle;
        dot.addEventListener('click', () => goToChapter(i));
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    document.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === currentChapter);
    });
}

// ─── Character state management ──────────────────────────────
function setCharacterState(state) {
    const wrapper = characterWrapper;
    wrapper.classList.remove('walking', 'waving', 'pointing', 'excited', 'talking');
    if (state) wrapper.classList.add(state);
}

// ─── Typewriter effect ───────────────────────────────────────
function typeWrite(text, callback) {
    clearTimeout(typeTimer);
    speechText.textContent = '';
    let i = 0;
    function step() {
        if (i < text.length) {
            speechText.textContent += text[i++];
    typeTimer = setTimeout(step, TYPEWRITER_DELAY_MS);
        } else if (callback) {
            callback();
        }
    }
    step();
}

// ─── Show a chapter ──────────────────────────────────────────
function showChapter(index) {
    const ch = chapters[index];

    // Hide old info card first
    infoCard.classList.remove('visible');

    // Show bubble
    speechBubble.classList.add('visible');

    // Set character state to talking during typewrite
    setCharacterState('talking');

    typeWrite(ch.speech, () => {
        // After typing done, switch to chapter-specific state
        setCharacterState(ch.state);
        // Show info card
        infoCardTitle.textContent = ch.infoTitle;
        infoCardBody.innerHTML    = ch.infoBody;
        setTimeout(() => infoCard.classList.add('visible'), 200);
    });

    updateDots();
}

// ─── Navigation ──────────────────────────────────────────────
function goToChapter(index) {
    currentChapter = ((index % chapters.length) + chapters.length) % chapters.length;
    showChapter(currentChapter);
    resetAutoPlay();
}

function nextChapter() { goToChapter(currentChapter + 1); }
function prevChapter() { goToChapter(currentChapter - 1); }

prevBtn.addEventListener('click', prevChapter);
nextBtn.addEventListener('click', nextChapter);

// ─── Auto-play ───────────────────────────────────────────────
function resetAutoPlay() {
    clearTimeout(autoPlayTimer);
    if (isPlaying) {
        autoPlayTimer = setTimeout(() => {
            nextChapter();
        }, AUTO_PLAY_DELAY);
    }
}

function togglePlay() {
    isPlaying = !isPlaying;
    playBtn.innerHTML = isPlaying ? '&#9646;&#9646;' : '&#9654;';
    playBtn.title     = isPlaying ? 'Pause' : 'Play';
    if (isPlaying) resetAutoPlay();
    else clearTimeout(autoPlayTimer);
}

playBtn.addEventListener('click', togglePlay);

// ─── Keyboard navigation ─────────────────────────────────────
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); nextChapter(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); prevChapter(); }
    if (e.key === 'p' || e.key === 'P') togglePlay();
});

// ─── Particle background ─────────────────────────────────────
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx    = canvas.getContext('2d');

    let W, H, particles;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function createParticles() {
        const count = Math.floor((W * H) / PARTICLE_DENSITY_DIVISOR);
        particles = Array.from({ length: count }, () => ({
            x:    Math.random() * W,
            y:    Math.random() * H,
            r:    Math.random() * 1.6 + 0.4,
            vx:   (Math.random() - 0.5) * 0.3,
            vy:   (Math.random() - 0.5) * 0.3,
            alpha: Math.random() * 0.6 + 0.2
        }));
    }

    function drawParticles() {
        ctx.clearRect(0, 0, W, H);

        // Stars / particles
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180,220,255,${p.alpha})`;
            ctx.fill();
        });

        // Draw subtle connecting lines between close particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MAX_CONNECTION_DISTANCE) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0,180,255,${0.12 * (1 - dist / MAX_CONNECTION_DISTANCE)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(drawParticles);
    }

    window.addEventListener('resize', () => { resize(); createParticles(); });
    resize();
    createParticles();
    drawParticles();
}

// ─── Walk-in entrance animation ──────────────────────────────
function walkin() {
    setCharacterState('walking');
    // Trigger CSS transition: slide in from left
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            characterWrapper.classList.add('on-stage');
        });
    });

    // After walk-in completes (~1s), start first chapter
    setTimeout(() => {
        setCharacterState('talking');
        showChapter(0);
        resetAutoPlay();
    }, 1100);
}

// ─── Bootstrap ───────────────────────────────────────────────
buildCharacter();
buildDots();
initParticles();
walkin();