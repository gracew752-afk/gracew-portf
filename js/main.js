// Add ?debug=1 to any URL to see the clickable hotspot areas
// outlined in pink, with labels, for calibrating their position
// over the designed images.
if (new URLSearchParams(window.location.search).has("debug")) {
  document.body.classList.add("debug");
}

// ── The fun layer ────────────────────────────────────────
// Falling ✿ confetti, reused by the cover secret + cherry hunt.
function bloom(count) {
  const glyphs = ["✿", "♡", "🍒", "✦"];
  for (let i = 0; i < (count || 28); i++) {
    const s = document.createElement("span");
    s.className = "bloom";
    s.textContent = glyphs[i % glyphs.length];
    s.style.left = Math.random() * 100 + "vw";
    s.style.animationDelay = Math.random() * 0.6 + "s";
    s.style.fontSize = 14 + Math.random() * 18 + "px";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 2800);
  }
}

// Cover secret: three quick clicks on the cover → flower rain.
(function () {
  const cover = document.getElementById("cover");
  if (!cover) return;
  let clicks = 0, timer;
  cover.addEventListener("click", () => {
    clicks++;
    clearTimeout(timer);
    timer = setTimeout(() => (clicks = 0), 1200);
    if (clicks >= 3) { clicks = 0; bloom(); }
  });
})();

// Clapperboard end-card: click to snap, reveals the CTAs.
(function () {
  const clapper = document.getElementById("clapper");
  if (!clapper) return;
  const snap = () => {
    clapper.classList.toggle("snapped");
    document.getElementById("wrap-reveal").classList.add("on");
  };
  clapper.addEventListener("click", snap);
  clapper.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); snap(); }
  });
})();

// Cherry hunt: one 🍒 hidden on each project page; find all five.
(function () {
  const TOTAL = 5;
  const load = () => JSON.parse(localStorage.getItem("gracew_cherries") || "[]");

  function toast(msg) {
    const t = document.createElement("div");
    t.className = "cherry-toast";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2600);
  }

  document.querySelectorAll(".cherry").forEach((btn) => {
    const id = btn.dataset.cherry;
    if (load().includes(id)) btn.classList.add("found");
    btn.addEventListener("click", () => {
      const found = load();
      if (found.includes(id)) return;
      found.push(id);
      localStorage.setItem("gracew_cherries", JSON.stringify(found));
      btn.classList.add("found");
      if (found.length >= TOTAL) {
        toast("all 5 cherries. certified thorough. 🍒");
        bloom(36);
      } else {
        toast("cherry " + found.length + " of 5 found 🍒");
      }
    });
  });

  const status = document.getElementById("cherry-status");
  if (status) {
    const n = load().length;
    if (n > 0) {
      status.hidden = false;
      status.textContent = n >= TOTAL
        ? "🍒 5/5 cherries found — certified thorough."
        : "🍒 " + n + "/5 cherries found — the rest are hiding on the project pages.";
    }
  }
})();

