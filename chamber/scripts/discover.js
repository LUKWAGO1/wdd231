document.addEventListener('DOMContentLoaded', () => {
    // Get the message element
    const messageElement = document.getElementById('lastVisitMessage');
    
    // Get the last visit date from localStorage
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = Date.now();
    
    // Generate appropriate message based on visit history
    if (!lastVisit) {
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((currentDate - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
        
        if (daysSinceLastVisit < 1) {
            messageElement.textContent = "Back so soon! Awesome!";
        } else {
            messageElement.textContent = `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? 'day' : 'days'} ago. `;
        }
    }

    // Update the last visit date in localStorage
    localStorage.setItem('lastVisit', currentDate.toString());

    // Fetch and populate locations from JSON
    fetch('data/locations.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.locations-grid');
            container.innerHTML = ''; // Clear existing content
            
            data.locations.slice(0, 8).forEach(location => {
                const card = document.createElement('div');
                card.classList.add('location-card');
                
                // Create Learn More link dynamically
                let learnMoreLink = location.url ? `<a href="${location.url}" class="learn-more" target="_blank">Learn More</a>` : '';

                card.innerHTML = `
                    <img src="${location.image}" alt="${location.title}" loading="lazy">
                    <h2>${location.title}</h2>
                    <p>${location.description}</p>
                    <p><strong>Address:</strong> ${location.address}</p>
                    ${learnMoreLink} <!-- Only show the link if there's a URL -->
                `;

                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading locations:', error));
});
