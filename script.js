document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for nav links
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.includes('.html')) {
                window.location.href = targetId;
            } else {
                const sectionId = targetId.split('#')[1];
                const targetElement = document.querySelector(`#${sectionId}`);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (navbarToggler && mobileMenu) {
        navbarToggler.addEventListener('click', () => {
            const isActive = mobileMenu.classList.contains('active');
            mobileMenu.classList.toggle('active');
            navbarToggler.classList.toggle('active');
            // Ensure smooth transition by setting max-height explicitly when closing
            if (!isActive) {
                mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
            } else {
                mobileMenu.style.maxHeight = '0';
            }
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navbarToggler.classList.remove('active');
            mobileMenu.style.maxHeight = '0';
        });
    });

    // IntersectionObserver for animations
    const elements = document.querySelectorAll('.animate-slide-up, .animate-fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
});