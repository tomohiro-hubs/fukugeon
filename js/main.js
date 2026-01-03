document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Swiper for Voice Section
    const voiceSwiper = new Swiper('.voice-swiper', {
        loop: true,
        spaceBetween: 30,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // Mobile
            0: {
                slidesPerView: 1,
            },
            // Tablet
            768: {
                slidesPerView: 2,
            },
            // Desktop
            1024: {
                slidesPerView: 3,
            },
        }
    });

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = menuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Smart Sticky Header (Hide on scroll down, Show on scroll up)
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    const scrollThreshold = 100; // threshold to avoid flickering

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow on scroll
        if (scrollTop > 50) {
            header.classList.add('shadow-md');
            header.classList.remove('shadow-sm');
        } else {
            header.classList.remove('shadow-md');
            header.classList.add('shadow-sm');
        }

        // Header Hide/Show Logic
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Scroll Down - Hide Header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll Up - Show Header
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, { passive: true });


    // FAQ Accordion
    window.toggleFaq = function(button) {
        const answer = button.nextElementSibling;
        const icon = button.querySelector('i');
        
        // Toggle the answer visibility
        if (answer.classList.contains('hidden')) {
            answer.classList.remove('hidden');
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
            button.classList.add('text-primary');
        } else {
            answer.classList.add('hidden');
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
            button.classList.remove('text-primary');
        }
    }

});
