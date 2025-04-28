// Add responsive loading optimization and performance enhancements
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
        // Improve scroll performance with throttling
        if (!$(this).scrollData) {
            $(this).scrollData = {
                scrollTicking: false
            };
        }

        if (!$(this).scrollData.scrollTicking) {
            $(this).scrollData.scrollTicking = true;

            window.requestAnimationFrame(() => {
                if ($(this).scrollTop() > 300) {
                    $('.navbar').addClass('sticky-top shadow-sm');
                } else {
                    $('.navbar').removeClass('sticky-top shadow-sm');
                }
                $(this).scrollData.scrollTicking = false;
            });
        }

        // Scrolling for back to top button with throttling
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    // Back to top button - add smooth scrolling
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 500, 'easeInOutExpo');
        return false;
    });

    // Typed Initiate with mobile optimization
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 80,
            backSpeed: 20,
            smartBackspace: true,
            loop: true,
            backDelay: 1000
        });
    }

    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        });
        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        });
    });

    // Fix background videos on mobile
    function handleVideos() {
        // Check if device is mobile
        if (window.innerWidth < 768) {
            // Pause background videos on mobile to save bandwidth
            const videos = document.querySelectorAll('video');
            videos.forEach(function (video) {
                // Only set controls for non-background videos
                if (!video.classList.contains('bg-video')) {
                    video.setAttribute('controls', 'controls');
                    video.setAttribute('playsinline', '');
                    video.setAttribute('preload', 'metadata');
                }
            });
        }
    }

    // Handle theme switching
    const themeSwitch = document.getElementById('theme-switch');
    const icon = themeSwitch.querySelector('i');

    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }

    // Theme switch event listener
    themeSwitch.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme;

        if (currentTheme === 'dark') {
            newTheme = 'light';
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            newTheme = 'dark';
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Initialize handlers
    $(document).ready(function () {
        handleVideos();

        // Responsive navigation
        $('.navbar-toggler').on('click', function () {
            if ($('.navbar-collapse').hasClass('show')) {
                $('.navbar-collapse').removeClass('show');
                $('body').removeClass('menu-open');
            } else {
                $('.navbar-collapse').addClass('show');
                $('body').addClass('menu-open');
            }
        });

        // Close mobile menu when clicking outside
        $(document).on('click', function (e) {
            if ($('.navbar-collapse').hasClass('show') &&
                !$(e.target).closest('.navbar-collapse').length &&
                !$(e.target).closest('.navbar-toggler').length) {
                $('.navbar-collapse').removeClass('show');
                $('body').removeClass('menu-open');
            }
        });

        // Close mobile menu when clicking on a menu item
        $('.navbar-nav .nav-link').on('click', function () {
            $('.navbar-collapse').removeClass('show');
            $('body').removeClass('menu-open');
        });

        // Lazy load images for better performance
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll("img.lazy");
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        } else {
            // Fallback for browsers that don't support lazy loading
            let lazyloadImages;

            if ("IntersectionObserver" in window) {
                lazyloadImages = document.querySelectorAll(".lazy");
                let imageObserver = new IntersectionObserver(function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            let image = entry.target;
                            image.src = image.dataset.src;
                            image.classList.remove("lazy");
                            imageObserver.unobserve(image);
                        }
                    });
                });

                lazyloadImages.forEach(function (image) {
                    imageObserver.observe(image);
                });
            }
        }
    });

    // Handle window resize events with debouncing
    let resizeTimer;
    $(window).on('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            handleVideos();
        }, 250);
    });

})(jQuery);

