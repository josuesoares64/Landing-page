document.addEventListener('DOMContentLoaded', () => {

    // Limpa o hash da URL (Solução 1)
    if (window.location.hash) {
        window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }

    // 1. Lógica do Menu Responsivo
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }

    // 2. Lógica das Animações AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true
    });

    // 3. Scroll suave para links de âncora
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Animação de contadores numéricos
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const speed = 200; // menor número = mais rápido
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });

});
