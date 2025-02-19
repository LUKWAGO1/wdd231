document.addEventListener('DOMContentLoaded', () => {
    // Date functionality
    const year = document.querySelector("#currentyear");
    if (year) year.innerHTML = `${new Date().getFullYear()}`;
    
    const lastModified = document.querySelector("#lastModified");
    if (lastModified) lastModified.innerHTML = `Last modified: ${document.lastModified}`;

    // Menu functionality
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Services and Modal functionality
    const servicesContainer = document.getElementById("services-container");
    const modal = document.getElementById("detailsModal");
    const closeBtn = document.querySelector(".close");

    // Fetch and display services
    if (servicesContainer) {
        // Log to verify fetch attempt
        console.log('Attempting to fetch services...');
        
        fetch('./data/data.json')  // Make sure this path is correct
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(services => {
                console.log('Services loaded:', services); // Debug log
                
                services.slice(0, 8).forEach(service => {
                    const card = document.createElement("div");
                    card.classList.add("item");
                    
                    // Create card content
                    card.innerHTML = `
                        <img src="images/${service.image}" alt="${service.name}">
                        <div class="item-content">
                            <h3>${service.name}</h3>
                            <p class="price">${service.price}</p>
                            <button class="cta-button">View Details</button>
                        </div>
                    `;
                    
                    // Add click event listener
                    const viewButton = card.querySelector('.cta-button');
                    viewButton.addEventListener('click', () => {
                        console.log('Button clicked for:', service.name); // Debug log
                        
                        if (modal) {
                            const modalTitle = document.getElementById("modalTitle");
                            const modalDescription = document.getElementById("modalDescription");
                            const modalImage = document.getElementById("modalImage");
                            const modalPrice = document.getElementById("modalPrice");

                            if (modalTitle) modalTitle.textContent = service.name;
                            if (modalDescription) modalDescription.textContent = service.description;
                            if (modalImage) {
                                modalImage.src = `images/${service.image}`;
                                modalImage.alt = service.name;
                            }
                            if (modalPrice) modalPrice.textContent = service.price;

                            modal.style.display = "block";
                        }
                    });
                    
                    servicesContainer.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Error loading services:', error);
                servicesContainer.innerHTML = `<p>Error loading services: ${error.message}</p>`;
            });
    }

    // Modal close handlers
    if (closeBtn && modal) {
        closeBtn.onclick = () => {
            console.log('Closing modal via X button'); // Debug log
            modal.style.display = "none";
        };
        
        window.onclick = (event) => {
            if (event.target === modal) {
                console.log('Closing modal via outside click'); // Debug log
                modal.style.display = "none";
            }
        };
    }

    // Reviews functionality
    const reviewsContainer = document.getElementById("reviews-container");
    if (reviewsContainer) {
        const reviews = [
            { name: "Rashida Namboga", rating: 5, comment: "Amazing experience!", image: "images/rashida.jpg" },
            { name: "Stecia Nakabugo", rating: 4, comment: "Beautiful hotel!", image: "images/stecia.jpg" },
            { name: "Namulila leticia", rating: 5, comment: "Loved the view!", image: "images/leticia.jpg" }
        ];

        let currentReviewIndex = 0;

        function displayReview(index) {
            const review = reviews[index];
            reviewsContainer.innerHTML = `
                <div class="review-card">
                    <img src="${review.image}" alt="${review.name}" class="reviewer-image">
                    <h3>${review.name}</h3>
                    <p>Rating: ${'⭐'.repeat(review.rating)}</p>
                    <p>${review.comment}</p>
                </div>
            `;
        }

        // Cycle reviews every 5 seconds
        setInterval(() => {
            displayReview(currentReviewIndex);
            currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
        }, 5000);
        
        displayReview(0); // Show first review immediately
    }

    // Image optimization
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('loading', 'lazy');
        img.addEventListener('load', () => img.classList.add('loaded'));
        if (img.complete) img.classList.add('loaded');
    });
});
