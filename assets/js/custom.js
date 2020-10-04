/*----------------------------------------------

Template name:  Snail
Version:        1.0
Author:         Snail
Author Email:   support@company.com 

NOTE:
------
Please DO NOT EDIT THIS JS, you may need to use "script.js" file for writing your script js.
We may release future updates so it will overwrite this file. it's better and safer to use "script.js".

----------------------------------------------*/


(function($) {
    "use strict";

    /*=====================================
        Preloader
    =========================================*/

    $(window).on('load', function() {
        $("body").addClass("loaded").delay(1000).queue(function() {
            $('.preloader').addClass("d-none").dequeue();
        });
    });

    /*=====================================
        Scroll Top
    =========================================*/
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#scroll-top').addClass('show');
        } else {
            $('#scroll-top').removeClass('show');
        }
    });
    $('#scroll-top').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
    /*=====================================
        Isotope filter Activation
    =========================================*/

    $(window).on('load', function() {
        if ($('.isotope-item').length > 0) {
            var $grid = $('.isotope-item').isotope({
                itemSelector: '.item',
                layoutMode: 'fitRows'
            });

            $('.nav-item').click(function() {
                $('.nav-item').removeClass('active');
                $(this).addClass('active');
                var selector = $(this).attr('data-filter');
                $('.isotope-item').isotope({
                    filter: selector
                });
                return false;
            });
        }


        if ($('.page-item').length > 0) {
            var $grid = $('.page-item').isotope({
                itemSelector: '.item',
                layoutMode: 'fitRows'
            });

            $('.filter-item').click(function() {
                $('.filter-item').removeClass('active');
                $(this).addClass('active');
                var selector = $(this).attr('data-filter');
                $('.page-item').isotope({
                    filter: selector
                });
                return false;
            });
        }
    });

    /*=====================================
        Masonary wih isotope filter
    =========================================*/

    $(window).on('load', function() {
        $('.masonry-activation').imagesLoaded(function() {
            var $grid = $('.masonry-wrap').isotope({
                itemSelector: '.masonary-item',
                percentPosition: true,
                transitionDuration: '0.7s',
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: 1,
                }
            });

            $('.nav-item').click(function() {
                $('.nav-item').removeClass('active');
                $(this).addClass('active');
                var selector = $(this).attr('data-filter');
                $('.gallery-wrapper').isotope({
                    filter: selector,
                });
                return false;
            });
        });
    });

    /*=====================================
        Header Search Popup
    =========================================*/

    var $html = $('html'),
        $demoOption = $('.demo-option-container'),
        $body = $('body');

    function searchClose() {
        $body.removeClass('page-search-popup-opened'), $html.css({
            overflow: ""
        })
    }


    $('.btn-search-click').on("click", function(e) {
        e.preventDefault(),
            function() {
                $body.addClass('page-search-popup-opened'), $html.css({
                    overflow: "hidden"
                });
                var e = $('.sl-search-popup').find("form input[type='search']");
                setTimeout(function() {
                    e.focus()
                }, 500)
            }()
    });


    $('.search-close').on('click', function(e) {
        e.preventDefault();
        searchClose();
    });

    $('.sl-search-popup').on('click', function(e) {
        e.target === this && searchClose();
    });


    /* =============================
        Sticky Header 
    =================================*/

    $('.header-sticky').headroom();

    /* =============================
        Option Demo
    =================================*/

    $('.quick-option').on('click', function(e) {
        e.preventDefault(),
            function() {
                $demoOption.toggleClass('open')
                setTimeout(function() {
                    if ($(".quick-option i").hasClass("fa-sliders-h")) {

                        $('.quick-option i').addClass('ti-close');
                        $('.quick-option i').removeClass('fa fa-sliders-h');

                    } else {
                        $('.quick-option i').removeClass('ti-close');
                        $('.quick-option i').addClass('fa fa-sliders-h');
                    }
                }, 800);
            }()
    });

    /* =============================
        Header Color Changable
    =================================*/

    // Header Black To White

    function HeaderblackTowhite() {
        $('.header-black-to-white').each(function() {
            if ($(window).width() < 992) {
                $(this).removeClass("header-black-version");
                $(this).addClass("header-light-version");
                $("#change-logo").attr("src", "img/logo/logo-white.svg");
                $('.popup-mobile-click').removeClass("dark-version");
                $('.popup-mobile-click').addClass("light-version");
            } else {
                $(this).removeClass("header-light-version");
                $(this).addClass("header-black-version");
                $("#change-logo").attr("src", "img/logo/logo-black.svg");
                $('.popup-mobile-click').removeClass("light-version");
                $('.popup-mobile-click').addClass("dark-version");
            }
        });
    }

    // Header White To Black

    function HeaderwhiteToblack() {
        $('.header-white-to-black').each(function() {
            if ($(window).width() > 992) {
                $(this).removeClass("header-light-version");
                $(this).addClass("header-black-version");
                $("#change-logo").attr("src", "img/logo/logo-black.svg");
                $('.popup-mobile-click').removeClass("light-version");
                $('.popup-mobile-click').addClass("dark-version");
            } else {

                $(this).removeClass("header-black-version");
                $(this).addClass("header-light-version");
                $("#change-logo").attr("src", "img/logo/logo-white.svg");
                $('.popup-mobile-click').removeClass("dark-version");
                $('.popup-mobile-click').addClass("light-version");
            }
        });
    }

    $(document).ready(function() {
        HeaderblackTowhite();
        HeaderwhiteToblack();
        $(window).resize(function() {
            HeaderblackTowhite();
            HeaderwhiteToblack();
        });
    });

    /* =============================
        Minicart Activation
    =================================*/

    $('.minicart-trigger').on('click', function(e) {
        e.stopPropagation();
        $(this).siblings('.shopping-cart').slideToggle('400');
        $(this).siblings('.shopping-cart').toggleClass('show');
        var $cartWrapper = $(this).parents('.mini-cart').siblings().children('.shopping-cart');
        $(this).parents('.mini-cart').siblings().children('.shopping-cart').slideUp('400');
    })

    function menuClose() {
        $body.removeClass('popup-mobile-menu-wrapper'), $html.css({
            overflow: ""
        })
    };

    /* =============================
        Mobile Menu Popup
    =================================*/

    $('.popup-mobile-click').on('click', function(e) {
        e.preventDefault(),
            function() {
                $body.addClass('popup-mobile-menu-wrapper'), $html.css({
                    overflow: "hidden"
                });
            }()
    });


    $('.mobile-close').on('click', function(e) {
        e.preventDefault();
        menuClose();
    });
    $('.popup-mobile-visiable').on('click', function(e) {
        e.target === this && menuClose();
    });

    /* =============================
        Hamberger Menu
    =================================*/

    $('.hamberger-trigger').on('click', function(e) {
        e.preventDefault();
        $('.open-hamberger-wrapper').addClass('is-visiable');
    });

    $('.page-close').on('click', function(e) {
        e.preventDefault();
        $('.open-hamberger-wrapper').removeClass('is-visiable');
    });

    /* =============================
        Sidebar Mobile Menu
    =================================*/

    $('.object-custom-menu > li.has-mega-menu > a').on('click', function(e) {
        e.preventDefault();
        $(this).siblings('.object-submenu').slideToggle('400');
        $(this).toggleClass('active').siblings('.object-submenu').toggleClass('is-visiable');
    })

    /*=====================================
        Prebuild Component
    =========================================*/

    $('.componant-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        autoplay: true,
        slidesToShow: 2.8,
        centerMode: true,
        centerPadding: '30px',
        responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1008,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    /*=====================================
        Date time Picker
    =========================================*/

    $('#datetimepickerdark, #datetimepickerdark2').datetimepicker({
        datepicker: true,
        format: 'd-m-y H:i',
        theme: 'dark'
    });

    $('#datetimepicker, #datetimepicker2').datetimepicker({
        datepicker: true,
        format: 'd-m-y H:i'
    });

    /*=====================================
        Image Justify Activation
    =========================================*/
    $(window).on('load', function() {
        $('#npgallery2').justifiedGallery({
            rowHeight: 320,
            maxRowHeight: null,
            margins: 2,
            border: 0,
            rel: 'npgallery2',
            lastRow: 'nojustify',
            captions: true,
            randomize: false,
            sizeRangeSuffixes: {
                lt100: '_t',
                lt240: '_m',
                lt320: '_n',
                lt500: '',
                lt640: '_z',
                lt1024: '_b'
            }
        });
    });

    ScrollReveal().reveal('.npreveal', {
        delay: 500,
        useDelay: 'onload',
        reset: true,
    })

    /*=====================================
        Sticky Sidebar
    =========================================*/

    $('#sticky').theiaStickySidebar({
        MarginTop: 80
    });

    /*=====================================
        Scroll to Top
    =========================================*/

    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#GotoTop').fadeIn();
        } else {
            $('#GotoTop').fadeOut();
        }
    });
    $('#GotoTop').click(function() {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

    /*=====================================
        Node Cursor // Custom Cursor
    =========================================*/


    if ($('#cursor').length > 0) {
        var initCursor = new NodeCursor({
            cursor: true,
            node: true,
            cursor_velocity: 0,
            node_velocity: 0.75,
            native_cursor: 'none',
            element_to_hover: '.nodeHover',
            cursor_class_hover: 'disable',
            node_class_hover: 'expand',
            hide_mode: true,
            hide_timing: 2000,
        });
    }

    $("a").on("mouseleave", function() {
        $("#cursor").removeClass("active");
        $("#cursor").removeClass("active");
    });
    /* =============================
        Counter up
    =================================*/

    $('.count').counterUp({
        delay: 10,
        time: 2000
    });

    /*============================== 
        18. Countdown
    ===============================*/


    $('[data-countdown]').each(function() {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function(event) {
            $this.html(event.strftime('<span class="sl-count days"><span class="count-inner"><span class="time-count">%-D</span> <p>Days</p></span></span> <span class="sl-count hour"><span class="count-inner"><span class="time-count">%-H</span> <p>Hours</p></span></span> <span class="sl-count minutes"><span class="count-inner"><span class="time-count">%M</span> <p>Minutes</p></span></span> <span class="sl-count second"><span class="count-inner"><span class="time-count">%S</span> <p>Seconds</p></span></span>'));
        });
    });

    /*==================================
        Countdown Time Circles
    ======================================*/

    $('#DateCountdown').TimeCircles({
        "animation": "smooth",
        "bg_width": 0.60,
        "fg_width": 0.033,

        "circle_bg_color": "#eeeeee",
        "time": {
            "Days": {
                "text": "Days",
                "color": "#0038E3",
                "show": true
            },
            "Hours": {
                "text": "Hours",
                "color": "#0038E3",
                "show": true
            },
            "Minutes": {
                "text": "Minutes",
                "color": "#0038E3",
                "show": true
            },
            "Seconds": {
                "text": "Seconds",
                "color": "#0038E3",
                "show": true
            }
        }
    });

    /*==================================
        Countdown Time Circles -2
    ======================================*/

    $('#commingsoon').TimeCircles({
        "animation": "smooth",
        "bg_width": 0.60,
        "fg_width": 0.033,
        "circle_bg_color": "#8a8a8a",
        "time": {
            "Days": {
                "text": "Days",
                "color": "#ffffff",
                "show": true
            },
            "Hours": {
                "text": "Hours",
                "color": "#ffffff",
                "show": true
            },
            "Minutes": {
                "text": "Minutes",
                "color": "#ffffff",
                "show": true
            },
            "Seconds": {
                "text": "Seconds",
                "color": "#ffffff",
                "show": true
            }
        }
    });
    /*===================================
        Modal Toggle class
    ====================================*/
    $(document).on('click', '[data-toggle-class]', function(e) {
        var $self = $(this);
        var attr = $self.attr('data-toggle-class');
        var target = $self.attr('data-toggle-class-target') || $self.attr('data-target');
        var closest = $self.attr('data-target-closest');
        var classes = (attr && attr.split(',')) || '',
            targets = (target && target.split(',')) || Array($self),
            key = 0;
        $.each(classes, function(index, value) {
            var target = closest ? $self.closest(targets[(targets.length == 1 ? 0 : key)]) : $(targets[(targets.length == 1 ? 0 : key)]),
                current = target.attr('data-class'),
                _class = classes[index];
            (current != _class) && target.removeClass(target.attr('data-class'));
            target.toggleClass(classes[index]);
            target.attr('data-class', _class);
            key++;
        });
        $self.toggleClass('active');
        $self.attr('href') == "#" ? e.preventDefault() : '';
    });

    /*===================================
        Audio Player
    ====================================*/

    $('audio').audioPlayer();

    /* =============================
        Wow Activation
    =================================*/

    new WOW().init();

    /* =============================
        Nice Select Activation
    =================================*/

    $('select.nice-select').niceSelect();

    /* =============================
        Custom Form PlaceHolder
    =================================*/

    $(function() {
        $(".field-wrapper .field-placeholder").on("click", function() {
            $(this).closest(".field-wrapper").find("input").focus();
            $(this).closest(".field-wrapper").find("textarea").focus();
        });
        $(".field-wrapper input,.field-wrapper textarea").on("change", function() {
            var value = $.trim($(this).val());
            if (value) {
                $(this).closest(".field-wrapper").addClass("hasValue");
            } else {
                $(this).closest(".field-wrapper").removeClass("hasValue");
            }
        });
    });

    /* =============================
        Welcome Slides
    =================================*/

    if ($.fn.owlCarousel) {
        var welcomeSlider = $('.welcome-slides');
        welcomeSlider.owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            smartSpeed: 1000,
            autoplayTimeout: 10000,
            nav: true,
            dots: false,
            responsive: {
                0: {
                    nav: false,
                },
                769: {
                    nav: true,
                }
            },
            navText: [('<i class="fa fa-arrow-left"></i>'), ('<i class="fa fa-arrow-right"></i>')]
        })

        welcomeSlider.on('translate.owl.carousel', function() {
            var layer = $("[data-animation]");
            layer.each(function() {
                var anim_name = $(this).data('animation');
                $(this).removeClass('animated ' + anim_name).css('opacity', '0');
            });
        });

        $("[data-delay]").each(function() {
            var anim_del = $(this).data('delay');
            $(this).css('animation-delay', anim_del);
        });

        $("[data-duration]").each(function() {
            var anim_dur = $(this).data('duration');
            $(this).css('animation-duration', anim_dur);
        });

        welcomeSlider.on('translated.owl.carousel', function() {
            var layer = welcomeSlider.find('.owl-item.active').find("[data-animation]");
            layer.each(function() {
                var anim_name = $(this).data('animation');
                $(this).addClass('animated ' + anim_name).css('opacity', '1');
            });
        });
    }

    /* =============================
        SVG Play Buttons
    =================================*/


    var flip = true,
        pause = "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28",
        play = "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26",
        $animation = $('#animation');

    $(".ytp-play-button").on('click', function() {
        flip = !flip;
        $animation.attr({
            "from": flip ? pause : play,
            "to": flip ? play : pause
        }).get(0).beginElement();
    });

    /* =============================
        Magnific Popup
    =================================*/

    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /* =============================
        Fancybox Hover Effect
    =================================*/

    function ContentHover() {

        var $hoverContentHeight = 0;

        $('body').on('mouseenter', '.fancybox-hover-block', function() {
            $hoverContentHeight = parseInt($(this).find('.fancy-box-info').outerHeight(true));
            $(this).find('.fancy-box-header').css('transform', 'translateY(-' + $hoverContentHeight + 'px)');
        });

        $('body').on('mouseleave', '.fancybox-hover-block', function() {
            $(this).find('.fancy-box-header').css('transform', 'translateY(0)');
        });
    }

    ContentHover();

    /* =============================
        Typed Js
    =================================*/

    $(function() { $(".typed").typed({ strings: ["Neural Text to Speech", "Celebrity voices", "Frustration Detection", "Wi-Fi control", "Food Network feature"], typeSpeed: 130, loop: true }); });

    // Landing page banner
    $(function() { $(".landing-typed").typed({ strings: ["Innovative", "Creative"], typeSpeed: 130, loop: true }); });

    /* =============================
        Testimonial Slider
    =================================*/

    $(document).ready(function() {
        $("#sl-testimonial-slider").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            margin: 10,
            dots: false,
            nav: false
        });
    });

    if ($('.slide-one-item').length > 0) {
        $('.slide-one-item').owlCarousel({
            items: 1,
            loop: true,
            stagePadding: 0,
            margin: 0,
            autoplay: true,
            animateOut: 'fadeOutUp',
            animateIn: 'fadeIn',
            pauseOnHover: false,
            nav: true,
            navText: ['<span class="ti-arrow-left">', '<span class="ti-arrow-right">']
        });
    }

    if ($('.restaurant-testimonial').length > 0) {
        $('.restaurant-testimonial').owlCarousel({
            items: 1,
            loop: true,
            stagePadding: 0,
            margin: 0,
            autoplay: true,
            pauseOnHover: false,
            nav: true,
            dots: true,
            navText: ['<span class="ti-arrow-left">', '<span class="ti-arrow-right">']
        });
    }

    if ($('.portfolio-multi-image-slider').length > 0) {
        $('.portfolio-multi-image-slider').owlCarousel({
            items: 1,
            loop: true,
            stagePadding: 0,
            margin: 0,
            autoplay: true,
            pauseOnHover: true,
            nav: false,
            dots: true,
        });
    }


    if ($('.portfolio-testimonial').length > 0) {
        $('.portfolio-testimonial').owlCarousel({
            items: 1,
            loop: true,
            stagePadding: 0,
            margin: 0,
            autoplay: true,
            pauseOnHover: false,
            nav: false,
            dots: true,
            navText: ['<span class="ti-arrow-left">', '<span class="ti-arrow-right">']
        });
    }

    if ($('.architect-project-carousel').length > 0) {
        $('.architect-project-carousel').owlCarousel({
            items: 1,
            loop: true,
            margin: 10,
            autoplay: true,
            pauseOnHover: false,
            nav: true,
            dots: false,
            navText: ['<span class="ti-arrow-left">', '<span class="ti-arrow-right">']
        });
    }


    $('.customNextBtn').click(function(event) {
        event.preventDefault();
        owl.trigger('next.owl.carousel');
    });

    $('.customPrevBtn').click(function(event) {
        event.preventDefault();
        owl.trigger('prev.owl.carousel');
    });


    if ($('.basic-client-carousel').length > 0) {
        $('.basic-client-carousel').owlCarousel({
            items: 6,
            loop: true,
            stagePadding: 0,
            margin: 30,
            autoplay: true,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            pauseOnHover: false,
            dots: false,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                560: {
                    items: 2
                },
                760: {
                    items: 4
                },
                990: {
                    items: 4
                },
                1200: {
                    items: 6
                },
                1500: {
                    items: 6
                }
            },
            navText: ['<span class="ti-arrow-left">', '<span class="ti-arrow-right">']
        });
    }

    if ($('.app-alider').length > 0) {
        $('.app-alider').owlCarousel({
            items: 2,
            loop: true,
            stagePadding: 0,
            margin: 30,
            autoplay: true,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            pauseOnHover: false,
            dots: false,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                560: {
                    items: 1
                },
                760: {
                    items: 1
                },
                990: {
                    items: 2
                },
                1200: {
                    items: 2
                },
                1500: {
                    items: 2
                }
            }
        });
    }

    if ($('.feature-slider').length > 0) {
        $('.feature-slider').owlCarousel({
            items: 1.5,
            loop: true,
            stagePadding: 20,
            margin: 20,
            dots: false,
            autoplay: true,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            pauseOnHover: false,
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                560: {
                    items: 1
                },
                760: {
                    items: 1
                },
                990: {
                    items: 2
                },
                1200: {
                    items: 3
                },
                1500: {
                    items: 3
                }
            },
            navText: ['<span class="ti-arrow-left">', '<span class="ti-arrow-right">']
        });
    }

    if ($('.wedding-blog-item').length > 0) {
        $('.wedding-blog-item').owlCarousel({
            items: 1.5,
            loop: true,
            stagePadding: 0,
            margin: 0,
            dots: false,
            autoplay: true,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            pauseOnHover: false,
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                560: {
                    items: 2
                },
                760: {
                    items: 1
                },
                990: {
                    items: 1
                },
                1200: {
                    items: 1
                },
                1500: {
                    items: 1
                }
            },
            navText: ['<span class="ti-arrow-left">', '<span class="ti-arrow-right">']
        });
    }

    if ($('#blogslide4').length > 0) {
        $('#blogslide4').owlCarousel({
            slideBy: 2,
            loop: true,
            // stagePadding: 10,
            margin: 20,
            autoplay: true,
            pauseOnHover: false,
            nav: false,
            dots: false,
            responsive: {
                0: {
                    items: 1,
                    margin: 0
                },
                480: {
                    items: 1,
                    margin: 0
                },
                560: {
                    items: 2
                },
                760: {
                    items: 3
                },
                990: {
                    items: 3
                },
                1200: {
                    items: 4
                },
                1500: {
                    items: 4
                }
            }
        });
    }

    // Testimonial
    if ($('.testimonial-item').length > 0) {
        $('.testimonial-item').owlCarousel({
            items: 2.5,
            loop: true,
            stagePadding: 0,
            margin: 0,
            dots: false,
            autoplay: true,
            animateOut: 'zoomOut',
            animateIn: 'zoomIn',
            pauseOnHover: false,
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                560: {
                    items: 2
                },
                770: {
                    items: 2
                },
                990: {
                    items: 2.5
                },
                1200: {
                    items: 2.5
                },
                1500: {
                    items: 2.5
                }
            },
            navText: ['<span class="ti-arrow-left">', '<span class="ti-arrow-right">']
        });
    }


    if ($('.blog-half-slider').length > 0) {
        $('.blog-half-slider').owlCarousel({
            items: 2.5,
            loop: true,
            stagePadding: 0,
            margin: 40,
            dots: false,
            autoplay: true,
            animateOut: 'zoomOut',
            animateIn: 'zoomIn',
            pauseOnHover: false,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                560: {
                    items: 2
                },
                770: {
                    items: 2
                },
                990: {
                    items: 2.5
                },
                1200: {
                    items: 2.5
                },
                1500: {
                    items: 2.5
                }
            },
            navText: ['<span class="ti-arrow-left">', '<span class="ti-arrow-right">']
        });
    }

    if ($('#video-box').length > 0) {
        $('#video-box').owlCarousel({
            items: 4,
            loop: true,
            stagePadding: 0,
            margin: 20,
            singleItem: true,
            dots: false,
            autoplay: true,
            pauseOnHover: false,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                560: {
                    items: 2
                },
                770: {
                    items: 3
                },
                990: {
                    items: 3
                },
                1200: {
                    items: 4
                },
                1500: {
                    items: 4
                }
            },
            navText: ['<span class="ti-arrow-left">', '<span class="ti-arrow-right">']
        });
    }

    if ($('#instagram').length > 0) {
        $('#instagram').owlCarousel({
            items: 5,
            loop: true,
            stagePadding: 0,
            margin: 20,
            singleItem: true,
            dots: false,
            autoplay: true,
            pauseOnHover: false,
            nav: false,
            responsive: {
                0: {
                    items: 2
                },
                480: {
                    items: 2
                },
                560: {
                    items: 4
                },
                770: {
                    items: 4
                },
                990: {
                    items: 5
                },
                1200: {
                    items: 5
                },
                1500: {
                    items: 5
                }
            },
            navText: ['<span class="ti-arrow-left">', '<span class="ti-arrow-right">']
        });
    }

    if ($('#team-carousel-1').length > 0) {
        $('#team-carousel-1').owlCarousel({
            items: 4,
            loop: true,
            stagePadding: 0,
            margin: 20,
            singleItem: true,
            autoplay: true,
            pauseOnHover: false,
            dots: false,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                560: {
                    items: 2
                },
                770: {
                    items: 3
                },
                990: {
                    items: 4
                },
                1200: {
                    items: 4
                },
                1500: {
                    items: 4
                }
            },
            navText: ['<span class="ti-arrow-left">', '<span class="ti-arrow-right">']
        });
    }

    if ($('#team-carousel-2').length > 0) {
        $('#team-carousel-2').owlCarousel({
            items: 4,
            loop: true,
            stagePadding: 0,
            margin: 20,
            singleItem: true,
            autoplay: true,
            pauseOnHover: false,
            dots: false,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                560: {
                    items: 2
                },
                770: {
                    items: 3
                },
                990: {
                    items: 4
                },
                1200: {
                    items: 4
                },
                1500: {
                    items: 4
                }
            },
            navText: ['<span class="ti-arrow-left">', '<span class="ti-arrow-right">']
        });
    }

    if ($('.testimonial-classic').length > 0) {
        $('.testimonial-classic').owlCarousel({
            items: 1,
            loop: true,
            stagePadding: 0,
            margin: 0,
            dots: true,
            autoplay: true,
            pauseOnHover: false,
            nav: false,
            navText: ['<span class="ti-arrow-left">', '<span class="ti-arrow-right">']
        });
    }

    /*==================================
        Parrallax Scene
    ======================================*/

    if ($("#parrllax-scene").length > 0) {
        var scene = document.getElementById('parrllax-scene');
        var parallax = new Parallax(scene);
        var scene1 = document.getElementById('parrllax-scene-1');
        var parallax = new Parallax(scene1);
    }

    /*==================================
        Architecture Slider
    ======================================*/


    if ($(".sl-hero-has-animation").length > 0) {
        setTimeout(function() {
            $(".sl-hero-has-animation").addClass("sl-hero-animate");
        }, 100);
    }

    var heroPropCarouselItems = 1;

    $(".sl-hero-props-carousel-1 .carousel-item").each(function(index, element) {
        if (index == 0) {
            $(".sl-hero-props-carousel-1-prices").addClass(
                "sl-price-active sl-first-time"
            );
        }

        $(".sl-hero-props-carousel-1-prices .sl-carousel-ticker-counter").append(
            "<span>0" + heroPropCarouselItems + "</span>"
        );

        heroPropCarouselItems += 1;
    });

    $(".sl-hero-props-carousel-1-prices .sl-carousel-ticker-total").append(
        "<span>0" + $(".sl-hero-props-carousel-1 .carousel-item").length + "</span>"
    );

    $(".sl-hero-props-carousel-1").on("slide.bs.carousel", function(carousel) {
        $(".sl-hero-props-carousel-1-prices").removeClass("sl-first-time");
        $(".sl-hero-props-carousel-1-prices").carousel(carousel.to);
    });

    $(".sl-hero-props-carousel-1").on("slid.bs.carousel", function(carousel) {
        var tickerPos = carousel.to * 13;

        $(
            ".sl-hero-props-carousel-1-prices .sl-carousel-ticker-counter > span"
        ).css("transform", "translateY(-" + tickerPos + "px)");
    });

    $(".sl-hero-props-carousel-1 .sl-carousel-control-next").click(function(e) {
        $(".sl-hero-props-carousel-1").carousel("next");
    });

    $(".sl-hero-props-carousel-1 .sl-carousel-control-prev").click(function(e) {
        $(".sl-hero-props-carousel-1").carousel("prev");
    });

    $(".sl-hero-props-carousel-2-right").on("slide.bs.carousel", function(carousel) {
        if (carousel.direction == "left") {
            $(".sl-hero-props-carousel-2-left").carousel("next");
        } else {
            $(".sl-hero-props-carousel-2-left").carousel("prev");
        }
    });

    $(".sl-hero-props-carousel-2 .sl-carousel-control-next").click(function(e) {
        $(".sl-hero-props-carousel-2-right").carousel("next");
    });

    $(".sl-hero-props-carousel-2 .sl-carousel-control-prev").click(function(e) {
        $(".sl-hero-props-carousel-2-right").carousel("prev");
    });

    var heroPropCarousel2Items = 1;

    $(".sl-hero-props-carousel-2-right .carousel-item").each(function(index, element) {
        $(".sl-hero-props-carousel-2 .sl-carousel-ticker-counter").append(
            "<span>0" + heroPropCarousel2Items + "</span>"
        );
        heroPropCarousel2Items += 1;
    });

    $(".sl-hero-props-carousel-2 .sl-carousel-ticker-total").append(
        "<span>0" +
        $(".sl-hero-props-carousel-2-right .carousel-item").length +
        "</span>"
    );

    $(".sl-hero-props-carousel-2-right").on("slid.bs.carousel", function(carousel) {
        var tickerPos = carousel.to * 13;

        $(".sl-hero-props-carousel-2 .sl-carousel-ticker-counter > span").css(
            "transform",
            "translateY(-" + tickerPos + "px)"
        );
    });

    /*==================================
        Background image // Custom tag
    ======================================*/

    $("[data-bg-image]").each(function() {
        $(this).data('image', $(this).css('background-image'));
        var url = "url('" + $(this).attr('data-bg-image') + "')";
        $(this).css('background-image', url)
    });

    /*==================================
        Opacity // Custom tag
    ======================================*/

    $("[data-opacity]").each(function() {
        $(this).data('opacity', $(this).css('opacity'));
        var url = $(this).attr('data-opacity');
        $(this).css('opacity', url)
    });



    window.sr = ScrollReveal({ reset: false });


    sr.reveal('.block-reveal', {
        viewFactor: 0.5
    });
    sr.reveal('.text-block', {
        viewFactor: 0.5
    });

    $.fn.visible = function(partial) {

        var $t = $(this),
            $w = $(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

    };

    var allMods = $(".block-reveal");

    allMods.each(function(i, el) {
        var el = $(el);
        if (el.visible(true)) {
            el.addClass("already-visible");
        }
    });

    $(window).scroll(function(event) {
        allMods.each(function(i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("block-reveal-inner");
            }
        });
    });

    $(window).scroll(function(event) {
        allMods.each(function(i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("block-reveal-inner");
            }
        });
    });

    /*==============================
        Radial Progress
    ================================*/

    $('.radial-progress').waypoint(function() {
        $('.radial-progress').easyPieChart({
            lineWidth: 5,
            scaleLength: 0,
            rotate: -45,
            trackColor: false,
            lineCap: 'square',
            size: 200
        });

    }, {
        triggerOnce: true,
        offset: 'bottom-in-view'
    });

    /*==============================
        Price Slider Active
    ================================*/

    $('#slider-range').slider({
        range: true,
        min: 10,
        max: 500,
        values: [110, 400],
        slide: function(event, ui) {
            $('#amount').val('$' + ui.values[0] + ' - $' + ui.values[1]);
        }
    });
    $('#amount').val('$' + $('#slider-range').slider('values', 0) +
        " - $" + $('#slider-range').slider('values', 1));

    /*===============================
        Quantity
    =================================*/

    $('.pro-qty').prepend('<span class="dec qtybtn">-</span>');
    $('.pro-qty').append('<span class="inc qtybtn">+</span>');
    $('.qtybtn').on('click', function() {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);
    });

    /*==================================
        Google Map Locations
    ======================================*/

    if ($('.google-map-area').length > 0) {
        // Map JS
        var data = [{
            lat: 23.76161,
            lon: 90.4357444,
            title: 'Title A1',
            html: '<h3>Content A1</h3>',
            zoom: 8,
            icon: 'http://www.google.com/mapfiles/markerA.png'
        }, {
            lat: 23.7614699,
            lon: 90.4093081,
            title: 'Title B1',
            html: '<h3>Content B1</h3>',
            zoom: 8,
            icon: 'http://www.google.com/mapfiles/markerA.png'
        }];

        new Maplace({
            locations: data,
            controls_type: 'list',
            controls_on_map: false
        }).Load();
    }

    /*==================================
        Image Comparision
    ======================================*/

    $('.comparision-slider').each(function() {
        var cur = $(this);
        // Adjust the slider
        var width = cur.width() + 'px';
        cur.find('.resize img').css('width', width);
        // Bind dragging events
        drags(cur.find('.handle'), cur.find('.resize'), cur);
    });

    // Update sliders on resize. 

    $(window).resize(function() {
        $('.comparision-slider').each(function() {
            var cur = $(this);
            var width = cur.width() + 'px';
            cur.find('.resize img').css('width', width);
        });
    });



}(jQuery));

