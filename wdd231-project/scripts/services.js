document.addEventListener('DOMContentLoaded', () => {
    const servicesContainer = document.getElementById("services-container");
    
    fetch('data/data.json')
        .then(response => response.json())
        .then(services => {
            services.slice(0, 8).forEach(service => {
                // Create card with properly formatted onclick handler
                const card = document.createElement("div");
                card.classList.add("item");
                card.innerHTML = `
                    <img src="images/${service.image}" alt="${service.name}">
                    <div class="item-content">
                        <h3>${service.name}</h3>
                        <p class="price">${service.price}</p>
                        <button class="cta-button" onclick="openModal('${service.name}', '${service.description.replace(/'/g, "\\'")}', 'images/${service.image}', '${service.price}')">
                            View Details
                        </button>
                    </div>
                `;
                servicesContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading services:', error));
});
 function openModal(description) {
	const detailsCard = document.getElementById("detail");
	detailsCard.innerHTML = `
		<h3>${description}</h3>
	`;
	detailsCard.style.display = "block";
 }