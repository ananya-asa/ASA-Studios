// ===============================================
// ASA Studios - Optimized & Smooth Animations
// ===============================================

// ----- Enhanced Particles -----
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;

  const particleCount = 35;

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

// ----- Scroll reveal -----
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

// ----- Smooth scrolling -----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id === "#") return;
      
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    });
  });
}

// ----- Email form -----
function initEmailForm() {
  const emailForm = document.querySelector(".email-form");
  if (!emailForm) return;

  emailForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailInput = emailForm.querySelector(".email-input");
    const email = emailInput.value.trim();
    if (!email) return;

    const button = emailForm.querySelector('button[type="submit"]');

    button.disabled = true;
    button.textContent = "Sending...";

    try {
      const formData = new FormData(emailForm);

      await fetch("/", {
        method: "POST",
        body: new URLSearchParams(formData).toString(),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      button.textContent = "✓ You're in!";
      button.style.background = "linear-gradient(135deg, #10b981, #34d399)";

      setTimeout(() => {
        window.location.href = "thanks.html";
      }, 700);
    } catch (err) {
      console.error(err);
      window.location.href = "thanks.html";
    }
  });
}

// ----- Mouse parallax (optimized, no jank) -----
function initParallaxGlow() {
  const orbs = document.querySelectorAll(".glow-orb");
  if (!orbs.length) return;

  // Disable on mobile/touch devices
  const isMobile =
    window.matchMedia("(max-width: 768px)").matches ||
    window.matchMedia("(pointer: coarse)").matches;

  if (isMobile) return;

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;
  let rafId = null;

  document.addEventListener(
    "mousemove",
    (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );

  function updateParallax() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 12;
      orb.style.transform = `translate3d(${currentX * speed}px, ${currentY * speed}px, 0)`;
    });

    rafId = requestAnimationFrame(updateParallax);
  }

  // Start after delay to prevent initial lag
  setTimeout(() => {
    updateParallax();
  }, 500);

  // Pause when hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && rafId) {
      cancelAnimationFrame(rafId);
    } else if (!document.hidden) {
      updateParallax();
    }
  });
}

// ----- Card hover glow -----
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

// ----- Cartoon floating animation -----
function initCartoonFloat() {
  const cartoon = document.querySelector(".cartoon-placeholder");
  if (!cartoon) return;

  let floatY = 0;
  let direction = 1;
  let rafId = null;

  function animate() {
    floatY += 0.3 * direction;
    
    if (floatY > 15 || floatY < -15) {
      direction *= -1;
    }

    cartoon.style.transform = `translateY(${floatY}px)`;
    rafId = requestAnimationFrame(animate);
  }

  // Start after delay
  setTimeout(() => {
    animate();
  }, 600);

  // Pause when hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && rafId) {
      cancelAnimationFrame(rafId);
    } else if (!document.hidden && !rafId) {
      animate();
    }
  });
}

// ----- Button shimmer -----
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

// ----- Header scroll effect (optimized) -----
function initHeaderScroll() {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
          topbar.style.background = "rgba(10, 10, 15, 0.95)";
          topbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
        } else {
          topbar.style.background = "rgba(10, 10, 15, 0.7)";
          topbar.style.boxShadow = "";
        }

        ticking = false;
      });

      ticking = true;
    }
  }, { passive: true });
}

// ===============================================
// INITIALIZATION (Staggered for smooth load)
// ===============================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("🎬 ASA Studios - Initializing...");

  // Immediate init
  createParticles();
  
  // Stagger heavy animations to prevent lag spike
  setTimeout(() => {
    initScrollAnimations();
    initSmoothScroll();
    initEmailForm();
    initHeaderScroll();
    initCardGlow();
    initButtonShimmer();
  }, 100);

  setTimeout(() => {
    initParallaxGlow();
    initCartoonFloat();
  }, 400);

  console.log("✓ ASA Studios - Ready!");
});

// Smooth page reveal (no flash/glitch)
window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
});