/* Saffron Nibble - Interactive Scripts */
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Drawer Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    
    // Create Backdrop Overlay
    let backdrop = document.querySelector('.mobile-drawer-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'mobile-drawer-backdrop';
        document.body.appendChild(backdrop);
    }

    function toggleMenu() {
        const isOpen = mainNav.classList.contains('active');
        if (isOpen) {
            mainNav.classList.remove('active');
            backdrop.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        } else {
            mainNav.classList.add('active');
            backdrop.classList.add('active');
            mobileToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    }

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', toggleMenu);
        backdrop.addEventListener('click', toggleMenu);
    }

    // Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close other items
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Interactive Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const msg = document.getElementById('formSuccess');
            if (msg) {
                msg.classList.add('success');
                msg.textContent = 'Thank you for your tasting inquiry. Our master confectioner will contact you within 24 hours.';
                contactForm.reset();
            }
        });
    }
});
