document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for nav links
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // Check if the href is an internal link (starts with # or points to index.html#)
            if (targetId.startsWith('#') || targetId.includes('index.html#')) {
                const sectionId = targetId.split('#')[1];
                const targetElement = document.querySelector(`#${sectionId}`);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            } else {
                // Navigate to other pages (e.g., index.html, AboutMe.html)
                window.location.href = targetId;
            }
        });
    });

    // Mobile menu toggle for Bootstrap navbar
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', () => {
            navbarCollapse.classList.toggle('show');
        });
    }

    // IntersectionObserver for slide-up and fade-in animations
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

    // Framer Motion animations (with fallback if not loaded)
    if (window.framer && window.framer.motion) {
        const { motion } = window.framer;
        document.querySelectorAll('.motion-div').forEach(div => {
            const animateType = div.getAttribute('data-animate');
            const delay = div.getAttribute('data-delay') || 0;
            motion(div, {
                initial: { opacity: 0, y: animateType === 'fadeInUp' ? 50 : 0 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: parseFloat(delay) }
            });
        });
    } else {
        // Fallback: Apply basic CSS animation if Framer Motion is not available
        document.querySelectorAll('.motion-div').forEach(div => {
            div.style.opacity = '1';
            div.style.transform = 'translateY(0)';
            div.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }
});