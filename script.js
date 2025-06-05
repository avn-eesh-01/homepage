window.addEventListener('load', () => {
    // Force page 1 to be visible and reset all other pages on load
    const page1 = document.querySelector('.page1');
    const page2 = document.querySelector('.page2');
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    const page4 = document.querySelector('.page4');
    const page5 = document.querySelector('.page5');
    const page6 = document.querySelector('.page6');
    const page7 = document.querySelector('.page7');
    const page8 = document.querySelector('.page8');
    const page9 = document.querySelector('.page9');

    // Ensure page1 is visible
    if (page1) {
        page1.classList.remove('hidden');
        page1.style.visibility = 'visible';
        page1.style.opacity = '1';
        page1.style.transform = 'translateY(0)';
        page1.style.zIndex = '9000';
        page1.style.position = 'fixed';
        page1.style.backgroundColor = 'var(--dark-bg)';
        
        // Reset animations for page 1 elements
        const page1Text = page1.querySelector('.maintext');
        if (page1Text) {
            page1Text.style.animation = 'none';
            page1Text.offsetHeight;
            page1Text.style.animation = 'fadeInUp 1.2s ease forwards';
        }
        
        const page1Arrow = page1.querySelector('.down-arrow');
        if (page1Arrow) {
            page1Arrow.style.animation = 'fadeIn 1s ease forwards 0.5s, bounce 2s infinite 1s';
        }
    }
    
    // Hide other pages
    if (page2) {
        page2.classList.add('hidden');
        page2.style.position = 'fixed';
        page2.style.zIndex = '9000';
    }
    
    // Completely hide header, hero and content sections
    if (header) {
        header.classList.add('hidden');
        header.style.display = 'none'; // Force display none
    }
    
    if (hero) {
        hero.classList.add('hidden');
        hero.style.display = 'none'; // Force display none
    }
    
    if (page4) {
        page4.classList.add('hidden');
        page4.style.display = 'none'; // Force display none
    }
    
    if (page5) {
        page5.classList.add('hidden');
        page5.style.display = 'none'; // Force display none
    }
    if (page6) {
        page6.classList.add('hidden');
        page6.style.display = 'none'; // Force display none
    }
    if (page7) {
        page7.classList.add('hidden');
        page7.style.display = 'none'; // Force display none
    }
    if (page8) {
        page8.classList.add('hidden');
        page8.style.display = 'none'; // Force display none
    }
    if (page9) {
        page7.classList.add('hidden');
        page7.style.display = 'none'; // Force display none
    }
    
    // Set body class to prevent scrolling
    document.body.classList.add('initial-pages');
    document.body.style.overflow = 'hidden';
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('initial-pages');
    
    const existingCursors = document.querySelectorAll('.cursor');
    if (existingCursors.length > 1) {
        for (let i = 1; i < existingCursors.length; i++) {
            existingCursors[i].remove();
        }
    }

    let cursor = document.querySelector('.cursor');
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'cursor';
        document.body.appendChild(cursor);
    }
    
    let cursorX = -100;
    let cursorY = -100;
    let targetX = -100;
    let targetY = -100;
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
        cursor.style.display = 'block';
        cursor.style.opacity = '1';
        
        document.addEventListener('mousemove', (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
        });
        
        function updateCursor() {
            const ease = 0.15;
            
            // Apply easing formula
            cursorX += (targetX - cursorX) * ease;
            cursorY += (targetY - cursorY) * ease;
            
            // Apply cursor position
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
            
            requestAnimationFrame(updateCursor);
        }
        updateCursor();
        const generalInteractiveElements = document.querySelectorAll('.outlined, .outlined2, .down-arrow, .hero button:not(.nav-buttons button)');
        
        generalInteractiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.mixBlendMode = 'difference';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.mixBlendMode = 'difference';
            });
        });
        
        const navbarElements = document.querySelectorAll('.nav-links a, .hamburger, .nav-buttons button');
        
        navbarElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.mixBlendMode = 'normal';
                cursor.style.background = 'rgba(255, 255, 255, 0.5)';
                cursor.style.border = '1px solid rgba(255, 255, 255, 0.8)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.mixBlendMode = 'difference';
                cursor.style.background = 'white';
                cursor.style.border = 'none';
            });
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });
    } else {
        cursor.style.display = 'none';
    }
    
    const page1 = document.querySelector('.page1');
    const page2 = document.querySelector('.page2');
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    const page4 = document.querySelector('.page4');
    const page5 = document.querySelector('.page5');
    const page6 = document.querySelector('.page6');
    const page7 = document.querySelector('.page7');
    const page8 = document.querySelector('.page8');
    const page9 = document.querySelector('.page9');
    
    // --- SCROLL-BASED TRANSITION LOGIC ---
    let currentPage = 1;
    let isTransitioning = false;

    function transitionToPage2() {
        if (isTransitioning || currentPage !== 1) return;
        isTransitioning = true;
        // Animate page1 out, page2 in
        gsap.to('.page1', {
            y: -100,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
                if (page1) {
                    page1.style.display = 'none';
                }
                if (page2) {
                    page2.style.display = 'flex';
                    page2.style.zIndex = '9000';
                    page2.style.visibility = 'visible';
                    page2.style.backgroundColor = 'var(--dark-bg)';
                    page2.classList.remove('hidden');
                    gsap.fromTo('.page2', {y: 100, opacity: 0}, {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        ease: 'power2.out',
                        onComplete: () => {
                            // Animate text in page2
                            const page2Text = page2.querySelector('.maintext');
                            if (page2Text) {
                                gsap.fromTo(page2Text, {y: 30, opacity: 0}, {y: 0, opacity: 1, duration: 0.8, ease: 'power2.out'});
                            }
                            const page2Arrow = page2.querySelector('.down-arrow');
                            if (page2Arrow) {
                                gsap.fromTo(page2Arrow, {y: 30, opacity: 0}, {y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power2.out'});
                            }
                            currentPage = 2;
                            isTransitioning = false;
                        }
                    });
                }
            }
        });
    }

    function transitionToPage3() {
        if (isTransitioning || currentPage !== 2) return;
        isTransitioning = true;
        // Animate page2 out
        gsap.to('.page2', {
            y: -100,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
                if (page2) {
                    page2.style.display = 'none';
                }
                // Animate header and hero in
                if (header) {
                    header.classList.remove('hidden');
                    header.style.display = 'block';
                    header.style.visibility = 'visible';
                    header.style.opacity = '1';
                    gsap.fromTo(header, {y: 60, opacity: 0}, {y: 0, opacity: 1, duration: 0.7, ease: 'power2.out'});
                }
                if (hero) {
                    hero.classList.remove('hidden');
                    hero.style.display = 'flex';
                    hero.style.visibility = 'visible';
                    hero.style.opacity = '1';
                    gsap.fromTo(hero, {y: 60, opacity: 0}, {y: 0, opacity: 1, duration: 0.7, delay: 0.1, ease: 'power2.out'});
                }
                if (page4) {
                    page4.classList.remove('hidden');
                    page4.style.display = 'flex';
                }
                if (page5) {
                    page5.classList.remove('hidden');
                    page5.style.display = 'flex';
                }
                if (page6) {
                    page6.classList.remove('hidden');
                    page6.style.display = 'flex';
                }
                if (page7) {
                    page7.classList.remove('hidden');
                    page7.style.display = 'flex';
                }
                if (page8) {
                    page8.classList.remove('hidden');
                    page8.style.display = 'flex';
                }
                if (page9) {
                    page9.classList.remove('hidden');
                    page9.style.display = 'flex';
                }
                setTimeout(() => {
                    initScrollAnimations();
                }, 1000);
                // Animate hero text
                const badge = document.querySelector('.badge');
                const h1Spans = document.querySelectorAll('h1 span');
                const tagline = document.querySelector('.tagline');
                const button = document.querySelector('.hero .get-in-touch-btn');
                if (badge) {
                    gsap.fromTo(badge, {y: -30, opacity: 0}, {y: 0, opacity: 1, duration: 0.6, ease: 'power2.out'});
                }
                h1Spans.forEach((span, index) => {
                    gsap.fromTo(span, {y: 30, opacity: 0}, {y: 0, opacity: 1, duration: 0.6, delay: 0.2 + index * 0.2, ease: 'power2.out'});
                });
                if (tagline) {
                    gsap.fromTo(tagline, {y: 30, opacity: 0}, {y: 0, opacity: 1, duration: 0.6, delay: 0.6, ease: 'power2.out'});
                }
                if (button) {
                    gsap.fromTo(button, {y: 30, opacity: 0}, {y: 0, opacity: 1, duration: 0.6, delay: 0.8, ease: 'power2.out'});
                }
                document.body.classList.remove('initial-pages');
                document.body.style.overflow = 'visible';
                document.body.style.position = 'static';
                currentPage = 3;
                isTransitioning = false;
            }
        });
    }

    // Helper to detect scroll direction
    let lastScrollY = 0;
    function handleScrollPage1(e) {
        if (isTransitioning || currentPage !== 1) return;
        // For mouse wheel
        if (e.type === 'wheel' && e.deltaY > 30) {
            transitionToPage2();
        }
        // For touch (swipe up)
        if (e.type === 'touchstart') {
            lastScrollY = e.touches[0].clientY;
        }
        if (e.type === 'touchend') {
            const endY = e.changedTouches[0].clientY;
            if (lastScrollY - endY > 40) {
                transitionToPage2();
            }
        }
    }
    function handleScrollPage2(e) {
        if (isTransitioning || currentPage !== 2) return;
        if (e.type === 'wheel' && e.deltaY > 30) {
            transitionToPage3();
        }
        if (e.type === 'touchstart') {
            lastScrollY = e.touches[0].clientY;
        }
        if (e.type === 'touchend') {
            const endY = e.changedTouches[0].clientY;
            if (lastScrollY - endY > 40) {
                transitionToPage3();
            }
        }
    }
    // Attach scroll listeners
    if (page1) {
        page1.addEventListener('wheel', handleScrollPage1, { passive: false });
        page1.addEventListener('touchstart', handleScrollPage1, { passive: false });
        page1.addEventListener('touchend', handleScrollPage1, { passive: false });
    }
    if (page2) {
        page2.addEventListener('wheel', handleScrollPage2, { passive: false });
        page2.addEventListener('touchstart', handleScrollPage2, { passive: false });
        page2.addEventListener('touchend', handleScrollPage2, { passive: false });
    }
    
    function initScrollAnimations() {
        const isMobile = window.innerWidth <= 768;
        const threshold = isMobile ? 0.05 : 0.15;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    
                    if (entry.target.classList.contains('solution-card')) {
                        if (isMobile) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0) scale(1)';
                        } else {
                            entry.target.style.transform = 'scale(1)';
                        }
                    }
                }
            });
        }, {
            threshold: threshold,
            rootMargin: isMobile ? '0px' : '0px 0px -50px 0px'
        });
        
        // Observe page4 (solutions)
        const page4 = document.querySelector('.page4');
        if (page4) {
            observer.observe(page4);
        }
        
        // ADDED: Make sure Why Us section is observed and visible
        const page5 = document.querySelector('.page5');
        if (page5) {
            observer.observe(page5);
        }
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            
        });

        
        // Staggered animation for solution cards
        document.querySelectorAll('.solution-card').forEach((card, index) => {
            card.style.transitionDelay = `${0.2 * index}s`;
            observer.observe(card);
        });
        
        // ADDED: Staggered animation for Why Us cards
        document.querySelectorAll('.why-us .card').forEach((card, index) => {
            card.style.transitionDelay = `${0.1 * index}s`;
            observer.observe(card);
        });

        // ADDED: Make sure Team section is observed and visible
        const page6 = document.querySelector('.page6');
        if (page6) {
            observer.observe(page6);
        }
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            
        });

        // ADDED: Make sure Portfolio section is observed and visible
        const page7 = document.querySelector('.page7');
        if (page7) {
            observer.observe(page7);
        }
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            
        });

        // ADDED: Make sure CTA section is observed and visible
        const page8 = document.querySelector('.page8');
        if (page8) {
            observer.observe(page8);
        }
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            
        });

        const page9 = document.querySelector('.page9');
        if (page9) {
            observer.observe(page9);
        }
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            
        });
    }
    
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            if (navLinks) navLinks.classList.toggle('active');
            if (navButtons) navButtons.classList.toggle('active');
        });
    }
    
    const mobileLinks = document.querySelectorAll('.nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
            if (navButtons) navButtons.classList.remove('active');
        });
    });
    
    // Handle smooth scrolling for anchor links - UPDATED to ensure all sections work
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const hamburger = document.querySelector('.hamburger');
                const navLinks = document.querySelector('.nav-links');
                if (hamburger && hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }

                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 100, 
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection observer for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    // Smooth button animations
    document.querySelectorAll('.get-in-touch-btn').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPercent = x / rect.width;
            const yPercent = y / rect.height;

            const rotateX = (0.5 - yPercent) * 8;
            const rotateY = (xPercent - 0.5) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            setTimeout(() => {
                card.style.transform = '';
            }, 300);
        });
    });

    // Function to handle resize events
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        const solutions = document.querySelector('#solutions');
        const whyUs = document.querySelector('#why-us');
        
        if (isMobile) {
            // Force visibility on mobile
            if (solutions) {
                solutions.classList.remove('hidden');
                solutions.style.opacity = '1';
                solutions.style.transform = 'translateY(0)';
                solutions.style.visibility = 'visible';
            }
            
            if (whyUs) {
                whyUs.classList.remove('hidden');
                whyUs.style.opacity = '1';
                whyUs.style.transform = 'translateY(0)';
                whyUs.style.visibility = 'visible';
            }
            
            // Make all cards visible on mobile
            document.querySelectorAll('.solution-card, .card').forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
                card.style.visibility = 'visible';
            });
        }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    // Add touch events for mobile
    const downArrows = document.querySelectorAll('.down-arrow');
    downArrows.forEach(arrow => {
        arrow.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.style.transform = 'translateY(5px)';
        }, { passive: false });
        
        // Add touchend event
        arrow.addEventListener('touchend', function() {
            this.style.transform = '';
            
            this.click();
        });
    });

    const teamBoxes = document.querySelectorAll('.box');
    let touchTimeout;

    teamBoxes.forEach(box => {
        // Touch start event
        box.addEventListener('touchstart', (e) => {
            e.preventDefault();
            clearTimeout(touchTimeout);
            
            teamBoxes.forEach(otherBox => {
                if (otherBox !== box) {
                    otherBox.classList.remove('touched');
                }
            });
            
            box.classList.add('touched');
        });

        box.addEventListener('touchend', () => {
            touchTimeout = setTimeout(() => {
                box.classList.remove('touched');
            }, 1000); 
        });

        box.addEventListener('click', (e) => {
            const overlay = box.querySelector('.team-member-overlay');
            const linkedInBtn = e.target.closest('.linkedin-btn');
            
            if (linkedInBtn) {
                return;
            }
            
            e.preventDefault();
        });

        box.addEventListener('touchstart', (e) => {
            const overlay = box.querySelector('.team-member-overlay');
            const linkedInBtn = e.target.closest('.linkedin-btn');
            
            if (linkedInBtn) {
                return;
            }

            e.preventDefault();
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.box')) {
            teamBoxes.forEach(box => {
                box.classList.remove('touched');
            });
        }
    });

    // --- GSAP Staggered Reveal Animations ---
    function staggerReveal(sectionSelector, options = {}) {
        gsap.utils.toArray(sectionSelector).forEach(section => {
            const items = section.querySelectorAll(options.childSelector || '.animate-on-scroll, .solution-card, .card, .box, .testimonial');
            if (items.length) {
                gsap.from(items, {
                    opacity: 0,
                    y: 40,
                    scale: 0.96,
                    duration: 0.7,
                    stagger: {
                        each: 0.12,
                        from: 'start'
                    },
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                        once: true
                    },
                    ...options.gsap
                });
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        staggerReveal('.solutions-grid', { childSelector: '.solution-card' });
        staggerReveal('.why-us .row', { childSelector: '.card' });
        staggerReveal('.team-container-outer', { childSelector: '.box' });
        staggerReveal('.testimonial-grid', { childSelector: '.testimonial' });
    });
});

function filterTestimonials(category) {
    let testimonials = document.querySelectorAll('.testimonial');
    let buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');

    testimonials.forEach(testimonial => {
        if (category === 'all' || testimonial.getAttribute('data-category') === category) {
            testimonial.style.visibility = 'visible';
            testimonial.style.position = 'relative';
        } else {
            testimonial.style.visibility = 'hidden';
            testimonial.style.position = 'absolute';
        }
    });
}

function openPopup(logoUrl, title, subtitle, description) {
    document.getElementById('popup-logo').src = logoUrl; 
    document.getElementById('popup-title').innerText = title;
    document.getElementById('popup-subtitle').innerText = subtitle;
    document.getElementById('popup-description').innerText = description;
    
    document.body.classList.add('popup-active');
    
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    
    overlay.style.display = 'block';
    popup.style.display = 'block';
    
    void overlay.offsetWidth;
    void popup.offsetWidth;
    
    overlay.style.opacity = '1';
    popup.style.opacity = '1';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    
    
    document.body.classList.remove('popup-active');
}

// Close popup when clicking on overlay
document.getElementById('overlay').addEventListener('click', function(e) {
    
    if (e.target === this) {
        closePopup();
    }
});

// Close popup with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePopup();
    }
});