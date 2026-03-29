document.addEventListener('DOMContentLoaded', () => {
    // 1. Hero Text Animation Setup
    const heroTitle = document.getElementById('hero-title');
    const heroText = "Hi, I'm Aisha Bello.";
    
    // Split text into words for staggered animation
    heroTitle.innerHTML = heroText.split(' ').map((word, index) => 
        `<span class="hero-word" style="transition-delay: ${index * 60}ms; transition-duration: 400ms;">${word}</span>`
    ).join(' ');

    // Staggered reveal for hero elements
    const heroElements = [
        { selector: '.hero-word', delay: 100 },
        { selector: '#hero div.reveal', delay: 0 }, // Remote Ops label
        { selector: '#hero p.text-2xl', delay: 300 }, // Subheadline
        { selector: '#hero p.text-sm', delay: 450 }, // Paragraph
        { selector: '#hero .flex-wrap', delay: 600 } // Buttons and tags
    ];

    heroElements.forEach(item => {
        setTimeout(() => {
            const elements = document.querySelectorAll(item.selector);
            elements.forEach(el => el.classList.add('active'));
        }, item.delay);
    });

    // 2. Intersection Observer for Scroll Reveals
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Handle standard reveal
                if (entry.target.classList.contains('reveal')) {
                    // Skip hero elements already handled by staggered delay
                    if (!entry.target.closest('#hero')) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                }
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 3. Smooth Scrolling for Navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
});
