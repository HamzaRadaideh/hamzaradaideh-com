// Loading Screen
window.addEventListener("load", function() {
    setTimeout(() => {
        document.getElementById("loading-screen").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("loading-screen").style.display = "none";
        }, 500);
    }, 2000);
});

// Initialize AOS
AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
});

// Particles Background
function initParticles() {
    const canvas = document.getElementById("particles-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.2,
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(249, 115, 22, ${particle.opacity})`;
            ctx.fill();

            // Draw connections
            particles.slice(index + 1).forEach((otherParticle) => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(249, 115, 22, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize particles when page loads
initParticles();

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
const icon = themeToggle.querySelector("i");

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

function updateThemeIcon() {
    const isDark = body.classList.contains("dark-mode");
    icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    });
});

// Back to Top Button
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

// Animated Counters
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

// Trigger counter animation when about section is visible
const aboutSection = document.getElementById("about");
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(aboutSection);

// Skills Animation
function animateSkills() {
    const skillBars = document.querySelectorAll(".skill-loading");
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.animationDelay = `${index * 0.2}s`;
            bar.classList.add("animate");
        }, 100);
    });
}

// Trigger skills animation when skills section is visible
const skillsSection = document.getElementById("skills");
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
});

skillsObserver.observe(skillsSection);

// Contact Form
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");

contactForm.addEventListener("submit", async(e) => {
    e.preventDefault();

    // Change button state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form
    contactForm.reset();

    // Reset button
    submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
    submitBtn.disabled = false;

    // Show success message
    alert("Message sent successfully! I'll get back to you soon.");
});

// Add hover effects to cards
document.querySelectorAll(".card-enhanced").forEach((card) => {
    card.addEventListener("mouseenter", function() {
        this.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", function() {
        this.style.transform = "translateY(0)";
    });
});

// Add click effects to buttons
document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function(e) {
        const ripple = document.createElement("span");
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
            .btn {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Preload images
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

// Add scroll progress indicator
const progressBar = document.createElement("div");
progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(135deg, #f97316, #fb923c);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
    const scrolled =
        (window.pageYOffset /
            (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
    progressBar.style.width = scrolled + "%";
});

console.log("🚀 Portfolio loaded successfully!");
console.log("💼 Hamza Radaideh - Full Stack Developer");
console.log("📧 Contact: hjradaideh10@gmail.com");