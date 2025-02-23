document.addEventListener("DOMContentLoaded", () => {
    const reviewsContainer = document.getElementById("reviews-container");
    const reviewForm = document.getElementById("review-form");
    
    // Get reviews from localStorage or use default reviews
    let reviews = JSON.parse(localStorage.getItem('hotelReviews')) || [
        { name: "Rashida Namboga", rating: 5, comment: "Amazing experience! Highly recommended.", image: "images/rashida.jpg" },
        { name: "Stecia Nakabugo", rating: 4, comment: "Beautiful hotel, excellent service.", image: "images/stecia.jpg" },
        { name: "Namulila leticia", rating: 5, comment: "Loved the riverside view and the food.", image: "images/leticia.jpg" }
    ];

    let currentReviewIndex = 0;
    let reviewInterval;

    function displayReview(index) {
        if (!reviewsContainer || !reviews.length) return;
        
        const review = reviews[index];
        reviewsContainer.innerHTML = `
            <div class="review-card">
                <img src="${review.image}" alt="${review.name}" class="reviewer-image" onerror="this.src='images/default-avatar.jpg'">
                <h3>${review.name}</h3>
                <p>Rating: ${'⭐'.repeat(review.rating)}</p>
                <p>${review.comment}</p>
                <small>Posted: ${review.date || 'Recently'}</small>
            </div>
        `;
    }

    function startReviewCycle() {
        // Clear existing interval if any
        if (reviewInterval) {
            clearInterval(reviewInterval);
        }
        // Start new cycle
        reviewInterval = setInterval(() => {
            currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
            displayReview(currentReviewIndex);
        }, 5000);
    }

    // Initial display
    displayReview(0);
    startReviewCycle();

    // Handle new review submission
    if (reviewForm) {
        reviewForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const name = document.getElementById("reviewer-name").value;
            const rating = parseInt(document.getElementById("review-rating").value);
            const comment = document.getElementById("review-comment").value;
            const imageFile = document.getElementById("reviewer-image").files[0];

            if (!name || !rating || !comment) {
                alert("Please fill in all required fields");
                return;
            }

            try {
                // Handle image processing
                const imageUrl = await processImage(imageFile);
                
                // Create new review
                const newReview = {
                    name,
                    rating,
                    comment,
                    image: imageUrl,
                    date: new Date().toLocaleDateString()
                };

                // Add to beginning of reviews array
                reviews.unshift(newReview);
                
                // Keep only latest 10 reviews
                if (reviews.length > 10) {
                    reviews.pop();
                }

                // Save to localStorage
                localStorage.setItem('hotelReviews', JSON.stringify(reviews));

                // Reset form
                reviewForm.reset();

                // Display new review immediately
                currentReviewIndex = 0;
                displayReview(0);
                
                // Restart review cycle
                startReviewCycle();

                alert("Thank you for your review!");
                
            } catch (error) {
                console.error('Error processing review:', error);
                alert("There was an error submitting your review. Please try again.");
            }
        });
    }

    async function processImage(file) {
        return new Promise((resolve) => {
            if (!file) {
                resolve('images/default-avatar.jpg');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target.result);
            };
            reader.readAsDataURL(file);
        });
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (reviewInterval) {
            clearInterval(reviewInterval);
        }
    });
});
