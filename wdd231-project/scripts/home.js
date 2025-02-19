// menu.js - Handles responsive navigation
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu ul');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        hamburger.textContent = navMenu.classList.contains('show') ? '✕' : '☰';
    });
});

// booking.js - Handles room booking functionality
class BookingManager {
    constructor() {
        this.form = document.querySelector('#reservation-form');
        this.initialize();
    }

    initialize() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
            this.setupDateValidation();
            this.setupRoomPriceCalculator();
        }
    }

    setupDateValidation() {
        const checkIn = document.querySelector('[name="check-in"]');
        const checkOut = document.querySelector('[name="check-out"]');

        if (checkIn && checkOut) {
            const today = new Date().toISOString().split('T')[0];
            checkIn.min = today;
            
            checkIn.addEventListener('change', () => {
                checkOut.min = checkIn.value;
            });
        }
    }

    setupRoomPriceCalculator() {
        const roomSelect = document.querySelector('[name="room-type"]');
        if (roomSelect) {
            roomSelect.addEventListener('change', this.updatePrice.bind(this));
        }
    }

    updatePrice() {
        const roomPrices = {
            'ordinary': 100,
            'deluxe': 150,
            'suite': 250
        };
        // Add price update logic here
    }

    handleSubmit(event) {
        event.preventDefault();
        // Add form submission logic here
    }
}

// reviews.js - Handles guest reviews functionality
class ReviewManager {
    constructor() {
        this.reviewsContainer = document.querySelector('#reviews-container');
        this.reviewForm = document.querySelector('#review-form');
        this.initialize();
    }

    initialize() {
        this.loadReviews();
        if (this.reviewForm) {
            this.reviewForm.addEventListener('submit', this.handleNewReview.bind(this));
        }
    }

    async loadReviews() {
        const reviews = [
            {
                name: "John D.",
                rating: 5,
                comment: "Exceptional service and stunning views!",
                date: "2024-02-10"
            },
            // Add more reviews here
        ];
        
        this.displayReviews(reviews);
    }

    displayReviews(reviews) {
        if (this.reviewsContainer) {
            reviews.forEach(review => {
                const reviewElement = this.createReviewElement(review);
                this.reviewsContainer.appendChild(reviewElement);
            });
        }
    }

    createReviewElement(review) {
        const div = document.createElement('div');
        div.className = 'review-card';
        div.innerHTML = `
            <div class="review-header">
                <h4>${review.name}</h4>
                <div class="rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
            </div>
            <p>${review.comment}</p>
            <small>${new Date(review.date).toLocaleDateString()}</small>
        `;
        return div;
    }

    handleNewReview(event) {
        event.preventDefault();
        // Add new review submission logic here
    }
}

// gallery.js - Handles image gallery functionality
class GalleryManager {
    constructor() {
        this.images = document.querySelectorAll('.gallery img');
        this.initialize();
    }

    initialize() {
        this.setupLightbox();
        this.setupLazyLoading();
    }

    setupLightbox() {
        this.images.forEach(img => {
            img.addEventListener('click', () => this.openLightbox(img.src));
        });
    }

    setupLazyLoading() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        }, options);

        this.images.forEach(img => observer.observe(img));
    }

    openLightbox(src) {
        // Add lightbox implementation here
    }
}

// dates.js - Handles date-related functionality
document.addEventListener('DOMContentLoaded', () => {
    // Update copyright year
    const yearSpan = document.getElementById('currentyear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Update last modified date
    const lastModified = document.getElementById('lastModified');
    if (lastModified) {
        lastModified.textContent = `Last Modified: ${document.lastModified}`;
    }
});

// Initialize all managers when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BookingManager();
    new ReviewManager();
    new GalleryManager();
});