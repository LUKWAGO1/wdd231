// Image loading optimization
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading="lazy" for better performance
        img.setAttribute('loading', 'lazy');
        
        // Add fade-in effect when images load
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        
        // If image is already loaded
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
});