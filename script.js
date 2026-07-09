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

    // ==========================================
    // 3. ЛОГИКА СЛАЙДЕРА БЛАГОДАРНОСТЕЙ
    // ==========================================
    const track = document.querySelector('.slider-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        const getCardsPerPage = () => {
            if (window.innerWidth <= 768) return 2;
            if (window.innerWidth <= 1024) return 3;
            return 4;
        };

        const updateSlider = () => {
            const cards = document.querySelectorAll('.award-card');
            const maxIndex = cards.length - getCardsPerPage();
            
            if (currentIndex < 0) currentIndex = 0;
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            
            const cardWidth = cards[0].getBoundingClientRect().width;
            const gap = 24; // значение из CSS
            const moveAmount = currentIndex * (cardWidth + gap);
            
            track.style.transform = `translateX(-${moveAmount}px)`;
        };

        nextBtn.addEventListener('click', () => {
            const cards = document.querySelectorAll('.award-card');
            if (currentIndex < cards.length - getCardsPerPage()) {
                currentIndex++;
                updateSlider();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        window.addEventListener('resize', updateSlider);
    }
});