/*==================================
    Image Comparsion Function
======================================*/

function drags(dragElement, resizeElement, container) {

    // Initialize the dragging event on mousedown.
    dragElement.on('mousedown touchstart', function(e) {

        dragElement.addClass('draggable');
        resizeElement.addClass('resizable');

        // Check if it's a mouse or touch event and pass along the correct value
        var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

        // Get the initial position
        var dragWidth = dragElement.outerWidth(),
            posX = dragElement.offset().left + dragWidth - startX,
            containerOffset = container.offset().left,
            containerWidth = container.outerWidth();

        // Set limits
        minLeft = containerOffset + 10;
        maxLeft = containerOffset + containerWidth - dragWidth - 10;

        // Calculate the dragging distance on mousemove.
        dragElement.parents().on("mousemove touchmove", function(e) {

            // Check if it's a mouse or touch event and pass along the correct value
            var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

            leftValue = moveX + posX - dragWidth;

            // Prevent going off limits
            if (leftValue < minLeft) {
                leftValue = minLeft;
            } else if (leftValue > maxLeft) {
                leftValue = maxLeft;
            }

            // Translate the handle's left value to masked divs width.
            widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + '%';

            // Set the new values for the slider and the handle. 
            // Bind mouseup events to stop dragging.
            $('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function() {
                $(this).removeClass('draggable');
                resizeElement.removeClass('resizable');
            });
            $('.resizable').css('width', widthValue);

        }).on('mouseup touchend touchcancel', function() {
            dragElement.removeClass('draggable');
            resizeElement.removeClass('resizable');
        });
        e.preventDefault();
        e.stopPropagation();
    }).on('mouseup touchend touchcancel', function(e) {
        dragElement.removeClass('draggable');
        resizeElement.removeClass('resizable');
    });
}