document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe all major sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    // Milestone counter animation
    const milestones = document.querySelectorAll('.milestone');
    milestones.forEach(milestone => {
        milestone.addEventListener('mouseenter', () => {
            milestone.style.transform = 'translateY(-10px)';
            milestone.style.transition = 'transform 0.3s ease';
        });

        milestone.addEventListener('mouseleave', () => {
            milestone.style.transform = 'translateY(0)';
        });
    });

    // Team member card hover effect
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.querySelector('img').style.transform = 'scale(1.1)';
            member.querySelector('img').style.transition = 'transform 0.3s ease';
        });

        member.addEventListener('mouseleave', () => {
            member.querySelector('img').style.transform = 'scale(1)';
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.about-hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroImg = heroSection.querySelector('img');
            heroImg.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
});
