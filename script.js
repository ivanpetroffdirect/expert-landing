document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. ЛОГИКА АНИМАЦИИ ЦИФР (СЧЕТЧИКИ)
    // ==========================================
    const counters = document.querySelectorAll('.count-up');[cite: 3]
    const animationDuration = 2000; [cite: 3]
    const animateCounter = (counter) => {[cite: 3]
        const target = +counter.getAttribute('data-target');[cite: 3]
        const startTime = performance.now();[cite: 3]
        const updateCount = (currentTime) => {[cite: 3]
            const elapsedTime = currentTime - startTime;[cite: 3]
            const progress = Math.min(elapsedTime / animationDuration, 1);[cite: 3]
            
            const easeProgress = progress * (2 - progress);[cite: 3]
            const currentValue = Math.floor(easeProgress * target);[cite: 3]
            
            counter.innerText = currentValue.toLocaleString('ru-RU');[cite: 3]
            if (progress < 1) {[cite: 3]
                requestAnimationFrame(updateCount);[cite: 3]
            } else {[cite: 3]
                counter.innerText = target.toLocaleString('ru-RU');[cite: 3]
            }[cite: 3]
        };[cite: 3]
        requestAnimationFrame(updateCount);[cite: 3]
    };[cite: 3]
    const observer = new IntersectionObserver((entries, observer) => {[cite: 3]
        entries.forEach(entry => {[cite: 3]
            if (entry.isIntersecting) {[cite: 3]
                const counter = entry.target;[cite: 3]
                animateCounter(counter);[cite: 3]
                observer.unobserve(counter);[cite: 3]
            }[cite: 3]
        });[cite: 3]
    }, { threshold: 0.2 });[cite: 3]
    counters.forEach(counter => observer.observe(counter));[cite: 3]

    // ==========================================
    // 2. ЛОГИКА ПОПАПА ГАЛЕРЕИ (ОКНО ПРОСМОТРА)
    // ==========================================
    const modal = document.getElementById('gallery-modal');[cite: 3]
    const modalImg = document.getElementById('modal-img');[cite: 3]
    const closeBtn = document.querySelector('.modal-close');[cite: 3]
    const galleryItems = document.querySelectorAll('.gallery-item img');[cite: 3]
    
    if (modal && modalImg && galleryItems.length > 0) {[cite: 3]
        
        galleryItems.forEach(img => {[cite: 3]
            img.addEventListener('click', () => {[cite: 3]
                modal.style.display = 'flex';[cite: 3]
                setTimeout(() => {[cite: 3]
                    modal.classList.add('show');[cite: 3]
                }, 10);[cite: 3]
                modalImg.src = img.src;[cite: 3]
                modalImg.alt = img.alt;[cite: 3]
                document.body.style.overflow = 'hidden';[cite: 3]
            });[cite: 3]
        });[cite: 3]
        
        const closeModal = () => {[cite: 3]
            modal.classList.remove('show');[cite: 3]
            document.body.style.overflow = '';[cite: 3]
            setTimeout(() => {[cite: 3]
                modal.style.display = 'none';[cite: 3]
            }, 300);[cite: 3]
        };[cite: 3]
        
        if (closeBtn) {[cite: 3]
            closeBtn.addEventListener('click', closeModal);[cite: 3]
        }[cite: 3]
        modal.addEventListener('click', (e) => {[cite: 3]
            if (e.target === modal) {[cite: 3]
                closeModal();[cite: 3]
            }[cite: 3]
        });[cite: 3]
        document.addEventListener('keydown', (e) => {[cite: 3]
            if (e.key === 'Escape' && modal.classList.contains('show')) {[cite: 3]
                closeModal();[cite: 3]
            }[cite: 3]
        });[cite: 3]
    }

    // ==========================================
    // 3. ЛОГИКА СЛАЙДЕРА БЛАГОДАРНОСТЕЙ
    // ==========================================
    const track = document.querySelector('.slider-track');[cite: 3]
    const prevBtn = document.querySelector('.prev-btn');[cite: 3]
    const nextBtn = document.querySelector('.next-btn');[cite: 3]
    
    if (track && prevBtn && nextBtn) {[cite: 3]
        let currentIndex = 0;[cite: 3]
        
        const getCardsPerPage = () => {[cite: 3]
            if (window.innerWidth <= 768) return 2;[cite: 3]
            if (window.innerWidth <= 1024) return 3;[cite: 3]
            return 4;[cite: 3]
        };[cite: 3]

        const updateSlider = () => {[cite: 3]
            const cards = document.querySelectorAll('.award-card');[cite: 3]
            const maxIndex = cards.length - getCardsPerPage();[cite: 3]
            
            if (currentIndex < 0) currentIndex = 0;[cite: 3]
            if (currentIndex > maxIndex) currentIndex = maxIndex;[cite: 3]
            
            const cardWidth = cards[0].getBoundingClientRect().width;[cite: 3]
            const gap = 24; // значение из CSS[cite: 3]
            const moveAmount = currentIndex * (cardWidth + gap);[cite: 3]
            
            track.style.transform = `translateX(-${moveAmount}px)`;[cite: 3]
        };[cite: 3]

        nextBtn.addEventListener('click', () => {[cite: 3]
            const cards = document.querySelectorAll('.award-card');[cite: 3]
            if (currentIndex < cards.length - getCardsPerPage()) {[cite: 3]
                currentIndex++;[cite: 3]
                updateSlider();[cite: 3]
            }[cite: 3]
        });[cite: 3]

        prevBtn.addEventListener('click', () => {[cite: 3]
            if (currentIndex > 0) {[cite: 3]
                currentIndex--;[cite: 3]
                updateSlider();[cite: 3]
            }[cite: 3]
        });[cite: 3]

        window.addEventListener('resize', updateSlider);[cite: 3]
    }
});
