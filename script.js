document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Loading Animation
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }, 500); // Small delay to ensure smooth transition
    });

    // 2. Set Current Year in Footer
    document.getElementById("currentYear").textContent = new Date().getFullYear();

    // 3. Mobile Hamburger Menu
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll(".nav-links li a").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    }));

    // 4. Sticky Navbar & Scroll To Top Button
    const header = document.getElementById("header");
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
            scrollToTopBtn.style.display = "block";
        } else {
            header.classList.remove("scrolled");
            scrollToTopBtn.style.display = "none";
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // 5. Portfolio Filtering
    const filterBtns = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active class from all buttons
            filterBtns.forEach(button => button.classList.remove("active"));
            // Add active class to clicked button
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            portfolioItems.forEach(item => {
                if (filterValue === "all" || item.classList.contains(filterValue)) {
                    item.style.display = "block";
                    // Brief timeout to allow display:block to apply before animation
                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "scale(1)";
                    }, 50);
                } else {
                    item.style.opacity = "0";
                    item.style.transform = "scale(0.8)";
                    setTimeout(() => {
                        item.style.display = "none";
                    }, 300);
                }
            });
        });
    });

    // 6. Lightbox Functionality
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox-close");
    const viewBtns = document.querySelectorAll(".view-btn");

    // Open Lightbox
    viewBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const portfolioItem = e.target.closest('.portfolio-item');
            const imgSrc = portfolioItem.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.style.display = "flex";
            document.body.style.overflow = "hidden"; // Prevent scrolling
        });
    });

    // Close Lightbox (on X click or outside click)
    const closeLightbox = () => {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
    };

    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // 7. Animated Counters (Intersection Observer)
    const counters = document.querySelectorAll(".counter");
    let hasCounted = false;

    const runCounters = () => {
        counters.forEach(counter => {
            counter.innerText = '0';
            const updateCounter = () => {
                const target = +counter.getAttribute('data-target');
                const c = +counter.innerText;
                const increment = target / 50; // Adjust speed here

                if (c < target) {
                    counter.innerText = `${Math.ceil(c + increment)}`;
                    setTimeout(updateCounter, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
        hasCounted = true;
    };

    // 8. Scroll Reveal Animations (Intersection Observer)
    const animateElements = document.querySelectorAll(".animate-on-scroll");

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                
                // If it's a stats card and we haven't counted yet
                if(entry.target.classList.contains('stat-card') && !hasCounted) {
                    runCounters();
                }
                
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    animateElements.forEach(el => scrollObserver.observe(el));

    // 9. Prevent Default on Form Submission (For UI purposes)
    const contactForm = document.getElementById("contactForm");
    if(contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.8';
            
            // Simulate network request
            setTimeout(() => {
                btn.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
                btn.style.backgroundColor = '#10B981'; // Green color for success
                contactForm.reset();
                
                // Revert button back after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = ''; // Revert to CSS default
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }
});