// ==========================================
// NAVBAR FUNCTIONALITY
// ==========================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation highlighting
function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// ==========================================
// TYPING ANIMATION
// ==========================================

const typedTextElement = document.getElementById('typed-text');
const texts = [
    'Full Stack Python Developer',
    'Django Expert',
    'Technical Trainer',
    'Problem Solver'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end of text
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }

    setTimeout(typeText, typingSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 1000);
});

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

function revealOnScroll() {
    const reveals = document.querySelectorAll('.glass-card, .timeline-item, .skill-category');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('reveal', 'active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Initial check on page load
document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
});

// ==========================================
// SKILL BARS ANIMATION
// ==========================================

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const barVisible = 200;
        
        if (barTop < window.innerHeight - barVisible && !bar.classList.contains('animated')) {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
            bar.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', animateSkillBars);

// Initial check on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(animateSkillBars, 500);
});

// ==========================================
// FORM VALIDATION
// ==========================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('successMessage');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    input.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

function validateName() {
    const nameValue = nameInput.value.trim();
    
    if (nameValue === '') {
        showError(nameInput, 'Name is required');
        return false;
    } else if (nameValue.length < 2) {
        showError(nameInput, 'Name must be at least 2 characters');
        return false;
    } else {
        clearError(nameInput);
        return true;
    }
}

function validateEmail() {
    const emailValue = emailInput.value.trim();
    
    if (emailValue === '') {
        showError(emailInput, 'Email is required');
        return false;
    } else if (!emailRegex.test(emailValue)) {
        showError(emailInput, 'Please enter a valid email address');
        return false;
    } else {
        clearError(emailInput);
        return true;
    }
}

function validateMessage() {
    const messageValue = messageInput.value.trim();
    
    if (messageValue === '') {
        showError(messageInput, 'Message is required');
        return false;
    } else if (messageValue.length < 10) {
        showError(messageInput, 'Message must be at least 10 characters');
        return false;
    } else {
        clearError(messageInput);
        return true;
    }
}

// Real-time validation
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
messageInput.addEventListener('blur', validateMessage);

nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('error')) {
        validateName();
    }
});

emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
        validateEmail();
    }
});

messageInput.addEventListener('input', () => {
    if (messageInput.classList.contains('error')) {
        validateMessage();
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    
    if (isNameValid && isEmailValid && isMessageValid) {
        // Show success message
        successMessage.classList.add('show');
        
        // Clear form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
        
        // In a real application, you would send the form data to a server here
        console.log('Form submitted successfully!');
        console.log({
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        });
    }
});

// ==========================================
// SMOOTH SCROLL TO TOP
// ==========================================

// Add a scroll to top button (optional enhancement)
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.setAttribute('aria-label', 'Scroll to top');
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .scroll-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        
        @media (max-width: 768px) {
            .scroll-to-top {
                width: 45px;
                height: 45px;
                bottom: 20px;
                right: 20px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(button);
    
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    });
    
    // Scroll to top on click
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ==========================================
// INTERSECTION OBSERVER FOR BETTER PERFORMANCE
// ==========================================

// Use Intersection Observer for scroll animations (more efficient than scroll event)
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
            }
        });
    }, observerOptions);
    
    // Observe all elements that should be revealed
    document.addEventListener('DOMContentLoaded', () => {
        const elementsToObserve = document.querySelectorAll('.glass-card, .timeline-item');
        elementsToObserve.forEach(element => {
            observer.observe(element);
        });
    });
}

// ==========================================
// LOADING ANIMATION
// ==========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==========================================
// PREVENT BODY SCROLL WHEN MOBILE MENU IS OPEN
// ==========================================

function preventBodyScroll() {
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// ==========================================
// EASTER EGG - Console Message
// ==========================================

console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cLooking at my code? I like your curiosity!', 'font-size: 14px; color: #94a3b8;');
console.log('%cFeel free to reach out: Zarbadegagan@yahoo.in', 'font-size: 14px; color: #3b82f6;');

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedReveal = debounce(revealOnScroll);
const debouncedSkillBars = debounce(animateSkillBars);
const debouncedHighlight = debounce(highlightActiveSection);

window.addEventListener('scroll', debouncedReveal);
window.addEventListener('scroll', debouncedSkillBars);
window.addEventListener('scroll', debouncedHighlight);

// ==========================================
// PRELOAD CRITICAL RESOURCES
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class for any additional animations
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);
});
