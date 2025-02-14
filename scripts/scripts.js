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
const menuToggle = document.querySelector('.hamburger-menu');
const navbarUl = document.querySelector('.navbar ul');
const totalCreditsDiv = document.getElementById('totalCredits');

// Toggle mobile menu
const menuToggle = document.querySelector('.hamburger-menu');
menuToggle?.addEventListener('click', () => {
    document.querySelector('.nav-menu ul').classList.toggle('show');
});

// Highlight active page link
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-menu a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Filter courses
function filterCourses(type = 'all') {
    certificateList.innerHTML = '';
    const filteredCourses = type === 'all' ? courses : courses.filter(course => course.code.startsWith(type));
    const totalCredits = filteredCourses.length * 2;
    if (totalCreditsDiv) totalCreditsDiv.textContent = `Total Credits: ${totalCredits}`;

    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = `course-card ${course.completed ? 'completed' : ''}`;
        courseCard.innerHTML = `<h3>${course.code}</h3><p>${course.name}</p><p>Status: ${course.completed ? 'Completed' : 'In Progress'}</p>`;
        certificateList.appendChild(courseCard);
    });
}

// Add event listeners to filter buttons
[
    { btn: filterAll, type: 'all' },
    { btn: filterCSE, type: 'CSE' },
    { btn: filterWDD, type: 'WDD' }
].forEach(({ btn, type }) => {
    btn?.addEventListener('click', () => {
        document.querySelectorAll('.certificate-buttons button').forEach(button => button.classList.remove('active'));
        btn.classList.add('active');
        filterCourses(type);
    });
});

// Set the current year and last modified date
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Update: ${document.lastModified}`;

// Initial display
filterCourses('all');
filterAll?.classList.add('active');
