// Reveal sections on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal animation
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('count-up')) {
                    startCountAnimation(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all sections and animated elements
    document.querySelectorAll('section, .scroll-fade-in').forEach(el => {
        el.classList.add('scroll-fade-in');
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero img');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.classList.add('lazy-load');
        img.addEventListener('load', () => {
            img.classList.add('loaded');
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
});

// Add to HTML files before closing </head> tag:
// <link rel="stylesheet" href="styles/animations.css">
// <script src="scripts/animations.js" defer></script>
