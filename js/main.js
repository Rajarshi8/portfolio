(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, { offset: '80%' });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
    });


})(jQuery);


// Ensure project links open in the same tab by removing any target attributes
document.addEventListener('DOMContentLoaded', function () {
    // Remove target attributes from project links
    const projectLinks = document.querySelectorAll('.project-item-vertical .btn');
    projectLinks.forEach(link => {
        link.removeAttribute('target');
    });

    // Add hover functionality to project videos
    const projectVideos = document.querySelectorAll('.project-item-vertical .video-container');

    projectVideos.forEach(container => {
        const video = container.querySelector('video');

        // Play video on hover
        container.addEventListener('mouseenter', () => {
            if (video.paused) {
                video.play().catch(e => {
                    console.log("Autoplay prevented:", e);
                    // Some browsers prevent autoplay without user interaction
                });
            }
        });

        // Pause video when hover ends
        container.addEventListener('mouseleave', () => {
            if (!video.paused) {
                video.pause();
            }
        });
    });

    // Theme switcher functionality
    const themeSwitch = document.getElementById('theme-switch');
    const themeSwitchIcon = themeSwitch.querySelector('i');

    // Function to set theme
    function setTheme(themeName) {
        document.documentElement.setAttribute('data-theme', themeName);
        localStorage.setItem('theme', themeName);

        // Update icon and handle text contrast
        if (themeName === 'dark') {
            themeSwitchIcon.classList.remove('fa-moon');
            themeSwitchIcon.classList.add('fa-sun');

            // Additional dark mode text adjustments
            adjustTextForDarkMode(true);
        } else {
            themeSwitchIcon.classList.remove('fa-sun');
            themeSwitchIcon.classList.add('fa-moon');

            // Restore text for light mode
            adjustTextForDarkMode(false);
        }
    }

    // Function to make specific text adjustments for better dark mode readability
    function adjustTextForDarkMode(isDark) {
        // Adjust specific elements that might need more styling than CSS can provide
        const contactLabels = document.querySelectorAll('#contact .mb-2');
        const progressLabels = document.querySelectorAll('.font-weight-bold');

        if (isDark) {
            contactLabels.forEach(label => {
                label.style.color = '#aaa';
            });
            progressLabels.forEach(label => {
                label.style.color = '#fff';
            });
        } else {
            contactLabels.forEach(label => {
                label.style.color = '';
            });
            progressLabels.forEach(label => {
                label.style.color = '';
            });
        }
    }

    // Function to toggle theme
    function toggleTheme() {
        const currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    // Event listener for theme switch button
    themeSwitch.addEventListener('click', toggleTheme);

    // Set initial theme based on user preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Enhance responsiveness

    // Fix video aspect ratios on different screen sizes
    function adjustVideoContainers() {
        const videoContainers = document.querySelectorAll('.video-container');
        if (window.innerWidth < 768) {
            videoContainers.forEach(container => {
                container.style.paddingBottom = '75%'; // 4:3 aspect ratio for mobile
            });
        } else {
            videoContainers.forEach(container => {
                container.style.paddingBottom = '56.25%'; // 16:9 aspect ratio for larger screens
            });
        }
    }

    // Adjust video containers initially and on resize
    adjustVideoContainers();
    window.addEventListener('resize', adjustVideoContainers);

    // Add swipe support for mobile navigation
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX - 100) {
            // Swipe left - next section
            navigateToNextSection();
        } else if (touchEndX > touchStartX + 100) {
            // Swipe right - previous section
            navigateToPreviousSection();
        }
    }

    function navigateToNextSection() {
        const sections = ['#home', '#about', '#skill', '#hackathon', '#project', '#contact'];
        let currentSection = '';

        // Find which section is currently in view
        for (let i = 0; i < sections.length; i++) {
            const section = document.querySelector(sections[i]);
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = sections[i];
                break;
            }
        }

        // Navigate to next section
        const currentIndex = sections.indexOf(currentSection);
        if (currentIndex < sections.length - 1) {
            const nextSection = document.querySelector(sections[currentIndex + 1]);
            window.scrollTo({
                top: nextSection.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    }

    function navigateToPreviousSection() {
        const sections = ['#home', '#about', '#skill', '#hackathon', '#project', '#contact'];
        let currentSection = '';

        // Find which section is currently in view
        for (let i = 0; i < sections.length; i++) {
            const section = document.querySelector(sections[i]);
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = sections[i];
                break;
            }
        }

        // Navigate to previous section
        const currentIndex = sections.indexOf(currentSection);
        if (currentIndex > 0) {
            const prevSection = document.querySelector(sections[currentIndex - 1]);
            window.scrollTo({
                top: prevSection.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    }
});


// Add to the end of the file - this enhances responsive behavior

// Improve mobile and tablet responsiveness
document.addEventListener('DOMContentLoaded', function () {
    // Handle viewport height issues on mobile devices
    function setMobileViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Set vh variable initially and on resize
    setMobileViewportHeight();
    window.addEventListener('resize', setMobileViewportHeight);

    // Optimize images for responsive loading
    function optimizeResponsiveImages() {
        const images = document.querySelectorAll('img');

        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports lazy loading
            images.forEach(img => {
                img.loading = "lazy"; // Native lazy loading
            });
        }
    }

    optimizeResponsiveImages();

    // Fix nav collapse on mobile - close menu when clicking a link
    const navLinks = document.querySelectorAll('.navbar-nav a');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    // Better handling of video elements on mobile
    function optimizeVideosForMobile() {
        const videos = document.querySelectorAll('video');

        videos.forEach(video => {
            // Set attributes for better mobile performance
            video.setAttribute('playsinline', '');
            video.setAttribute('preload', 'metadata');

            // On mobile, only load video when in viewport
            if (window.innerWidth <= 768) {
                const videoObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            if (video.getAttribute('data-src')) {
                                video.setAttribute('src', video.getAttribute('data-src'));
                                video.removeAttribute('data-src');
                            }
                        }
                    });
                }, { threshold: 0.1 });

                videoObserver.observe(video);
            }
        });
    }

    optimizeVideosForMobile();

    // Smooth scrolling adjustments for iOS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const yOffset = -50;
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }
        });
    });
});

