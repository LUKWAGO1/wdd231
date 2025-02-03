const spotlightsContainer = document.getElementById('spotlights-container');

async function getSpotlightData() {
    try {
        const response = await fetch('data/members.json'); // Ensure the path is correct
        if (!response.ok) throw new Error("Failed to load members.json");

        const data = await response.json();

        // Handle cases where JSON might be an object with "members" or a direct array
        const members = Array.isArray(data) ? data : data.members;
        
        displaySpotlights(members);
    } catch (error) {
        console.error("Load error:", error);
    }
}

function getRandomMembers(members, count) {
    const eligibleMembers = members.filter(member => member.membershipLevel >= 2);
    return eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, count);
}

function displaySpotlights(members) {
    if (!spotlightsContainer) {
        console.error("Spotlights container not found!");
        return;
    }

    const spotlightMembers = getRandomMembers(members, 3);

    spotlightMembers.forEach(member => {
        let spotlight = document.createElement('section');
        spotlight.className = 'spotlight-card';

        let membershipTitle = member.membershipLevel === 3 ? 'Gold' : 'Silver';

        spotlight.innerHTML = `
            <div class="spotlight-content">
                <h4>${member.name}</h4>
                <img src="images/${member.image}" alt="${member.name} logo" width="150">
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p class="membership">${membershipTitle} Member</p>
                <p class="link">Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
            </div>
        `;
        spotlightsContainer.appendChild(spotlight);
    });
}

// Load data on page load
getSpotlightData();