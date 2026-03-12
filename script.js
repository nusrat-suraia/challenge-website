// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = 1;
    follower.style.opacity = 0.5;
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = 0;
    follower.style.opacity = 0;
});

// Hover effect on links and buttons
const hoverables = document.querySelectorAll('a, button, .feature-card, .video-card');

hoverables.forEach(item => {
    item.addEventListener('mouseenter', () => {
        follower.style.transform = 'scale(1.5)';
        follower.style.opacity = 0.3;
    });
    
    item.addEventListener('mouseleave', () => {
        follower.style.transform = 'scale(1)';
        follower.style.opacity = 0.5;
    });
});

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');

const animateStats = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        
        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCount();
    });
};

// Trigger animation when stats come into view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelector('.hero-stats') && observer.observe(document.querySelector('.hero-stats'));

// Tab Switching
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding panel
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Quote Carousel
const dots = document.querySelectorAll('.dot');
const quotes = document.querySelectorAll('.quote-item');
let currentQuote = 0;

const showQuote = (index) => {
    quotes.forEach(quote => quote.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    quotes[index].classList.add('active');
    dots[index].classList.add('active');
    currentQuote = index;
};

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showQuote(index));
});

// Auto rotate quotes
setInterval(() => {
    currentQuote = (currentQuote + 1) % quotes.length;
    showQuote(currentQuote);
}, 5000);

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for navigation links
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

// Parallax effect for floating elements
document.addEventListener('mousemove', (e) => {
    const elements = document.querySelectorAll('.floating-element');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    elements.forEach((elem, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        elem.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Theme toggle (light/dark) - Fixed version
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('show');
        // Toggle icon between bars and times
        const icon = mobileMenuToggle.querySelector('i');
        if (mobileMenu.classList.contains('show')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('show');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            mobileMenu.classList.remove('show');
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        const mobileNavLink = document.querySelector(`.mobile-menu a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (navLink) {
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                navLink.classList.add('active');
            }
            if (mobileNavLink) {
                document.querySelectorAll('.mobile-menu a').forEach(a => a.classList.remove('active'));
                mobileNavLink.classList.add('active');
            }
        }
    });
});