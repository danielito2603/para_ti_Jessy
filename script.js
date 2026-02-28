document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you only want it to animate once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));


    // 2. Final Reveal Button Logic
    const revealBtn = document.getElementById('revealBtn');
    const hiddenMessage = document.getElementById('hiddenMessage');

    if(revealBtn && hiddenMessage) {
        revealBtn.addEventListener('click', () => {
            // Hide button
            revealBtn.style.opacity = '0';
            setTimeout(() => {
                revealBtn.style.display = 'none';
                
                // Show message
                hiddenMessage.classList.add('show');
                
                // Trigger particles
                createParticles();
            }, 500);
        });
    }

    // 3. Floating Particles Generator (Hearts/Stars)
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleIcons = ['🤍', '✨', '⭐', '🥰'];
        const numParticles = 30;

        for (let i = 0; i < numParticles; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Randomize icon
                particle.innerText = particleIcons[Math.floor(Math.random() * particleIcons.length)];
                
                // Randomize starting X position
                particle.style.left = Math.random() * 100 + 'vw';
                
                // Randomize animation duration (between 3s and 6s)
                const duration = Math.random() * 3 + 3;
                particle.style.animationDuration = duration + 's';
                
                // Randomize font size
                const size = Math.random() * 1 + 1; // 1rem to 2rem
                particle.style.fontSize = size + 'rem';

                particlesContainer.appendChild(particle);

                // Remove particle after animation to keep DOM clean
                setTimeout(() => {
                    particle.remove();
                }, duration * 1000);

            }, i * 150); // Stagger particle creation
        }
    }
});
