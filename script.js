document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for scroll animations (Reveal classes)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 2. Parallax effect for the hero section
    const heroTitle = document.querySelector('.hero-headline');
    const heroSub = document.querySelector('.hero-subheadline');
    const heroLogoText = document.querySelector('.hero-logo-text');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        if (scrolled < window.innerHeight) {
            if (heroTitle) heroTitle.style.transform = `translateY(${scrolled * 0.3}px)`;
            if (heroSub) heroSub.style.transform = `translateY(${scrolled * 0.2}px)`;
            if (heroLogoText) heroLogoText.style.transform = `translateY(${scrolled * 0.1}px)`;
            
            // Fade out down arrow
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if(scrollIndicator) {
                scrollIndicator.style.opacity = 1 - (scrolled / 300);
            }
        }
    });

    // 3. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
            navbar.style.padding = '1rem 0';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.7)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1.5rem 0';
        }
    });

    // 4. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 5. Timeline interactive items toggle
    const timelineItems = document.querySelectorAll('.timeline-item.interactive');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            // Check if currently open
            const isOpen = item.classList.contains('show-details');
            
            // First close all other items
            timelineItems.forEach(otherItem => {
                otherItem.classList.remove('show-details');
            });
            
            // If it wasn't open, open it (otherwise it stays closed, acting as a toggle off)
            if (!isOpen) {
                item.classList.add('show-details');
            }
        });
    });
});
