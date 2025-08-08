const menuToggle = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navList.classList.toggle('active');
});


document.addEventListener("DOMContentLoaded", () => {
    let path;
    let pathLength;

    // Frações aproximadas do comprimento total
    const stepPositions = [0.0, 0.15, 0.34, 0.55, 1.0]; 

    function setupAnimation() {
        const desktopPath = document.getElementById('desktop-path');
        if (window.getComputedStyle(desktopPath).display !== 'none') {
            path = desktopPath;
        } else {
            path = document.getElementById('mobile-path');
        }

        pathLength = path.getTotalLength();
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;

        // Deixa textos e bolinhas invisíveis
        document.querySelectorAll(".step").forEach(step => {
            step.style.opacity = 0;
            step.style.transition = "opacity 0.4s ease";
        });
        document.querySelectorAll("circle").forEach(circle => {
            circle.style.opacity = 0;
            circle.style.transition = "opacity 0.4s ease";
        });
    }

    const animatePath = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const duration = 8; // segundos (reduzido pra ficar mais rápido)
                path.style.transition = `stroke-dashoffset ${duration}s ease-out`;
                path.style.strokeDashoffset = '0';

                stepPositions.forEach((pos, i) => {
                    const delay = pos * duration * 1000;
                    setTimeout(() => {
                        document.querySelector(`.step-${i+1}`).style.opacity = 1;
                        document.querySelectorAll("circle")[i].style.opacity = 1;
                    }, delay);
                });

                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animatePath, { threshold: 0.3 });

    setupAnimation();
    observer.observe(document.querySelector('.process-container'));

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            observer.disconnect();
            setupAnimation();
            observer.observe(document.querySelector('.process-container'));
        }, 250);
    });
});
