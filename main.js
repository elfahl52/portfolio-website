// ============================================
// Portfolio Website - Clean JavaScript
// Modern, Efficient, and Simple
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // CONFIGURATION
    // ============================================
    const CONFIG = {
        typing: {
            text: "Professional Web Developer",
            speed: 100,
            deleteSpeed: 50,
            pause: 2000
        },
        scroll: {
            threshold: 300,
            offset: 80
        },
        testimonials: {
            interval: 5000
        },
        counters: {
            duration: 2000
        }
    };

    // ============================================
    // TYPING ANIMATION
    // ============================================
    function initTypingAnimation() {
        const element = document.getElementById('typed-text');
        if (!element) return;

        let index = 0;
        let isDeleting = false;
        let text = CONFIG.typing.text;

        function type() {
            element.textContent = text.substring(0, index);

            if (!isDeleting) {
                if (index < text.length) {
                    index++;
                    setTimeout(type, CONFIG.typing.speed);
                } else {
                    setTimeout(() => {
                        isDeleting = true;
                        type();
                    }, CONFIG.typing.pause);
                }
            } else {
                if (index > 0) {
                    index--;
                    setTimeout(type, CONFIG.typing.deleteSpeed);
                } else {
                    isDeleting = false;
                    setTimeout(type, 500);
                }
            }
        }

        type();
    }

    // ============================================
    // DARK MODE
    // ============================================
    function initDarkMode() {
        const toggle = document.getElementById('darkModeToggle');
        if (!toggle) return;

        // Load saved preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
        }

        toggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
    }

    // ============================================
    // SCROLL TO TOP
    // ============================================
    function initScrollToTop() {
        const scrollTop = document.getElementById('scrollTop');
        if (!scrollTop) return;

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > CONFIG.scroll.threshold) {
                scrollTop.classList.add('show');
            } else {
                scrollTop.classList.remove('show');
            }
        });

        scrollTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const offsetTop = target.offsetTop - CONFIG.scroll.offset;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // PORTFOLIO FILTER
    // ============================================
    function initPortfolioFilter() {
        const buttons = document.querySelectorAll('.filter-btn');
        const items = document.querySelectorAll('.portfolio-item');
        
        if (!buttons.length || !items.length) return;

        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active button
                buttons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter items
                items.forEach(item => {
                    const category = item.dataset.category;
                    const shouldShow = filter === 'all' || category === filter;
                    item.style.display = shouldShow ? 'block' : 'none';
                });
            });
        });
    }

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    function animateCounter(counter) {
        const target = parseInt(counter.dataset.target);
        const duration = CONFIG.counters.duration;
        const increment = target / (duration / 16);
        let current = 0;

        function updateCounter() {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }

        updateCounter();
    }

    // ============================================
    // TESTIMONIAL SLIDER
    // ============================================
    function initTestimonialSlider() {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.pager-dot');
        
        if (!slides.length) return;

        let currentIndex = 0;
        let interval;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentIndex = index;
        }

        function nextSlide() {
            const next = (currentIndex + 1) % slides.length;
            showSlide(next);
        }

        function startAutoSlide() {
            interval = setInterval(nextSlide, CONFIG.testimonials.interval);
        }

        function stopAutoSlide() {
            clearInterval(interval);
        }

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                stopAutoSlide();
                startAutoSlide();
            });
        });

        // Start
        showSlide(0);
        startAutoSlide();

        // Pause on hover
        const slider = document.querySelector('.testimonial-slider');
        if (slider) {
            slider.addEventListener('mouseenter', stopAutoSlide);
            slider.addEventListener('mouseleave', startAutoSlide);
        }
    }

    // ============================================
    // LANGUAGE SWITCHER
    // ============================================
    function initLanguageSwitcher() {
        const select = document.getElementById('languageSelect');
        if (!select) return;

        select.addEventListener('change', function() {
            const lang = this.value;
            console.log('Language changed to:', lang);
            // Add language switching logic here
        });
    }

    // ============================================
    // LOADING SPINNER
    // ============================================
    function initLoadingSpinner() {
        const spinner = document.getElementById('loadingSpinner');
        if (!spinner) return;

        // Hide after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                spinner.style.display = 'none';
            }, 500);
        });

        // Show on form submission
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', () => {
                spinner.style.display = 'flex';
            });
        });
    }

    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Add notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // PRICING SECTION ENHANCEMENTS
    // ============================================
    function initPricingSection() {
        const cards = document.querySelectorAll('.pricing-card');
        
        cards.forEach((card, index) => {
            // Entrance animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 * index);

            // Click ripple effect
            card.addEventListener('click', function(e) {
                const ripple = document.createElement('div');
                const rect = this.getBoundingClientRect();
                
                ripple.style.cssText = `
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    left: ${e.clientX - rect.left}px;
                    top: ${e.clientY - rect.top}px;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    animation: ripple 0.6s ease-out;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add ripple animation
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }

    // ============================================
    // INITIALIZE EVERYTHING
    // ============================================
    function init() {
        console.log('🚀 Initializing portfolio website...');
        
        // Initialize all components
        initTypingAnimation();
        initDarkMode();
        initScrollToTop();
        initSmoothScrolling();
        initPortfolioFilter();
        initCounters();
        initTestimonialSlider();
        initLanguageSwitcher();
        initLoadingSpinner();
        initPricingSection();
        
        console.log('✅ Portfolio website initialized successfully!');
    }

    // Start application
    init();
});

// ============================================
// GLOBAL FUNCTIONS
// ============================================

// Make showNotification globally available
window.showNotification = showNotification;
