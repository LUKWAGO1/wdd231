document.addEventListener("DOMContentLoaded", () => {
    // Check if the timestamp is already stored in sessionStorage
    if (!sessionStorage.getItem("formLoadedTime")) {
        sessionStorage.setItem("formLoadedTime", new Date().toISOString());
    }

    // Assign the stored timestamp to the hidden input field
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = sessionStorage.getItem("formLoadedTime");
    }

    // Ensure the timestamp is sent to the thank-you page
    document.getElementById("membershipForm")?.addEventListener("submit", () => {
        timestampField.value = sessionStorage.getItem("formLoadedTime");
    });

    // Set dynamic footer date
    const currentYearElement = document.getElementById("currentYear");
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    const lastModifiedElement = document.getElementById("lastModified");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = new Date(document.lastModified).toLocaleString();
    }
});

// Function to get URL parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        firstName: params.get("first-name"),
        lastName: params.get("last-name"),
        email: params.get("email"),
        phone: params.get("phone"),
        businessName: params.get("business-name"),
        timestamp: params.get("timestamp")
    };
}

// Populate the thank you page with submitted data
function displayFormData() {
    const formData = getQueryParams();
    document.getElementById("display-first-name").textContent = formData.firstName || "N/A";
    document.getElementById("display-last-name").textContent = formData.lastName || "N/A";
    document.getElementById("display-email").textContent = formData.email || "N/A";
    document.getElementById("display-phone").textContent = formData.phone || "N/A";
    document.getElementById("display-business-name").textContent = formData.businessName || "N/A";
    document.getElementById("display-timestamp").textContent = formData.timestamp ? new Date(formData.timestamp).toLocaleString() : new Date().toLocaleString();
}

// Run function when page loads
window.onload = displayFormData;

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------
    // 1. Hamburger Menu Functionality
    // ----------------------------
    const hamburger = document.querySelector(".hamburger");
    const mobileNav = document.querySelector(".mobile-nav");

    if (hamburger && mobileNav) {
        hamburger.addEventListener("click", () => {
            mobileNav.classList.toggle("open");
            mobileNav.classList.toggle("hidden");
        });
    }

    // ----------------------------
    // 2. Weather and Forecast API
    // ----------------------------
    const apiKey = "7628821d2985129f91ea402d5e5ef0d2";
    const city = "Apv";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    // Fetch current weather
    fetch(weatherUrl)
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("weather-description").textContent = `Weather: ${data.weather[0].description.replace(/\b\w/g, (char) => char.toUpperCase())}`;
            document.getElementById("temperature").textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
        })
        .catch((error) => console.error("Error fetching weather data:", error));

    // Fetch 3-day forecast
    fetch(forecastUrl)
        .then((response) => response.json())
        .then((data) => {
            let forecastHTML = "";
            for (let i = 0; i < 3; i++) {
                forecastHTML += `
                    <div>
                        <p>${new Date(data.list[i].dt * 1000).toLocaleDateString()}</p>
                        <p>Temp: ${Math.round(data.list[i].main.temp)}°C</p>
                    </div>
                `;
            }
            document.getElementById("forecast").innerHTML = forecastHTML;
        })
        .catch((error) => console.error("Error fetching forecast data:", error));

    // ----------------------------
    // 3. Spotlight Members (Gold/Silver Members)
    // ----------------------------
    fetch("data/members.json")
        .then((response) => response.json())
        .then((members) => {
            const spotlightContainer = document.getElementById("spotlight-container");
            if (!spotlightContainer) return;

            const spotlightMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
            spotlightMembers.sort(() => Math.random() - 0.5);

            spotlightMembers.slice(0, 3).forEach((member) => {
                const memberCard = document.createElement("div");
                memberCard.classList.add("member-card");
                memberCard.innerHTML = `
                    <img src="images/${member.image}" alt="${member.name} Logo">
                    <h3>${member.name}</h3>
                    <p>Phone: ${member.phone}</p>
                    <p>Address: ${member.address}</p>
                    <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                    <p>Membership Level: ${member.membershipLevel === 2 ? "Silver" : "Gold"}</p>
                `;
                spotlightContainer.appendChild(memberCard);
            });
        })
        .catch((error) => console.error("Error fetching members data:", error));

    // ----------------------------
    // 4. Directory View Toggle (List/Grid)
    // ----------------------------
    const memberContainer = document.getElementById("memberContainer");
    const toggleViewButton = document.getElementById("toggleView");

    if (memberContainer && toggleViewButton) {
        fetch("data/members.json")
            .then((response) => response.json())
            .then((members) => {
                renderMembers(members, "list-view");

                toggleViewButton.addEventListener("click", () => {
                    const currentView = memberContainer.classList.contains("list-view") ? "list-view" : "grid-view";
                    const newView = currentView === "list-view" ? "grid-view" : "list-view";
                    memberContainer.classList.remove(currentView);
                    memberContainer.classList.add(newView);
                    renderMembers(members, newView);
                });
            })
            .catch((error) => console.error("Error fetching members data:", error));

        function renderMembers(members, view) {
            memberContainer.innerHTML = "";
            members.forEach((member) => {
                const card = document.createElement("div");
                card.className = `member-card ${view}`;
                card.innerHTML = `
                    <img src="images/${member.image}" alt="${member.name}" class="logo">
                    <h2>${member.name}</h2>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                `;
                memberContainer.appendChild(card);
            });
        }
    }

    // ----------------------------
    // 5. Form Timestamp and Footer Date
    // ----------------------------
    const currentYearElement = document.getElementById("currentYear");
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    const lastModifiedElement = document.getElementById("lastModified");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = new Date(document.lastModified).toLocaleString();
    }

    // ----------------------------
    // 6. Modal Close Functionality
    // ----------------------------
    document.querySelectorAll(".close-modal").forEach((button) => {
        button.addEventListener("click", () => {
            button.closest(".modal").style.display = "none";
        });
    });

    // ----------------------------
    // 7. Thank You Page: Display Submitted Data
    // ----------------------------
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.toString()) {
        ["first-name", "last-name", "email", "phone", "business-name", "timestamp"].forEach(id => {
            if (document.getElementById(`display-${id}`)) {
                document.getElementById(`display-${id}`).textContent = urlParams.get(id);
            }
        });
    }
});