// Cherry ninja: a cherry hides at the right edge of the homepage.
// Press it → 30 seconds of slicing fruit with your cursor.
(function () {
  const egg = document.getElementById("ninja-egg");
  if (!egg) return;

  const GLYPHS = ["🍒", "🍒", "🍎", "🍋‍🟩", "🍋"];
  let overlay = null, fruits = [], score = 0, raf = null, spawner = null, clock = null, last = null, playing = false;

  function cleanup() {
    cancelAnimationFrame(raf);
    clearInterval(spawner);
    clearInterval(clock);
    if (overlay) overlay.remove();
    overlay = null;
    fruits = [];
    playing = false;
    last = null;
  }

  function spawn() {
    if (!overlay) return;
    const el = document.createElement("span");
    el.className = "ninja-fruit";
    el.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    const f = {
      el,
      x: 60 + Math.random() * (window.innerWidth - 120),
      y: window.innerHeight + 30,
      vx: (Math.random() - 0.5) * 4,
      vy: -(13 + Math.random() * 5),
      rot: 0,
      vr: (Math.random() - 0.5) * 10,
      dead: false,
    };
    el.style.transform = "translate(" + f.x + "px, " + f.y + "px)";
    overlay.appendChild(el);
    fruits.push(f);
  }

  function loop() {
    fruits.forEach((f) => {
      f.vy += 0.25;
      f.x += f.vx;
      f.y += f.vy;
      f.rot += f.vr;
      f.el.style.transform = "translate(" + f.x + "px, " + f.y + "px) rotate(" + f.rot + "deg)";
    });
    fruits = fruits.filter((f) => {
      if (f.y > window.innerHeight + 70) { f.el.remove(); return false; }
      return true;
    });
    raf = requestAnimationFrame(loop);
  }

  function slice(f, x, y) {
    f.dead = true;
    f.el.classList.add("sliced");
    score++;
    const hud = overlay.querySelector("#ninja-score");
    if (hud) hud.textContent = "🍒 " + score;
    const splash = document.createElement("span");
    splash.className = "ninja-splash";
    splash.textContent = "✦";
    splash.style.left = x + "px";
    splash.style.top = y + "px";
    overlay.appendChild(splash);
    setTimeout(() => splash.remove(), 500);
    setTimeout(() => f.el.remove(), 400);
  }

  function finish() {
    playing = false;
    clearInterval(spawner);
    clearInterval(clock);
    const line = score >= 20 ? "certified blade. iconic."
      : score >= 10 ? "respectable. iconic-adjacent."
      : "soft launch. run it back.";
    const end = document.createElement("div");
    end.className = "ninja-end";
    end.innerHTML =
      '<p class="ninja-endscore">' + score + " 🍒</p>" +
      '<p class="ninja-endline">' + line + "</p>" +
      '<div><button class="home-pill" id="ninja-again">one more take</button> ' +
      '<button class="home-pill" id="ninja-done">ok bye</button></div>';
    overlay.appendChild(end);
    end.querySelector("#ninja-again").onclick = () => { cleanup(); start(); };
    end.querySelector("#ninja-done").onclick = cleanup;
  }

  function start() {
    cleanup();
    score = 0;
    playing = true;
    overlay = document.createElement("div");
    overlay.className = "ninja-overlay";
    overlay.innerHTML =
      '<div class="ninja-hud"><span id="ninja-score">🍒 0</span>' +
      '<span id="ninja-time">30</span>' +
      '<button class="ninja-close" aria-label="close">×</button></div>' +
      '<p class="ninja-hint">slice with your cursor ✦</p>';
    document.body.appendChild(overlay);
    overlay.querySelector(".ninja-close").onclick = cleanup;

    let t = 30;
    clock = setInterval(() => {
      t--;
      const el = overlay && overlay.querySelector("#ninja-time");
      if (el) el.textContent = t;
      if (t <= 0) finish();
    }, 1000);

    spawner = setInterval(spawn, 550);
    spawn();
    loop();

    overlay.addEventListener("pointermove", (e) => {
      if (!playing) return;
      if (last) {
        const speed = Math.hypot(e.clientX - last[0], e.clientY - last[1]);
        const dot = document.createElement("span");
        dot.className = "ninja-trail";
        dot.style.left = e.clientX + "px";
        dot.style.top = e.clientY + "px";
        overlay.appendChild(dot);
        setTimeout(() => dot.remove(), 320);
        if (speed > 5) {
          fruits.forEach((f) => {
            if (!f.dead && Math.hypot(e.clientX - (f.x + 27), e.clientY - (f.y + 27)) < 64) {
              slice(f, e.clientX, e.clientY);
            }
          });
        }
      }
      last = [e.clientX, e.clientY];
    });
  }

  egg.addEventListener("click", start);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay) cleanup();
  });
})();

// ── Pink marquee tickers ─────────────────────────────────
// Every .case-cue becomes an infinitely scrolling pink band.
document.querySelectorAll(".case-cue").forEach((cue) => {
  const text = cue.textContent.trim().replace(/^↓\s*/, "").replace(/\s*↓$/, "");
  cue.textContent = "";
  const track = document.createElement("div");
  track.className = "ticker-track";
  for (let i = 0; i < 2; i++) {
    const half = document.createElement("span");
    half.className = "ticker-half";
    half.textContent = (text + " ✦ ").repeat(8);
    track.appendChild(half);
  }
  cue.appendChild(track);
});

// ── Contents hover previews ──────────────────────────────
// A floating image card ("peek") trails the cursor while it moves
// over the contents list, swapping to each project's slide image.
(function () {
  const list = document.getElementById("contents-list");
  const peek = document.getElementById("peek");
  if (!list || !peek) return;

  const peekImg = document.getElementById("peek-img");
  const peekTags = document.getElementById("peek-tags");

  let targetX = 0, targetY = 0;   // where the cursor is
  let x = 0, y = 0;               // where the card is (lerps behind)
  let raf = null;

  function tick() {
    x += (targetX - x) * 0.14;
    y += (targetY - y) * 0.14;
    // tilt with horizontal velocity, clamped so it stays cute not chaotic
    const tilt = Math.max(-7, Math.min(7, (targetX - x) * 0.06)) - 2;
    peek.style.transform = `translate(${x}px, ${y}px) rotate(${tilt}deg)`;
    raf = requestAnimationFrame(tick);
  }

  function place(e) {
    const w = peek.offsetWidth || 360;
    const h = peek.offsetHeight || 260;
    // sit to the right of the cursor; flip to the left near the edge
    let px = e.clientX + 28;
    if (px + w > window.innerWidth - 12) px = e.clientX - w - 28;
    let py = e.clientY - h / 2;
    py = Math.max(12, Math.min(py, window.innerHeight - h - 12));
    targetX = px;
    targetY = py;
  }

  list.addEventListener("mousemove", place);

  list.querySelectorAll("a[data-preview]").forEach((link) => {
    link.addEventListener("mouseenter", (e) => {
      peekImg.src = link.dataset.preview;
      peekTags.textContent = link.dataset.tags || "";
      place(e);
      // first show: snap the card to the cursor so it doesn't fly across the page
      if (!peek.classList.contains("on")) {
        x = targetX;
        y = targetY;
      }
      peek.classList.add("on");
      if (!raf) tick();
    });
  });

  list.addEventListener("mouseleave", () => {
    peek.classList.remove("on");
    if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }
  });
})();
