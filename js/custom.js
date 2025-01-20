/*-------------------------------------------------
Project:	i-Fact
Author:     Webstrot
Copyright © 2019-20
----------------------------------------------------*/
/*=================== Custom Functions ====================*/
(function($) {
    "use strict";

    var tpj = jQuery;
    var revapi24;


    // Preloader 
    jQuery(window).on('load', function() {
        jQuery("#status").fadeOut();
        jQuery("#preloader").delay(200).fadeOut("slow");
    });


    // scrolling animation js

    var $winW = function() {
        return $(window).width();
    };
    var $winH = function() {
        return $(window).height();
    };
    var $screensize = function(element) {
        $(element).width($winW()).height($winH());
    };
    var screencheck = function(mediasize) {
        if (typeof window.matchMedia !== "undefined") {
            var screensize = window.matchMedia("(max-width:" + mediasize + "px)");
            if (screensize.matches) {
                return true;
            } else {
                return false;
            }
        } else {
            if ($winW() <= mediasize) {
                return true;
            } else {
                return false;
            }
        }
    };
    $('.animated-row').each(function() {
        var $this = $(this);
        $this.find('.animate').each(function(i) {
            var $item = $(this);
            var animation = $item.data('animate');
            $item.on('inview', function(event, isInView) {
                if (isInView) {
                    setTimeout(function() {
                        $item.addClass('animated ' + animation).removeClass('animate');
                    }, i * 50);
                } else if (!screencheck(767)) {
                    $item.removeClass('animated ' + animation).addClass('animate');
                }
            });
        });
    });


    //---- on ready function ----//
    jQuery(document).ready(function($) {

        $(window).on('scroll', function() {
            var window_top = $(window).scrollTop() + 1;
            if (window_top > 50) {
                $('.header').addClass('menu_fixed animated fadeInDown');
            } else {
                $('.header').removeClass('menu_fixed animated fadeInDown');
            }
        });

        //----------------------- kidder MENU FIXED JS -----------------------//
        $(window).on('scroll', function() {
            var window_top = $(window).scrollTop() + 1;
            if (window_top > 50) {
                $('.kid_header').addClass('kid_menu_fixed animated fadeInDown');
            } else {
                $('.kid_header').removeClass('kid_menu_fixed animated fadeInDown');
            }
        });


        //-----Single page scroll js for main menu -----//

        $('.menu_scroll ul li a').on('click', function(e) {
            $('.menu_scroll ul li').removeClass('active');
            $(this).parent().addClass('active');
            var target = $('[data-scroll=' + $(this).attr('href') + ']');
            e.preventDefault();
            var targetHeight = target.offset().top - parseInt('94');
            $('html, body').animate({
                scrollTop: targetHeight
            }, 1000);
        });

        $(window).on('scroll', function() {
            var windscroll = $(window).scrollTop();
            var target = $('.menu_scroll ul li');
            if (windscroll >= 0) {
                $('[data-scroll]').each(function(i) {
                    if ($(this).position().top <= windscroll + 94) {
                        target.removeClass('active');
                        target.eq(i).addClass('active');
                    }
                });
            } else {
                target.removeClass('active');
                $('.menu_scroll ul li:first').addClass('active');
            }

        });



        /*--- Responsive Menu Start ----*/

        $("#toggle").on("click", function() {
            var w = $('#sidebar').width();
            var pos = $('#sidebar').offset().left;

            if (pos == 0) {
                $("#sidebar").animate({
                    "left": -500
                }, "slow");
            } else {
                $("#sidebar").animate({
                    "left": "0"
                }, "slow");
            }

        });

        $("#toggle_close").on("click", function() {
            var w = $('#sidebar').width();
            var pos = $('#sidebar').offset().left;

            if (pos == 0) {
                $("#sidebar").animate({
                    "left": -500
                }, "slow");
            } else {
                $("#sidebar").animate({
                    "left": "0"
                }, "slow");
            }

        });


        (function($) {
            $(window).on('load', function() {
                $('#cssmenu li.active').addClass('open').children('ul').show();
                $('#cssmenu li.has-sub>a').on('click', function() {
                    $(this).removeAttr('href');
                    var element = $(this).parent('li');
                    if (element.hasClass('open')) {
                        element.removeClass('open');
                        element.find('li').removeClass('open');
                        element.find('ul').slideUp(200);
                    } else {
                        element.addClass('open');
                        element.children('ul').slideDown(200);
                        element.siblings('li').children('ul').slideUp(200);
                        element.siblings('li').removeClass('open');
                        element.siblings('li').find('li').removeClass('open');
                        element.siblings('li').find('ul').slideUp(200);
                    }
                });

            });
        })(jQuery);

        /*--- Responsive Menu End ----*/


        /*--- kidder Responsive Menu Start ----*/

        $("#kid_toggle").on("click", function() {
            var w = $('#kid_sidebar').width();
            var pos = $('#kid_sidebar').offset().left;

            if (pos == 0) {
                $("#kid_sidebar").animate({
                    "left": -500
                }, "slow");
            } else {
                $("#kid_sidebar").animate({
                    "left": "0"
                }, "slow");
            }

        });

        $("#kid_toggle_close").on("click", function() {
            var w = $('#kid_sidebar').width();
            var pos = $('#kid_sidebar').offset().left;

            if (pos == 0) {
                $("#kid_sidebar").animate({
                    "left": -500
                }, "slow");
            } else {
                $("#kid_sidebar").animate({
                    "left": "0"
                }, "slow");
            }

        });


        (function($) {
            $(window).on('load', function() {

                $('#kid_cssmenu li.active').addClass('open').children('ul').show();
                $('#kid_cssmenu li.has-sub>a').on('click', function() {
                    $(this).removeAttr('href');
                    var element = $(this).parent('li');
                    if (element.hasClass('open')) {
                        element.removeClass('open');
                        element.find('li').removeClass('open');
                        element.find('ul').slideUp(200);
                    } else {
                        element.addClass('open');
                        element.children('ul').slideDown(200);
                        element.siblings('li').children('ul').slideUp(200);
                        element.siblings('li').removeClass('open');
                        element.siblings('li').find('li').removeClass('open');
                        element.siblings('li').find('ul').slideUp(200);
                    }
                });

            });
        })(jQuery);

        /*--- kidder Responsive Menu End ----*/


        //----- Main Slider Animation  -------//

        (function($) {

            //Function to animate slider captions 
            function doAnimations(elems) {
                //Cache the animationend event in a variable
                var animEndEv = 'webkitAnimationEnd animationend';

                elems.each(function() {
                    var $this = $(this),
                        $animationType = $this.data('animation');
                    $this.addClass($animationType).one(animEndEv, function() {
                        $this.removeClass($animationType);
                    });
                });
            }

            //Variables on page load 
            var $myCarousel = $('#carousel-example-generic'),
                $firstAnimatingElems = $myCarousel.find('.carousel-item:first').find("[data-animation ^= 'animated']");

            //Initialize carousel 
            $myCarousel.carousel();

            //Animate captions in first slide on page load 
            doAnimations($firstAnimatingElems);

            //Pause carousel  
            $myCarousel.carousel('pause');


            //Other slides to be animated on carousel slide event 
            $myCarousel.on('click slide.bs.carousel', function(e) {
                var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
                doAnimations($animatingElems);
            });


        })(jQuery);


        //-----------kidder Search box jquery------------//

        $(".kid_searchd").on("click", function() {
            $(".kid_searchbox").addClass("open", 1000);
        });

        $(".close").on("click", function() {
            $(".kid_searchbox").removeClass("open", 1000);
        });


        //*-----testimonial_slider_wrapper js ------*//


       

        /***----- massage slider js ----*****/
		



            $('.kid_pn_slider_wraper .owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
                autoplay: true,
                responsiveClass: true,
                smartSpeed: 1200,
                navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                responsive: {
                    0: {
                        items: 1,
                        nav: true
                    },
                    500: {
                        items: 2,
                        nav: true
                    },
                    700: {
                        items: 3,
                        nav: true
                    },
                    1000: {
                        items: 5,
                        nav: true,
                        loop: true,
                        margin: 20
                    }
                }
            })


        //*********** vertical slider ***********//	 	
        $(".kid_album_slider").bxSlider({
            minSlides: 1,
            maxSlides: 11,
            slideWidth: 274,
            ticker: true,
            tickerHover: true,
            speed: 20000,
            useCSS: false,
            pager: false,
            infiniteLoop: false

        });


        //*-----------------------owl caouresel Team---------------------------*//	
            $('.kid_testimonial_slider_wrapper .owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
                autoplay: true,
                responsiveClass: true,
                smartSpeed: 1200,
                navText: ['<i class="flaticon-left-arrow"></i>', '<i class="flaticon-right-arrow"></i>'],
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 1
                    },
                    1000: {
                        items: 1
                    }
                }
            })



        //Video Play
        $('.bussi_play_trigger').magnificPopup({
            type: 'iframe'
        });
        $.extend(true, $.magnificPopup.defaults, {
            iframe: {
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: 'http://www.youtube.com/embed/%id%?autoplay=1'
                    }
                }
            }
        });

        //Video Play
        $('.const_play_trigger').magnificPopup({
            type: 'iframe'
        });
        $.extend(true, $.magnificPopup.defaults, {
            iframe: {
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: 'http://www.youtube.com/embed/%id%?autoplay=1'
                    }
                }
            }
        });

        $('.kid_zoom_popup').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item.el.attr('title') + '<small></small>';
                }
            }
        });

        // ===== Scroll to Top ==== //
        $(window).on('scroll', function() {
            if ($(this).scrollTop() >= 100) {
                $('#return-to-top').fadeIn(200);
            } else {
                $('#return-to-top').fadeOut(200);
            }
        });
        $('#return-to-top').on('click', function(e) {
            $('body,html').animate({
                scrollTop: 0
            }, 500);
        });


    });

})(jQuery);
/*=============== End Custom Functions  ================*/
