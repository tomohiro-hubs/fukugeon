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

    // Contact form transition and completion modal
    const contactForm = document.getElementById('contact-form');
    const contactCompleteModal = document.getElementById('contact-complete-modal');
    const contactCompleteBackdrop = document.getElementById('contact-complete-backdrop');
    const contactCompleteClose = document.getElementById('contact-complete-close');
    const contactCompleteOk = document.getElementById('contact-complete-ok');
    const googleFormResponseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfNQi65DT7rO6hnp35EG0gjNyPHG7rvhdEiIMDcePhYVOidOw/formResponse';

    if (contactForm && contactCompleteModal) {
        const openCompleteModal = function() {
            contactCompleteModal.classList.remove('hidden');
            contactCompleteModal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        };

        const closeCompleteModal = function() {
            contactCompleteModal.classList.add('hidden');
            contactCompleteModal.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        };

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const formData = new FormData(contactForm);
            fetch(googleFormResponseUrl, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            }).catch(function() {
                // no-cors fetch does not expose detailed failure info
            });

            openCompleteModal();
            contactForm.reset();
        });

        if (contactCompleteClose) {
            contactCompleteClose.addEventListener('click', closeCompleteModal);
        }
        if (contactCompleteOk) {
            contactCompleteOk.addEventListener('click', closeCompleteModal);
        }
        if (contactCompleteBackdrop) {
            contactCompleteBackdrop.addEventListener('click', closeCompleteModal);
        }

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && !contactCompleteModal.classList.contains('hidden')) {
                closeCompleteModal();
            }
        });
    }

});
