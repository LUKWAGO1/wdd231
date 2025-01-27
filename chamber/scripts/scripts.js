document.addEventListener("DOMContentLoaded", () => {
    const memberContainer = document.getElementById("memberContainer");
    const toggleViewButton = document.getElementById("toggleView");
    const hamburgerMenu = document.getElementById("hamburgerMenu");
    const navLinks = document.getElementById("navLinks");
  
    // Enhanced Hamburger Menu Toggle
    hamburgerMenu.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent event from bubbling
      navLinks.classList.toggle("active");
    });
  
    // Close menu when clicking outside or on a link
    document.addEventListener("click", (event) => {
      // Check if the click is outside the navigation area
      if (!navLinks.contains(event.target) && event.target !== hamburgerMenu) {
        navLinks.classList.remove("active");
      }
    });
  
    // Close menu when a navigation link is clicked
    navLinks.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        navLinks.classList.remove("active");
      }
    });
  
    // Fetch members.json and populate the directory
    fetch("data/members.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch members.json");
        }
        return response.json();
      })
      .then((members) => {
        renderMembers(members, "list-view");
  
        // Toggle view event listener
        toggleViewButton.addEventListener("click", () => {
          const currentView = memberContainer.classList.contains("list-view") ? "list-view" : "grid-view";
          const newView = currentView === "list-view" ? "grid-view" : "list-view";
          memberContainer.classList.remove(currentView);
          memberContainer.classList.add(newView);
          renderMembers(members, newView);
        });
      })
      .catch((error) => console.error("Error loading members:", error));
  
    // Function to render members
    function renderMembers(members, view) {
      memberContainer.innerHTML = "";
      members.forEach((member) => {
        const card = document.createElement("div");
        card.className = `member-card ${view}`; // Fixed the typo by using backticks
        card.innerHTML = `
          <img src="images/${member.image}" alt="${member.name}" class="logo" onerror="this.src='images/default.png';">
          <h2>${member.name}</h2>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
        `;
        memberContainer.appendChild(card);
      });
    }
  
    // Set footer info
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
  });
  