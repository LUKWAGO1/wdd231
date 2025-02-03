document.addEventListener("DOMContentLoaded", async () => {
  const memberContainer = document.getElementById("memberContainer");
  const toggleViewButton = document.getElementById("toggleView");
  const spotlightsContainer = document.getElementById("spotlights-container");
  let members = [];

  async function getSpotlightData() {
      try {
          const response = await fetch('data/members.json'); // Ensure the path is correct
          if (!response.ok) throw new Error("Failed to load members.json");

          const data = await response.json();
          members = Array.isArray(data) ? data : data.members; // Store members globally

          displaySpotlights(members);
          renderMembers(members, "grid-view"); // Default view on load
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
      spotlightsContainer.innerHTML = ""; // 🚀 *Fix: Clears previous spotlights before adding new ones*

      const spotlightMembers = getRandomMembers(members, 3);

      spotlightMembers.forEach(member => {
          let spotlight = document.createElement("section");
          spotlight.className = "spotlight-card";

          let membershipTitle = member.membershipLevel === 3 ? "Gold" : "Silver";

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

  function renderMembers(members, view) {
      if (!memberContainer) {
          console.error("Member container not found!");
          return;
      }
      memberContainer.innerHTML = "";

      members.forEach(member => {
          const card = document.createElement("div");
          card.className = `member-card ${view}`;
          card.innerHTML = `
              <img src="images/${member.image}" alt="${member.name}" class="logo" onError="this.src='images/default.jpg'">
              <h2>${member.name}</h2>
              <p>${member.address}</p>
              <p>${member.phone}</p>
              <a href="${member.website}" target="_blank">Visit Website</a>
          `;
          memberContainer.appendChild(card);
      });
  }

  // Toggle view event listener
  if (toggleViewButton && memberContainer) {
      toggleViewButton.addEventListener("click", () => {
          const currentView = memberContainer.classList.contains("list-view") ? "list-view" : "grid-view";
          const newView = currentView === "list-view" ? "grid-view" : "list-view";
          memberContainer.classList.remove(currentView);
          memberContainer.classList.add(newView);
          renderMembers(members, newView);
      });
  }

  // Hamburger menu toggle for mobile navigation
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");

  if (hamburger && mobileNav) {
      hamburger.addEventListener("click", () => {
          mobileNav.classList.toggle("open");
          mobileNav.classList.toggle("hidden");
      });
  }

  // Set footer year
  const currentYear = document.getElementById("currentYear");
  if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
  }

  // Set last modified date
  const lastModifiedElement = document.getElementById("lastModified");
  if (lastModifiedElement) {
      lastModifiedElement.textContent = document.lastModified;
  }

  // Load member data
  getSpotlightData();
});