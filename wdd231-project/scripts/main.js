document.addEventListener('DOMContentLoaded', () => {
    // Menu functionality
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu ul');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            hamburger.textContent = navMenu.classList.contains('show') ? '✕' : '☰';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove('show');
                hamburger.textContent = '☰';
            }
        });
    }

    // Booking form handler
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your booking request! We will contact you shortly to confirm your reservation.');
            reservationForm.reset();
        });
    }

    // Update copyright year and last modified date
    const yearSpan = document.getElementById('currentyear');
    const lastModified = document.getElementById('lastModified');
    
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    if (lastModified) {
        lastModified.textContent = `Last Modified: ${document.lastModified}`;
    }

    // Image optimization
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        img.addEventListener('load', () => img.classList.add('loaded'));
        if (img.complete) img.classList.add('loaded');
    });
});
