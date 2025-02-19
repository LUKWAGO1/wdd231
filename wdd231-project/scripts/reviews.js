document.addEventListener("DOMContentLoaded", () => {
    const reviewsContainer = document.getElementById("reviews-container");
    const reviews = [
        { name: "Rashida Namboga", rating: 5, comment: "Amazing experience! Highly recommended.", image: "images/rashida.jpg" },
        { name: "Stecia Nakabugo", rating: 4, comment: "Beautiful hotel, excellent service.", image: "images/stecia.jpg" },
        { name: "Namulila leticia", rating: 5, comment: "Loved the riverside view and the food.", image: "images/leticia.jpg" }
    ];

    let currentReviewIndex = 0;

    function displayReview(index) {
        const review = reviews[index];
        reviewsContainer.innerHTML = `
            <div class="review-card">
                <img src="${review.image}" alt="${review.name}" class="reviewer-image" onerror="this.src='images/default-avatar.jpg'">
                <h3>${review.name}</h3>
                <p>Rating: ${'⭐'.repeat(review.rating)}</p>
                <p>${review.comment}</p>
            </div>
        `;
    }

    function cycleReviews() {
        displayReview(currentReviewIndex);
        currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
    }

    setInterval(cycleReviews, 5000); // Change review every 5 seconds
    cycleReviews();

    // Review submission functionality
    const reviewForm = document.getElementById("review-form");

    reviewForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (reviews.length >= 8) {
            // Remove the oldest review to maintain 8 items
            reviews.shift();
        }
        
        const name = document.getElementById("reviewer-name").value;
        const rating = parseInt(document.getElementById("review-rating").value);
        const comment = document.getElementById("review-comment").value;
        const imageFile = document.getElementById("reviewer-image").files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const image = reader.result;
            if (name && rating && comment && image) {
                reviews.push({ name, rating, comment, image });
                reviewForm.reset();
            }
        };

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        }
    });
});
