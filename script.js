// Typed.js Initialization
const typed = new Typed('.auto-type', {
    strings: ["Web Developer", "UI/UX Designer", "Frontend Engineer"],
    typeSpeed: 100,
    backSpeed: 50,
    loop: true,
    showCursor: false
});

// Mobile Menu Toggle
const menuIcon = document.getElementById('menu-icon');
const navList = document.getElementById('navlist');

function toggleMenu() {
    navList.classList.toggle('active');
    menuIcon.classList.toggle('bx-x');
    document.body.classList.toggle('no-scroll');
}

// Close Menu Function
function closeMenu() {
    navList.classList.remove('active');
    menuIcon.classList.remove('bx-x');
    document.body.classList.remove('no-scroll');
}

// Event Listeners
menuIcon.addEventListener('click', toggleMenu);
document.addEventListener('click', (e) => {
    if (!navList.contains(e.target) && !menuIcon.contains(e.target)) {
        closeMenu();
    }
});

// Close menu when clicking on menu items
document.querySelectorAll('.navlist a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Active Link Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navlist a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Portfolio Filtering
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.style.display = (filter === 'all' || item.dataset.category === filter) ? 
                'block' : 'none';
        });
        
        document.querySelectorAll('.filter-btn').forEach(btn => 
            btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Skills Animation
document.querySelectorAll('.skill-item').forEach(skill => {
    const progress = skill.querySelector('.progress');
    const width = progress.style.width;
    progress.style.width = '0';
    setTimeout(() => {
        progress.style.width = width;
    }, 500);
});

// FAQ Accordion
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});

// Back to Top Button
document.querySelector('.back-to-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

document.querySelectorAll('.service-item, .portfolio-item, .feature-card, .testimonial-card').forEach((el) => {
    observer.observe(el);
});

// Mobile Navbar Height Adjustment
window.addEventListener('load', () => {
    const navbar = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.marginTop = `${navbar.offsetHeight}px`;
    }
});

// Formspree Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const responseElement = document.getElementById('formResponse');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> Sending...';
    submitButton.disabled = true;
    responseElement.textContent = '';
    responseElement.className = '';
    
    try {
        const formData = new FormData(form);
        
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            responseElement.textContent = 'Thank you! Your message has been sent successfully.';
            responseElement.className = 'success';
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                responseElement.textContent = '';
                responseElement.className = '';
            }, 5000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        responseElement.textContent = 'There was a problem sending your message. Please try again.';
        responseElement.className = 'error';
    } finally {
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
});
    
    // Show loading state
    submitButton.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> Sending...';
    submitButton.disabled = true;
    responseElement.textContent = '';
    responseElement.className = '';
    
    try {
        const formData = new FormData(form);
        
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            responseElement.textContent = 'Thank you! Your message has been sent successfully.';
            responseElement.className = 'success';
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                responseElement.textContent = '';
                responseElement.className = '';
            }, 5000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        responseElement.textContent = 'There was a problem sending your message. Please try again.';
        responseElement.className = 'error';
    } finally {
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
});

// Add loading animation CSS
const style = document.createElement('style');
style.textContent = `
    .animate-spin {
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .no-scroll {
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Touch event for mobile devices
menuIcon.addEventListener('touchstart', (e) => {
    e.preventDefault();
    toggleMenu();
});

// Window resize handler
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});