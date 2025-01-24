// Course Data
const courses = [
    { code: "CSE 110", name: "Programming Building Blocks", completed: true },
    { code: "WDD 130", name: "Web Fundamentals", completed: true },
    { code: "CSE 111", name: "Programming with Functions", completed: true },
    { code: "CSE 210", name: "Programming with Classes", completed: false },
    { code: "WDD 131", name: "Web Frontend Development I", completed: true },
    { code: "WDD 231", name: "Web Frontend Development II", completed: false }
];

// DOM Elements
const certificateList = document.getElementById('certificateList');
const filterAll = document.getElementById('filter-all');
const filterCSE = document.getElementById('filter-cse');
const filterWDD = document.getElementById('filter-wdd');
const menuToggle = document.getElementById('menu-toggle');
const navbarUl = document.querySelector('.navbar ul');
const totalCreditsDiv = document.getElementById('totalCredits'); // Total credits element

const CREDITS_PER_COURSE = 2; // Each course carries 2 credits

// Toggle mobile menu
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navbarUl.classList.toggle('show');
    });
}

// Filter courses and calculate total credits
function filterCourses(type = 'all') {
    certificateList.innerHTML = '';

    // Filter courses based on type
    const filteredCourses = type === 'all' 
        ? courses 
        : courses.filter(course => course.code.startsWith(type));

    // Calculate total credits
    const totalCredits = filteredCourses.length * CREDITS_PER_COURSE;

    // Display total credits
    totalCreditsDiv.textContent = `Total Credits: ${totalCredits}`;

    // Render filtered course cards
    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = `course-card ${course.completed ? 'completed' : ''}`;
        courseCard.innerHTML = `<h3>${course.code}</h3>`;
        certificateList.appendChild(courseCard);
    });
}

// Add event listeners to filter buttons
[
    { btn: filterAll, type: 'all' },
    { btn: filterCSE, type: 'CSE' },
    { btn: filterWDD, type: 'WDD' }
].forEach(({ btn, type }) => {
    if (btn) {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.certificate-buttons button')
                .forEach(button => button.classList.remove('active'));
            btn.classList.add('active');
            filterCourses(type);
        });
    }
});

// Set the current year and last modified date
const currentYearElement = document.getElementById('currentyear');
const lastModifiedElement = document.getElementById('lastModified');

if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Update: ${document.lastModified}`;
}

// Initial display
filterCourses('all'); // Display all courses on page load
if (filterAll) {
    filterAll.classList.add('active');
}
