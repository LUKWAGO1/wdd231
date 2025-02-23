document.addEventListener('DOMContentLoaded', () => {
    const servicesContainer = document.getElementById("services-container");
    const modal = document.getElementById("detailsModal");
    const closeBtn = document.querySelector(".close");

    // Fetch and display services
    if (servicesContainer) {
        console.log('Attempting to fetch services...');
        
        fetch('./data/data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(services => {
                console.log('Services loaded:', services);
                
                services.slice(0, 8).forEach(service => {
                    const card = document.createElement("div");
                    card.classList.add("item");
                    
                    card.innerHTML = `
                        <img src="images/${service.image}" alt="${service.name}">
                        <div class="item-content">
                            <h3>${service.name}</h3>
                            <p class="price">${service.price}</p>
                            <button class="cta-button">View Details</button>
                        </div>
                    `;
                    
                    const viewButton = card.querySelector('.cta-button');
                    viewButton.addEventListener('click', () => {
                        console.log('Button clicked for:', service.name);
                        
                        if (modal) {
                            const modalTitle = document.getElementById("modalTitle");
                            const modalDescription = document.getElementById("modalDescription");
                            const modalImage = document.getElementById("modalImage");
                            const modalPrice = document.getElementById("modalPrice");

                            modalTitle.textContent = service.name;
                            modalDescription.textContent = service.description;
                            modalImage.src = `images/${service.image}`;
                            modalImage.alt = service.name;
                            modalPrice.textContent = service.price;

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
            modal.style.display = "none";
        };
        
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    }
});