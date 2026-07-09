document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. ЛОГИКА АНИМАЦИИ ЦИФР (СЧЕТЧИКИ)
    // ==========================================
    const counters = document.querySelectorAll('.count-up');
    const animationDuration = 2000; 

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            
            const easeProgress = progress * (2 - progress);
            const currentValue = Math.floor(easeProgress * target);
            
            counter.innerText = currentValue.toLocaleString('ru-RU');

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target.toLocaleString('ru-RU');
            }
        };

        requestAnimationFrame(updateCount);
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.2 });

    counters.forEach(counter => observer.observe(counter));


    // ==========================================
    // 2. ЛОГИКА ПОПАПА ГАЛЕРЕИ (ОКНО ПРОСМОТРА)
    // ==========================================
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.modal-close');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    if (modal && modalImg && galleryItems.length > 0) {
        
        galleryItems.forEach(img => {
            img.addEventListener('click', () => {
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    }
// ==========================================\n    // 3. ЛОГИКА СЛАЙДЕРА БЛАГОДАРНОСТЕЙ\    // ==========================================\n    const track = document.querySelector('.slider-track');\n    const prevBtn = document.querySelector('.prev-btn');\n    const nextBtn = document.querySelector('.next-btn');\n    \n    if (track && prevBtn && nextBtn) {\n        let currentIndex = 0;\n        \n        const getCardsPerPage = () => {\n            if (window.innerWidth <= 768) return 2;\n            if (window.innerWidth <= 1024) return 3;\n            return 4;\n        };\n\n        const updateSlider = () => {\n            const cards = document.querySelectorAll('.award-card');\n            const maxIndex = cards.length - getCardsPerPage();\n            \n            if (currentIndex < 0) currentIndex = 0;\n            if (currentIndex > maxIndex) currentIndex = maxIndex;\n            \n            const cardWidth = cards[0].getBoundingClientRect().width;\n            const gap = 24; // значение из CSS\n            const moveAmount = currentIndex * (cardWidth + gap);\n            \n            track.style.transform = `translateX(-${moveAmount}px)`;\n        };\n\n        nextBtn.addEventListener('click', () => {\n            const cards = document.querySelectorAll('.award-card');\n            if (currentIndex < cards.length - getCardsPerPage()) {\n                currentIndex++;\n                updateSlider();\n            }\n        });\n\n        prevBtn.addEventListener('click', () => {\n            if (currentIndex > 0) {\n                currentIndex--;\n                updateSlider();\n            }\n        });\n\n        window.addEventListener('resize', updateSlider);\n    }
});
