// ==============================
// Loading Screen
// ==============================
function initLoadingScreen() {
    window.addEventListener("load", function() {
        setTimeout(() => {
            const loadingScreen = document.getElementById("loading-screen");
            loadingScreen.style.opacity = "0";
            setTimeout(() => {
                loadingScreen.style.display = "none";
            }, 500);
        }, 1000);
    });
}

// ==============================
// Animations
// ==============================
function initAnimations() {
  // Typed.js Animation
  const typed = new Typed("#typed-output", {
    strings: [
      "Full Stack Developer",
      "AI Engineer",
      "Mobile App Developer",
      "Problem Solver",
      "Tech Enthusiast",
    ],
    typeSpeed: 80,
    backSpeed: 60,
    backDelay: 2000,
    startDelay: 1000,
    loop: true,
    showCursor: true,
    cursorChar: "|",
  });

  // Initialize counters when section is visible
  const aboutSection = document.getElementById("about");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(aboutSection);
}

// ==============================
// Charts
// ==============================
function initCharts() {
    try {
        // Skills Radar Chart
        const ctx = document.getElementById("skillsChart");
        if (ctx) {
            new Chart(ctx.getContext("2d"), {
                type: "radar",
                data: {
                    labels: [
                        "Full Stack Dev",
                        "Mobile Dev",
                        "AI/ML",
                        "Data Analysis",
                        "Problem Solving",
                    ],
                    datasets: [{
                        label: "Skill Proficiency",
                        data: [80, 85, 85, 80, 75],
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    }, ],
                },
                options: {
                    scales: {
                        r: {
                            ticks: {
                                display: false,
                            },
                        },
                    },
                },
            });
        }

        // Donut Chart for technology breakdown
        const techCtx = document.getElementById("techChart");
        if (techCtx) {
            new Chart(techCtx.getContext("2d"), {
                type: "doughnut",
                data: {
                    labels: ["Web Dev", "Mobile Dev", "AI/ML"],
                    datasets: [{
                        label: "Technology Breakdown",
                        data: [40, 25, 35],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(75, 192, 192, 0.2)",
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(75, 192, 192, 1)",
                        ],
                        borderWidth: 1,
                    }, ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            });
        }
    } catch (error) {
        console.error("Chart initialization error:", error);
    }
}

// ==============================
// Particles Background
// ==============================
function initParticles() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = [];
    const particleCount = 80; // Reduced for performance

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3, // Slower speed
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.4 + 0.2,
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Boundary collision
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(249, 115, 22, ${particle.opacity})`;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// ==============================
// Navigation
// ==============================
function initNavigation() {
    // Enhanced Navbar
    const navbar = document.querySelector(".navbar");
    let lastScrollTop = 0;

    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }

        lastScrollTop = scrollTop;
    });

    // Theme Toggle
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    function updateThemeIcon() {
        const icon = themeToggle.querySelector("i");
        const isDark = body.classList.contains("dark-mode");
        icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        body.classList.toggle("dark-mode", savedTheme === "dark");
        updateThemeIcon();
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        const isDark = body.classList.contains("dark-mode");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        updateThemeIcon();
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                });
            }
        });
    });

    // Mobile menu toggle
    const navbarToggler = document.getElementById("navbar-toggler");
    const navbarMenu = document.getElementById("navbar-menu");

    if (navbarToggler && navbarMenu) {
        navbarToggler.addEventListener("click", () => {
            navbarMenu.classList.toggle("active");
        });
    }
}

// ==============================
// Back to Top Button
// ==============================
function initBackToTop() {
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = "flex";
        } else {
            backToTop.style.display = "none";
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}

// ==============================
// Counter Animation
// ==============================
function animateCounters() {
    const counters = document.querySelectorAll("[data-count]");

    counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-count"));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + (target === 100 ? "%" : "+");
        }, 16);
    });
}

// ==============================
// Skills Animation
// ==============================
function initSkillsAnimation() {
    const skillsSection = document.getElementById("skills");
    if (!skillsSection) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 }
    );

    observer.observe(skillsSection);
}

function animateSkills() {
    const skillBars = document.querySelectorAll(".skill-loading");
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.animationDelay = `${index * 0.2}s`;
            bar.classList.add("animate");
        }, 100);
    });
}

// ==============================
// Contact Form
// ==============================
function initContactForm() {
    const contactForm = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");

    if (!contactForm || !submitBtn) return;

    contactForm.addEventListener("submit", async(e) => {
        e.preventDefault();

        // Disable button and show loading
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML =
            '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

        try {
            // Simulate form submission (replace with actual fetch in production)
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Show success message
            showToast(
                "Message sent successfully! I'll get back to you soon.",
                "success"
            );

            // Reset form
            contactForm.reset();
        } catch (error) {
            showToast("Failed to send message. Please try again.", "error");
            console.error("Form submission error:", error);
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

function showToast(message, type = "success") {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll(".toast");
    existingToasts.forEach((toast) => toast.remove());

    // Create toast element
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
    <div class="toast-icon">
      <i class="fas ${
        type === "success" ? "fa-check-circle" : "fa-exclamation-circle"
      }"></i>
    </div>
    <div class="toast-message">${message}</div>
  `;

    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    // Auto-remove after delay
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// ==============================
// Ripple Effect for Buttons
// ==============================
function initRippleEffect() {
    document.querySelectorAll(".btn").forEach((btn) => {
        btn.addEventListener("click", function(e) {
            // Only create ripple if button isn't disabled
            if (this.disabled) return;

            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.className = "ripple";
            ripple.style.width = ripple.style.height = size + "px";
            ripple.style.left = x + "px";
            ripple.style.top = y + "px";

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ==============================
// Scroll Progress Indicator
// ==============================
function initScrollProgress() {
    const progressBar = document.createElement("div");
    progressBar.id = "scroll-progress";
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", () => {
        const scrolled =
            (window.pageYOffset /
                (document.documentElement.scrollHeight - window.innerHeight)) *
            100;
        progressBar.style.width = scrolled + "%";
    });
}

// ==============================
// Preload Images
// ==============================
function preloadImages() {
    const imageUrls = [
        "https://via.placeholder.com/400x250/f97316/ffffff?text=Finance+Manager",
        "https://via.placeholder.com/400x250/10b981/ffffff?text=E-Learning+Platform",
        "https://via.placeholder.com/400x250/8b5cf6/ffffff?text=AI+Chatbot",
        "https://via.placeholder.com/400x250/10b981/ffffff?text=Fitness+Tracker",
        "https://via.placeholder.com/400x250/3b82f6/ffffff?text=Blog+System",
        "https://via.placeholder.com/400x250/f97316/ffffff?text=IoT+Dashboard",
    ];

    imageUrls.forEach((url) => {
        const img = new Image();
        img.src = url;
    });
}

// ==============================
// Initialize Everything
// ==============================
function initPortfolio() {
    initLoadingScreen();
    initAnimations();
    initCharts();
    initParticles();
    initNavigation();
    initBackToTop();
    initSkillsAnimation();
    initContactForm();
    initRippleEffect();
    initScrollProgress();
    preloadImages();

    console.log("🚀 Portfolio loaded successfully!");
    console.log("💼 Hamza Radaideh - Full Stack Developer");
    console.log("📧 Contact: hjradaideh10@gmail.com");
}

// Start the portfolio when DOM is ready
document.addEventListener("DOMContentLoaded", initPortfolio);
