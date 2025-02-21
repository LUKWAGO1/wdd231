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

    function displayRoomPrices(roomType) {
        let price;
        let amenities;

        // Conditional branching for room prices and amenities
        if (roomType === 'ordinary') {
            price = '$100';
            amenities = ['Basic WiFi', 'TV', 'Air Conditioning'];
        } else if (roomType === 'deluxe') {
            price = '$150';
            amenities = ['High-speed WiFi', 'Smart TV', 'Mini Bar', 'City View'];
        } else if (roomType === 'suite') {
            price = '$250';
            amenities = ['Premium WiFi', '4K TV', 'Full Bar', 'River View', 'Butler Service'];
        } else {
            price = 'Contact for Price';
            amenities = ['Custom Experience'];
        }

        return { price, amenities };
    }

    // Room selection handler with conditional logic
    const roomSelect = document.querySelector('select[name="room-type"]');
    if (roomSelect) {
        roomSelect.addEventListener('change', (event) => {
            const selectedRoom = event.target.value;
            const { price, amenities } = displayRoomPrices(selectedRoom);
            
            // Update price display if it exists
            const priceDisplay = document.querySelector('.price-display');
            if (priceDisplay && selectedRoom) {
                priceDisplay.textContent = `Price per night: ${price}`;
                
                // Conditionally show special offer
                if (selectedRoom === 'suite') {
                    priceDisplay.innerHTML += '<br><span class="special-offer">Special: Includes Free Breakfast!</span>';
                }
            }
            
            // Update amenities if container exists
            const amenitiesContainer = document.querySelector('.amenities-list');
            if (amenitiesContainer && selectedRoom) {
                amenitiesContainer.innerHTML = '<h3>Included Amenities:</h3>' +
                    amenities.map(item => `<li>${item}</li>`).join('');
            }
        });
    }

    // Booking validation with conditional checks
    const bookingForm = document.getElementById('reservation-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const checkIn = new Date(document.querySelector('[name="check-in"]').value);
            const checkOut = new Date(document.querySelector('[name="check-out"]').value);
            const roomType = document.querySelector('[name="room-type"]').value;

            // Multiple conditional validations
            if (!checkIn || !checkOut || !roomType) {
                alert('Please fill in all required fields.');
                return;
            } else if (checkOut <= checkIn) {
                alert('Check-out date must be after check-in date.');
                return;
            } else if (checkIn < new Date()) {
                alert('Check-in date cannot be in the past.');
                return;
            } else {
                // If all conditions pass, proceed with booking
                const daysStaying = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
                const { price } = displayRoomPrices(roomType);
                const numericPrice = parseInt(price.replace(/[^0-9]/g, ''));
                const totalPrice = numericPrice * daysStaying;

                if (confirm(`Total for ${daysStaying} nights: $${totalPrice}. Proceed with booking?`)) {
                    bookingForm.submit();
                }
            }
        });
    }

    // Array of featured amenities
    const hotelAmenities = [
        { name: 'Swimming Pool', available: true, icon: '🏊‍♂️' },
        { name: 'Spa Services', available: true, icon: '💆‍♀️' },
        { name: 'Restaurant', available: true, icon: '🍽️' },
        { name: 'Fitness Center', available: true, icon: '💪' },
        { name: 'Conference Room', available: true, icon: '👥' },
        { name: 'Room Service', available: true, icon: '🛎️' }
    ];

    // Display amenities using array methods
    const amenitiesContainer = document.querySelector('.amenities-grid');
    if (amenitiesContainer) {
        const availableAmenities = hotelAmenities
            .filter(amenity => amenity.available)
            .map(amenity => `
                <div class="amenity-card">
                    <span class="amenity-icon">${amenity.icon}</span>
                    <h3>${amenity.name}</h3>
                </div>
            `);

        amenitiesContainer.innerHTML = availableAmenities.join('');
    }

    // Array of room types with sorting functionality
    const roomTypes = [
        { type: 'Ordinary', price: 100, capacity: 2 },
        { type: 'Deluxe', price: 150, capacity: 3 },
        { type: 'Suite', price: 250, capacity: 4 }
    ];

    // Sort rooms by price and display
    const sortedRooms = roomTypes
        .sort((a, b) => a.price - b.price)
        .forEach(room => {
            const roomSelect = document.querySelector('select[name="room-type"]');
            if (roomSelect) {
                const option = document.createElement('option');
                option.value = room.type.toLowerCase();
                option.textContent = `${room.type} - $${room.price}/night`;
                roomSelect.appendChild(option);
            }
        });
});
