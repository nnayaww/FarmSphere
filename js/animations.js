// Animation utility functions
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => observer.observe(element));
};

// Smooth scroll for anchor links
const smoothScroll = () => {
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
};

// Fade in animation for elements
const fadeIn = (element, duration = 500) => {
    element.style.opacity = '0';
    element.style.display = 'block';

    let start = performance.now();

    const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        element.style.opacity = progress;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    smoothScroll();

    // Add animation classes to elements
    document.querySelectorAll('.feature-card, .testimonial-card').forEach(element => {
        element.classList.add('animate-on-scroll');
    });
});

// Export functions for use in other files
window.animateUtils = {
    fadeIn,
    animateOnScroll,
    smoothScroll
};
