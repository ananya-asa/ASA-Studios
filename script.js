// ----- Enhanced Particles with Glow -----
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;

  const particleCount = 35; // More particles for richer effect

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 10 + "s";
    particle.style.animationDuration = (Math.random() * 10 + 10) + "s";

    particlesContainer.appendChild(particle);
  }
}

// ----- Scroll reveal with stagger -----
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
}

// ----- Smooth scrolling for nav links -----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id === "#") return;
      
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      
      const offsetTop = target.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    });
  });
}

// ----- Email form handler (Netlify-friendly) -----
function initEmailForm() {
  const emailForm = document.querySelector(".email-form");
  if (!emailForm) return;

  emailForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailInput = emailForm.querySelector(".email-input");
    const email = emailInput.value.trim();
    if (!email) return;

    const button = emailForm.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    button.disabled = true;
    button.textContent = "Sending...";

    try {
      const formData = new FormData(emailForm);

      const res = await fetch("/", {
        method: "POST",
        body: new URLSearchParams(formData).toString(),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      // Locally this might not be OK, so don't block redirect for local testing
      button.textContent = "✓ You're in!";
      button.style.background = "linear-gradient(135deg, #10b981, #34d399)";

      setTimeout(() => {
        window.location.href = "thanks.html"; // ✅ relative path
      }, 700);
    } catch (err) {
      console.error(err);
      // still redirect even if local fetch fails
      window.location.href = "thanks.html";
    }
  });
}


// ----- Mouse parallax for glow orbs -----
// ----- Mouse parallax for glow orbs (mobile-safe) -----
function initParallaxGlow() {
  const orbs = document.querySelectorAll(".glow-orb");
  if (!orbs.length) return;

  // ✅ Disable on touch / small screens (fixes mobile jank)
  const isMobile =
    window.matchMedia("(max-width: 768px)").matches ||
    window.matchMedia("(pointer: coarse)").matches;

  if (isMobile) return;

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  // ✅ Passive listener (better performance)
  document.addEventListener(
    "mousemove",
    (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );

  let rafId = null;

  function updateParallax() {
    currentX += (mouseX - currentX) * 0.06;
    currentY += (mouseY - currentY) * 0.06;

    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 12; // slightly lighter
      orb.style.transform = `translate3d(${currentX * speed}px, ${currentY * speed}px, 0)`;
    });

    rafId = requestAnimationFrame(updateParallax);
  }

  updateParallax();

  // ✅ Stop animation when tab is hidden (saves battery)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && rafId) cancelAnimationFrame(rafId);
    if (!document.hidden) updateParallax();
  });
}


// ----- Add hover glow to cards -----
function initCardGlow() {
  const cards = document.querySelectorAll(".card, .demo-card, .pricing-card");

  cards.forEach(card => {
    card.addEventListener("mouseenter", function() {
      this.style.boxShadow = "0 20px 60px rgba(99, 179, 237, 0.4)";
    });

    card.addEventListener("mouseleave", function() {
      this.style.boxShadow = "";
    });
  });
}

// ----- Floating animation for cartoon -----
function initCartoonFloat() {
  const cartoon = document.querySelector(".cartoon-placeholder");
  if (!cartoon) return;

  let floatY = 0;
  let direction = 1;

  function animate() {
    floatY += 0.3 * direction;
    
    if (floatY > 15 || floatY < -15) {
      direction *= -1;
    }

    cartoon.style.transform = `translateY(${floatY}px)`;
    requestAnimationFrame(animate);
  }

  animate();
}

// ----- Add shimmer effect to buttons -----
function initButtonShimmer() {
  const buttons = document.querySelectorAll(".btn-primary");

  buttons.forEach(btn => {
    btn.addEventListener("mouseenter", function() {
      this.style.animation = "shimmer 0.6s ease-in-out";
    });

    btn.addEventListener("animationend", function() {
      this.style.animation = "";
    });
  });

  // Add shimmer keyframe if not exists
  if (!document.querySelector("#shimmer-style")) {
    const style = document.createElement("style");
    style.id = "shimmer-style";
    style.textContent = `
      @keyframes shimmer {
        0% { filter: brightness(1); }
        50% { filter: brightness(1.3); }
        100% { filter: brightness(1); }
      }
    `;
    document.head.appendChild(style);
  }
}

// ----- Header scroll effect -----
function initHeaderScroll() {
  const topbar = document.querySelector(".topbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      topbar.style.background = "rgba(10, 10, 15, 0.95)";
      topbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
    } else {
      topbar.style.background = "rgba(10, 10, 15, 0.7)";
      topbar.style.boxShadow = "";
    }

    lastScroll = currentScroll;
  });
}

// ----- Initialize everything on load -----
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎬 ASA Studios - Initializing...");

  // Create background effects
  createParticles();

  // Initialize animations
  initScrollAnimations();
  initSmoothScroll();
  initEmailForm();
  initParallaxGlow();
  initCardGlow();
  initCartoonFloat();
  initButtonShimmer();
  initHeaderScroll();

  // Mark page as loaded
  setTimeout(() => {
    document.body.classList.add("loaded");
    console.log("✓ ASA Studios - Ready!");
  }, 100);
});

// ----- Add loading state -----
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 50);
});