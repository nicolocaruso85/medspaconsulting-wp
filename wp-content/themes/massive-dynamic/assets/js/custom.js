var $ = jQuery,
    scrollFlag = 0,

    navColor = themeOptionValues.navColor,
    navHoverColor = themeOptionValues.navHoverColor,

    navColorSecond = themeOptionValues.navColorSecond,
    navHoverColorSecond = themeOptionValues.navHoverColorSecond,

    type = themeOptionValues.headerBgColorType,
    color1 = themeOptionValues.headerBgGradientColor1,
    color2 = themeOptionValues.headerBgGradientColor2,
    orientation = themeOptionValues.headerBgGradientOrientation,
    solidColor = themeOptionValues.headerBgSolidColor,

    typeSecond = themeOptionValues.headerBgColorTypeSecond,
    colorSecond1 = themeOptionValues.headerBgGradientSecondColor1,
    colorSecond2 = themeOptionValues.headerBgGradientSecondColor2,
    orientationSecond = themeOptionValues.headerBgGradientSecondOrientation,
    solidColorSecond = themeOptionValues.headerBgSolidColorSecond,

    siteTop = parseInt(themeOptionValues.siteTop),
    showUpAfter = themeOptionValues.showUpAfter,
    showUpStyle = themeOptionValues.showUpStyle,

    classSecond = [],
    classFirst = [],

    headerTopWidth,
    layoutWidth,
    headerWidth,

    backgroundSize,

    logoStyle              = themeOptionValues.logoStyle,
    logoStyleSecond        = themeOptionValues.logoStyleSecond,
    lightLogo              = themeOptionValues.lightLogo,
    darkLogo               = themeOptionValues.darkLogo,

    responsive_functions     = {},
    document_ready_functions     = {},
    orientation_change_functions     = {},
    window_load_functions     = {},
    window_resize_functions     = {};

darkLogo = ('' == darkLogo) ? $('header .logo img').attr('src') : darkLogo;
lightLogo = ('' == lightLogo) ? $('header .logo img').attr('src') : lightLogo;

/*Detect site loading position
 return front-end when load normally(not from customizer)
 return customizer-mb-disable when load from customizer and VC is disable
 return customizer-mb-enable when load from customizer and VC is enable
 return other when not load from customizer (load form iframe)*/
function pixflow_detectPosition() {
    'use strict';

    if (window.self === window.top) {
        return 'front-end';
    } else {
        var $top = top.location.href;
        if ($top.indexOf("customize.php") != -1) {
            if ($('.mBuilder-element').length) {
                return 'customizer-mb-enable';
            } else {
                return 'customizer-mb-disable';
            }
        } else {
            return 'other';
        }
    }
}

function pixflow_gatherHeader() {
    "use strict";

    if (!$('header.top-gather').length) {
        return;
    }
    var $openBtn = $('.top-gather .gather-btn > span'),
        $closeBtn = $('.gather-overlay .gather-btn'),
        $overlay = $('.gather-overlay');


    $openBtn.click(function () {
        var screenHeight = window.innerHeight;

        if (!$overlay.hasClass('active')) {
            //show overlay
            $(window).scrollTop(0);
            $overlay.addClass('active');
            if ($('.row-active').length ) {
                var last_style = $('.row-active').attr('style');
                $('.row-active').addClass('relative-row');
            }
            $(".gather-overlay").css('display', 'block');
            TweenMax.to($(".gather-overlay"), 0.4, {autoAlpha: 0.93});
            TweenMax.to($(".gather-overlay"), 0.6, {
                height: screenHeight,
                startAt: {scale: 1.7},
                scale: 1,
                ease: Cubic.easeOut
            });
            TweenMax.to(['.layout , .layout-container > .color-overlay , .layout-container > .texture-overlay , .layout-container > .bg-image'], .5, {
                scale: 0.9,
                ease: Cubic.easeInOut,
            });


            $('.layout-container').css({'max-height': '100%'});



            $('body > div ').each(function () {
                if ($(this).height() > $(window).height()) {
                    $(this).css('height', $(window).height());
                }
            });
        }
    });

    $closeBtn.click(function () {
        pixflow_closeOverlay();
    });

    $overlay.click(function () {
        pixflow_closeOverlay();
    });


}

function pixflow_closeOverlay() {
    'use strict';

    var $overlay = $('.gather-overlay');

    if ($overlay.hasClass('active')) {
        $overlay.removeClass('active');
        $(".gather-overlay").css('display', 'none');
        TweenMax.to($(".gather-overlay"), 0.5, {scale: 1.6, autoAlpha: 0, ease: Cubic.easeInOut});
        TweenMax.to(['.layout , .layout-container > .color-overlay , .layout-container > .texture-overlay , .layout-container > .bg-image'], 0.5, {
            scale: 1,
            ease: Cubic.easeInOut,
            onComplete: function () {
                $('.layout').css('transform', 'none');
                $('.layout-container').css({'overflow': '', 'max-height': ''});
            }
        });
        if($('.row-active').length){
            $('.row-active').removeClass('relative-row');
        }
    }

}

function pixflow_headerSideModernFooterHover() {
    'use strict';
    var $footerSwitch = $('.footer .info > a'),
        $footerContent = $footerSwitch.siblings('.footer-content'),
        $socials = $footerContent.find('.footer-socials'),
        $copyright = $footerContent.find('.copyright'),
        $copyAnimation, $socialAnimation;


    $footerContent.css({width: ($socials.outerWidth(true) + $copyright.outerWidth(true)), display: 'none'});

    $footerSwitch.hoverIntent(function () {

        $footerContent.css('display', 'block');
        $socialAnimation = TweenMax.to($socials, .1, {transform: 'perspective(1000px) rotateY(0deg)', opacity: 1});
        $copyAnimation = TweenMax.to($copyright, .3, {
            transform: 'perspective(1000px) rotateY(0deg)',
            opacity: 1,
            delay: 0.2,
            ease: Back.easeOut
        });
    }, function () {
        //don't remove this
    });

    $('.footer').hover(function () {
        "use strict";
        //this one too :)
    }, function () {
        "use strict";
        if ((typeof $socialAnimation != "undefined") && (typeof $copyAnimation != "undefined")) {
            $socialAnimation.pause();
            $copyAnimation.pause();
        }

        if ($(this).parents('header').hasClass('left')) { //Left header

            TweenMax.to($copyright, .1, {transform: 'perspective(1000px) rotateY(90deg)', opacity: 0});
            TweenMax.to($socials, .1, {transform: 'perspective(1000px) rotateY(90deg)', opacity: 0, delay: .2});

        } else if ($(this).parents('header').hasClass('right')) { //Right header
            TweenMax.to($copyright, .1, {transform: 'perspective(1000px) rotateY(-90deg)', opacity: 0});
            TweenMax.to($socials, .1, {transform: 'perspective(1000px) rotateY(-90deg)', opacity: 0, delay: .2});
        }

        TweenMax.to($footerContent, .1, {display: 'block', delay: .2});
    });

    //Footer social icons hover
    var $socialIcon = $socials.find('.icon');

    $socialIcon.each(function () {

        var defaultIcon = $(this).find('span.default'),
            hoverIcon = $(this).find('span.hover');

        $(this).hover(function () {
            TweenMax.to(defaultIcon, 0.55, {top: "50px", opacity: 0, ease: Cubic.easeInOut});
            TweenMax.to(hoverIcon, 0.55, {top: "0", opacity: 1, ease: Cubic.easeInOut});
        }, function () {
            TweenMax.to(defaultIcon, 0.55, {top: "0", opacity: 1, ease: Cubic.easeInOut});
            TweenMax.to(hoverIcon, 0.55, {top: "-50px", opacity: 0, ease: Cubic.easeInOut});
        })
    });
}

function pixflow_headerSideModern() {
    "use strict";
    var $nav = $('header.side-modern nav'),
        $lis = $nav.find('> ul > li'),
        liCount = 1,
        navWidth = 'auto',
        longestMenu = 1,
        style1 = $('header.side-modern .content').hasClass('style-style1'),
        flip0Animation = new TimelineMax(),
        $flip0, $flip1, $flip2, count, modernEffect, $aHeight, navHeight;

    if (!$('header.side-modern').length)
        return;

    if (style1) {
        $lis = $nav.find('ul');
    }
    else {
        liCount = $lis.length;
        navWidth = ( liCount > 3 ) ? 200 * 3 : liCount * 200;
    }

    $nav.css('width', navWidth);

    if (liCount % 3 != 0 && liCount > 3) {

        count = 3 - liCount % 3,
            i = 0;

        for (i = 0; i < count; i++) {
            $nav.find('> ul').append('<li class="empty-dropdown" ></li>')
        }

        $lis = $nav.find('> ul > li');
    }

    // add flip class
    $lis.each(function (index, value) {
        var liClass = 'flip' + index % 3;
        $(value).addClass(liClass);

        if (index / 3 >= 1 && !style1) {
            $(value).addClass('li-level2');
        }
    });

    //make dropdowns equal height
    if (!style1) {

        $nav.find('> ul > li.has-dropdown > .dropdown').each(function () {
            var currentLength = (jQuery)(this).find('> li').length;

            if (currentLength > longestMenu) {
                longestMenu = currentLength;
            }
        });
        $nav.find('> ul > li.has-dropdown > .dropdown').each(function () {
            var $dropdown = (jQuery)(this);
            var currentLength = $dropdown.find('> li').length;
            if (currentLength < longestMenu) {
                for (var i = 1; i <= longestMenu - currentLength; i++) {
                    $dropdown.append('<li class="empty-megamenu"></li>');
                }
            }
        });

        $nav.css({'display': 'block'});
        $aHeight = $lis.find(' > a').height();
        navHeight = parseInt($aHeight + 15) * longestMenu + 20;
        $lis.css('height', navHeight + 'px');
        $nav.css({'display': 'none'});
    }

    $flip0 = $nav.find('.flip0');
    $flip1 = $nav.find('.flip1');
    $flip2 = $nav.find('.flip2');

    modernEffect = new TimelineMax({paused: true});
    modernEffect.add(TweenMax.staggerTo([$flip0, $flip1, $flip2], .3, {
        transform: 'perspective(1000px) rotateY(0deg)',
        opacity: 1,
        ease: Power4.easeOut,
        delay: 0
    }, .1));

    var modernEffectStyle1 = new TimelineMax({paused: true});
    modernEffectStyle1.add(TweenMax.staggerTo($flip0, .3, {
        transform: 'perspective(1000px) rotateY(0deg)',
        opacity: 1,
        ease: Power4.easeOut,
        delay: 0
    }, .1));


    $('.side-modern .nav-modern-side').hoverIntent({
        interval: 200,
        over: pixflow_modernUlOpen,
        out: pixflow_modernUlClose
    });

    $('header.side-modern .style-style1.side nav.navigation ul li.has-dropdown').hover(
        function () {
            TweenMax.staggerTo($(this).find('> ul[class *= "flip"]'), .3, {
                transform: 'perspective(1000px) rotateY(0deg)',
                opacity: 1,
                ease: Power4.easeOut,
                delay: 0
            }, .1);
        },
        function () {
            TweenMax.staggerTo($(this).find('> ul[class *= "flip"]'), .3, {
                transform: 'perspective(1000px) rotateY(90deg)',
                opacity: 0,
                ease: Power4.easeOut,
                delay: 0
            }, .1);
        }
    );

    function pixflow_modernUlOpen() {
        'use strict';
        $(this).find('nav').css({'display': 'block'});
        if (style1) {
            modernEffectStyle1.restart()
        } else {
            modernEffect.restart();
        }
    };

    function pixflow_modernUlClose() {
        "use strict";

        if ($(this).parents('header.left').length || $(this).parents('header.right').length) {
            modernEffect.reverse();
            modernEffectStyle1.reverse();
        }

        TweenMax.to($(this).find('nav'), 0, {display: 'none', delay: .7});
    };


    /********************************************************************* Footer Hover *************************************************************************************/
    pixflow_headerSideModernFooterHover();

    /************************************************************* menu icons pack and search icon hover animation ************************************************/
    var $icons = $('header.side-modern .icons-pack .icon');

    $icons.each(function () {
        var defaultIcon = $(this).find('span.default'),
            hoverIcon = $(this).find('span.hover'),
            defaultColor = $icons.find('a').css('color'),
            hoverColor;

        if (typeof defaultColor != "undefined") {
            hoverColor = pixflow_rgbVal(defaultColor);
            hoverColor = "rgba(" + hoverColor + ",0.1)";
        }

        $(this).hover(function () {
            if ($(this).parents('header').hasClass('left')) { //Left header

                //opening the search form
                if ($(this).hasClass('search')) {

                    $(this).find('.search-form').css('display', 'block');
                    TweenMax.to($(this).find('.search-form'), .4, {
                        transform: 'perspective(1000px) rotateY(0deg)',
                        opacity: 1
                    });

                }

                TweenMax.to(defaultIcon, 0.55, {left: "65px", opacity: 0, ease: Cubic.easeInOut});
                TweenMax.to(hoverIcon, 0.55, {left: "0", opacity: 1, ease: Cubic.easeInOut});
                TweenMax.to($(this).find('a'), 0.3, {backgroundColor: hoverColor});

            } else if ($(this).parents('header').hasClass('right')) { //Right header

                //opening the search form
                if ($(this).hasClass('search')) {
                    $(this).find('.search-form').css('display', 'block');
                    TweenMax.to($(this).find('.search-form'), .4, {
                        transform: 'perspective(1000px) rotateY(0deg)',
                        opacity: 1
                    });
                }

                TweenMax.to(defaultIcon, 0.55, {right: "65px", opacity: 0, ease: Cubic.easeInOut});
                TweenMax.to(hoverIcon, 0.55, {right: "0", opacity: 1, ease: Cubic.easeInOut});
                TweenMax.to($(this).find('a'), 0.3, {backgroundColor: hoverColor});
            }


        }, function () {
            if ($(this).parents('header').hasClass('left')) { //Left header

                //closing the search form
                if ($(this).hasClass('search')) {
                    TweenMax.to($(this).find('.search-form'), .2, {
                        transform: 'perspective(1000px) rotateY(90deg)',
                        opacity: 0
                    });
                    TweenMax.to($(this).find('.search-form'), .1, {display: 'none', delay: .15});
                }
                TweenMax.to(defaultIcon, 0.55, {left: "0", opacity: 1, ease: Cubic.easeInOut});
                TweenMax.to(hoverIcon, 0.55, {left: "-65px", opacity: 0, ease: Cubic.easeInOut});
                TweenMax.to($(this).find('a'), 0.3, {backgroundColor: 'transparent'});
            } else if ($(this).parents('header').hasClass('right')) { //Right header

                //closing the search form
                if ($(this).hasClass('search')) {
                    TweenMax.to($(this).find('.search-form'), .2, {
                        transform: 'perspective(1000px) rotateY(-90deg)',
                        opacity: 0
                    });
                    TweenMax.to($(this).find('.search-form'), .1, {display: 'none', delay: .15});
                }
                TweenMax.to(defaultIcon, 0.55, {right: "0", opacity: 1, ease: Cubic.easeInOut});
                TweenMax.to(hoverIcon, 0.55, {right: "-65px", opacity: 0, ease: Cubic.easeInOut});
                TweenMax.to($(this).find('a'), 0.3, {backgroundColor: 'transparent'});
            }
        })
    });

    /************************************************* menu navigation button hover animation *****************************************************************/
    var $icon = $('header.side-modern .nav-modern-button');

    var navDefaultIcon = $icon.find('span.default'),
        navHoverIcon = $icon.find('span.hover'),
        navDefaultColor = navDefaultIcon.css('color'),
        navHoverColor;

    if (typeof navDefaultColor != "undefined") {
        navHoverColor = pixflow_rgbVal(navDefaultColor);
        navHoverColor = "rgba(" + navHoverColor + ",0.1)";
    }

    $icon.hover(function () {
        if ($(this).parents('header').hasClass('left')) { //Left header

            TweenMax.to(navDefaultIcon, 0.55, {left: "65px", opacity: 0, ease: Cubic.easeInOut});
            TweenMax.to(navHoverIcon, 0.55, {left: "0", opacity: 1, ease: Cubic.easeInOut});
            TweenMax.to($icon, 0.3, {backgroundColor: navHoverColor});

        } else if ($(this).parents('header').hasClass('right')) { //Right header

            TweenMax.to(navDefaultIcon, 0.55, {right: "65px", opacity: 0, ease: Cubic.easeInOut});
            TweenMax.to(navHoverIcon, 0.55, {right: "0", opacity: 1, ease: Cubic.easeInOut});
            TweenMax.to($icon, 0.3, {backgroundColor: navHoverColor});
        }
    }, function () {
        if ($(this).parents('header').hasClass('left')) { //Left header

            TweenMax.to(navDefaultIcon, 0.55, {left: "0", opacity: 1, ease: Cubic.easeInOut});
            TweenMax.to(navHoverIcon, 0.55, {left: "-65px", opacity: 0, ease: Cubic.easeInOut});
            TweenMax.to($icon, 0.3, {backgroundColor: 'transparent'});

        } else if ($(this).parents('header').hasClass('right')) { //Right header
            TweenMax.to(navDefaultIcon, 0.55, {right: "0", opacity: 1, ease: Cubic.easeInOut});
            TweenMax.to(navHoverIcon, 0.55, {right: "-65px", opacity: 0, ease: Cubic.easeInOut});
            TweenMax.to($icon, 0.3, {backgroundColor: 'transparent'});
        }
    });

}

//menuClassicAnimation()
function pixflow_underlineAnimation() {
    'use strict';

    var TM = TweenMax,
        $selector = $('header.top-classic .top:not(.style-border) nav > ul > li > a,' +
            'header.top-logotop  nav > ul > li > a');

    if (!$selector.length)
        return;

    $selector.each(function () {
        $(this).unbind('mouseenter mouseleave');
        if ($(this).parents('.content').hasClass('style-wireframe')) {
            $(this).hover(function () {
                TM.to($(this).find(' > .menu-separator'), 0.15, {width: "100%", ease: Power1.easeInOut});
            }, function () {
                TM.to($(this).find(' > .menu-separator'), 0.15, {width: "22px", ease: Power1.easeInOut});
            })
        } else { // Other Classic top styles
            $(this).find(' > .menu-separator').css('width', 'auto');
            $(this).find(' > .menu-title .title').css('line-height', 'normal');
            $(this).hover(function () {
                TM.to($(this).find(' > .menu-separator'), 0.2, {left: "0", ease: Back.easeOut});
                TM.to($(this).find(' > .menu-separator'), 0.2, {right: "0", ease: Back.easeOut});
            }, function () {
                TM.to($(this).find(' > .menu-separator'), 0.5, {left: "50%", ease: Back.easeOut});
                TM.to($(this).find(' > .menu-separator'), 0.5, {right: "50%", ease: Back.easeOut});
            })
        }
    });
}

function pixflow_classicTopWireframeStyle() {
    if (!$('header.top-classic .content').hasClass('style-wireframe')) return;

    $('header.top-classic .style-wireframe nav > ul > li > a .menu-title .title').css('line-height', $('header').height() + 'px');
    $('header.top-classic .style-wireframe nav > ul > li > .dropdown').css('top', $('header').height() + 'px');
}

function pixflow_menuTopBlockSquare() {
    'use strict';

    var TMB = TweenMax;

    //Menu Block style hover animation
    $('.top-block:not(.header-clone) .style-style2 nav > ul > li , .top-block:not(.header-clone) .style-style2 .icons-pack li').each(function () {
        var $this = $(this);

        $this.hover(function () {
            TMB.to($this.find('> a .menu-separator-block'), 1, {bottom: "3px", ease: Elastic.easeOut});
            TMB.to($this.find('> a .menu-separator-block'), 0.9, {height: "3px", ease: Quart.easeOut});
            TMB.to($this.find('> a .menu-separator-block'), 0.1, {opacity: "1"});

            TMB.to($this.find('.hover-effect'), 0.5, {opacity: "1", marginTop: "80px"}); // for menu
            TMB.to($this.find('.hover-content'), 0.5, {opacity: "1", marginTop: "80px"}); // for icons pack
        }, function () {
            TMB.to($this.find('.hover-effect'), 0.2, {opacity: "0", marginTop: "0"}); // for menu
            TMB.to($this.find('.hover-content'), 0.2, {opacity: "0", marginTop: "0"}); // for icons pack

            TMB.to($this.find('> a .menu-separator-block'), 0.8, {bottom: "-10px"});
            TMB.to($this.find('> a .menu-separator-block'), 0.4, {height: "6px"});
            TMB.to($this.find('> a .menu-separator-block'), 1, {opacity: "0"});
        });

    });
}

function pixflow_menuTopBlockRec() {
    'use strict';

    var $header = $('header.top-block'),
        $style1 = $header.find('.style-style1'),
        $menu = $style1.find('nav > ul > li'),
        $iconsPack = $style1.find('.icons-pack li'),
        $menuFront = $menu.find('> a .menu-title'),
        $iconsFront = $iconsPack.find('.title-content'),
        $arrayTemp = [],
        counter = 0;

    //if ($menu.length) {

    // Menu navigation
    $menu.each(function () {
        $arrayTemp[counter] = $(this).css('width');
        counter++;
    });

    $menuFront.css({position: 'absolute'});
    counter = 0;

    $menu.each(function () {
        $(this).css({width: $arrayTemp[counter]});
        counter++;
    });

    $arrayTemp = [];
    counter = 0;

    // Icons pack
    $iconsPack.each(function () {
        $arrayTemp[counter] = $(this).css('width');
        counter++;
    });

    $header.css({overflow: 'inherit'});
    $iconsFront.css({position: 'absolute'});
    counter = 0;

    $iconsPack.each(function () {
        $(this).css({width: $arrayTemp[counter]});
        counter++;
    });

    //} // end if

}

/*
 Generate Gradient Background
 Get 2color and Orientation
 Return background style
 */
function pixflow_generateGradientBackground(color1, color2, orientation, colorSecond1, colorSecond2, orientationSecond) {
    "use strict";

    var bg_css = [];

    bg_css[0] = color1;

    if (orientation == "horizontal") {
        bg_css[1] = "-moz-linear-gradient(left," + color1 + " 0%," + color2 + "33%," + colorSecond1 + " 77%," + colorSecond2 + " 100%)";
        bg_css[2] = "-webkit-gradient(linear, left top, right top, color-stop(0%," + color1 + "), color-stop(33%," + color2 + "),color-stop(77%," + colorSecond1 + "),color-stop(100%," + colorSecond2 + "))";
        bg_css[3] = "-webkit-linear-gradient(left," + color1 + " 0%," + color2 + "33%," + colorSecond1 + " 77%," + colorSecond2 + " 100%)";
        bg_css[4] = "-o-linear-gradient(left, " + color1 + " 0%," + color2 + "33%," + colorSecond1 + " 77%," + colorSecond2 + " 100%)";
        bg_css[5] = "-ms-linear-gradient(left,  " + color1 + " 0%," + color2 + "33%," + colorSecond1 + " 77%," + colorSecond2 + " 100%)";
        bg_css[6] = "linear-gradient(to right, " + color1 + " 0%," + color2 + "33%," + colorSecond1 + " 77%," + colorSecond2 + " 100%)";
        bg_css[7] = "progid:DXImageTransform.Microsoft.gradient(startColorstr='" + color1 + "', endColorstr='" + color2 + "', GradientType=0)";

    } else {
        bg_css[1] = "-moz-linear-gradient(top," + color1 + " 0%," + color2 + "33%," + colorSecond1 + " 77%," + colorSecond2 + " 100%)";
        bg_css[2] = "-webkit-gradient(linear, left top, left bottom, color-stop(0%," + color1 + "), color-stop(33%," + color2 + "),color-stop(77%," + colorSecond1 + "),color-stop(100%," + colorSecond2 + "))";
        bg_css[3] = "-webkit-linear-gradient(top,  " + color1 + " 0%," + color2 + " 33%," + colorSecond1 + " 66%," + colorSecond2 + " 100%)";
        bg_css[4] = "-o-linear-gradient(top,  " + color1 + " 0%," + color2 + " 33%," + colorSecond1 + " 77%," + colorSecond2 + " 100%)";
        bg_css[5] = "-ms-linear-gradient(top,  " + color1 + " 0%," + color2 + " 33%," + colorSecond1 + " 77%," + colorSecond2 + " 100%)";
        bg_css[6] = "linear-gradient(to bottom, " + color1 + " 0%," + color2 + " 33%," + colorSecond1 + " 77%," + colorSecond2 + " 100%)";
        bg_css[7] = "progid:DXImageTransform.Microsoft.gradient(startColorstr='" + color1 + "', endColorstr='" + color2 + "', GradientType=0)";
    }
    return bg_css;
}

/*
 Generate Solid Background
 Get 1color
 Return background style
 */
function pixflow_generateSolidBackground(solidColor) {
    "use strict";

    var bg_css = [];

    if ($('header.top-block').length) {
        bg_css[0] = pixflow_RgbaToRgb(solidColor);
    } else {
        bg_css[0] = solidColor;
    }
    return bg_css;
}

function pixflow_showHeaderChanges() {
    "use strict";

    scrollFlag = 0;
    pixflow_headerSetting();
    $(window).scroll();
}

//if setting change in customizer applied here
function pixflow_headerSetting() {
    "use strict";

    var newStyle;

    if ($('.header-second-setting').length) {

        navColor = $('#navColor').val();
        navHoverColor = $('#navHoverColor').val();
        solidColor = $('#bgSolidColor').val();
        color1 = $('#bgGradientColor1').val();
        color2 = $('#bgGradientColor2').val();
        orientation = $('#bgGradientOrientation').val();

        navColorSecond = $('#navColorSecond').val();
        navHoverColorSecond = $('#navHoverColorSecond').val();
        solidColorSecond = $('#bgSolidColorSecond').val();
        colorSecond1 = $('#bgGradientSecondColor1').val();
        colorSecond2 = $('#bgGradientSecondColor2').val();
        orientationSecond = $('#bgGradientSecondOrientation').val();

        siteTop = $('#headerSiteTop').val();
        siteTop = siteTop.split("px");
        siteTop = parseInt(siteTop[0]);

        showUpAfter = parseInt($('#showUpAfter').val());

        layoutWidth = parseInt($('#layoutWidth').val());
        headerTopWidth = parseInt($('#headerTopWidth').val());
        headerWidth = (headerTopWidth / 100 * layoutWidth / 100) * 100 + '%';

        logoStyle = $('#logoStyle').val().trim();
        logoStyleSecond = $('#logoStyleSecond').val().trim();
        if (type == 'gradient' || typeSecond == 'gradient') {
            if (type != 'gradient') {
                color2 = color1 = solidColor;
                orientation = orientationSecond;
            }
            if (typeSecond != 'gradient') {
                colorSecond2 = colorSecond1 = solidColorSecond;
                orientationSecond = orientation;
            }

            classFirst = pixflow_generateGradientBackground(color1, color2, orientation, colorSecond1, colorSecond2, orientationSecond);
            classSecond = classFirst;
        } else {
            classFirst = pixflow_generateSolidBackground(solidColor);
            classSecond = pixflow_generateSolidBackground(solidColorSecond);
        }

        if (orientation == 'horizontal')
            backgroundSize = '400% 400%';
        else
            backgroundSize = '100% 400%';
    }

    newStyle = "<style data-name='second-setting'>" +
        "header.top-modern .btn-1b-second:after{ background : " + navColorSecond + "}" +
        "header.top-modern .btn-1b-second:active{background: " + navColorSecond + "}" +
        "header.top-modern .btn-1b-first:after{ background : " + navColor + "}" +
        "header.top-modern .btn-1b-first:active{background: " + navColor + "}" +
        "header.top-block .color-overlay { background : " + classFirst + "}" +
        "header.top-block:not(.header-clone) .style-style1 nav > ul > li > a .menu-title,header.top-block:not(.header-clone) .style-style1 .icons-pack .title-content,header.top-block:not(.header-clone) .style-style1 .icons-pack .hover-content { background : " + classFirst + "}" +
        "</style>";
    $('style[data-name=second-setting]').remove();
    $('body').append(newStyle);
}

//Header scroll Mode
// @TODO : reengineering
function pixflow_headerStates(){

    "use strict";

    var $window = $(window),
        $header = $('header'),
        $business = $('.layout > .wrap > .business'),
        headerHeight = parseInt($header.height()),
        layoutWidth = parseInt(themeOptionValues.layoutWidth),
        headerTopWidth = parseInt(themeOptionValues.headerTopWidth),
        logoTopHeightFlag = 0,
        headerTop = 0,
        adminBar = 0,
        logoHeight, scrollPos, containerHeight, logoMargin, contentHeight, color, colorSecond, $headerClone, display, $headerTopPos;

    //if we have second header modern top
    if($('.top-modern').length){
        var length=$(".top-modern .btn").length;
        var width='calc(100% / ' + length + ')';
        $(".top-modern .btn").css('width',width);
    }

    if (!$header.find('.top').length) {
        return;
    }
    //make logo image link
    var $logo = $header.find('.content a.logo img');
    if ($logo.length) {
        $logo.click(function () {
            if (typeof pixflow_customizerObj == 'function') {
                pixflow_customizerObj().wp.customize.previewer.previewUrl($(this).attr('data-home-url'));
                return;
            }

            // Check if page is one page or not
            if(window.location.href.indexOf("#") != -1){
                $('html, body').animate({scrollTop: 0}, 600);
                return false;
            }else{
                window.location = $(this).attr('data-home-url');
            }
        });
    }
    headerWidth = (headerTopWidth / 100 * layoutWidth / 100) * 100 + '%';

    // background 1
    if (type == 'gradient' || typeSecond == 'gradient') {

        if (type != 'gradient') {
            color2 = color1 = solidColor;
            orientation = orientationSecond;
        }

        if (typeSecond != 'gradient') {
            colorSecond2 = colorSecond1 = solidColorSecond;
            orientationSecond = orientation;
        }

        color1 = color1 == '' ? color2 : color1;
        color2 = color2 == '' ? color1 : color2;
        colorSecond1 = colorSecond1 == '' ? colorSecond2 : colorSecond1;
        colorSecond2 = colorSecond2 == '' ? colorSecond1 : colorSecond2;

        classFirst = pixflow_generateGradientBackground(color1, color2, orientation, colorSecond1, colorSecond2, orientationSecond);
        classSecond = classFirst;
    }
    else {
        classFirst = pixflow_generateSolidBackground(solidColor);
        classSecond = pixflow_generateSolidBackground(solidColorSecond);
    }

    if (orientation == 'horizontal') {
        backgroundSize = '400% 400%';
    } else {
        backgroundSize = '100% 400%';
    }

    if (themeOptionValues.headerBgSolidColor == 'transparent' || themeOptionValues.headerBgColorType == 'gradient') {
        color = '#000';
    } else {
        color = themeOptionValues.headerBgSolidColor;
    }

    if (themeOptionValues.headerBgSolidColorSecond == 'transparent' || themeOptionValues.headerBgColorTypeSecond == 'gradient') {
        colorSecond = '#000';
    } else {
        colorSecond = themeOptionValues.headerBgSolidColorSecond;
    }

    // if business bar active
    if (themeOptionValues.businessBarEnable == 1 && $('header.top-modern').length < 1) {
        headerTop = 36;
    } else {
        headerTop = 0;
    }

    //line Height For Classic
    $('.top-classic .icons-pack li > a').css('line-height', headerHeight + 'px');
    $('.top-gather .icons-pack li ').css('line-height', headerHeight + 'px');
    $('.top-gather .gather-btn.navigation').css('line-height', headerHeight + 'px');

    if ($('body.admin-bar').length) {
        adminBar = 32;
    }

    if ($('header .top .logo img').css('position') == 'absolute') {
        $('header .top .logo img').css('position', 'relative');
        logoHeight = $('header .top a.logo img').height();
        $('header .top .logo img').css('position', 'absolute');
    } else {
        logoHeight = $('header .top a.logo img').height();
    }

    // if in logotop
    if ($('header.top-logotop').length) {
        logoHeight = $('header.top-logotop a.logo').height();
        containerHeight = $('header.top-logotop .logo-top-container').height();
        logoMargin = $('header.top-logotop .logo-top-container').css('margin-top');
        contentHeight = parseInt(logoHeight) + parseInt(containerHeight) + parseInt(logoMargin) + 20;
        if ((headerHeight * 0.7) < contentHeight)
            logoTopHeightFlag = 1;
        else
            logoTopHeightFlag = 0;
    }
    
    


    // On scroll event for top header styles
    $window.scroll(function () {
        scrollPos = $(this).scrollTop();

        if ($('.header-style2').length >= 1) {

            //if change setting in customizer
            if ($('.header-style2-changed').length) {

                // if in logotop
                if ($('header.top-logotop').length) {
                    logoHeight = $('header.top-logotop a.logo').height();
                    containerHeight = $('header.top-logotop .logo-top-container').height();
                    logoMargin = $('header.top-logotop .logo-top-container').css('margin-top');
                    contentHeight = parseInt(logoHeight) + parseInt(containerHeight) + parseInt(logoMargin) + 20;
                    if ((headerHeight * 0.7) < contentHeight)
                        logoTopHeightFlag = 1;
                    else
                        logoTopHeightFlag = 0;
                }

                headerHeight = parseInt($header.height());
                $('.header-style2-changed').remove();
            }

            if ($('header.top-block').length) {
                classSecond = pixflow_generateSolidBackground(solidColorSecond);
                classFirst = pixflow_generateSolidBackground(solidColor);
            }

            if (scrollPos > headerTop + siteTop) {
                if (scrollFlag == 0) {
                    scrollFlag = 1;

                    //$business.fadeOut();
                    $header.addClass('header-fix');
                    if (typeof pixflow_itemOrderSetter == 'function' && $header.find('.top ').hasClass('ui-sortable')) {
                        pixflow_itemOrderSetter('disable');
                    }

                    if($('.navigation-button').css('display') == 'none') {
                        if (logoStyleSecond == 'dark') {
                            $header.find('.logo img').attr('src', darkLogo);
                        } else {
                            $header.find('.logo img').attr('src', lightLogo);
                        }
                    }

                    $header.css({width: headerWidth + 'px'});

                    if (logoTopHeightFlag == 0 && $('header.top-modern').length < 1 && $('header.top-block').length < 1 && $('header.top-gather .style-style2').length < 1) {
                        $headerTopPos = $header.css('top');

                        if ($('header.top-gather').length) {

                            $header.find('.gather-btn span').stop().animate({
                                padding: '10px'
                            });
                        }
                        if ($('header.top-classic .content').hasClass('style-wireframe')) {
                            TweenMax.to('header.top-classic nav > ul > li > a .menu-title .title', 0.2, {'line-height': (headerHeight * .7)});
                        }
                        pixflow_showSecondHeaderFull('header' , 'move');
                        TweenMax.to(  $('.second-header-bg') , .4 , { top: $('#wpadminbar').length ? '32px' : '0',opacity:1 ,  ease: Power2.easeOut});
                        TweenMax.to( $header.find('.top') , .5 , { height: headerHeight * .7, opacity:1 , ease: Power2.easeOut});

                        if(!$header.hasClass('header-style2')){
                            $header.find('.color-overlay').css('opacity', '0');
                        }
                        TweenMax.to($header , .5 , {height: headerHeight * .7, position: 'fixed', top: $('#wpadminbar').length ? '32px' : '0', color: '#000', ease: Power2.easeOut , onComplete:function(){
                                $('header.top-classic .style-wireframe nav > ul > li > .dropdown').css('top',(headerHeight * .7));
                                classSecond.forEach(function (entry) {
                                    $('header + .second-header-bg ').css('background', entry);
                                });
                                if (typeSecond == 'gradient' || type == 'gradient') {
                                    $('header + .second-header-bg').css({
                                        'background-position': '100% 100%',
                                        'background-size': backgroundSize
                                    });
                                }
                            }});
                        if(logoHeight == 0){
                            logoHeight = $('header .top a.logo img').height();
                        }

                        TweenMax.to($header.find('.logo img'), 0.1, {height: logoHeight * .8});

                        TweenMax.to($('header:not(.header-clone)').find('> .color-overlay'), 0.2, {borderBottomColor: window.top.$('#input_nav_color_second').val()});

                        //line Height For Classic
                        $('.top-classic .icons-pack li,.top-classic .icons-pack li > a').css('line-height', headerHeight * 0.7 + 'px');
                        $('.top-gather .icons-pack li ').css('line-height', headerHeight * 0.7 + 'px');
                        $('.top-gather .gather-btn.navigation').css('line-height', headerHeight * 0.7 + 'px');

                        //check the height of header and set the drop down top
                        if ($('header.top-logotop').length || $('header.top-classic').length) {
                            var navHeight = headerHeight * .7,
                                $link = $('nav > ul > li.has-dropdown > a'),
                                liHeight = 0;

                            if ($link.length > 1) {
                                liHeight = (jQuery)($link.get($link.length - 1)).outerHeight(true) + 20;
                            } else
                                liHeight = $link.outerHeight(true) + 20;


                            if ($('header.top-logotop').length) {
                                (jQuery)('.top-logotop nav > ul > li.has-dropdown > ul').css('top', liHeight + (navHeight - liHeight) / 2 - 37);
                            } else {
                                (jQuery)('.top-classic nav > ul > li.has-dropdown > ul').css('top', liHeight + (navHeight - liHeight) / 2 - 11);
                            }
                        }
                    } else {


                        TweenMax.to($header, 0.2, {
                            position: 'fixed', color: '#000', onComplete: function () {

                                $header.find('.color-overlay').css('opacity', '0');
                                pixflow_showSecondHeaderFull('header');

                                classSecond.forEach(function (entry) {
                                    $('header + .second-header-bg ').css('background', entry);
                                });

                                if (typeSecond == 'gradient' || type == 'gradient') {
                                    $('header + .second-header-bg').css({
                                        'background-position': '100% 100%',
                                        'background-size': backgroundSize
                                    });
                                }
                            }
                        });


                    }

                    $('header .itemorder-handle').css({opacity: 0});
                    if ($('header.top-block').length)
                        $header.animate({'opacity': '0.8'});
                    $header.find('.color-overlay').removeClass('style-first');
                    if ($('header.top-block').length)
                        $header.animate({'opacity': '1'});
                    $header.find('.color-overlay').addClass('style-second');
                    if ($('header.top-block').length < 1)
                        $header.find('.color-overlay').css({'transition': 'background 300ms'});

                    pixflow_headerStateSecond(navColorSecond, navHoverColorSecond, colorSecond, $header, solidColorSecond);
                }

            } else {
                $header.find('.color-overlay').css('opacity', '1');

                TweenMax.to($header.find('> .color-overlay'), 0.2, {borderBottomColor: window.top.$('#input_nav_color').val()});

                if (scrollFlag == 1) {
                    if (scrollPos > adminBar) {
                        return;
                    }
                    scrollFlag = 0;
                    $header.removeClass('header-fix');

                    if (typeof pixflow_itemOrderSetter == 'function' && window.top.$('#customize-preview .collaps').hasClass('hold-collapse') == false && $header.find('.top ').hasClass('ui-sortable')) {
                        pixflow_itemOrderSetter('enable');
                    }

                    $header.css({
                        'width': headerWidth + 'px',
                        'top': $headerTopPos,
                        'position': 'absolute'
                    });

                    if($('.navigation-button').css('display') == 'none') {
                        if (logoStyle == 'dark') {
                            $header.find('.logo img').attr('src', darkLogo);
                        } else {
                            $header.find('.logo img').attr('src', lightLogo);
                        }
                    }

                    if (logoTopHeightFlag == 0 && $('header.top-modern').length < 1 && $('header.top-block').length < 1 && $('header.top-gather .style-style2').length < 1) {
                        if ($('header.top-classic .content').hasClass('style-wireframe')) {
                            TweenMax.to('header.top-classic nav > ul > li > a .menu-title .title', 0.2, {'line-height': headerHeight});
                        }
                        TweenMax.to([$header , $header.find('.top')] , .75 , {height: headerHeight, ease: Power2.easeOut , onComplete: function(){
                                $('header.top-classic .style-wireframe nav > ul > li > .dropdown').css('top',headerHeight);
                            }});

                        TweenMax.to($header.find('.logo img'), 0.1, {height: logoHeight});

                        // $('.second-header-bg').remove();
                        $('.second-header-bg').css('opacity' , '0');

                        //line Height For Classic
                        $('.top-classic .icons-pack li > a').css('line-height', headerHeight + 'px');
                        $('.top-gather .icons-pack li').css('line-height', headerHeight + 'px');
                        $('.top-gather .gather-btn.navigation').css('line-height', headerHeight + 'px');

                        //check the height of header and set the drop down top
                        if ($('header.top-logotop').length || $('header.top-classic').length) {

                            var navHeight = headerHeight,
                                $link = $('nav > ul > li.has-dropdown > a'),
                                liHeight = 0;

                            if ($link.length > 1) {
                                liHeight = $($link.get($link.length - 1)).outerHeight(true) + 20;
                            } else {
                                liHeight = $link.outerHeight(true) + 20;
                            }

                            if ($('header.top-logotop').length) {
                                (jQuery)('.top-logotop nav > ul > li.has-dropdown > ul').css('top', liHeight + (navHeight - liHeight) / 2 - 40);
                            } else {
                                (jQuery)('.top-classic nav > ul > li.has-dropdown > ul').css('top', liHeight + (navHeight - liHeight) / 2 - 11);
                            }

                        }
                    } else {
                        $('.second-header-bg').remove();
                    }

                    $('header .itemorder-handle').css({opacity: 1});
                    if ($('header.top-block').length)
                        $header.animate({'opacity': '0.8'});
                    $header.find('.color-overlay').removeClass('style-second');
                    if ($('header.top-block').length)
                        $header.animate({'opacity': '1'});
                    $header.find('.color-overlay').addClass('style-first');
                    if ($('header.top-block').length < 1)
                        $header.find('.color-overlay').css({'transition': 'background 300ms'});

                    pixflow_headerStateFirst(navColor, navHoverColor, color, $header, solidColor);

                    if (type == 'gradient' || typeSecond == 'gradient')
                        $('header + .second-header-bg').css({
                            'background-position': '0 0',
                            'background-size': backgroundSize
                        });
                }
            }
        } // end of style2

        else if ($('.header-style3').length >= 1) {     //if style 3 select for header top on scroll like scooter

            var headerTopPos = $header.css('top');

            if (showUpAfter <= scrollPos && scrollPos > headerTop + siteTop + headerHeight) { // appear second menu

                if (scrollFlag == 0) {

                    $header.css({opacity: 0});
                    $('header.header-clone').remove();
                    if ($('header.header-clone').length < 1) {
                        $headerClone = $header.clone(true).appendTo($header.parent());
                        $headerClone.addClass('header-clone');

                        $headerClone.find('.color-overlay').addClass('style-second');

                        $headerClone.find('.itemorder-handle').css({opacity: 0});

                        if($('.navigation-button').css('display') == 'none') {
                            if (logoStyleSecond == 'dark') {
                                $headerClone.find('.logo img').attr('src', darkLogo);
                            } else {
                                $headerClone.find('.logo img').attr('src', lightLogo);
                            }
                        }

                        $('header.header-clone').megamenu(1200);

                        scrollPos = parseInt($(this).scrollTop());

                        if ($('header.top-block').length) {
                            classSecond = pixflow_generateSolidBackground(solidColorSecond);
                            classFirst = pixflow_generateSolidBackground(solidColor);
                        }
                        if ($('header[class*=gather]').length) {
                            $headerClone.find('.gather-menu-icon').css('color', navColorSecond);
                            $headerClone.find('.gather-menu-icon').hover(function () {
                                $(this).css('color', navHoverColorSecond);
                            }, function () {
                                $(this).css('color', navColorSecond);
                            })
                        }
                    }

                    if (typeof pixflow_itemOrderSetter == 'function' && $header.find('.top ').hasClass('ui-sortable')) {
                        pixflow_itemOrderSetter('disable');
                    }

                    pixflow_headerSetting();

                    pixflow_headerStateSecond(navColorSecond, navHoverColorSecond, colorSecond, $headerClone, solidColorSecond);
                    scrollFlag = 1;

                    $('header:not(.header-clone) nav > ul > li > .dropdown').css({
                        'opacity': 0,
                        'margin-top': '-15px',
                        'display': 'none'
                    });

                    showUpStyle = window.top.$('#input_show_up_style').val();

                    if (showUpStyle == 'fade_in') {

                        $headerClone.css({
                            'width': headerWidth,
                            top: $('#wpadminbar').length ? '32px' : '0',
                            'position': 'fixed',
                            'z-index': '1000'
                        });

                        if ($('.business ').length)
                            $business.fadeOut();

                        pixflow_showSecondHeaderFull('header.header-clone');

                        classSecond.forEach(function (entry) {

                            $headerClone.siblings('.second-header-bg').css('background', entry);

                        });

                        if (typeSecond == 'gradient') {
                            $headerClone.siblings('.second-header-bg').css({
                                'background-position': '100% 100%',
                                'background-size': backgroundSize
                            });
                        }

                        $headerClone.siblings('.second-header-bg').css({zIndex: 999, 'top': 0});
                        $headerClone.stop().animate({opacity: 1}, 400);
                        $headerClone.siblings('.second-header-bg').stop().animate({opacity: 1}, 400);

                    } else { //if slide in

                        $headerClone.css({
                            'width': headerWidth,
                            'position': 'fixed',
                            'z-index': '1000',
                            opacity: 1,
                            top: -headerHeight
                        });
                        $headerClone.siblings('.second-header-bg').css({top: -headerHeight, opacity: 1});
                        if ($('.business ').length)
                            $business.fadeOut();

                        pixflow_showSecondHeaderFull('header.header-clone');

                        classSecond.forEach(function (entry) {
                            $headerClone.siblings('.second-header-bg').css('background', entry);
                        });

                        if (typeSecond == 'gradient') {

                            $headerClone.siblings('.second-header-bg').css({
                                'background-position': '100% 100%',
                                'background-size': backgroundSize
                            });
                        }

                        $headerClone.siblings('.second-header-bg').css({zIndex: 999});

                        $headerClone.stop().animate({top: $('#wpadminbar').length ? '32px' : '0'}, 400);
                        $headerClone.siblings('.second-header-bg').stop().animate({top: $('#wpadminbar').length ? '32px' : '0'}, 400);
                    }
                    var doIt;
                    $(window).resize(function () {
                        if (doIt) {
                            clearTimeout(doIt)
                        }
                        doIt = setTimeout(function () {
                            if ($headerClone.hasClass('header-style3')) {
                                headerWidth = $(window).width()
                            }
                            $headerClone.css({'width': headerWidth});
                        }, 100)
                    })
                }

            } else {

                $header.css({opacity: 1});

                if (scrollFlag == 1) {
                    if (scrollPos > (headerTop + siteTop + parseInt(headerHeight) + 350)) {
                        return;
                    }
                    //scroll is 0
                    scrollFlag = 0;


                    if (showUpStyle == 'fade_in') {
                        $headerClone.stop().animate({opacity: 0, 'z-index': '-1000'}, 300);
                        $headerClone.siblings('.second-header-bg').animate({opacity: 0, 'z-index': '-1000'}, 300);
                    }
                    else { //if slide in
                        $headerClone.stop().animate({
                            'top': -headerHeight,
                            'position': 'fixed',
                            'z-index': '-1000'
                        }, 300);
                        $headerClone.siblings('.second-header-bg').stop().animate({
                            'top': -headerHeight,
                            'position': 'fixed',
                            'z-index': '-1000'
                        }, 300);
                    }

                    if (typeof pixflow_itemOrderSetter == 'function' && $header.find('.top ').hasClass('ui-sortable')) {
                        pixflow_itemOrderSetter('enable');
                    }

                    //Show business bar in header modern
                    if (themeOptionValues.businessBarEnable == 1) {
                        if ($('header.top-modern').length && $('header.top-modern .business').length) {
                            $('header.top-modern .business').removeClass('business-off');
                            $('header.top-modern ').css('height', '100px');
                        }
                    }
                }
            }

        }
    });

}

/*
 function for return to second mode after scroll in header state
 get second setting (navColor, HoverColor,color,headerStyle)
 if bg is transparent color is set
 */
function pixflow_headerStateSecond(navColorSecond, navHoverColorSecond, colorSecond, $headerStyle, solidColorSecond) {
    "use strict";
    var blockBg = pixflow_RgbaToRgb(solidColorSecond);
    // hide business bar
    if (themeOptionValues.siteTop > 0 && $('header.top-modern').length < 1) {
        $('.layout .business').css('display', 'none');
    }

    //hide business bar in header modern
    if (themeOptionValues.businessBarEnable == 1) {
        if ($('header.top-modern').length && $('header.top-modern .business').length) {
            $('header.top-modern .business').addClass('business-off');
            $('header.top-modern ').css('height', '70px');
        }
    }

    //after scroll Second appearance
    $headerStyle.find('nav > ul > li > a .menu-title,.icons-pack .shopcart-item .number').css('color', navColorSecond);
    $headerStyle.find('.icons-pack .shopcart-item .number').css('background-color', navHoverColorSecond);
    $headerStyle.find('.separator a').css({
        color: navColorSecond,
        backgroundColor: navColorSecond,
        opacity: 0.5
    });

    $headerStyle.find('.icons-pack span').css('color', navColorSecond);

    // Under Line in Hover
    if ($('header.top-classic').length || $('header.top-logotop').length) {
        if ($('header .style-wireframe').length) {
            $headerStyle.find('.navigation .menu-separator').css('backgroundColor', navColorSecond);
        } else {
            $headerStyle.find('.navigation .menu-separator').css('backgroundColor', navHoverColorSecond);
        }
    }

    if ($('header.top-logotop').length) {
        $headerStyle.find('.navigation > ul > li').css('color', navColorSecond);
        $headerStyle.find('.navigation > ul > li').hover(function () {
            $(this).find('> a > .menu-title').css({color: navHoverColorSecond});
        }, function () {
            $(this).find('> a > .menu-title').css({color: navColorSecond});
        });
        pixflow_underlineAnimation();
    }

    if ($('header.top-classic').length) {
        $headerStyle.find(' .style-border nav > ul > li, .style-border nav > ul > li:last-child').css({
            'border-color': 'rgba(' + pixflow_rgbVal(navColorSecond) + ',0.5)'
        });

        $headerStyle.find('.navigation > ul > li').hover(function () {
            $(this).find('> a > .menu-title').css({color: navHoverColorSecond});
        }, function () {
            $(this).find('> a >.menu-title').css({color: navColorSecond});
        });
        pixflow_underlineAnimation();
    }

    if ($('header.top-block').length) {
        $headerStyle.find('.navigation > ul > li,' +
            '.icons-pack li').css({
            borderLeftColor: 'rgba(' + pixflow_rgbVal(navColorSecond) + ',0.3)',
            borderRightColor: 'rgba(' + pixflow_rgbVal(navColorSecond) + ',0.3)'
        });

        $headerStyle.find('.menu-separator-block').css({backgroundColor: navHoverColorSecond});

        $headerStyle.find('.style-style1 .navigation > ul > li > a .hover-effect,' +
            '.style-style1 ul.icons-pack li .elem-container .hover-content').css({backgroundColor: navHoverColorSecond});

        $headerStyle.find('.style-style1 .icons-pack .icon .icon-hover').css({color: themeOptionValues.headerBgSolidColorSecond});

        $headerStyle.find('.style-style1 .navigation > ul > li > a .menu-title,' +
            '.style-style1 .icons-pack .title-content').css({backgroundColor: blockBg});

        $headerStyle.find('.style-style2 .navigation > ul > li > a .hover-effect').css({color: navColorSecond});

        $headerStyle.find('.style-style1 nav > ul > li').hover(function () {
            $(this).find('> a .menu-title span,> a .menu-title').css({
                backgroundColor: navHoverColorSecond,
                color: navHoverColorSecond
            });
            $(this).find('> a > .hover-effect').css({backgroundColor: navHoverColorSecond, color: navColorSecond});
        }, function () {
            $(this).find('> a .menu-title,> a .menu-title span').css({backgroundColor: blockBg, color: navColorSecond});
        });

        $headerStyle.find('.style-style1 .icons-pack li').hover(function () {
            $(this).find('a .hover-content, a .hover-content span').css({
                backgroundColor: navHoverColorSecond,
                color: navColorSecond
            });
        }, function () {
            $(this).find('a .title-content , a .title-content span').css({
                backgroundColor: blockBg,
                color: navColorSecond
            });
        });

        /* Block Square Animation */

        $headerStyle.find('.style-style2 nav > ul > li,.style-style2 .icons-pack li').each(function () {
            var $this = $(this);

            $this.hover(function () {
                $this.css({backgroundColor: 'rgba(' + pixflow_rgbVal(navHoverColorSecond) + ',.3)'});
                TweenMax.to($this.find('> a .menu-separator-block'), 1, {bottom: "3px", ease: Elastic.easeOut});
                TweenMax.to($this.find('> a .menu-separator-block'), 0.9, {height: "3px", ease: Quart.easeOut});
                TweenMax.to($this.find('> a .menu-separator-block'), 0.1, {opacity: "1"});

                TweenMax.to($this.find('.hover-effect'), 0.5, {opacity: "1", marginTop: "80px"}); // for menu
                TweenMax.to($this.find('.hover-content'), 0.5, {opacity: "1", marginTop: "80px"}); // for icons pack
            }, function () {
                $this.css({backgroundColor: 'transparent'});
                TweenMax.to($this.find('.hover-effect'), 0.2, {opacity: "0", marginTop: "0"}); // for menu
                TweenMax.to($this.find('.hover-content'), 0.2, {opacity: "0", marginTop: "0"}); // for icons pack

                TweenMax.to($this.find('> a .menu-separator-block'), 0.8, {bottom: "-10px"});
                TweenMax.to($this.find('> a .menu-separator-block'), 0.4, {height: "6px"});
                TweenMax.to($this.find('> a .menu-separator-block'), 1, {opacity: "0"});
            });

        });

    }

    if ($('header.top-gather .style-style2').length) {

        $headerStyle.find('.style-style2 .icons-pack li .hover').css({color: navHoverColorSecond});

        $headerStyle.find('.style-style2 .icons-pack li').css({
            borderLeftColor: 'rgba(' + pixflow_rgbVal(navColorSecond) + ',0.5)',
            borderRightColor: 'rgba(' + pixflow_rgbVal(navColorSecond) + ',0.5)'
        });

        $headerStyle.find('.style-style2 .border-right, .style-style2 .border-left').css({
            borderColor: 'rgba(' + pixflow_rgbVal(navColorSecond) + ',0.5)'
        });

        $headerStyle.find('.style-style2 .icons-pack .icon').unbind('hover');
        $headerStyle.find('.style-style2 .icons-pack .icon').each(function () {

            var defaultIcon = $(this).find('span.default'),
                hoverIcon = $(this).find('span.hover');
            $(this).hover(function () {
                TweenMax.to(defaultIcon, 0.55, {top: "54px", opacity: 0, ease: Cubic.easeInOut});
                TweenMax.to(hoverIcon, 0.55, {top: "2", opacity: 1, ease: Cubic.easeInOut});
            }, function () {
                TweenMax.to(defaultIcon, 0.55, {top: "2", opacity: 1, ease: Cubic.easeInOut});
                TweenMax.to(hoverIcon, 0.55, {top: "-54px", opacity: 0, ease: Cubic.easeInOut});
            })
        });

    }

    if ($('header.top-modern').length) {
        $headerStyle.find('.navigation > ul > li,' +
            '.icons-pack li,' +
            '.first-part').css({
            borderRightColor: 'rgba(' + pixflow_rgbVal(navColorSecond) + ',0.3)'
        });

        $headerStyle.find('.business').css({borderBottomColor: 'rgba(' + pixflow_rgbVal(navColorSecond) + ',0.3)'});
        $headerStyle.find('.navigation > ul > li > a span').css({color: navColorSecond});

        $headerStyle.find('.btn-1b').removeClass('btn-1b-first');
        $headerStyle.find('.btn-1b').addClass('btn-1b-second');

        $headerStyle.find('.btn-1b').hover(function () {
            $(this).find('> a span').css('color', 'rgb(' + pixflow_RgbaToRgb(colorSecond) + ')');
            $(this).find('> a span span').css('color', 'rgb(' + pixflow_RgbaToRgb(colorSecond) + ')');
        }, function () {
            $(this).find('> a .title').css('color', navColorSecond);
            $(this).find('> a .icon').css('color', navColorSecond);
        });
    }

    if ($('header.top-block').length < 1 && $('header.top-gather .style-style2').length < 1 && $('header.top-modern').length < 1) {
        $headerStyle.find('.navigation > ul > li ').hover(function () {
            if ($('header .style-wireframe').length) {
                $(this).find('.menu-separator').css({backgroundColor: navHoverColorSecond});
            } else {
                $(this).find('> span').css({color: navHoverColorSecond});
            }
        }, function () {
            if ($('header .style-wireframe').length) {
                $(this).find('.menu-separator').css({backgroundColor: navColorSecond});
            } else {
                $(this).find('> span').css({color: navColorSecond});
            }

        });

        $headerStyle.find('.icons-pack .icon').hover(
            function () {
                $(this).css({color: navHoverColorSecond});
            }, // over
            function () {
                $(this).css({color: navColorSecond});
            }  // out
        );
    }

}

/*
 function for return to first mode after scroll in header state
 get primary setting (navColor, HoverColor,color,headerStyle)
 if bg is transparent color is set
 */
function pixflow_headerStateFirst(navColor, navHoverColor, color, $headerStyle, solidColor) {
    "use strict";
    var blockBg = pixflow_RgbaToRgb(solidColor);

    // show business bar
    if (themeOptionValues.siteTop > 0 && $('header.top-modern').length < 1) {
        $('.layout .business').css('display', 'block');
    }

    //Show business bar in header modern
    if (themeOptionValues.businessBarEnable == 1) {
        if ($('header.top-modern').length && $('header.top-modern .business').length) {
            $('header.top-modern .business').removeClass('business-off');
            $('header.top-modern ').css('height', '100px');
        }
    }

    //after scroll First appearance
    $headerStyle.find('nav > ul > li > a .menu-title').css('color', navColor);

    $headerStyle.find('.separator a').css({
        color: navColor,
        backgroundColor: navColor,
        opacity: 0.5
    });

    $headerStyle.find('.icons-pack span').css('color', navColor);

    // Under Line in Hover
    if ($('header.top-classic').length || $('header.top-logotop').length) {
        if ($('header .style-wireframe').length < 0) {
            $headerStyle.find('.navigation .menu-separator').css('backgroundColor', navHoverColor);
        }
    }

    if ($('header.top-logotop').length) {
        $headerStyle.find('.navigation > ul > li').css('color', navColor);
        $headerStyle.find('.navigation > ul > li').hover(function () {
            $(this).find('.menu-title').css({color: navHoverColor});
        }, function () {
            $(this).find('.menu-title').css({color: navColor});
        });
        pixflow_underlineAnimation();
    }
    if ($('header.top-classic').length) {
        $headerStyle.find('.navigation > ul > li').hover(function () {
            if ($('header .style-wireframe').length) {
                $(this).find('.menu-separator').css({backgroundColor: navHoverColor});
            } else {
                $(this).find('.menu-title').css({color: navHoverColor});
            }
        }, function () {
            if ($('header .style-wireframe').length) {
                $(this).find('.menu-separator').css({backgroundColor: navColor});
            } else {
                $(this).find('.menu-title').css({color: navColor});
            }
        });
        pixflow_underlineAnimation();
    }

    if ($('header.top-block').length) {
        $headerStyle.find('.navigation > ul > li,' +
            '.icons-pack li').css({
            borderLeftColor: 'rgba(' + pixflow_rgbVal(navColor) + ',0.3)',
            borderRightColor: 'rgba(' + pixflow_rgbVal(navColor) + ',0.3)'
        });

        $headerStyle.find('.menu-separator-block').css({backgroundColor: navHoverColor});

        $headerStyle.find('.style-style1 .navigation > ul > li > a .hover-effect,' +
            '.style-style1 ul.icons-pack li .elem-container .hover-content').css({backgroundColor: navHoverColor});

        $headerStyle.find('.style-style1 .icons-pack .icon .icon-hover').css({color: blockBg});

        $headerStyle.find('.style-style1 .navigation > ul > li > a .menu-title,' +
            '.style-style1 .icons-pack .title-content').css({backgroundColor: blockBg});

        $headerStyle.find('.style-style2 .navigation > ul > li > a .hover-effect').css({color: navColor});

        $headerStyle.find('.style-style1 nav > ul > li').hover(function () {
            $(this).find(' > a .menu-title').css({backgroundColor: navHoverColor});
            $(this).find(' > a .menu-title .icon').css({color: navHoverColor});
        }, function () {
            $(this).find('> a .menu-title').css({backgroundColor: blockBg});
            $(this).find('> a .menu-title .icon').css({color: navColor});
        });

        $headerStyle.find('.style-style1 .icons-pack li').hover(function () {
            $(this).find('a .title-content').css({backgroundColor: navHoverColor});
        }, function () {
            $(this).find('a .title-content').css({backgroundColor: blockBg});
        });

    }

    if ($('header.top-gather .style-style2').length) {

        $headerStyle.find('.style-style2 .icons-pack li .hover').css({color: navHoverColor});
        $headerStyle.find('.style-style2 .icons-pack li').css({
            borderLeftColor: 'rgba(' + pixflow_rgbVal(navColor) + ',0.5)',
            borderRightColor: 'rgba(' + pixflow_rgbVal(navColor) + ',0.5)'
        });
        $headerStyle.find('.style-style2 .border-right, .style-style2 .border-left').css({
            borderColor: 'rgba(' + pixflow_rgbVal(navColor) + ',0.5)'
        });

    }

    if ($('header.top-modern').length) {
        $headerStyle.find('.navigation > ul > li,' +
            '.icons-pack li,' +
            '.first-part').css({
            borderRightColor: 'rgba(' + pixflow_rgbVal(navColor) + ',0.3)'
        });


        $headerStyle.find('.navigation > ul > li > a span').css({color: navColor});
        $headerStyle.find('.business').css({borderBottomColor: 'rgba(' + pixflow_rgbVal(navColor) + ',0.3)'});

        $headerStyle.find('.btn-1b').removeClass('btn-1b-second');
        $headerStyle.find('.btn-1b').addClass('btn-1b-first');

        $headerStyle.find('.btn-1b').hover(function () {
            $(this).find('> a span').css('color', color);
            $(this).find('> a span span').css('color', color);
        }, function () {
            $(this).find('> a .title').css('color', navColor);
            $(this).find('> a .icon').css('color', navColor);
        });
    }

    if ($('header.top-block').length < 1 && $('header.top-gather .style-style2').length < 1 && $('header.top-modern').length < 1) {
        $headerStyle.find('.navigation > ul > li').hover(function () {
            if ($('header .style-wireframe').length) {
                $(this).find('.menu-separator').css({backgroundColor: navHoverColor});
            } else {
                $(this).find('> span').css({color: navHoverColor});
            }
        }, function () {
            if ($('header .style-wireframe').length) {
                $(this).find('.menu-separator').css({backgroundColor: navColor});
            } else {
                $(this).find('> span').css({color: navColor});
            }
        });

        $headerStyle.find('.icons-pack .icon').hover(
            function () {
                $(this).css({color: navHoverColor});
            }, // over
            function () {
                $(this).css({color: navColor});
            }  // out
        );
    }

}

function pixflow_modernTop() {
    "use strict";
    // header top modern
    if ($('header.top-modern').length < 1)
        return;
    else {
        var i = 0;
        i = $("header.top-modern:not(.header-clone) .icons-pack li:visible").length;

        var image = new Image();
        image.src = $('header .logo img').attr('src');

        image.onload = function () {
            var contentWidthPixel = parseInt($('header .content').width());
            var iconWidth = Math.ceil((i * 71 * 100) / contentWidthPixel);
            var firstPart = Math.ceil((parseInt($('header:not(.header-clone) .first-part img').outerWidth(true)) + 61) * 100 / contentWidthPixel);
            var secondPart = Math.floor(100 - firstPart);
            var navWidth = 100 - iconWidth;
            var $navItems = $('header.top-modern:not(.header-clone) nav > ul > li');


            $('header .first-part').css('width', firstPart + '%');
            $('header .second-part').css('width', secondPart + '%');
            $('header .navigation').css('width', navWidth + '%');
            $('header .icons-pack').css('width', iconWidth + '%');

            if ($navItems.length) {
                $navItems.css('width', 100 / $navItems.length + '%');
            }
        }

        image.onerror = function () {
            var contentWidthPixel = parseInt($('header .content').width());
            var iconWidth = (i * 71 * 100) / contentWidthPixel;
            var firstPart = ($('header .first-part').outerWidth(true)) * 100 / contentWidthPixel;
            var secondPart = 100 - firstPart - .01;
            var navWidth = 100 - iconWidth;
            var $navItems = $('header.top-modern nav > ul > li');

            $('header .first-part').css('width', firstPart + '%');
            $('header .second-part').css('width', secondPart + '%');
            $('header .navigation').css('width', navWidth + '%');
            $('header .icons-pack').css('width', iconWidth + '%');

            if ($navItems.length) {
                $navItems.css('width', 100 / $navItems.length + '%');
            }
        }
        $('header.top-modern').css({'opacity': 1});
    }

    pixflow_modernHoverColor();      // Hover for Modern Top
}

function pixflow_gatherWidthMenu() {
    "use strict";

    var i = 0,
        liWidth,
        totalWidth,
        menuWidth;

    // gather
    if (!$('.gather-overlay'))
        return;
    else {

        liWidth = $(".gather-overlay .navigation > ul > li").width();
        liWidth = parseInt(liWidth) + 50;

        $(".gather-overlay > ul > li").each(function () {
            i++;
            $('.gather-overlay .navigation > ul > li > a .menu-title').css('width', liWidth + 'px');
        });

        totalWidth = i * liWidth;
        menuWidth = $('.gather-overlay .menu').width();
        if (totalWidth > menuWidth) {
            $('.gather-overlay .navigation > ul > li').css('text-align', 'left');
        }
    }
}

/* return rgb Value */
function pixflow_rgbVal(str) {
    "use strict";

    var temp = str.substr(4, (str.length) - 5);
    return temp;
}

function pixflow_headerSideClassicFooterHover() {
    'use strict';
    // Footer social icons hover animation
    var $icon = $('header.side-classic .footer-socials .icon:gt(0)');
    // Footer social icons
    $icon.each(function () {
        var defaultIcon = $(this).find('span.default'),
            hoverIcon = $(this).find('span.hover');

        $(this).hover(function () {
            TweenMax.to(defaultIcon, 0.55, {top: "54px", opacity: 0, ease: Cubic.easeInOut});
            TweenMax.to(hoverIcon, 0.55, {top: "0", opacity: 1, ease: Cubic.easeInOut});
        }, function () {
            TweenMax.to(defaultIcon, 0.55, {top: "0", opacity: 1, ease: Cubic.easeInOut});
            TweenMax.to(hoverIcon, 0.55, {top: "-54px", opacity: 0, ease: Cubic.easeInOut});
        })
    });
}

function pixflow_headerSideClassic() {
    "use strict";

    // Header side classic icons pack
    var $headerIcons = $('header.side-classic .icons-pack'),
        $iconsParent = $headerIcons.find('.icon'),
        $liHasChildren = $('header.side-classic nav > ul > li.has-dropdown > a .title '),
        $hr = $('<hr/>'),
        $icon,
        TM = TweenMax;

    if (!$('header.side-classic').length)
        return;

    if ($('header.side-classic.standard-mode').length) {
        $liHasChildren.append('<span class="icon-angle-down"></span>')
        return;
    }

    $hr.insertAfter('header.side-classic .icons-holder li a:gt(0)');
    $('header.side-classic .icons-holder li:visible:first hr').css('display', 'none');
    $liHasChildren.append('<span class="icon-angle-right"></span>')

    //header items animation
    TM.staggerFrom('header.side-classic .navigation .menu-separator', 0.9, {
        scaleX: "0",
        scaleY: "0",
        ease: Back.easeInOut,
        delay: 0.7
    }, 0.1); //Menu Separator
    $('header.side-classic .navigation > ul > li').each(function () {
        $(this).hover(function () {
            TM.to($(this).find('> a .menu-separator'), 0.8, {width: "105px", ease: Elastic.easeOut})
        }, function () {
            TM.to($(this).find('> a .menu-separator'), 0.4, {width: "0"})
        })
    });


    // Header icons pack
    $iconsParent.each(function () {
        var defaultIcon = $(this).find('span.default'),
            hoverIcon = $(this).find('span.hover');

        $(this).hover(function () {
            TweenMax.to(defaultIcon, 0.55, {top: "54px", opacity: 0, ease: Cubic.easeInOut});
            TweenMax.to(hoverIcon, 0.55, {top: "0", opacity: 1, ease: Cubic.easeInOut});
        }, function () {
            TweenMax.to(defaultIcon, 0.55, {top: "0", opacity: 1, ease: Cubic.easeInOut});
            TweenMax.to(hoverIcon, 0.55, {top: "-54px", opacity: 0, ease: Cubic.easeInOut});
        })
    });

    var socialcount = $('header.side-classic .footer-socials li.icon').not(".info").length;
    var minwidth = (parseInt(socialcount) * 100).toString() + "%";
    $("header.side-classic div.footer ul li.info .footer-content").css({"min-width": minwidth});


    // Footer Icons Hover Animation
    pixflow_headerSideClassicFooterHover();
}

function pixflow_headerSideEffect() {
    "use strict";

    if (!$('header.side-classic').length || $('header.side-classic.standard-mode').length)
        return;

    // Footer social icons hover animation
    var $header = $('header.side-classic'),

        //Header
        $headerIcons = $header.find('.icons-pack'),
        $search = $headerIcons.find('.icon.search'),
        $searchContent = $search.find('.search-form'),
        $iconsPack = $headerIcons.find('.icon:gt(0)'),
        $headerContentWidth, $headerIconsWidth,

        //Footer
        $footerIcons = $header.find('.footer-socials'),
        footerIconsCount = $footerIcons.find('>li.icon').length,
        $info = $footerIcons.find('.icon.info'),
        $infoIcons = $footerIcons.find('.icon.info > a > span'),
        $footerContent = $info.find('.footer-content'),
        $socialIcons = $footerIcons.find('.icon:gt(0)'),
        TM = TweenMax,
        $footerIconsWidth;


    // Calculate header li width
    // Search Button
    var $searchParent = $('header.side-classic .icons-pack'),
        $searchChilds = $searchParent.find('li'),
        $searchIcon = $searchParent.find('li.search'),
        $searchBtn = $searchParent.find('.search-form .searchBtn'),
        counter = 0,
        $searchBtnWidth;


    // If we have only search box

    $searchChilds.each(function () {
        counter++;
    });

    if (counter == 1) {
        $searchIcon.addClass('searchAlone');
    }

    $searchBtnWidth = $searchIcon.width() / 2;
    $searchBtn.css({left: -$searchBtnWidth + 'px'});

    // Calculate header icons pack

    $headerContentWidth = $searchContent.width();
    $headerIconsWidth = $search.width();

    var $iconsPackEffect = new TimelineMax({paused: true}),
        $headerIconsEffect = new TimelineMax({paused: true});

    $iconsPackEffect.add(TM.staggerTo($iconsPack, .3, {top: "54px", opacity: 0, ease: Cubic.easeInOut}, .1));
    $headerIconsEffect.add(TM.to($searchContent, .5, {left: $headerIconsWidth + 'px'}));

    $search.mouseenter(function () {
        $iconsPackEffect.restart();
        $headerIconsEffect.restart();
        $searchContent.stop().animate({opacity: 1}, 'slow');
    });

    $search.mouseleave(function () {
        $searchContent.stop().animate({opacity: 0}, '400');
        $iconsPackEffect.reverse();
        $headerIconsEffect.reverse();
    });


    // Calculate footer icons (info & socials)
    $footerIconsWidth = $info.width();

    var $socialIconsEffect = new TimelineMax({paused: true}),
        $footerIconsEffect = new TimelineMax({paused: true});

    if (!$socialIcons.length) {
        $footerContent.css('top', '-54px');
        $footerIcons.css('overflow', 'hidden');
        $footerIconsEffect.add(TM.staggerTo($infoIcons, .3, {top: "54px", opacity: 0, ease: Cubic.easeInOut}, .1));
        $footerIconsEffect.add(TM.to($footerContent, .5, {top: 0 + 'px'}));
    } else {
        $socialIconsEffect.add(TM.staggerTo($socialIcons, .3, {top: "54px", opacity: 0, ease: Cubic.easeInOut}, .1));
        $footerIconsEffect.add(TM.to($footerContent, .5, {left: '110%'}));
    }
    $info.hover(function () {
        $infoIcons.addClass('iconTotation');
        $socialIconsEffect.restart();
        $footerIconsEffect.restart();
        $footerContent.stop().animate({opacity: 1}, 1000);
    }, function () {
        $footerContent.stop().animate({opacity: 0}, 300);
        $infoIcons.removeClass('iconTotation');
        $socialIconsEffect.reverse();
        $footerIconsEffect.reverse();
    });

}

function pixflow_gatherBlockHover() {
    "use strict";

    var $icon = $('header.top-gather .style-style2 .icons-pack .icon');
    $icon.each(function () {

        var defaultIcon = $(this).find('span.default'),
            hoverIcon = $(this).find('span.hover');

        $(this).hover(function () {
            TweenMax.to(defaultIcon, 0.55, {top: "54px", opacity: 0, ease: Cubic.easeInOut});
            TweenMax.to(hoverIcon, 0.55, {top: "0", opacity: 1, ease: Cubic.easeInOut});
        }, function () {
            TweenMax.to(defaultIcon, 0.55, {top: "0", opacity: 1, ease: Cubic.easeInOut});
            TweenMax.to(hoverIcon, 0.55, {top: "-54px", opacity: 0, ease: Cubic.easeInOut});
        })
    });
}

function pixflow_modernHoverColor() {
    "use strict";

    var $color, $nav_color, $nav_color;

    if (themeOptionValues.headerBgSolidColor == 'transparent' || themeOptionValues.headerBgColorType == 'gradient') {
        $color = '#fff';
    }
    else {
        $color = themeOptionValues.headerBgSolidColor;
    }

    $nav_color = themeOptionValues.navColor;

    $('header.top-modern .btn-1b').hover(function () {
        if (themeOptionValues.headerBgSolidColor == 'transparent' || themeOptionValues.headerBgColorType == 'gradient') {
            $color = 'rgba(255,255,255,1)';
        }
        else {
            $color = themeOptionValues.headerBgSolidColor;
        }

        $(this).find('> a span').css('color',  pixflow_RgbaToRgb($color) );

    }, function () {

        $(this).find('> a .title').css('color', $nav_color);
        $(this).find('> a .icon').css('color', $nav_color);

    });
}

function pixflow_classicDropdown() {
    "use strict";

    var $level1 = $('header nav > ul > .has-dropdown:not(.megamenu),.gather-overlay nav > ul > .has-dropdown:not(.megamenu)'),
        $level2;

    if (!$level1.length)
        return;

    if ($level1.parents('.side').length) {

        if ($level1.parents('.side-classic').length)
            $level2 = $('header nav > ul > .has-dropdown:not(.megamenu), header nav > ul > .has-dropdown:not(.megamenu) ul .has-dropdown');
        else
            $level2 = $('header nav > ul > .has-dropdown:not(.megamenu) ul .has-dropdown:not(.megamenu)');

    } else
        $level2 = $level1.find('> ul > li.has-dropdown');

    $level2.hoverIntent({
        interval: 200,
        over: pixflow_openUl,
        out: pixflow_closeUl
    });

    function pixflow_openUl() {
        'use strict';
        var $side = $(this).parents('.side');
        if ($side.length) {
            $(this).find('> .dropdown').stop(true, true).slideDown(400);
        } else
            $(this).find('.dropdown').stop(true, true).fadeIn('fast');
        TweenMax.to($(this).find('.dropdown'), 0.5);
    }

    function pixflow_closeUl() {
        'use strict';
        var $side = $(this).parents('.side');

        if ($side.length) {
            $(this).find('> .dropdown').stop(true, true).delay(800).slideUp(400);
        } else
            $(this).find('.dropdown').stop(true, true).delay(400).fadeOut('fast');
    }
}

function pixflow_sidebarBoxStyle() {
    "use strict";

    if ((!$('body .sidebar').length ) ||
        ($('body.blog').length && themeOptionValues.sidebar_style_blog != "box") &&
        ($('body.single').length && themeOptionValues.sidebar_style_single != "box") &&
        ($('body.woocommerce').length && themeOptionValues.sidebar_style_shop != "box") &&
        (!$('body.blog').length && !$('body.single').length && !$('body.woocommerce').length && themeOptionValues.sidebar_style != 'box')
    ) {
        return;
    }

    if ($('body.blog').length) {
        var x = themeOptionValues.blog_sidebar_bg_image_position
    } else if ($('body.single').length) {
        var x = themeOptionValues.single_sidebar_bg_image_position
    } else if ($('body.woocommerce').length) {
        var x = themeOptionValues.shop_sidebar_bg_image_position
    } else {
        var x = themeOptionValues.page_sidebar_bg_image_position
    }
    var n = x.indexOf("-"),
        y = 0,
        divs;

    x = x.substring(0, n);

    divs = '<div class="color-overlay color-type"></div><div class="color-overlay texture-type"></div><div class="color-overlay image-type"></div><div class="texture-overlay"></div><div class="bg-image"></div>';

    $('main > .sidebar .widget').each(function () {
        $(this).append(divs);
        $(this).find('.bg-image').css({'background-position': x + ' ' + '-' + y + 'px'});
        y += $(this).outerHeight(true);
    })
}

function pixflow_goToTopButton() {
    "use strict";

    var displayAfter = themeOptionValues.goToTopShow,
        toTopButton = $('.go-to-top');

    $(window).scroll(function () {
        if ($(window).scrollTop() > displayAfter) {
            toTopButton.stop(true).fadeIn(300);
            if ($('#footer-bottom').children('.linear').length) {
                $('footer .linear').css({'padding-right': '50px'});
            }
        } else {
            toTopButton.stop(true).fadeOut(300);
        }
    });

    $('.go-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 600);
        return false;
    });

    if (toTopButton.is(":visible") && $('#footer-bottom').children('.linear').length) {
        $('footer .linear').css({'padding-right': '50px'});
    }
}

// set day name, day color for calendar
function pixflow_calendarWidget() {
    "use strict";

    var title, colspan, dayNum, countCell, monthName, j, activeColor, tag;

    if ($('.widget_calendar').length < 1)
        return;

    $('.widget_calendar').each(function () {
        j = 1;

        //change day title
        $(this).find('table tr th').each(function () {
            title = $(this).attr('title');
            title = title.substr(0, 3);
            $(this).html(title);
        });

        //change day title color
        colspan = parseInt($(this).find('table tbody tr td.pad').attr('colspan'));
        dayNum = parseInt($(this).find('table tr td#today').html()) + colspan;

        countCell = Math.floor(dayNum / 7);
        countCell = dayNum - (7 * countCell);

        if (countCell == 0)
            countCell = 7;

        activeColor = $(this).find('table tr td#today').css('color');

        $(this).find('table tr th').each(function () {
            if (j == countCell) {
                $(this).addClass('active');
            }
            j++;
        });

        //change html of next and prev btn
        if ($(this).find('table tr td#prev a').length) {
            monthName = $(this).find('table tr td#prev a').html();
            monthName = monthName.split("??");
            tag = "<div class='cellSettingLeft'><i class='icon-angle-left'></i></div><div class='cellSettingLeft'>" + monthName[1] + "</div>";
            $(this).find('table tr td#prev a').html(tag);
        }
        if ($(this).find('table tr td#next a').length) {
            monthName = $(this).find('table tr td#next a').html();
            monthName = monthName.split("??");
            tag = "<div class='cellSettingRight'>" + monthName[1] + "</div><div class='cellSettingRight'><i class='icon-angle-right'></i></div>";
            $(this).find('table tr td#next a').html(tag);
        }
    });
}

// enable save & publish button on changes in VC frontend Editor
function pixflow_VcUpdate() {
    "use strict";

    if (pixflow_detectPosition() == 'customizer-mb-enable') {

        var $input = window.top.$("input[data-customize-setting-link='vc_edited']");
        if ($input.length) {
            $(document).mousedown(function () {
                var $input = window.top.$("input[data-customize-setting-link='vc_edited']");
                $input.attr("value", Date()).keyup();
            });
        }
    }
}

/*
 function has no param and return nothing
 it just call megamenu plugin
 */
function pixflow_callDropdown() {
    "use strict";

    $('header:not(.header-clone),' +
        '.gather-overlay .menu').megamenu(1200);
}

function pixflow_RgbaToRgb($rgba) {
    "use strict";

    var rgb = $rgba.match(/\d+/g),
        counter = 0,
        arrayBlockRect = [];

    for (var i in rgb) {
        arrayBlockRect[i] = rgb[i];

        counter++;
        if (counter == 3)
            break;
    }
    return ('rgb(' + arrayBlockRect + ')' );
}

function pixflow_addNicesroll() {
    'use strict';

    $('header.side-modern .style-style2 nav.navigation li.has-dropdown:not(.megamenu) .dropdown .dropdown').niceScroll({
        horizrailenabled: false,
        cursorcolor: "#ccc",
        cursorborder: "1px solid #ddd",
        cursorwidth: '2px',
        cursoropacitymax: "0.3",
        scrollspeed: 100,
        mousescrollstep: 80
    });

}

var triggeredTabs = new Array();

var $ = jQuery;

// for performance of execution
var teamMemberClassics = {}

function pixflow_searchWidget() {
    "use strict";

    var searchWidget = $('.widget_search input:first-child');

    if ($('.widget_search').length < 1) {
        return;
    }
    searchWidget.focusin(function () {
        $(this).attr('placeholder', '');
    });
    searchWidget.focusout(function () {
        if ($(this).attr('placeholder') == '') {
            $(this).attr('placeholder', themeOptionValues.search);
        }
    });
}

function pixflow_skill_style1($id) {
    "use strict";
    var $skillsId = $($id);

    $skillsId.find('.bar-percentage[data-percentage]').each(function (i, el) {

        var progress = $(this),
            percentage = Math.ceil($(this).attr('data-percentage'));
        $skillsId.find('.bar-container').css('opacity', '1');
        $skillsId.find('.bar').css('opacity', '1');
        var style2 = ($skillsId.hasClass('style2'));
        progress.siblings().children().not(".back-bar").not(".bar-title").css('width', 0);

        if (style2) {
            setTimeout(function () {
                $({countNum: 0}).animate({countNum: percentage}, {
                    duration: 1050,
                    easing: 'easeInOutQuint',
                    step: function (value) {
                        /* What to do on every count */
                        value = Math.ceil(value);
                        var pct = value + '%';
                        progress.text(pct) && progress.siblings().children().not(".back-bar").not(".bar-title").css('width', pct);
                        var w = progress.siblings().children().not(".back-bar").not(".bar-title").width();
                        progress.css({'width': w});
                    }
                });
            }, 90 * i);
        }
        else {
            $({countNum: 0}).animate({countNum: percentage}, {
                duration: 2000,
                easing: 'easeInOutCubic',
                step: function (value) {
                    /* What to do on every count */
                    value = Math.ceil(value);
                    var pct = value + '%';
                    progress.text(pct) && progress.siblings().children().not(".back-bar").css('width', pct);
                    var w = progress.siblings().children().not(".back-bar").width();
                }
            });
        }

    });
}

var skillIds = [], skillFlag = [], skillPos = [], skillI = 0,
    skillPieIds = [], skillPieFlag = [], skillPiePos = [], skillPieI = 0, j,
    counterIds = [], counterFlag = [], counterPos = [], counterI = 0, i;

function pixflow_onScrollFindIDs(param) {
    "use strict";

    var $param = $('.' + param);

    if ($param.length) {

        // Skill Style1
        if (param == 'skill-style1') {

            $param.each(function () {
                skillIds[skillI] = $('#' + $(this).attr('id'));
                skillPos[skillI] = skillIds[skillI].position().top;
                skillFlag[skillI] = true;
                skillI++;
            });

            if ($(window).width() <= 1280) {
                for (j = 0; j < skillI; j++) {

                    if (skillFlag[j]) {
                        pixflow_skill_style1(skillIds[j]);
                        skillFlag[j] = false;
                    }
                }
            } else {
                pixflow_eventLoadOnScroll('skillStyle1');
            }
        }

        // Counter Style1
        if (param == 'md-counter') {

            $param.each(function () {
                counterIds[counterI] = $('#' + $(this).attr('id'));
                counterPos[counterI] = counterIds[counterI].position().top;
                counterFlag[counterI] = true;
                counterI++;
            });
            pixflow_eventLoadOnScroll('counterStyle1');
        }

        // Skill Pie
        if (param == 'md-pie-chart') {

            $param.each(function () {
                skillPieIds[skillPieI] = $('#' + $(this).attr('id'));
                skillPiePos[skillPieI] = skillPieIds[skillPieI].position().top;
                skillPieFlag[skillPieI] = true;
                skillPieI++;
            });
            pixflow_eventLoadOnScroll('skillPie');
        }

    }
}

var loadPosition, scrollTop;

function pixflow_eventLoadOnScroll(param) {
    "use strict";

    $(window).scroll(function () {
        scrollTop = $(this).scrollTop();
        loadPosition = $(window).height() / 1.3;

        if (param == 'skillStyle1') {
            for (j = 0; j < skillI; j++) {

                if ((scrollTop > $(skillIds[j]).offset().top - loadPosition) && skillFlag[j]) {
                    pixflow_skill_style1(skillIds[j]);
                    skillFlag[j] = false;
                }
            }
        }

        if (param == 'skillPie') {
            for (j = 0; j < skillPieI; j++) {

                if ((scrollTop > $(skillPieIds[j]).offset().top - loadPosition) && skillPieFlag[j]) {
                    if (skillPieIds[j].hasClass('type-1'))
                        pixflow_pieChart(skillPieIds[j], skillPieIds[j].attr('data-barColor'), skillPieIds[j].attr('data-trackColor'));
                    if (skillPieIds[j].hasClass('type-2'))
                        pixflow_pieChart2(skillPieIds[j], skillPieIds[j].attr('data-barColor'), skillPieIds[j].attr('data-trackColor'));
                    skillPieFlag[j] = false;
                }
            }
        }

        if (param == 'counterStyle1') {
            for (i = 0; i < counterI; i++) {

                if ((scrollTop > $(counterIds[i]).offset().top - loadPosition) && counterFlag[i]) {
                    pixflow_counterShortcode(counterIds[i]);
                    counterFlag[i] = false;
                }
            }
        }

    });

}

function pixflow_eventRunFirstTime(param) {
    'use strict';
    var windowHeight = $(window).height();
    scrollTop = $(window).scrollTop();
    loadPosition = windowHeight / 1.3;

    if (param == 'skill-style1') {
        for (j = 0; j < skillI; j++) {
            if ((scrollTop > $(skillIds[j]).offset().top - loadPosition) && skillFlag[j]) {
                pixflow_skill_style1(skillIds[j]);
                skillFlag[j] = false;
            }
        }
    }

    if (param == 'md-counter') {
        for (i = 0; i < counterI; i++) {
            if ((scrollTop > $(counterIds[i]).offset().top - loadPosition) && counterFlag[i]) {
                pixflow_counterShortcode(counterIds[i]);
                counterFlag[i] = false;
            } else if (scrollTop == 0 && (windowHeight > $(counterIds[i]).offset().top - loadPosition) && counterFlag[i]) {
                pixflow_counterShortcode(counterIds[i]);
                counterFlag[i] = false;
            }
        }
    }

}

function pixflow_musicBtnAnimation($obj, flag) {
    'use strict';

    var $ = jQuery;

    /* Play-Pause animation button */

    $obj.each(function () {

        var $this = $(this),
            bottom = $this.closest('.music-sc').find('.wrap-image').height() / 2,
            left = $this.closest('.music-sc').find('.wrap-image').width() / 2 - 40;

        if (!flag) {
            if ($this.hasClass('musicBtnClicked')) {

                if ($('body').width() > 800) {

                    $this.stop().animate({
                        'margin-left': -(left / 2),
                        'margin-top': bottom * .7,
                        width: '50px',
                        height: '50px'
                    }, 200, 'linear', function () {
                        $this.stop().animate({
                            'margin-left': 0,
                            'margin-top': 0,
                            width: '70px',
                            height: '70px'
                        }, 300, 'linear');
                    });
                }
                $this.removeClass('musicBtnClicked');
                $this.find('.icon').removeClass('icon-pause');
                $this.find('.icon').addClass('icon-play');
            }
        }
        else {
            if ($this.css('margin-left') != -(left) + "px") {

                if ($('body').width() > 800) {

                    $this.css('background-image', 'none');
                    $this.stop().animate({
                        'margin-left': -(left / 2),
                        'margin-top': bottom * .7,
                        width: '50px',
                        height: '50px'
                    }, 200, 'linear', function () {
                        $this.stop().animate({
                            'margin-left': -(left),
                            'margin-top': bottom,
                            width: '30px',
                            height: '30px'
                        }, 300, 'linear');
                    });
                }

                $this.find('.icon').removeClass('icon-play');
                $this.find('.icon').addClass('icon-pause');
                $this.addClass('musicBtnClicked');
            }

        }

    });

}

var firstImage = null;
function pixflow_semiAjaxOut() {
    if ($('.loading-text').length) {
        $('.loading-text').delay(700).animate({opacity: 0}, 1000, 'swing', function () {
            $('#pageLoadingOverlay').animate({opacity: 0}, 1000, 'swing', function () {
                $(this).remove();
            })
        });
    } else {
        $('#pageLoadingOverlay').animate({opacity: 0}, 1000, 'swing', function () {
            $(this).remove();
        })
    }

    if (window.top != window.self) {
        $('document').ready(function () {
            if (typeof pixflow_customizerAnimate == 'function') {
                pixflow_customizerAnimate('out');
            }
        });
    }
}

function pixflow_loadSite() {
    "use strict";
    date = new Date();

    if (themeOptionValues.loadingText != '') {
        var time = 3500 - (date.getTime() - timestamp) * 1;
    } else {
        var time = 1000 - (date.getTime() - timestamp) * 1;
    }
    if (time < 0) {
        time = 0;
    }
    setTimeout(function () {
        if ($('header.top-modern').length) {
            var image = new Image();
            image.src = $('header .logo img').attr('src');
            $(image).load(function () {
                pixflow_semiAjaxOut();
            }).error(function () {
                pixflow_semiAjaxOut();
            })
        } else {
            pixflow_semiAjaxOut()
        }
    }, time)

}

var loadingElement = 0;
var loadedElement = 0;

function pixflow_checkLoading($obj) {
    "use strict";
    var children = $obj.children();

    children.each(function () {
        if ($(this).get(0).tagName == 'IMG') {
            if (firstImage == null) {
                firstImage = $(this);
            }

            loadingElement++;
            $(this).load(function () {
                loadedElement++;
                if (loadingElement == loadedElement)
                    pixflow_loadSite();
            }).error(function () {
                loadedElement++;
                if (loadingElement == loadedElement)
                    pixflow_loadSite();
            });
        } else {
            if ($(this).css('background-image') != 'none') {
                if (firstImage == null) {
                    firstImage = $(this);
                }
                loadingElement++;
                var url = $(this).css('background-image');
                url = url.replace(/^url\(["']?/i, '').replace(/["']?\)$/, '');
                $('<img/>').attr('src', url).load(function () {
                    $(this).remove();
                    loadedElement++;
                    if (loadingElement == loadedElement)
                        pixflow_loadSite();
                }).error(function () {
                    loadedElement++;
                    if (loadingElement == loadedElement)
                        pixflow_loadSite();
                });
            }
        }

        pixflow_checkLoading($(this));
    });
    setTimeout(function () {
        if (loadingElement == 0) {
            pixflow_loadSite();
        }
    }, 1)

}

var date,
    timestamp;
function pixflow_loadSemiAjax() {
    "use strict";
    //disable semiAjax

    $('header').css('visibility', 'visible');
    $('html').css('overflow', 'auto');
    $('#pageLoadingOverlay').remove();
    return;

    if ($(window).width() < 768) {
        $('html').css('overflow', 'auto');
        return;
    }

    date = new Date();
    timestamp = date.getTime();

    var loadingType = themeOptionValues.loadingType,
        loadingText = themeOptionValues.loadingText,
        headerTop = $('header.top').css('top'),
        url;
    if (loadingText != '') {
        $('.loading-text img').animate({
            'opacity': 1
        }, 400, 'linear', function () {
            $('.loading-text .preloader-text').addClass('show-loading-text');
            TweenMax.to($(this), 1.1, {y: '-100%', x: '-50%', top: '10px'});
        })
        var menuDelay = 3500;
    } else {
        var menuDelay = 500;
    }
    if (parseInt(headerTop) <= 0 && parseInt($('.layout').css('padding-top')) == 0) {
        $('#pageLoadingOverlay').css('z-index', '9999');
        $('header.top').css('top', -$('header.top').height());
    }

    $('header').css('visibility', 'visible');
    $('html').css('overflow', 'auto');
    if (window.top != window.self) {
        $('header.top').css('top', '');
        $('#pageLoadingOverlay').remove();
        pixflow_loadSite();
        return;
    }
    if ($('header.top-modern').length) {
        var image = new Image();
        image.src = $('header .logo img').attr('src');
        $(image).load(function () {
            TweenMax.to($('header.top'), 0.5, {
                top: headerTop, delay: menuDelay / 1000, ease: Power4.easeOut, onComplete: function () {
                    $('header.top').css('top', '')
                }
            });
        }).error(function () {
            TweenMax.to($('header.top'), 0.5, {
                top: headerTop, delay: menuDelay / 1000, ease: Power4.easeOut, onComplete: function () {
                    $('header.top').css('top', '')
                }
            });
        })
    } else {
        TweenMax.to($('header.top'), 0.5, {
            top: headerTop, delay: menuDelay / 1000, ease: Power4.easeOut, onComplete: function () {
                $('header.top').css('top', '')
            }
        });
    }

    if (loadingElement == 0 || typeof pixflow_customizerObj == 'function') {
        pixflow_loadSite();
    }
    url = window.location.href.replace(location.hash, "");
    $('a:link').not('[href^="javascript:"], [href^="' + url + '#"],[href^="#"]').each(function () {

        var ev = $._data(this, 'events');
        if ((ev && ev.click)) {
            return;
        }
        ;
        var $this = $(this),
            href = $this.attr('href'),
            target = $this.attr('target');

        if (target && target.toLowerCase() != '_self' && target != '')
            return;
        $this.click(function (clickEvent) {
            var events = $._data($(this)[0], 'events');
            if (events && events.click && events.click.length > 1) {
                return;
            }

            if ($(this).attr('class')) {
                var classNames = $(this).attr('class').toString().split(' ');
            } else {
                var classNames = '';
            }
            var linkID = $(this).attr('id');
            var ret = '';
            $(this).parents().add(document).each(function () {
                var events = $._data($(this)[0], 'events');
                if (events && events.click && events.click.length > 0) {
                    for (i in events.click) {
                        if (classNames != '') {
                            $.each(classNames, function (j, className) {
                                if (events.click[i]) {
                                    var cls = events.click[i].selector;
                                    if (cls && cls.search('.' + className) != -1) {
                                        ret = 'true';
                                        return;
                                    } else if (linkID && cls.search('#' + linkID) != -1) {
                                        ret = 'true';
                                        return;
                                    }

                                }
                            });
                        } else {
                            if (linkID && events.click[i]) {
                                var cls = events.click[i].selector;
                                if (cls && cls.search('#' + linkID) != -1) {
                                    ret = 'true';
                                }
                            }
                        }
                    }
                }
            });
            if (ret == 'true') {
                return;
            }
            href = $(this).attr('href');
            if ($(this).parents().data('events') && $(this).parents().data('events').click) {
                return true;
            }
            if (clickEvent.metaKey || clickEvent.ctrlKey || clickEvent.which === 2) {
                return true;
            }
            // Hide dropdowns
            $('ul.dropdown').fadeOut(100);
            if ($('.gather-overlay').length)
                pixflow_closeOverlay();
            setTimeout(function () {
                window.location = href
            }, 1200);
            if ($(window).width() > 1024 && parseInt($('header.top').css('top')) <= 0 && parseInt($('.layout').css('padding-top')) == 0) {
                $('header.top').animate({'top': -$('header.top').height()}, 500);
            }
            if (loadingType == 'light') {
                $('html').delay(400).animate({opacity: 0}, 1000);
            } else {
                $('body').append('<div id="pageLoadingOverlay" style="position:fixed;top:0;left:0;width:100%;height: 100%; background: #000; opacity: 0;z-index: 9999"></div>');
                $('#pageLoadingOverlay').delay(400).animate({opacity: 1}, 1000);
            }
            return false;
        });
    });
}

function pixflow_shortcodeAnimation() {
    'use strict';
    if ( $(window.parent.document).width() < 1281 ) {
        return;
    }

    // Remove shortcode animation in acc,toggle,tab
    $('.wpb_tab .has-animation, .wpb_accordion_content .has-animation, .wpb_toggle_content .has-animation').each(function () {
        $(this).removeClass('has-animation');
    });
    if( $( '.compose-mode:not(.gizmo-off)' ).length ){
        $('.has-animation').css({
            opacity: 1,
            transform: "translate(0px, 0px)"
        });
    }

    $('.has-animation').not('.show-animation').each( function(i){
        var $this = $(this),
            animation_speed = $this.attr('data-animation-speed'),
            animation_delay = $this.attr('data-animation-delay') * 1000,
            animation_position = $this.attr('data-animation-position'),
            shortcodeTop = $this.offset().top,
            shortcodeBottom = $this.offset().top + $this.outerHeight(true),
            move = 50;

        if (animation_position == 'center') {
            $this.css({
                'transform': 'translateX(0) translateY(0)',
                '-webkit-transform': 'translateX(0) translateY(0)'
            });
        } else if (animation_position == 'right') {
            $this.css({
                'transform': 'translateX(' + move + 'px)',
                '-webkit-transform': 'translateX(' + move + 'px)'
            });
        } else if (animation_position == 'left') {
            $this.css({
                'transform': 'translateX(-' + move + 'px)',
                '-webkit-transform': 'translateX(-' + move + 'px)'
            });
        } else if (animation_position == 'top') {
            $this.css({
                'transform': 'translateY(-' + move + 'px)',
                '-webkit-transform': 'translateY(-' + move + 'px)'
            });
        } else if (animation_position == 'bottom') {
            $this.css({
                'transform': 'translateY(' + move + 'px)',
                '-webkit-transform': 'translateY(' + move + 'px)'
            });
        }

        /* If the object is completely visible in the window, set translate to 0 */
        if ( ( $(document).height() <= $(window).height() && !$('body').hasClass('one_page_scroll') )
            || (($(window).scrollTop() + $(window).height() - 200 >= shortcodeTop) && ($(window).scrollTop() + 100 <= shortcodeBottom))) {
            $this.css({
                'transform': 'translateX(0) translateY(0)',
                '-webkit-transform': 'translateX(0) translateY(0)'
            });
        }
    });
}

function pixflow_get_shortcode_back_to_position(shortcode_animation_list){
    if ( shortcode_animation_list[0] == 'center') {
        TweenMax.to(shortcode_animation_list[1],shortcode_animation_list[2],{opacity: '0','transform':'translateX(0) translateY(0)',delay:shortcode_animation_list[3],ease:shortcode_animation_list[4]});
    } else if ( shortcode_animation_list[0] == 'right') {
        TweenMax.to(shortcode_animation_list[1],shortcode_animation_list[2],{opacity: '0','transform':'translateX('+ shortcode_animation_list[5] +'px)',delay:shortcode_animation_list[3],ease:shortcode_animation_list[4]});
    } else if (shortcode_animation_list[0] == 'left') {
        TweenMax.to(shortcode_animation_list[1],shortcode_animation_list[2],{opacity: '0','transform':'translateX(-'+ shortcode_animation_list[5] +'px)',delay:shortcode_animation_list[3],ease:shortcode_animation_list[4]});
    } else if ( shortcode_animation_list[0] == 'top') {
        TweenMax.to(shortcode_animation_list[1],shortcode_animation_list[2],{opacity: '0','transform':'translateY(-'+ shortcode_animation_list[5] +'px)',delay:shortcode_animation_list[3],ease:shortcode_animation_list[4]});
    } else if ( shortcode_animation_list[0] == 'bottom') {
        TweenMax.to(shortcode_animation_list[1],shortcode_animation_list[2],{opacity: '0','transform':'translateY('+ shortcode_animation_list[5] +'px)',delay:shortcode_animation_list[3],ease:shortcode_animation_list[4]});
    }
    return ;
}

function pixflow_shortcodeAnimationScroll() {
    'use strict';
    var target_element ;
    if ($(window.parent.document).width() < 1281)
        return;
    if($('body').hasClass('one_page_scroll')){
        target_element = $('.row-active').find('.has-animation');
        if ($('body').hasClass('compose-mode')){
            target_element = $('.has-animation');
        }
    }else{
        target_element = $('.has-animation');
    }
    $(window).off('scroll.animation');


    target_element.each(function (i) {
        var $this = $(this),
            shortcodeTop = $this.offset().top,
            shortcodeBottom = $this.offset().top + $this.outerHeight(true),
            animation_speed = Number($this.attr('data-animation-speed')) * 0.001,
            animation_delay = Number($this.attr('data-animation-delay')),
            animation_position = $this.attr('data-animation-position'),
            animation_easing = $this.attr('data-animation-easing'),
            move = 50;
        /* If the object is completely visible in the window, fade it */
        if (  $(document).height() <= $(window).height()
            || (($(window).scrollTop() + $(window).height() - 200 >= shortcodeTop) && ($(window).scrollTop() + 100 <= shortcodeBottom))) {
            if (!$this.hasClass('show-animation')) {
                $this.addClass('show-animation');
                TweenMax.to($this,animation_speed,{opacity: 1,'transform':'translateX(0) translateY(0)',delay:animation_delay,ease:animation_easing});//Linear.easeNone
            }
        }
        $(window).on('scroll.animation',function(){
            var scrollTop = $(window).scrollTop() + $(window).height() ,
                scrollTop1 = $(window).scrollTop(),
                shortcodeTop = $this.offset().top,
                shortcodeBottom = $this.offset().top + $this.outerHeight(true);
            if($('body').hasClass('compose-mode')){
                if($('.compose-mode:not(.gizmo-off)').length){
                    $this.css('opacity','1');
                    $this.css('transform', 'translate(0px,0px)');
                    return;
                } else if (!$this.hasClass('show-animation')) {
                    $this.css('opacity', '');
                    $this.css('transform', '');
                }
            }
            if ((scrollTop >= shortcodeTop) && (scrollTop1 <= shortcodeBottom)) {
                if (!$this.hasClass('show-animation')) {
                    $this.addClass('show-animation');
                    TweenMax.to($this,animation_speed,{opacity: 1,'transform':'translateX(0) translateY(0)',delay:animation_delay,ease:animation_easing});
                }
            } else {
                if ($this.hasClass('show-animation') && $this.attr('data-animation-show') == 'scroll') {

                    $this.removeClass('show-animation');

                    //animation_delay = animation_delay / 2;
                    var shortcode_animation_list = [ animation_position , $this , animation_speed , animation_delay , animation_easing , move ] ;
                    pixflow_get_shortcode_back_to_position(shortcode_animation_list);
                }
            }
        })
    });
}

function pixflow_shortcodeScrollAnimation() {
    'use strict';

    //if not in customizer
    var slider = $(".md-pixflow-slider");
    if ($(window).width > 1280) {
        slider.each(function () {
            var $this = $(this), $conainer = $this.find(".pixflow-slide-container");


            $this.attr("data-flagpause", 'false');
            $this.attr("data-flagplay", 'false');


            if (window.self === window.top) {
                $(window).scroll(function () {
                    if ($conainer.offset().top <= $(window).scrollTop() + $(window).height() - 200 && $conainer.offset().top + $conainer.height() - 350 >= $(window).scrollTop()) {
                        if ($this.attr('data-flagplay') != 'true') {
                            $this.addClass("playing").removeClass("paused");
                            $this.attr('data-flagplay', 'true');
                            $this.attr('data-flagpause', 'false');
                            TweenMax.to($conainer, 0.6, {opacity: '1'}, 0.1);

                            if (typeof flickity != 'undefined')
                                $('.pixflow-slider.yes').flickity('unpausePlayer');
                        }
                    }
                    else {
                        if ($this.attr('data-flagpause') != 'true') {
                            $this.addClass("paused").removeClass("playing");
                            $this.attr('data-flagplay', 'false');
                            $this.attr('data-flagpause', 'true');
                            if (typeof flickity != 'undefined')
                                $('.pixflow-slider.yes').flickity('pausePlayer');
                            TweenMax.to($conainer, 0.6, {opacity: '0.1'}, 0.1);
                        }
                    }
                })
            }
        });
    }

    var processSteps = $('.process-steps'),
        musicSC = $('.music-sc'),
        showcases = $('.showcase');

    if (!processSteps.length && !musicSC.length && !showcases.length) return;

    if ($(window).width() > 768) {
        processSteps.each(function () {
            var $this = $(this),
                steps = $this.find('.step'),
                circle = steps.find('.circle'),
                separator = circle.find('.separator'),
                title = steps.find('.title'),
                description = steps.find('.description');

            if (window.self === window.top) {

                $(window).scroll(function () {

                    if ($this.offset().top <= $(window).scrollTop() + $(window).height() - 100 && $this.offset().top + $this.height() - 300 >= $(window).scrollTop()) {

                        if ($this.hasClass('animating')) {
                            return;
                        } else {
                            $this.addClass('animating');
                            TweenMax.staggerTo(circle, 0.8, {scale: '1', opacity: '1'}, 0.2);
                            TweenMax.staggerTo(circle, 0.8, {left: '0', delay: 0.3}, 0.1);
                            TweenMax.staggerTo(separator, 0.6, {'scaleX': '1', delay: 0.6}, 0.2);
                            TweenMax.staggerTo(title, 0.6, {
                                'padding-top': '0',
                                'margin-bottom': '30px',
                                opacity: '1',
                                delay: 0.4
                            }, 0.1);
                            TweenMax.staggerTo(description, 0.6, {visibility: 'visible', delay: 0.8}, 0.1);
                        }
                    } else {
                        if ($this.hasClass('animating')) {
                            TweenMax.staggerTo(circle, 0.8, {scale: '0', opacity: '0'}, 0.2);
                            TweenMax.staggerTo(separator, 0.6, {'scaleX': '0', delay: 0.6}, 0.2);
                            TweenMax.staggerTo(title, 0.6, {
                                'padding-top': '30px',
                                'margin-bottom': '0',
                                opacity: '0',
                                delay: 0.4
                            }, 0.1);
                            TweenMax.staggerTo(description, 0.6, {visibility: 'hidden', delay: 0.8}, 0.1);
                            steps.each(function () {
                                var singleCircle = $(this).find('.circle');
                                singleCircle.stop().animate({'left': singleCircle.attr('data-animate-start') + 'px'}, 500);
                            });
                            $this.removeClass('animating');
                        } else {
                            return;
                        }
                    }
                })
            }
        });
    }

    // Music Shortcode

    musicSC.each(function () {
        var $this = $(this),
            $discImage;
        var timeOut;
        if (window.self === window.top) {
            $(window).scroll(function () {
                $discImage = $this.find('.disc-image');
                if ($this.offset().top <= $(window).scrollTop() + $(window).height() - 100 && $this.offset().top + $this.height() - 300 >= $(window).scrollTop()) {
                    if ($this.hasClass('animating')) {
                        return;
                    } else {
                        $this.addClass('animating');
                        if ($discImage.closest('.music-sc').hasClass('left-music-panel')) {
                            $discImage.css('right', '35%');
                            $discImage.css('animation-name', 'rotateLeft');
                        } else {
                            $discImage.css('right', '-35%');
                        }


                        $discImage.css('animation-play-state', 'running');
                        $discImage.css('animation-duration', '7s');
                        timeOut = setTimeout(function () {
                            $discImage.css('animation-play-state', '');
                            $discImage.css('animation-duration', '');
                        }, 1000)

                    }
                } else {
                    if ($this.hasClass('animating')) {
                        clearInterval(timeOut);
                        $discImage.css('animation-play-state', '');
                        $discImage.css('animation-duration', '');
                        $discImage.css('right', '0');
                        $this.removeClass('animating');

                    } else {
                        return;
                    }
                }
            })
        }
    });


    showcases.each(function () {
        var carousel,
            $element = $(this),
            $carouselImages = $element.find('a');

        $carouselImages.css({
            overflow: 'hidden!important', width: 0, height: 0
        });
        if (typeof $element.waterwheelCarousel == 'function') {
            $carouselImages.removeAttr('style');
            $carouselImages.off('click');
            var carousel = $element.waterwheelCarousel({
                forcedImageWidth: 760,
                forcedImageHeight: 436,
                horizonOffsetMultiplier: 0,
                speed: 600,
                flankingItems: 2,
                separation: 300,
                animationEasing: 'swing',
                opacityMultiplier: 1,
                movingToCenter: function ($moveing) {
                    pixflow_showcase_moved($moveing, $carouselImages);
                }
            });

            var featureLeft = 0,
                featureTop = 0;

            pixflow_showcase_moved($carouselImages.first(), $carouselImages);

            setTimeout(function () {
                $carouselImages.each(function () {
                    $(this).attr('data-left', $(this).css('left'));
                    $(this).attr('data-top', $(this).css('top'));
                });
                featureLeft = $carouselImages.first().css('left').replace('px', '') * 1 + 119;
                featureTop = $carouselImages.first().css('top').replace('px', '') * 1 + 50;
                var showcaseTop = $element.offset().top,
                    showcaseBottom = $element.offset().top + $element.outerHeight(true);
                if (($(window).scrollTop() + $(window).height() - 100 >= showcaseTop) && ($(window).scrollTop() + 300 <= showcaseBottom)
                    || window.self !== window.top) {
                    $element.addClass('open-showcase');
                    $carouselImages.each(function () {
                        $(this).animate({
                            'left': $(this).data('left'),
                            'top': $(this).data('top')
                        }, 1).finish();
                    })
                } else {
                    $element.removeClass('open-showcase');
                    $carouselImages.not('.carousel-center').animate({
                        left: featureLeft,
                        top: featureTop
                    }, 1).finish();
                    $carouselImages.filter('.carousel-center').animate({
                        left: $carouselImages.filter('.carousel-center').data('left'),
                        top: $carouselImages.filter('.carousel-center').data('top')
                    }, 1).finish();
                }
            }, 1);

            if (window.self === window.top) {
                $(window).scroll(function () {
                    if ($element.length) {
                        var showcaseTop = $element.offset().top,
                            showcaseBottom = $element.offset().top + $element.outerHeight(true);

                        if (($(this).scrollTop() + $(this).height() - 100 >= showcaseTop) && ($(this).scrollTop() + 300 <= showcaseBottom)) {

                            if (!$element.hasClass('open-showcase')) {
                                $element.addClass('open-showcase');
                                $carouselImages.each(function () {
                                    $(this).animate({
                                        'left': $(this).data('left'),
                                        'top': $(this).data('top')
                                    }, 600);
                                })
                            }
                        } else {
                            if ($element.hasClass('open-showcase')) {
                                $element.removeClass('open-showcase');
                                $carouselImages.not('.carousel-center').animate({
                                    left: featureLeft,
                                    top: featureTop
                                }, 600);
                            }
                        }
                    }
                });
            }
        }
    })

}

var paginationCounter;

function pixflow_findPaginationOffsets($postPagination) {
    'use strict';

    var thisOffset = [];

    $postPagination.children().each(function () {
        thisOffset[paginationCounter] = $(this).offset();
        paginationCounter++;
    });

    return thisOffset;
}

function pixflow_wooCommerce() {
    "use strict";

    if ($('.woocommerce-account').length && $(window).width() < 991) {
        $('.woocommerce').addClass('container').find('.edit.changed-target').attr('target', '_self');
        // this code need to be check
        $('main').css('min-height', $(window).height());
        $('main .content').css("cssText", "position: relative;top: 50%;transform: translateY(-50%);-webkit-filter:blur(0);");
    }

    var num = 0;
    $('.notification-center ul.cart_list li.mini_cart_item').each(function () {
        var a = $(this).find('.quantity').contents()[0].textContent;
        num += parseInt(a);
    });

    if ($('header .icons-pack .shopcart-item').length && num > 0 && !$('header .icons-pack .shopcart-item .number').length) {
        $('header .icons-pack .shopcart-item .icon').append('<i class="number">' + num + '</i>');
    }
    // Category Widget

    if ($('.widget_product_categories').length) {
        $('.widget_product_categories .cat-parent > a').append('<span class="icon-caret-right"></span>');
    }

    // My Account Page
    var $errorMsgDestination, article, title,
        $errorMessage = $('.woocommerce-error'),
        $confirmMessage = $('.woocommerce-message'),
        $confirmMsgDestination = $('.woocommerce-message'),
        $wooAddress = $('.woocommerce-edit-address'),
        $wooEditAccount = $('.woocommerce-edit-account');

    if ($errorMessage.length) {
        if ($("#customer_login").length) {
            $errorMessage.appendTo("#customer_login");
        }
        else if ($(".woocommerce-lost-password").length) {
            $errorMsgDestination = $(".woocommerce-lost-password .lost_reset_password .form-row .button").parents('.form-row');
            $errorMessage.appendTo($errorMsgDestination);
        }
        else if ($(".woocommerce-edit-account").length) {
            $errorMsgDestination = $('.woocommerce-edit-account .woocommerce form');
            $errorMessage.appendTo($errorMsgDestination);
        }
    }

    if ($confirmMessage.length) {
        if ($(".woocommerce-lost-password").length) {
            $confirmMsgDestination = $(".woocommerce-lost-password .lost_reset_password .form-row .button").parents('.form-row');
            $confirmMessage.appendTo($confirmMsgDestination);
        }

        if ($(".woocommerce-account.logged-in").length) {
            $confirmMsgDestination = $(".woocommerce-account.logged-in .woocommerce .right-col").parents('.woocommerce ');
            $confirmMessage.appendTo($confirmMsgDestination);
        }
    }

    if ($wooAddress.length) {
        title = $wooAddress.find('form h3').text();
        article = '<article class="account-title"> <h1>' + title + '</h1> <h3></h3> </article>';
        $('.woocommerce').prepend(article);

        $errorMessage.appendTo('.woocommerce-edit-address form');
    }

    /* Tab settings for profile page */

    var $editAccountPass = $('.custom-edit-pass-account'),
        $editBilling = $('.custom-edit-billing'),
        $editShipping = $('.custom-edit-shipping'),
        $tabs = $('.woocommerce-account.logged-in .woocommerce .left-col .tabs');

    $tabs.click(function (e) {

        e.preventDefault();

        $tabs.removeClass('active');
        $(this).addClass('active');

        $editAccountPass.removeClass('active');
        $editBilling.removeClass('active');
        $editShipping.removeClass('active');

        $(this).addClass('active');

        // show hide tab content

        $editAccountPass.fadeOut(100);
        $editBilling.fadeOut(100);
        $editShipping.fadeOut(100);

        if ($(this).hasClass('account-pass')) {

            $editShipping.stop(true, false).fadeOut(1);
            $editBilling.stop(true, false).fadeOut(1);

            $editAccountPass.delay(200).fadeIn(300);
        }
        else if ($(this).hasClass('billing-address')) {

            $editAccountPass.stop(true, false).fadeOut(1);
            $editShipping.stop(true, false).fadeOut(1);

            $editBilling.delay(200).fadeIn(300);

        }
        else if ($(this).hasClass('shipping-address')) {

            $editAccountPass.stop(true, false).fadeOut(1);
            $editAccountPass.stop(true, false).fadeOut(1);

            $editShipping.delay(200).fadeIn(300);
        }

    });

    //Shop Page responsive function
    if ($(window).width() < 1025) {
        $('.thumb-image').click(function () {
            if ($(this).parent().siblings('.add_to_cart_button').css('bottom') == '-50px') {
                $(this).trigger('mouseenter');
                return false;
            }
        })
    }
}

// Slick slider carousel
function pixflow_slickSlider(id, slides, autoPlayOpt) {
    "use strict";
    var dotsOpt = true;

    if (typeof autoPlayOpt == 'undefined') {
        autoPlayOpt = false
        dotsOpt = false;
    }

    var $idTMSlick = id.find('.slides'),
        $teamImg = id.find('.teammember-image'),
        $teamImgHeight = ($(window).width() <= 768 ) ? 330 : ($idTMSlick.width() / slides),
        slickWidth = ($(window).width() <= 768 ) ? id.parents('.box_size_container').width() : id.parent().width();

    id.css('width', slickWidth);

    //$teamImg.css('height', $teamImgHeight);
    $teamImg.css('height', 365);

    if (slides == 1)
        $teamImg.css('width', '100%');

    if ($idTMSlick.hasClass('slick-initialized')) {
        $idTMSlick.slick('unslick');
    }

    if (typeof $idTMSlick.slick == 'function') {
        $idTMSlick.slick({
            infinite: true,
            autoplay: autoPlayOpt,
            dots: dotsOpt,
            slidesToShow: slides,
            slidesToScroll: slides,
            speed: 1000,
            cssEase: 'ease',
            responsive: [
                {
                    breakpoint: 760,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    }

}

function pixflow_post_carousel() {
    $('.your-element').on('beforeChange', function (event, slick, currentSlide, nextSlide) {

        $('.post-wrap').hasClass(".slick-center").css({'opacity': '1'});
    });
}

function pixflow_teammemberCarousel($id) {
    "use strict";

    if ($id == 'resized') {
        var $wrap = $('.wrap-teammember-style2,.wrap-client-carousel'),
            id = '';
        $wrap.each(function () {

            id = $(this).attr('id');
            $idTM = $('#' + $(this).attr('id'));
            if (($idTM.parents('.col-sm-12').length || $idTM.parents('.vc_layout_1').length) && $idTM.parents('.col-sm-12').width() >= 768) {
                if (id.indexOf('team') >= 0)
                    pixflow_slickSlider($idTM, 3);
                else {
                    var autoplay = ( $(this).attr('data-autoplay') == 'no') ? false : true,
                        slide = parseInt($(this).attr('data-slide-item'));

                    pixflow_slickSlider($idTM, slide, autoplay);
                }
            }
            else if ($idTM.parents('.col-sm-10').length && $idTM.parents('.col-sm-10').width() >= 768) {

                if (id.indexOf('team') >= 0)
                    pixflow_slickSlider($idTM, 3);
                else {
                    var autoplay = ( $(this).attr('data-autoplay') == 'no') ? false : true,
                        slide = parseInt($(this).attr('data-slide-item'));

                    pixflow_slickSlider($idTM, slide, autoplay);
                }
            }
            else if ($idTM.parents('.col-sm-9').length && $idTM.parents('.col-sm-9').width() >= 768) {

                if (id.indexOf('team') >= 0)
                    pixflow_slickSlider($idTM, 3);
                else {
                    var autoplay = ( $(this).attr('data-autoplay') == 'no') ? false : true,
                        slide = parseInt($(this).attr('data-slide-item'));

                    pixflow_slickSlider($idTM, slide, autoplay);
                }
            }
            else if ($idTM.parents('.col-sm-8').length && $idTM.parents('.col-sm-9').width() >= 768) {

                if (id.indexOf('team') >= 0)
                    pixflow_slickSlider($idTM, 3);
                else {
                    var autoplay = ( $(this).attr('data-autoplay') == 'no') ? false : true,
                        slide = parseInt($(this).attr('data-slide-item'));

                    pixflow_slickSlider($idTM, slide, autoplay);
                }
            }
            else if ($idTM.parents('.col-sm-6').length || $(window).width() <= 768) {
                if (id.indexOf('team') >= 0)
                    pixflow_slickSlider($idTM, 2);
                else {
                    var autoplay = ( $(this).attr('data-autoplay') == 'no') ? false : true,
                        slide = parseInt($(this).attr('data-slide-item'));

                    pixflow_slickSlider($idTM, slide, autoplay);
                }

            }
            else if ($idTM.parents('.col-sm-4').length || $idTM.parents('.layout_3').length) {
                if (id.indexOf('team') >= 0)
                    pixflow_slickSlider($idTM, 1);
                else {
                    var autoplay = ( $(this).attr('data-autoplay') == 'no') ? false : true,
                        slide = parseInt($(this).attr('data-slide-item'));

                    pixflow_slickSlider($idTM, slide, autoplay);
                }
            }
            else if ($idTM.parents('.col-sm-3').length || $idTM.parents('.layout_4').length) {
                if (id.indexOf('team') >= 0)
                    pixflow_slickSlider($idTM, 1);
                else {
                    var autoplay = ( $(this).attr('data-autoplay') == 'no') ? false : true,
                        slide = parseInt($(this).attr('data-slide-item'));

                    pixflow_slickSlider($idTM, slide, autoplay);
                }
            }
            else if ($idTM.parents('.col-sm-2').length || $(window).width() <= 480) {
                pixflow_slickSlider($idTM, 1);
            }

        })
    }
    else if ($('.teammember-image').length || $('.client-logo').length) {

        var $idTM = $('#' + $id);

        if (($idTM.parents('.col-sm-12').length || $idTM.parents('.vc_layout_1').length) && $idTM.parents('.col-sm-12').width() >= 768) {
            if ($id.indexOf('team') >= 0)
                pixflow_slickSlider($idTM, 3);
            else {
                var autoplay = ( $idTM.attr('data-autoplay') == 'no') ? false : true,
                    slide = $idTM.attr('data-slide-item');

                pixflow_slickSlider($idTM, slide, autoplay);
            }
        }
        else if ($idTM.parents('.col-sm-10').length && $idTM.parents('.col-sm-10').width() >= 768) {
            if ($id.indexOf('team') >= 0)
                pixflow_slickSlider($idTM, 3);
            else {
                var autoplay = ( $idTM.attr('data-autoplay') == 'no') ? false : true,
                    slide = $idTM.attr('data-slide-item');

                pixflow_slickSlider($idTM, slide, autoplay);
            }
        }
        else if ($idTM.parents('.col-sm-9').length && $idTM.parents('.col-sm-9').width() >= 768) {

            if ($id.indexOf('team') >= 0)
                pixflow_slickSlider($idTM, 3);
            else {
                var autoplay = ( $idTM.attr('data-autoplay') == 'no') ? false : true,
                    slide = $idTM.attr('data-slide-item');

                pixflow_slickSlider($idTM, slide, autoplay);
            }
        }
        else if ($idTM.parents('.col-sm-8').length && $idTM.parents('.col-sm-9').width() >= 768) {
            if ($id.indexOf('team') >= 0)
                pixflow_slickSlider($idTM, 3);
            else {
                var autoplay = ( $idTM.attr('data-autoplay') == 'no') ? false : true,
                    slide = $idTM.attr('data-slide-item');

                pixflow_slickSlider($idTM, slide, autoplay);
            }
        }
        else if ($idTM.parents('.col-sm-6').length || $(window).width() <= 768) {
            if ($id.indexOf('team') >= 0)
                pixflow_slickSlider($idTM, 2);
            else {
                var autoplay = ( $idTM.attr('data-autoplay') == 'no') ? false : true,
                    slide = $idTM.attr('data-slide-item');

                pixflow_slickSlider($idTM, slide, autoplay);
            }
        }
        else if ($idTM.parents('.col-sm-4').length || $idTM.parents('.layout_3').length) {

            if ($id.indexOf('team') >= 0)
                pixflow_slickSlider($idTM, 1);
            else {
                var autoplay = ( $idTM.attr('data-autoplay') == 'no') ? false : true,
                    slide = $idTM.attr('data-slide-item');

                pixflow_slickSlider($idTM, slide, autoplay);
            }
        }
        else if ($idTM.parents('.col-sm-3').length || $idTM.parents('.layout_4').length) {

            if ($id.indexOf('team') >= 0)
                pixflow_slickSlider($idTM, 1);
            else {
                var autoplay = ( $idTM.attr('data-autoplay') == 'no') ? false : true,
                    slide = $idTM.attr('data-slide-item');

                pixflow_slickSlider($idTM, slide, autoplay);
            }
        }
        else if ($idTM.parents('.col-sm-2').length || $(window).width() <= 480) {
            pixflow_slickSlider($idTM, 1);
        }

    }

}

function pixflow_recentViewedWidget() {
    "use strict";

    var $productList = $('.widget_recently_viewed_products .product_list_widget li'),
        imgSrc,
        amountHtml,
        productTitle;

    if ($productList.length < 1) return;

    $productList.each(function () {

        imgSrc = $(this).find('img').attr('src');
        amountHtml = $(this).find('.amount').html();
        productTitle = $(this).find('.product-title').html();

        $(this).find('img').remove();
        $(this).find('.amount').remove();
        $(this).find('.product-title').remove();
        $(this).find('del').remove();
        $(this).find('ins').remove();

        $(this).find('a').append('' +
            '<div class="product-list-widget-img" style="background-image: url(' + imgSrc + ')"></div>' +
            '<div class="overlay"></div>' +
            '<div class="product-details">' +
            '<span class="product-title">' + productTitle + '</span>' +
            '<br>' +
            '<span class="amount">' + amountHtml + '</span>' +
            '</div>');
    });
}

function pixflow_topRatedWidget() {
    "use strict";

    var $productList = $('.widget_top_rated_products .product_list_widget li'),
        imgSrc,
        amountHtml,
        productTitle,
        starRating;

    if ($productList.length < 1) return;

    $productList.each(function () {

        imgSrc = $(this).find('img').attr('src');
        amountHtml = $(this).find('.amount').html();
        productTitle = $(this).find('.product-title').html();

        if ($(this).find('.star-rating').length >= 1)
            starRating = '<div class="star-rating">' + $(this).find('.star-rating').html() + '</div>';
        else
            starRating = '';

        $(this).find('img').remove();
        $(this).find('.amount').remove();
        $(this).find('.product-title').remove();
        $(this).find('.star-rating').remove();

        $(this).find('a').append('' +
            '<div class="product-list-widget-img" style="background-image: url(' + imgSrc + ')"></div>' +
            '<div class="overlay"></div>' +
            '<div class="product-details">' +
            '<span class="product-title">' + productTitle + '</span>' +
            starRating +
            '<span class="amount">' + amountHtml + '</span>' +
            '</div>');
    });
}

function pixflow_layeredNav() {
    "use strict";

    $('.dropdown_layered_nav_color option').css({'background-color': 'rgba(255,255,255,0.9)'});
}

var clearTime;
function pixflow_notificationCenter() {
    "use strict";

    if (!$('.notification-center').length)
        return;

    var monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct",
            "Nov", "Dec"
        ],
        date = new Date(),
        day = date.getDate(),
        monthIndex = date.getMonth(),
        year = date.getFullYear(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        ampm = hour > 12 ? "PM" : "AM";

    hour = hour % 12;
    hour = hour ? hour : 12; // zero = 12

    minute = minute > 9 ? minute : "0" + minute;
    hour = hour > 9 ? hour : "0" + hour;

    $('.notification-center .header .date').text(monthNames[monthIndex] + ',' + day + ',' + year);
    $('.notification-center .header .time').text(hour + ":" + minute + " " + ampm);

    function pixflow_liveTime() {
        'use strict';

        clearTime = setTimeout(function () {
            var date = new Date(),
                hour = date.getHours(),
                minute = date.getMinutes(),
                ampm = hour > 12 ? "PM" : "AM";
            hour = hour % 12;
            hour = hour ? hour : 12; // zero = 12

            minute = minute > 9 ? minute : "0" + minute;
            hour = hour > 9 ? hour : "0" + hour;
            $('.notification-center .header .time').html(hour + ":" + minute + " " + ampm);
            pixflow_liveTime();
        }, 20000);
    }

    $('header .icons-pack .elem-container').click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        if ($('.notification-center').hasClass('close')) {
            pixflow_liveTime();

            if ($(this).hasClass('shopcart')) {
                $('.notification-center .pager a.shop').click();
            }
            else if ($(this).hasClass('search')) {
                $('.notification-center .pager a.search').click();
            }
            else {
                var newval;
                if (pixflow_detectPosition() == 'front-end') {
                    newval = themeOptionValues.activeNotificationTab;
                } else {
                    var elem = pixflow_customizerObj().$('#input_active_tab_sec')[0];
                    newval = $(elem).val();
                }

                $('.notification-center .pager a.' + newval).click();
            }


            $('.notification-center').removeClass('close').addClass('open');
            $('.layout-container').addClass('blur');
            $('.notification-center ').css({'z-index': '99999', 'opacity': 1});
            $('.notification-center ').delay(250).animate({'height': '100%'}, 600, function () {
            });
            $('.notification-center .header,.notification-center #notification-tabs').animate({'opacity': 1}, 200);
            $('.notification-center .notification-collapse').delay(1000).animate({'opacity': .5});
        }
        $('.notification-center .cart_list').niceScroll(
            {
                horizrailenabled: false,
                cursorcolor: "#ccc",
                cursorborder: "1px solid #ddd",
                cursorwidth: '2px',
                scrollspeed: 100,
                mousescrollstep: 80
            }
        );

    });

    $('header .icons-pack .elem-container').one("click", function () {
        $(window).resize();
    });

    $('.tabs-container .tab-cell').css('height', $(window).height() - $('.tabs-container').offset().top - $('.notification-collapse-area').height());

    var $natificationTabs = $('.tabs-container').flickity({
        prevNextButtons: false,
        pageDots: false,
        draggable: false,
        selectedAttraction: 0.016,
        friction: 0.22,
        freeScroll: true,
        freeScrollFriction: 0.05
    });
    // Flickity instance
    var flkty = $natificationTabs.data('flickity');
// elements
    var $cellButtonGroup = $('.pager');
    var $cellButtons = $cellButtonGroup.find('.tab-item');
    var $tabs = $('.tabs-container');

// update selected cellButtons
    $natificationTabs.on('cellSelect', function () {
        $cellButtons.filter('.is-selected')
            .removeClass('is-selected');
        $cellButtons.eq(flkty.selectedIndex)
            .addClass('is-selected');

    });

// select cell on button click
    $cellButtonGroup.on('click', '.tab-item', function () {
        var index = $(this).index();
        var $tabItem = $tabs.find('.tab-cell');
        $tabItem.css({opacity: 0.2});
        $tabItem.stop().animate({opacity: 0}, 200);
        $natificationTabs.flickity('select', index);
        var selected = $tabs.find('.tab-cell.is-selected');
        selected.stop().animate({opacity: 1}, 800);

    });

    var extra = 0;
    $('.notification-center div[id *= "opt"] > .clearfix').each(function () {
        var width = $(this).find('.tab-item,.mini_cart_item').length * $(this).find('.tab-item:first,.mini_cart_item:first').outerWidth(true);
        var count = Math.floor($(window).width() * 90 / 100 / $(this).find('.tab-item:first,.mini_cart_item:first').outerWidth(true));
        var extra = $(window).width() * 90 / 100 - count * $(this).find('.tab-item:first,.mini_cart_item:first').outerWidth(true);
        if (width > $(window).width() * 90 / 100) {
            $(this).find('.tab-item,.mini_cart_item').css('float', 'left');
            $(this).find('.absolute').css({'position': 'absolute', 'width': $(window).width() * 90 / 100 - extra});
            $(this).css({'width': $(window).width() * 90 / 100 - extra});
        } else {
            $(this).css({'width': $(window).width() * 90 / 100})
        }
    });

    $('.notification-center .tabs-container,.notification-center .notification-collapse,.notification-collapse-area').click(function (e) {
        if (e.target != this) {
            return;
        }
        $('.notification-center .notification-collapse').animate({opacity: 0}, 200);
        $('.notification-center').removeClass('open').addClass('close');
        clearInterval(clearTime);
        $('.notification-center .header,.notification-center #notification-tabs').animate({'opacity': 0}, 100);
        $('.notification-center ').animate({'height': '0'}, 600, function () {
            $('.notification-center ').css({'z-index': '-99', 'opacity': 0});
        });
        $('.layout-container').removeClass('blur');
        $('.notification-tab .input-holder').css({'margin-top': '200px'});
        $('.notification-tab #search-input').val("");
        $('.notification-tab #result-container').html("");

    });

    $('.notification-center ul li a,.notification-center #notification-tabs').click(function (event) {
        event.stopPropagation();
    });

    var height = $(window).height() - $('.notification-center .header').outerHeight(true) - $('.notification-center .pager').outerHeight(true) - 100/*collaps btn */;

    $('.notification-center .protfolio-tab .portfolio,.notification-center .posts-tab .posts').css({maxHeight: height + 'px'});

    var width = 100,
        windowWidth = $(window).width() - 100;

    if ($('.notification-center  .protfolio-tab .portfolio ').length) {

        if (windowWidth > 240 * 5) {
            width = 240 * 5;
        } else {
            var num = windowWidth / 240;
            width = num * 240;
        }

        $('.notification-center .portfolio').css({width: width + 'px'});

        $('.notification-center .protfolio-tab .portfolio').css({maxHeight: height + 'px'});
        $('.notification-center .protfolio-tab .portfolio').niceScroll({
            horizrailenabled: false,
            cursorcolor: "#ccc",
            cursorborder: "1px solid #ddd",
            cursorwidth: '2px',
            scrollspeed: 100,
            mousescrollstep: 80
        });

    }

    if ($('.notification-center .posts-tab .posts').length) {

        $('.notification-center .posts-tab .posts').css({maxHeight: height + 'px'});
        $('.notification-center .posts-tab .posts').niceScroll({
            horizrailenabled: false,
            cursorcolor: "#ccc",
            cursorborder: "1px solid #ddd",
            cursorwidth: '2px',
            scrollspeed: 100,
            mousescrollstep: 80
        });
    }

    if ($('#result-container').length) {
        var height = $(window).height() - $('.notification-center .header').outerHeight(true) - $('.notification-center .pager').outerHeight(true) - $('.input-holder').outerHeight(true) - $('.search-title').outerHeight(true);
        $('#result-container').css({maxHeight: height + 'px'});
        $('#result-container').niceScroll({
            horizrailenabled: false,
            cursorcolor: "#ccc",
            cursorborder: "1px solid #ddd",
            cursorwidth: '2px',
            scrollspeed: 100,
            mousescrollstep: 80
        });
    }

}

function pixflow_sidebarWidgets() {
    "use strict";

    var $widgets = $('.sidebar > .widget');

    if ($widgets.length) {
        $widgets.addClass('clearfix');
    }
}

function pixflow_ajaxSearch() {
    'use strict';

    if (!$("#search-input").length) {
        return;
    }

    var timeOut = null;

    $("#search-input").keyup(function () {

        var $input = $(this),
            query = $input.val(),
            $content = jQuery('#result-container');

        clearTimeout(timeOut);
        if (query == '') {
            $content.fadeOut();
            return;
        }

        timeOut = setTimeout(function(){

            jQuery.ajax({
                type: 'post',
                url: ajax_var.url,
                data: {
                    action: 'pixflow_load_search_results',
                    query: query
                },
                beforeSend: function () {
                    $input.siblings('.clear-button').addClass('searching');
                    $content.fadeOut();
                },
                success: function (response) {
                    $input.siblings('.clear-button').removeClass('searching');
                    if ($content.html() == "") {
                        TweenMax.to($input.parent(), .5, {
                            'margin-top': '0', onComplete: function () {
                                $content.html(response);

                                $content.fadeIn('slow');
                                TweenMax.staggerFromTo($content.find('.item'), 0.5, {opacity: '0'}, {opacity: '1'}, .1);
                            }
                        });
                    } else {
                        $content.html(response);

                        $content.fadeIn('slow');
                        TweenMax.staggerFromTo($content.find('.item'), 0.5, {opacity: '0'}, {opacity: '1'}, .1);
                    }
                    if (pixflow_detectPosition() != 'front-end') {
                        setTimeout(function () {
                            $('#result-container a').click(function (e) {
                                e.preventDefault();
                                if ($(this).attr('href') == '#' || $(this).attr('href') == '' || $(this).attr('href') == undefined)return;
                                window.top.pixflow_customizerLoading();
                                window.top.wp.customize.previewer.previewUrl($(this).attr('href'));
                            })
                        }, 550)
                    }
                }
            });
        }, 1000);


        return false;
    });

    $('#notification-tabs .clear-button').click(function () {
        $(this).siblings('#search-input').val("").focus();
    });
}

var enteredResponsive = false;
function pixflow_responsive() {
    'use strict';

    $(".px_tabs_nav.md-custom-tab>li>a , .wpb_accordion_header a,.wpb_toggle_header a").click(function(){
        window.dispatchEvent(new Event('resize'));
    });

    if($('main').length<1 || $('footer').length<1 || $('header').length<1 || $('body .layout-container > .layout').length<1)
        return false;


    var width = window.outerWidth,
        mainWidth = parseInt($('main')[0].style.width),
        footerWidth = parseInt($('footer')[0].style.width),
        headerWidth = parseInt($('header')[0].style.width),
        layoutWidth = parseInt($('body .layout-container > .layout')[0].style.width);


    $(".skill-style1").each(function () {
        pixflow_skill_style1($(this));
    });

    //Tablet and Phone
    if (width < 1279) {
        if(!$('body').hasClass('compose-mode')){
            $('.md-text-title,.md-text-title *, .meditor, .meditor span, .meditor b, .meditor u, .meditor i ').each(function () {
                if (parseInt($(this).css('font-size')) > parseInt($(this).css('line-height'))) {
                    $(this).css('line-height', $(this).css('font-size'));
                }
                if (parseInt($(this).css('font-size')) > 50) {
                    $(this).css({'font-size': '50px', 'line-height': '56px'});
                }
            });
        }

        //Fixing tab width issue
        $('div[class^="md_tabs"],div[class*=" md_tabs"]').each(function () {

            var $obj = $(this).parents('div[class*="vc_col"]'),
                objClass = $obj.attr('class');
            objClass = objClass.substr(objClass.indexOf('-sm') + 4, objClass.length);

            var colWidth = parseInt(objClass);
            colWidth = colWidth / 12;
            colWidth = width / colWidth;

            $(this).css('max-width', colWidth);
        })

        $('.vc_column-inner').each(function () {


            if (width <= 800 && ($(this).parent().hasClass('responsive-full-width') || $(this).parent().hasClass('responsive-col-50'))) {
                /*these two classes run in screen under 800px */
                var padding = "padding-left :3% !important; padding-right:3% !important;"
                $(this).attr('style', padding);
                return true;
            }


            var padding = "",
                leftPadding, rightPadding;
            if (parseInt($(this).css('padding-left')) > 10) {
                leftPadding = parseInt($(this).css('padding-left'));
                padding = 'padding-left: 3%!important;';
            }

            if (parseInt($(this).css('padding-right')) > 10) {
                rightPadding = parseInt($(this).css('padding-right'));
                padding += 'padding-right: 3%!important;';
            }

            if (padding != "") {
                $(this).attr('data-normal-padding-right', rightPadding);
                $(this).attr('data-normal-padding-left', leftPadding);
                $(this).attr('style', padding);
            }
        });

        if (width < 768) {
            $('.md-text ').each(function () {
                var $title = $(this).find('.md-text-title'),
                    $title2 = $(this).find('.md-text-title span'),
                    $desc = $(this).find('.md-text-content');
                if (parseInt($title.css('font-size')) > 35) {
                    $title.css({'font-size': '35px', 'line-height': '40px', height: 'auto'});
                }
                if (parseInt($title2.css('font-size')) > 35) {
                    $title2.css({'font-size': '35px', 'line-height': '40px', height: 'auto'});
                }
                if (parseInt($title.css('font-size')) > parseInt($title.css('line-height'))) {
                    $title.css('line-height', 'auto');
                }
                if (parseInt($title2.css('font-size')) > parseInt($title2.css('line-height'))) {
                    $title2.css('line-height', 'auto');
                }
                if (parseInt($desc.css('font-size')) > 20) {
                    $desc.css({'font-size': '20px', 'line-height': '30px'});
                }
                if (parseInt($desc.css('font-size')) > parseInt($desc.css('line-height'))) {
                    $desc.css('line-height', $desc.css('font-size'));
                }
            });

            $('.meditor span, .meditor b, .meditor u, .meditor i').each(function () {

                var $live_text = $(this);

                if ( parseInt( $live_text.css('font-size') ) > 35 ) {
                    $live_text.css( { 'font-size': '35px', 'line-height': '40px', height: 'auto' } );
                }

                if ( parseInt( $live_text.css('font-size') ) > parseInt( $live_text.css('line-height') ) ) {
                    $live_text.css( 'line-height', 'auto' );
                }

            });

        }


        if (mainWidth < 94) {
            $('main').css('width', '94%');

            if (footerWidth < 94) {
                $('footer').css('width', '94%');
            }

        }

    }

    if (width <= 1280) {
        if ($('main').hasClass('retina-screen-main')) {
            if ($('header').hasClass('top')) {
                var wrapSize;
                setTimeout(function () {
                    if ($('main').find('.wrap').attr('style') !== undefined && $('main').find('.wrap').attr('style').search('width') !== -1) {
                        wrapSize = parseInt($('main').find('.wrap')[0].style.width);
                    }
                    else {
                        if ($('main').attr('style') !== undefined && $('main').attr('style').search('width') !== -1) {
                            wrapSize = parseInt($('main')[0].style.width);
                        }
                        else {
                            wrapSize = 90;
                        }
                    }
                    var $headerWidthContent = [
                        parseInt($('header')[0].style.width),
                        parseInt($('header').find('.content')[0].style.width),
                        wrapSize ,
                        parseInt($('main')[0].style.width)
                    ];
                    if( $headerWidthContent[0] == $headerWidthContent[3] && $headerWidthContent[1] == 100 ){
                        return ;
                    }
                    if ($headerWidthContent[0] !== 100 && $headerWidthContent[1] != 100) {
                        $('header').find('.content').css('width', '100%');
                    } else if ($headerWidthContent[0] == 100 && $headerWidthContent[1] !== 100) {
                        $('header').find('.content').css('width', $headerWidthContent[2] + '%');
                    } else if ($headerWidthContent[1] == 100 && $headerWidthContent[0] !== 100) {
                        $('header').css('width', '90%');
                    }
                }, 1000);

                if (layoutWidth != null) {
                    layoutWidth = parseInt(layoutWidth);
                    if (layoutWidth <= 75 && $('body').hasClass('single-post')) {
                        $('body .layout-container > .layout').css({'width': '85%'});
                    }
                }
            }
        }
        //flag for resizing back to desktop
        enteredResponsive = true;

        //disable animation on tablet and phone
        $('.has-animation').removeClass('has-animation');
        var $widgetArea = $('.widget-area'),
            $widgetAreaColumn = $('.widget-area .widget-area-column');
        if ($widgetAreaColumn.length) {
            var maxHeight = 0;
            $widgetAreaColumn.each(function () {
                var height = $(this).find('.wrapContent').outerHeight(true) + (parseInt($(this).css('padding-top')) * 2);
                if (maxHeight < height) {
                    maxHeight = height;
                }
            });
            if ($(document).width() >= 767 || $('body').hasClass('responsive-mode')) {
                if ($widgetArea.hasClass('border')) {
                    $widgetArea.css({height: maxHeight + 100});
                    $widgetAreaColumn.css({height: maxHeight});
                } else {
                    $widgetAreaColumn.css({height: maxHeight});
                }
            }

            if ($('main').hasClass('retina-screen-main')) {
                var marginTop = $('footer .content-holder').outerHeight(true) - $('footer .widget-area').outerHeight(true);
                $('footer .widget-area').css({'margin-top': marginTop});
            }
        }


        if (pixflow_isTouchDevice() == true) {
            $('.portfolio-nav').css("cssText", "width: 100% !important;");
        }
    }


    if (width <= 1440 && width > 1024) {
        var precent = (width * 100) / 1900;
        precent = Math.floor(precent) / 100;
        var paddingLeft, paddingRight;
        $('.vc_column-inner').each(function () {
            var padding = "",
                left = ( parseInt($(this).css('padding-left')) > 100) ? 100 : parseInt($(this).css('padding-left')),
                right = ( parseInt($(this).css('padding-right')) > 100 ) ? 100 : parseInt($(this).css('padding-right')),
                leftPadding = left * precent,
                rightPadding = right * precent;
            if (typeof rightPadding !== 'undefined' || typeof leftPadding !== 'undefined') {
                paddingLeft = leftPadding + "px !important;";
                paddingRight = rightPadding + "px !important;";
                $(this).css({paddingRight:'',paddingLeft:''});
                var addStyle = '';
                var styles = $(this).attr('style');
                if ( typeof styles != "undefined" ) {
                    addStyle += styles;
                }
                addStyle += 'padding-left : ' + paddingLeft + ' padding-right :' + paddingRight + '"';
                addStyle = addStyle.replace(/undefined/gi, "");

                $(this).attr('style', addStyle);
            }
        });
    }

    //Laptop
    if (width <= 1440 && width > 1280) {

        //flag for resizing back to desktop
        enteredResponsive = true;

        //increasing layout size
        var boxSize = $('.sectionOverlay .box_size_container, .sectionOverlay.box_size');
        boxSize.each(function () {
            var wrapWidth = parseInt($(this).css('width')) / $('main').width() * 100;
            if (wrapWidth < 90) {
                $(this).css('width', '90%');
            }
        });
        if ($('header').hasClass('top')) {
            var wrapSize;
            setTimeout(function () {
                if ($('main').find('.wrap').attr('style') !== undefined && $('main').find('.wrap').attr('style').search('width') !== -1) {
                    wrapSize = parseInt($('main').find('.wrap')[0].style.width);
                }
                else {
                    if ($('main').attr('style') !== undefined && $('main').attr('style').search('width') !== -1) {
                        wrapSize = parseInt($('main')[0].style.width);
                    }
                    else {
                        wrapSize = 90;
                    }
                }
                var $headerWidthContent = [
                    parseInt($('header')[0].style.width),
                    parseInt($('header').find('.content')[0].style.width),
                    wrapSize ,
                    parseInt($('main')[0].style.width)
                ];
                if( $headerWidthContent[0] == $headerWidthContent[3] && $headerWidthContent[1] == 100 ){
                    return ;
                }
                if ($headerWidthContent[0] !== 100 && $headerWidthContent[1] != 100) {
                    $('header').find('.content').css('width', '100%');
                } else if ($headerWidthContent[0] == 100 && $headerWidthContent[1] !== 100) {
                    $('header').find('.content').css('width', $headerWidthContent[2] + '%');
                } else if ($headerWidthContent[1] == 100 && $headerWidthContent[0] !== 100) {
                    $('header').css('width', '90%');
                }
            }, 1000);
        }
        //Widget area
        var widgetArea = parseInt($('footer .widget-area').css('width')) / $('footer').width() * 100;
        if (widgetArea < 100) {
            $('footer .widget-area, footer .content').css('width', '100%');
        }

        //Single blog width
        var layout = parseInt($('.layout').css('width')) / $('body').width() * 100;
        if (layout < 88) {
            $('.layout').css('width', '88%');
        }


        //Changing Typographies
        $('.md-text-title,.md-text-title * ').each(function () {

            if (parseInt($(this).css('font-size')) > parseInt($(this).css('line-height'))) {
                $(this).css('line-height', $(this).css('font-size'));
            }
            if (parseInt($(this).css('font-size')) > 85) {
                if ($(this).find('.texts').length) {

                } else {
                    $(this).css({'font-size': '85px', 'line-height': '85px'});
                }
            }
        });


        if (mainWidth < 75) {

            $('main').attr('data-normal-main-width', mainWidth).css('width', '75%');

            if (footerWidth < 75) {
                $('footer').attr('data-normal-footer-width', footerWidth).css('width', '75%');
            }

            if (headerWidth < 75) {
                $('header').attr('data-normal-header-width', headerWidth).css('width', '75%');
            }
            if (!$('.business').hasClass('business-off')) {
                $('.business').css('width', $('header.top').width() + 'px');

            }

        } else if (mainWidth > 75 && mainWidth < 90) {

            $('main').attr('data-normal-main-width', mainWidth).css('width', '90%');

            if (footerWidth > 75 && footerWidth < 90) {
                $('footer').attr('data-normal-footer-width', footerWidth).css('width', '90%');
            }

        }


        //Reducing extra padding space
        $('.vc_column_container').each(function () {
            if (parseInt($(this).css('padding-left')) > 30) {
                $(this).css("cssText", "padding-left: 30px !important;");
            }
            if (parseInt($(this).css('padding-right')) > 30) {
                $(this).css("cssText", "padding-right: 30px !important;");
            }
        })

        //Side header responsive
        if ($('header').hasClass('side-classic')) {
            var headerWidthClassic = parseInt($('header').css('width')) / $('.layout').width() * 100;
            if (headerWidthClassic < 15) {
                $('header').css('width', '15%');
                $('.layout > .wrap').css({'width': '85%', 'margin-left': '15%'});
                //assigning new width for portfolio detail navigation
                $('.portfolio-nav').css("cssText", "width: 85% !important;");
            }
        }

        //Masonry Blog Responsive
        $('[id^=blog-masonry]').each(function () {
            if ($(this).width() < 830) {
                $(this).find('.blog-masonry-container').css('width', 'calc(100% / 2 - 30px)');
            }
        });

    }

    //Desktop
    if (width > 1440) {
        if (enteredResponsive == true) {

            $('main').css('width', $('main').attr('data-normal-main-width') + '%');
            $('footer').css('width', $('footer').attr('data-normal-footer-width') + '%');
            $('header').css('width', $('header').attr('data-normal-header-width') + '%');

            $('.vc_column-inner').each(function () {
                var padding = "",
                    leftPadding, rightPadding;
                if ($(this).attr('data-normal-padding-left')) {
                    padding = 'padding-left:' + $(this).attr('data-normal-padding-left') + 'px !important;';
                }
                if ($(this).attr('data-normal-padding-right')) {
                    padding += 'padding-right:' + $(this).attr('data-normal-padding-right') + 'px !important;';
                }
                if (padding != '') {
                    $(this).attr('style', padding);
                }
            });
        }
    }

    //Laptop and Desktop
    if (width > 1280) {
        $('div[class^="md_tabs"],div[class*=" md_tabs"]').each(function () {

            $(this).css('max-width', 'none');
        })
    }

    //Phone
    if (width <= 800) {
        // imageBoxSlider
        $('.img-box-slider .slides').css({'max-height': $(window).height()});
        $('.img-box-slider').find('.slides > li').each(function () {
            var thist = $(this);
            setTimeout(function () {
                var imgw = thist.find('.imgBox-image').attr('data-width');
                var imgh = thist.find('.imgBox-image').attr('data-height');
                var parentw = thist.find('.imgBox-image').width();
                var parenth = thist.find('.imgBox-image').height();
                if (imgw < parentw && imgh < parenth) {
                    thist.find('.imgBox-image').attr('style', 'background-size:auto !important');
                }
            }, 100);
        });
        if (width >= 768) {
            $('.pixflow-price-table').each(function () {
                var col = $(this).closest('.vc_column_container').attr('class');

                var re7 = '((?:[a-z][a-z]+))';	// Word 1
                var re8 = '(-)';	// Any Single Character 2
                var re9 = '(\\d+)';	// Integer Number 1

                var p = new RegExp(re7 + re8 + re9, ["i"]);
                var m = p.exec(col);
                if (m != null) {
                    col = parseInt(m[3]);
                }

                if (col > 2) {
                    $(this).closest('.vc_column_container').addClass('responsive-col-50');
                }
            })
        }
    }


    //calling functions
    for (var func in responsive_functions) {
        // skip loop if the property is from prototype
        if (!responsive_functions.hasOwnProperty(func)) continue;
        if(!responsive_functions[func].hasOwnProperty('params')) {
            var params = responsive_functions[func];
            var responsive_condition = true;
        }else{
            var params = responsive_functions[func].params;
            var view_size = responsive_functions[func].view_size;
            var responsive_condition = true;
            for(var i in view_size){
                switch (i){
                    case 'less':
                        if( width < view_size[i]  ){
                            responsive_condition = responsive_condition && true;
                        }else{
                            responsive_condition =  false;
                        }
                        break;
                    case 'less_equal':
                        if( width <=  view_size[i] ){
                            responsive_condition = responsive_condition && true;
                        }else{
                            responsive_condition =  false;
                        }
                        break;
                    case 'great':
                        if(  width  > view_size[i]  ){
                            responsive_condition = responsive_condition && true;
                        }else{
                            responsive_condition = false;
                        }
                        break;
                    case 'great_equal':
                        if( width >= view_size[i] ){
                            responsive_condition = responsive_condition && true;
                        }else{
                            responsive_condition =  false;
                        }
                        break;
                    default:
                        if( view_size[i] == width ){
                            responsive_condition = responsive_condition && true;
                        }else{
                            responsive_condition = false;
                        }
                        break;
                }
            }
        }
        if(responsive_condition){
            window[func].apply(this,params);
        }
    }
    pixflow_shortcodeScrollAnimation();

    $(".post-carousel-container").each(function () {
        pixflow_fixflickityheight(true, "#" + $(this).attr("id"));
    });

    $('.vc_row').each(function () {
        if ($(this) > $(window).width()) {
            $(this).css('width', $(window).width())
        }
    });
}

function pixflow_osDetect() {
    "use strict";
    var OSName = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
    if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
    if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
    if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

    return OSName;
}

function pixflow_browserDetect() {
    "use strict";
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

// In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
// In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset + 5);
    }
// In Chrome, the true version is after "Chrome"
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
    }
// In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
// In Firefox, the true version is after "Firefox"
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset + 8);
    }
// In most other browsers, "name/version" is at the end of userAgent
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
        (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
// trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1)
        fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
        fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    return browserName;
}

function pixflow_showSecondHeaderFull(selector , type) {
    "use strict";

    var $this = $(selector),

        position = $this.css('position'),
        opacity = $this.css('opacity'),
        height = $this.css('height'),
        top = $this.css('top'),
        visibility = $this.css('visibility'),
        color = $this.find('.color-overlay').css('background-color');

    if ($('.header-style3').length) {
        if (!$('.second-header-bg').length) {

            $this.after('<div class="second-header-bg"></div>');

            $('.second-header-bg').css({width:$('.layout').width(),position:position,opacity:1,height:height,top:top,visibility:visibility,zIndex:999});
            var doIt;
            $(window).resize(function () {
                if (doIt) {
                    clearTimeout(doIt);
                }
                doIt = setTimeout(function () {
                    $('.second-header-bg').css({width: $('.layout').width()});
                }, 150)

            })
        }
    }else if($('.header-style2').length ){
        if($('.second-header-bg').length == 0){
            $this.after('<div class="second-header-bg"></div>');
        }
        if(type == 'move'){
            top = ($('header').height() + $('header').offset().top );
            height = $('header').height() * .7;
            $('.second-header-bg').css({width:$('.layout').width(),position:'fixed',opacity:0,height:height,top:'-' + top + 'px',visibility:visibility,zIndex:999});

        }else{
            $('.second-header-bg').css({width:$('.layout').width(),position:position,opacity:1,height:height,top:top,visibility:visibility,zIndex:999});
        }
        var doIt;

        $(window).resize(function(){
            if(doIt){
                clearTimeout(doIt);
            }
            doIt = setTimeout(function(){
                $('.second-header-bg').css({width:$(window).width()});
            },150);
        })
    }

}

function pixflow_calculateFixHeader() {
    'use strict';

    var siteWidth = parseInt($('.layout').css('width')),
        headerPercent = $('header').attr('data-width');

    headerPercent /= 100;
    var  headerWidth = siteWidth * headerPercent;
    $('header.header-style2').css({width: headerWidth + 'px'});
}

function pixflow_mobileNavigation() {
    "use strict";

    var $doc = $(document),
        $mobileNav = $('.navigation-mobile'),
        $mobileNavBtn = $('.navigation-button'),
        dontResize = false;

    $mobileNavBtn.click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        if ($mobileNav.is(":hidden")) {
            $mobileNav.slideDown(300);
        } else {
            $mobileNav.slideUp(300);
        }
    });

    //Prevent resize event on IOS webkit browsers
    $doc.on('touchstart', function (e) {
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
            $target = $(touch.target);

        if ($target.is($mobileNav) || $target.parents('.navigation-mobile').length)
            dontResize = true;

    }).on('touchend', function () {
        setTimeout(function () {
            dontResize = false;
        }, 1000);
    });

    $mobileNav.click(function (e) {
        e.stopPropagation();
    });

    $mobileNav.find('li').each(function () {
        if ($(this).hasClass('has-dropdown')) {
            $("<span class='arrow'><i class='icon-angle-down'></i></span>").insertAfter($(this).find('> a'));
        }
    });
    //Menu Click
    $mobileNav.find('.arrow').click(function () {
        if ($(this).siblings('.dropdown').is(":hidden")) {
            $(this).siblings('a').addClass('open');
            $(this).find('i').removeClass('icon-angle-down').addClass('icon-angle-up');
            $(this).siblings('.dropdown').slideDown(300);
        } else {
            $(this).siblings('a').removeClass('open');
            $(this).find('i').removeClass('icon-angle-up').addClass('icon-angle-down');
            $(this).siblings('.dropdown').slideUp(300);
        }
    });
    //Remove last borders
    if ($mobileNav.find('li:last-child').hasClass('separator')) {
        $mobileNav.find('li:nth-last-child(2)').css({'border': 'none'});
    }

    //Dark / Light Logo
    if ($(window).width() < 1281 && isMobile()) {
        if ($('header').hasClass('logo-dark')) {
            $('header').find('.logo img').attr('src', darkLogo);
        } else if ($('header').hasClass('logo-light')) {
            $('header').find('.logo img').attr('src', lightLogo);
        }
    }

}

function pixflow_mobileSidebar() {
    "use strict";
    var $sidebar = $('.smart-sidebar'),
        $closeButton = $sidebar.find('.close-sidebar'),
        $wrap = $('.layout > .wrap');

    $sidebar.width(313);
    $('.mobile-sidebar').click(function () {

        if ($sidebar.hasClass('open')) {
            $sidebar.removeClass('open');
            $wrap.removeClass('move');
        } else {
            $wrap.addClass('move');
            $sidebar.addClass('open');
        }
    });

    $closeButton.click(function () {
        if ($sidebar.hasClass('open')) {
            $sidebar.removeClass('open');
            $wrap.removeClass('move');
        }
    });

}

function pixflow_counterShortcode(id, flag) {
    "use strict";

    if ($('.counter').length < 1)
        return;

    $(id).find('.timer').css('opacity', '1');

    $.fn.countTo = function (options) {
        options = options || {};
        return $(this).each(function () {

            // set options for current element
            var settings = $.extend({}, $.fn.countTo.defaults, {
                    from: $(this).data('from'),
                    to: $(this).data('to'),
                    speed: $(this).data('speed'),
                    refreshInterval: $(this).data('refresh-interval'),
                    decimals: $(this).data('decimals')
                }, options),

                // how many times to update the value, and how much to increment the value on each update
                loops = Math.ceil(settings.speed / settings.refreshInterval),
                increment = (settings.to - settings.from) / loops,
                // references & variables that will change with each update

                self = this,
                $self = $(this),
                loopCount = 0,
                value = settings.from,
                data = $self.data('countTo') || {};

            $self.data('countTo', data);
            // if an existing interval can be found, clear it first
            if (data.interval) {
                clearInterval(data.interval);
            }

            data.interval = setInterval(updateTimer, settings.refreshInterval);
            // initialize the element with the starting value
            render(value);

            function updateTimer() {
                'use strict';
                value += increment;
                loopCount++;
                render(value);
                if (typeof(settings.onUpdate) == 'function') {
                    settings.onUpdate.call(self, value);
                }
                if (loopCount >= loops) {
                    // remove the interval
                    $self.removeData('countTo');
                    clearInterval(data.interval);
                    value = settings.to;
                    if (typeof(settings.onComplete) == 'function') {
                        settings.onComplete.call(self, value);
                    }
                }
            }

            function render(value) {
                'use strict';
                var formattedValue = settings.formatter.call(self, value, settings);
                $self.html(formattedValue);
            }

        });
    };

    $.fn.countTo.defaults = {
        from: 0,               // the number the element should start at
        to: 0,                 // the number the element should end at
        speed: 1000,           // how long it should take to count between the target numbers
        refreshInterval: 3,  // how often the element should be updated
        decimals: 0,           // the number of decimal places to show
        formatter: formatter,  // handler for formatting the value before rendering
        onUpdate: null,        // callback method for every time the element is updated
        onComplete: null       // callback method for when the element finishes updating
    };

    function formatter(value, settings) {
        'use strict';
        return value.toFixed(settings.decimals);
    }

    // custom formatting example
    $('.count-number').data('countToOptions', {
        formatter: function (value, options) {
            return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
    });

    // start all the timers
    $(id).find('.timer').each(count);

    function count(options) {
        'use strict';
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }

}


function pixflow_onePageMenu() {
    "use strict";

    $("nav.navigation a,nav.navigation-mobile a, .shortcode-btn a").each(function () {
        // Skip external URLs
        if( !( location.hostname === this.hostname || !this.hostname.length ) ) {
            return true;
        }
        var href = $(this).attr('href');
        if (href && href.search('#') != -1 && href != '#') {
            $(this).click(function (e) {
                //e.preventDefault();
                $('html,body').scrollTo(this.hash, this.hash);
            });
        }
    })
}

function pixflow_businesBarEnable() {
    "use strict";

    if ($('.business').length) {

        var headerTopPos = parseInt($('header').css('top'));

        if (headerTopPos <= 36) {
            $('.business ').css({top: '0'});
        }
        else
            $('.business ').css({top: (parseInt(headerTopPos) - 36) + 'px'});

        $('header:not(.top-modern)').css('margin-top', '0');

        if (headerTopPos > 36)
            headerTopPos = parseInt($('header').css('top')) - 36;

        if (!$('header.top-modern .business').hasClass('business-off')) {
            $('header.top-modern').css('height', '100px');
            $('header.top-modern').css('position', 'absolute');
        }
    }

}

function pixflow_headerWidth() {
    'use strict';
    if ($('header.top-logotop').length || $('header.top-modern').length || $('header.side-modern').length || $('header.side-classic').length) {
        return;
    }

    // Refine header Top Block
    if ($('header.top-block').length) {
        var $header = $('header'),
            $menu = $header.find('.navigation'),
            $iconspack = $header.find('ul.icons-pack'),
            iconspackWidth = 0;
        if ($iconspack.prev().hasClass('navigation')) {
            $iconspack.find('>li.icon:visible:first').css('border-left', '0');
        } else if ($iconspack.next().hasClass('navigation')) {
            $iconspack.find('>li.icon:visible:first').css('border-right', '0');
        }
        $iconspack.find('li.icon:visible').each(function () {
            iconspackWidth = iconspackWidth + $(this).outerWidth(true);
        })
        var iconspackDiff = $iconspack.width() - iconspackWidth - 1;
        $iconspack.width(iconspackWidth);
        $menu.width($menu.width() + iconspackDiff);
        if (!$iconspack.next().hasClass('navigation') || !$iconspack.next().hasClass('logo')) {
            $iconspack.find('li.icon:visible:last').css('border-right', '0');
        }

    }

    //find biggest child
    function pixflow_findMax() {
        'use strict';
        var maxWidth = -1,
            $maxWidth;
        $('.top .logo,.top .navigation,.top .icons-pack').each(function () {
            if ($(this).width() > maxWidth) {
                maxWidth = $(this).width();
                $maxWidth = $(this);
            }
        });
        return $maxWidth;
    }

    //find inner width
    function pixflow_childrensWidth($parent) {
        'use strict';
        var oldWidth = $parent.width(),
            newWidth;
        if ($parent.hasClass('logo')) {
            newWidth = $parent.find('img').width();
        } else if ($parent.hasClass('gather-btn')) {
            newWidth = oldWidth;
        } else if ($parent.hasClass('icons-pack') && $('header.top-block').length) {
            var $header = $('header'),
                $iconspack = $header.find('ul.icons-pack'),
                iconspackWidth = 0;
            $iconspack.find('>li.icon:visible').each(function () {
                iconspackWidth = iconspackWidth + $(this).outerWidth(true);
            })
            newWidth = iconspackWidth;
        } else if ($parent.hasClass('icons-pack') && $('header.top-classic').length) {
            var totalWidth = 0;
            $parent.find('li.icon:visible').each(function () {
                totalWidth = totalWidth + $(this).outerWidth(true) + 3;
            })
            newWidth = totalWidth;
        } else if ($parent.hasClass('navigation') && $('header.top-classic').length) {
            var totalWidth = 0;
            $parent.find('> ul > *:visible').each(function () {
                totalWidth = totalWidth + $(this).outerWidth(true);
            })
            newWidth = totalWidth;
        } else {
            $parent.css('width', 'auto');
            newWidth = $parent.width();
            $parent.width(oldWidth);
        }
        return newWidth;
    }

    $('.top .logo,.top .navigation,.top .icons-pack').each(function () {
        var $this = $(this),
            itemWidth = $this.width(),
            realItemWidth = pixflow_childrensWidth($this),
            diff = Math.abs(realItemWidth - itemWidth) + 1;
        if (realItemWidth > itemWidth) {
            var $max = pixflow_findMax();
            if (($max.outerWidth(true) - diff) >= pixflow_childrensWidth($max)) {
                $max.width($max.outerWidth(true) - diff);
                $this.width(realItemWidth);
            }
        }
    });
    function pixflow_calcWidth(w) {
        'use strict';
        return (w * 100) / $('header .content').width();
    }

    var total = pixflow_calcWidth($('.top .logo').width()) + pixflow_calcWidth($('.top .navigation').width()) + pixflow_calcWidth($('.top .icons-pack').width());
    if (total > 100) {
        var $max = pixflow_findMax();
        var diff = total - 100;
        diff = (diff * $('header .content').width()) / 100;
        $max.width($max.width() - diff);
    }
}

$.easyPieChart = function (el, options) {
    var animateLine, drawLine, easeInOutQuad, rAF, renderBackground, renderScale, renderTrack,
        _this = this;
    this.el = el;

    this.$el = $(el);
    this.$el.data("easyPieChart", this);
    this.init = function () {
        var percent, scaleBy;
        _this.options = $.extend({}, $.easyPieChart.defaultOptions, options);

        percent = parseInt(_this.$el.data('percent'), 10);
        _this.percentage = 0;
        if (_this.$el.find('canvas').length) {
            _this.$el.find('canvas').remove();
        }
        _this.canvas = $("<canvas style='margin-top: -120px;' width='" + _this.options.size + "' height='" + _this.options.size + "'></canvas>").get(0);
        _this.$el.append(_this.canvas);
        if (typeof G_vmlCanvasManager !== "undefined" && G_vmlCanvasManager !== null) {
            G_vmlCanvasManager.initElement(_this.canvas);
        }
        _this.ctx = _this.canvas.getContext('2d');
        if (window.devicePixelRatio > 1) {
            scaleBy = window.devicePixelRatio;
            $(_this.canvas).css({
                width: _this.options.size,
                height: _this.options.size
            });
            _this.canvas.width *= scaleBy;
            _this.canvas.height *= scaleBy;
            _this.ctx.scale(scaleBy, scaleBy);
        }
        _this.ctx.translate(_this.options.size / 2, _this.options.size / 2);
        _this.ctx.rotate(_this.options.rotate * Math.PI / 180);
        _this.$el.addClass('easyPieChart');
        _this.update(percent);
        return _this;
    };
    this.update = function (percent) {
        percent = parseFloat(percent) || 0;
        if (_this.options.animate === false) {
            drawLine(percent);
        } else {
            animateLine(_this.percentage, percent);
        }
        return _this;
    };

    renderTrack = function () {
        var offset;
        offset = _this.options.size / 2 - _this.options.lineWidth / 2;
        if (_this.options.scaleColor !== false) {
            offset -= _this.options.size * 0.08;
        }
        _this.ctx.strokeStyle = _this.options.trackColor;
        _this.ctx.beginPath();
        _this.ctx.arc(0, 0, offset, 0, Math.PI * 2, true);
        _this.ctx.closePath();
        _this.ctx.lineWidth = _this.options.lineWidth;
        _this.ctx.stroke();
    };

    renderBackground = function () {

        if (_this.options.trackColor !== false) {
            renderTrack();
        }
    };
    drawLine = function (percent) {
        var offset;
        renderBackground();
        _this.ctx.strokeStyle = $.isFunction(_this.options.barColor) ? _this.options.barColor(percent) : _this.options.barColor;
        _this.ctx.lineCap = _this.options.lineCap;
        _this.ctx.lineWidth = _this.options.lineWidth;
        offset = _this.options.size / 2 - _this.options.lineWidth / 2;
        if (_this.options.scaleColor !== false) {
            offset -= _this.options.size * 0.08;
        }
        _this.ctx.save();
        _this.ctx.rotate(-Math.PI / 2);
        _this.ctx.beginPath();
        _this.ctx.arc(0, 0, offset, 0, Math.PI * 2 * percent / 100, false);
        _this.ctx.stroke();
        _this.ctx.restore();
    };
    rAF = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
    })();
    animateLine = function (from, to) {
        var anim, startTime;
        _this.options.onStart.call(_this);
        _this.percentage = to;
        Date.now || (Date.now = function () {
            return +(new Date);
        });
        startTime = Date.now();
        anim = function () {
            var currentValue, process;
            process = Date.now() - startTime;
            if (process < _this.options.animate) {
                rAF(anim);
            }
            _this.ctx.clearRect(-_this.options.size / 2, -_this.options.size / 2, _this.options.size, _this.options.size);
            renderBackground.call(_this);
            switch (_this.options.easing) {
                case "easeInOutQuad":
                    currentValue = [easeInOutQuad(process, from, to - from, _this.options.animate)];
                    break;
                case "easeOutBack":
                    currentValue = [easeOutBack(process, from, to - from, _this.options.animate)];
                    break;
                case "easeOutBounce":
                    currentValue = [easeOutBounce(process, from, to - from, _this.options.animate)];
                    break;
                case "easeOutElastic":
                    currentValue = [easeOutElastic(process, from, to - from, _this.options.animate)];
                    break;
                default:
                    currentValue = [easeInOutQuad(process, from, to - from, _this.options.animate)];
            }
            _this.options.onStep.call(_this, currentValue);
            drawLine.call(_this, currentValue);
            if (process >= _this.options.animate) {
                return _this.options.onStop.call(_this, currentValue, to);
            }
        };
        rAF(anim);
    };

    easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    easeOutBack = function (t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    };

    easeOutBounce = function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    };

    easeOutElastic = function (t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    };
    return this.init();
};

$.fn.easyPieChart = function (options) {
    return $.each(this, function (i, el) {
        var $el, instanceOptions;
        $el = $(el);
        instanceOptions = $.extend({}, options, $el.data());
        return $el.data('easyPieChart', new $.easyPieChart(el, instanceOptions));
    });
};

function pixflow_setCenteredFooterHeight() {
    'use strict';
    if (!$('#footer-bottom .centered').length) {
        return
    }
    $('#footer-bottom').css('min-height', $('#footer-bottom .centered').outerHeight())
}

function pixflow_footerPosition() {
    "use strict";

    var $footer = $('footer');
    if ($footer.length && !$footer.hasClass('footer-parallax')) {
        var minHeight = parseInt($(window).height()) - parseInt($('footer').height());
        $('main').css('min-height', minHeight + 'px');
    }

}

function pixflow_show_footer(){
    var $footer = $('footer');
    if($footer.css('visibility')=='hidden') {
        $footer.css('visibility','visible');
    }
}

function pixflow_footerParallax(){
    "use strict";

    var $main = $('main');
    // set footer position in bottom of page
    if ($main.hasClass('has-parallax-footer')) {

        $(window).load(function(){
            if($main.height() <= $(window).height()) {
                pixflow_show_footer();
            }
        }).off('scroll.parallax_footer_load').on('scroll.parallax_footer_load',function(){
            pixflow_show_footer();
            $(this).off('scroll.parallax_footer_load');
        });

        var footerwidth = parseFloat($("footer").attr("data-width") / 100);
        var layoutwidth = parseInt($(".layout-container > .layout").width());
        var parallaxwidth = (layoutwidth * footerwidth);
        $("footer.footer-parallax").width(parallaxwidth);
        $('footer').css({'margin': '0 auto', 'position': 'fixed', 'right': '0', 'left': '0'});
    }

    if ($main.hasClass('has-parallax-footer') && $(window).width() > 1024 && isMobile() == false) {

        $main.css('margin-bottom', $('footer').outerHeight(true));
        if ($('.footer-widgets').length && $('.footer-widgets').hasClass('dark') && !$('body').is('.search')) {
            $('main.has-parallax-footer').css('box-shadow', 'rgba(0, 0, 0, 0.2) 0 -10px 65px 25px')
        }

        $(window).off('scroll.parallax_footer').on('scroll.parallax_footer',function () {
            var mainOffsetTop = $main.offset().top,
                mainInnerHeight = $main.innerHeight(),
                windowHeight = $(window).height();

            //Displaying and hiding parallax footer ){
            if (($(window).scrollTop() + windowHeight) > ( mainInnerHeight + mainOffsetTop )) {
                $('footer').css('opacity', '1');
            } else {
                $('footer').css('opacity', '0');
            }

            if (($(window).scrollTop() + windowHeight ) > (mainInnerHeight + mainOffsetTop )) {
                var opacity = ( ( ($(window).scrollTop() + windowHeight) - (mainInnerHeight + mainOffsetTop) ) * 100 / 357 / 100);
                $('footer .content').stop(true, true).animate({
                    opacity: opacity
                }, 100)
            } else {
                $('footer .content').stop(true, true).animate({
                    opacity: 0.1
                }, 300)
            }
        });
    }
}

function pixflow_portfolioDetail() {

    "use strict";

    if (!$('.portfolio-carousel').length) {
        return;
    }

    $('.owl-carousel').css('width', $(window).width());
    if ($(".owl-carousel .item").length > 1) {
        $('.owl-carousel').owlCarousel({
            items: 1,
            margin: 10,
            video: true,
            loop: true,
            center: true,
            autoWidth: true,
            dots: true,
            dotsEach: 1,
        });
    } else {
        $('.owl-carousel').owlCarousel({
            items: 1,
            margin: 0,
            video: true,
            loop: false,
            autoWidth: false,
            dots: false,
        });
    }

    var imageUrl = $(".owl-carousel").attr("data-video-image-url"),
        imageSize = $(".owl-carousel").attr("data-fullsize");

    if (imageUrl != "") {
        setTimeout(function () {

            $(".owl-carousel .owl-video-tn").css({"background-image": "url(" + imageUrl + ")"});

            if (imageSize == 1) {
                $(".owl-carousel .owl-video-tn").css({"background-size": "cover"});
            }

        }, 2000);

    }

}

function pixflow_portfolioDetailFull() {
    "use strict";
    if (!$('.portfolio-full').length) {
        return;
    }

    var height = $(window).height();

    if (parseInt($('main').css('padding-top')) > 0) {
        $('main').css('padding-top', '0');
    }

    $(".owl-carousel .item").css({width: $(window).width(), height: height});

    $('.owl-carousel').css('width', $('.owl-carousel').parent().parent().width());

    if ($(".owl-carousel .item").length > 1) {
        $('.owl-carousel').owlCarousel({
            items: 1,
            margin: 0,
            video: true,
            loop: true,
            autoWidth: false,
            dots: true,
            singleItem: true,
            dotsEach: 1,
        });
    } else {
        $('.owl-carousel').owlCarousel({
            items: 1,
            margin: 0,
            video: true,
            loop: false,
            autoWidth: false,
            dots: false,
        });
    }

    var imageurl = $(".owl-carousel").attr("data-video-image-url");
    var imagesize = $(".owl-carousel").attr("data-fullsize");
    if (imageurl != "") {
        setTimeout(function () {
            $(".owl-carousel .owl-video-tn").css({"background-image": "url(" + imageurl + ")"});
            if (imagesize == 1) {
                $(".owl-carousel .owl-video-tn").css({"background-size": "cover"});
            }
        }, 2000);


    }

}

function pixflow_portfolioSplit() {
    "use strict";
    if (!$('.portfolio-split').length)
        return;
    $(".pinBox").pinBox({
        Top: $('.data').offset().top,
        Container: '.box_size',
        ZIndex: 20,
        MinWidth: '768px'
    });

    var imageurl = $(".media").attr("data-video-image-url");
    $(".ytp-thumbnail-overlay").css({"background-image": "url(" + imageurl + ")"});
}

function pixflow_isTouchDevice() {
    "use strict";
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }

}

function pixflow_set_business_bar_width_macbook(){
    setTimeout(function () {
        if ($('header').hasClass('retina-screen-header')){
            $('.business.content').removeClass('hidden-tablet').width($('header').width());
        }
    },500);
}




function pixflow_macBookFix() {
    "use strict";
    if ((pixflow_isTouchDevice() == false  || navigator.platform.indexOf('Win') > -1 )  && $(window).width() <= 1280  ) {
        $('header').find('.hidden-tablet:not(.mobile-sidebar) , .visible-tablet:not(.mobile-sidebar)').removeClass('hidden-tablet visible-tablet');
        $('header').find('.hidden-desktop').css('display', 'none!important');
        // $('header.top .logo').css({'margin-left':'10px','margin-right':'-10px'}); to laptop gizmo haye header miran dakhele ham!!
        pixflow_set_business_bar_width_macbook();

        if (window.navigator.userAgent.indexOf("Mac") != -1 || navigator.platform.indexOf('Win') > -1 ) {
            $('header').addClass('retina-screen-header');
            $('main').addClass('retina-screen-main');
            $('.second-header-bg').addClass('retina-screen-header');
            $('.layout-container').addClass('retina-screen-main');
        }
        //side header
        if (!$('header').is('.side-modern') && $('header').is('.left, .right')) {
            $('header').css("cssText", "width: 15% !important;");
            $('header').siblings('.wrap').css("cssText", "width: 85% !important;");
            $('header').siblings('.wrap').find('div').each(function () {
                if ($(this).width() > $('header').siblings('.wrap').width()) {
                    $(this).css('width', $('header').siblings('.wrap').width());
                }
            })
        } else if ($('header').is('.side-modern') && $('header').is('.left, .right')) {
            $('header').siblings('.wrap').css("cssText", "width: calc(100% - 65px) !important;");
        }
    }
}

function pixflow_animateSvgInitiate() {
    "use strict";
    //making SVGs ready for animate
    var path = document.querySelectorAll('.animate-svg path');
    if (path.length) {
        for (i in path) {
            if (i == "length") break;
            var length = path[i].getTotalLength();
            path[i].style.strokeDasharray = length + ' ' + length;
            path[i].style.strokeDashoffset = length;
            path[i].getBoundingClientRect();
        }
    }

}

function pixflow_animateSvgExecute() {
    "use strict";
    if ($('body').hasClass('one_page_scroll'))
        return;
    //running SVGs animate
    var $svg = $('.animate-svg');
    $(window).scroll(function () {
        $svg.each(function () {

            if ($(this).offset().top <= ( $(window).scrollTop() + $(window).height() )) {
                pixflow_animate_svg_path($(this));
            }
        })
    })
}

function pixflow_onepage_scroll_svg_animate(){
    "use strict";
    if (!$('body').hasClass('one_page_scroll'))
        return;
    //running SVGs animate
    var $svg = $('.row-active .animate-svg');
    $svg.each(function () {
        pixflow_animate_svg_path($(this));
    });
}

function pixflow_animate_svg_path($this) {
    var $path = $this.find('path');
    $path.each(function () {
        var oldClass = $(this).attr("class");
        if (typeof oldClass != 'undefined') {
            if (oldClass.indexOf('path-animated') == -1) {
                $(this).attr("class", oldClass + " " + "path-animated");
            }
        } else {
            $(this).attr("class", "path-animated");
        }
    });
}

function pixflow_call_retina() {
    "use strict";
    return
    if (pixflow_detectPosition() == 'front-end') {
        !function () {
            function a() {
            }

            function b(a) {
                return f.retinaImageSuffix + a
            }

            function c(a, c) {
                if (this.path = a || "", "undefined" != typeof c && null !== c)this.at_2x_path = c, this.perform_check = !1; else {
                    if (void 0 !== document.createElement) {
                        var d = document.createElement("a");
                        d.href = this.path, d.pathname = d.pathname.replace(g, b), this.at_2x_path = d.href
                    } else {
                        var e = this.path.split("?");
                        e[0] = e[0].replace(g, b), this.at_2x_path = e.join("?")
                    }
                    this.perform_check = !0
                }
            }

            function d(a) {
                this.el = a, this.path = new c(this.el.getAttribute("src"), this.el.getAttribute("data-at2x"));
                var b = this;
                this.path.check_2x_variant(function (a) {
                    a && b.swap()
                })
            }

            var e = "undefined" == typeof exports ? window : exports, f = {
                retinaImageSuffix: "@2x",
                check_mime_type: !0,
                force_original_dimensions: !0
            };
            e.Retina = a, a.configure = function (a) {
                null === a && (a = {});
                for (var b in a)a.hasOwnProperty(b) && (f[b] = a[b])
            }, a.init = function (a) {
                null === a && (a = e);
                var b = a.onload || function () {
                };
                a.onload = function () {
                    var a, c, e = document.getElementsByTagName("img"), f = [];
                    for (a = 0; a < e.length; a += 1)c = e[a], c.getAttributeNode("data-no-retina") || f.push(new d(c));
                    b()
                }
            }, a.isRetina = function () {
                var a = "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";
                return e.devicePixelRatio > 1 ? !0 : e.matchMedia && e.matchMedia(a).matches ? !0 : !1
            };
            var g = /\.\w+$/;
            e.RetinaImagePath = c, c.confirmed_paths = [], c.prototype.is_external = function () {
                return !(!this.path.match(/^https?\:/i) || this.path.match("//" + document.domain))
            }, c.prototype.check_2x_variant = function (a) {
                var b, d = this;
                return this.is_external() ? a(!1) : this.perform_check || "undefined" == typeof this.at_2x_path || null === this.at_2x_path ? this.at_2x_path in c.confirmed_paths ? a(!0) : (b = new XMLHttpRequest, b.open("HEAD", this.at_2x_path), b.onreadystatechange = function () {
                    if (4 !== b.readyState)return a(!1);
                    if (b.status >= 200 && b.status <= 399) {
                        if (f.check_mime_type) {
                            var e = b.getResponseHeader("Content-Type");
                            if (null === e || !e.match(/^image/i))return a(!1)
                        }
                        return c.confirmed_paths.push(d.at_2x_path), a(!0)
                    }
                    return a(!1)
                }, b.send(), void 0) : a(!0)
            }, e.RetinaImage = d, d.prototype.swap = function (a) {
                function b() {
                    c.el.complete ? (f.force_original_dimensions && (c.el.setAttribute("width", c.el.offsetWidth), c.el.setAttribute("height", c.el.offsetHeight)), c.el.setAttribute("src", a)) : setTimeout(b, 5)
                }

                "undefined" == typeof a && (a = this.path.at_2x_path);
                var c = this;
                b()
            }, a.isRetina() && a.init(e)
        }();
    }

}

function pixflow_addToCart() {
    "use strict";
    var $total = $('.notification-center #opt4 .total'),
        $buttons = $('.notification-center #opt4 .buttons');

    if ($total.length > 1) {
        $($total.get($total.length - 1)).remove();
    }

    if ($buttons.length > 1) {
        $($buttons.get($buttons.length - 1)).remove();
    }

    var num = 0;
    $('.notification-center ul.cart_list li.mini_cart_item').each(function () {
        var a = $(this).find('.quantity').contents()[0].textContent;
        num += parseInt(a);
    });

    if ($('header .icons-pack .shopcart-item').length && num > 0) {
        if ($('header .icons-pack .shopcart-item .number').length) {
            $('header .icons-pack .shopcart-item .number').text(num);
        } else {
            $('header .icons-pack .shopcart-item .icon ').append('<i class="number">' + num + '</i>');
        }
    }
    if (num == 0) {
        $('header .icons-pack .shopcart-item .number').remove();
    }
}

function pixflow_wc_clear_selection() {
    "use strict";
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        $("div.clear-selection").css({"height": "55px"});
    }
    $(".variations_form").on("woocommerce_variation_select_change", function (e) {
        // Fires whenever variation selects are changed
        var value = $("#pa_color").val()
        if (value != '') {
            $(".clear-selection").css({"opacity": "1"});
        } else {
            $(".clear-selection").css({"opacity": "0"});
        }
    });
}

function pixflow_horTab(id, type) {
    var postfix = '';
    if (type == 'business') {
        postfix = '2';
    }
    if ( $('body').hasClass('vc_editor') && '' != type ) {
        $('.' + id).closest('.vc_md_hor_tabs' + postfix).find('.md-hor-tab' + postfix + '-add-tab').parent().remove();
        $('.' + id).closest('.vc_md_hor_tabs' + postfix).find('.px_tabs_nav').append('<li><a style="cursor: pointer;" class="md-hor-tab' + postfix + '-add-tab vc_control-btn">ADD TAB</a></li>');
        $('.' + id).closest('.vc_md_hor_tabs' + postfix).find('.md-hor-tab' + postfix + '-add-tab').click(function (e) {
            e.preventDefault();
            $(this).parent().parent().find('a.vc_control-btn[title="ADD TAB"] .vc_btn-content').click();
        })
    }
    var tabNavHeight = $('.' + id).find('.px_tabs_nav ').height(),
        tabTaller,
        temp = 0;
    $('.' + id).find('.ui-tabs-panel ').each(function () {
        var $this = $(this);
        tabTaller = $(this).height();
        if (temp < tabTaller) {
            temp = tabTaller;
        }
    });

    if (temp < tabNavHeight) {
        $('.' + id).find('.wpb_tour_tabs_wrapper ').css('height', tabNavHeight + 'px');
    } else {
        $('.' + id).find('.wpb_tour_tabs_wrapper ').css('height', temp + 'px');
    }
    if (typeof pixflow_tabShortcode == 'function') {
        pixflow_tabShortcode();
    }
}

function pixflow_doubleSlider(id, bg, fg, autoplay, duration) {
    "use strict";
    function rgba(rgb) {
        if (rgb.indexOf('rgba') != -1) return rgb;
        if (rgb.indexOf('#') != -1) {
            var h = rgb.replace('#', '');
            h = h.match(new RegExp('(.{' + h.length / 3 + '})', 'g'));

            for (var i = 0; i < h.length; i++)
                h[i] = parseInt(h[i].length == 1 ? h[i] + h[i] : h[i], 16);

            h.push('.8')
            return 'rgba(' + h.join(',') + ')';

        }
        rgb = rgb.replace(')', ',.8)');
        rgb = rgb.replace('rgb', 'rgba');
        return rgb;
    }

    if ($(window).width() <= 800) {
        bg[0] = rgba(bg[0]);
    }
    $('#' + id + ' .double-slider-text-container').css('background-color', bg[0]);
    $('#' + id + ' .double-slider-nav a').css('color', fg[0]);
    $('#' + id + ' .double-slider-image-container').flexslider({
        animation: "fade",
        slideshow: autoplay,
        slideshowSpeed: duration,
        animationSpeed: 600,
        touch: false
    })
    $('#' + id + ' .double-slider-text-container').flexslider({
        animation: "slide",
        slideshow: autoplay,
        slideshowSpeed: duration,
        animationSpeed: 600,
        useCSS: false,
        touch: false,
        before: function (slider) {
            if ($(window).width() <= 800) {
                bg[slider.animatingTo] = rgba(bg[slider.animatingTo]);
            }
            $('#' + id + ' .double-slider-text-container').css('background-color', bg[slider.animatingTo]);
            $('#' + id + ' .double-slider-nav a').css('color', fg[slider.animatingTo]);
            if (slider.hasClass('double-slider-text-container')) {
                var to = (slider.direction == 'next' && slider.animatingTo == 0) ? slider.count : slider.animatingTo;
                if (slider.currentSlide < to && slider.direction == 'next') {
                    slider.slides.eq(slider.currentSlide).find('.double-slider-sub-title,.double-slider-title,.double-slider-description')
                        .css('transform', 'translateX(-200px)');
                } else {
                    slider.slides.eq(slider.currentSlide).find('.double-slider-sub-title,.double-slider-title,.double-slider-description')
                        .css('transform', 'translateX(200px)');
                }
                slider.find('.slides').delay(200);
            }
        },
        after: function (slider) {
            setTimeout(function () {
                slider.slides.find('.double-slider-sub-title,.double-slider-title,.double-slider-description')
                    .css('transform', '');
            }, 100)
        }
    })
    $('#' + id + ' .double-slider-prev').click(function (e) {
        e.preventDefault();
        $(this).closest('.double-slider').find('.flex-direction-nav .flex-prev').click();
        return false;
    })
    $('#' + id + ' .double-slider-next').click(function (e) {
        e.preventDefault();
        $(this).closest('.double-slider').find('.flex-direction-nav .flex-next').click();
        return false;
    })
}

function pixflow_relatedProducts() {
    "use strict";
    if ($(".related .products").length) {
        $(".related .product").each(function () {
            var imageSource = $(this).find('img').attr('src');
            $(this).find('img').css('display', 'none');
            $('<div class="item-image"></div>').insertAfter($(this).find('img'));
            $(this).find('.item-image').css({'background-image': 'url("' + imageSource + '")'});
        })
    }
}

function isRetinaDisplay() {
    if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        return (mq && mq.matches || (window.devicePixelRatio > 1));
    }
}

function pixflow_retinaCheck($obj) {
    "use strict";
    //temporarily disabled because retina images console warnings on retina devices
    return;
    if (!isRetinaDisplay())
        return;

    var children = $obj.children();

    children.each(function () {
        var $this = $(this)
        if ($(this).css('background-image') != 'none') {
            var url = $(this).css('background-image');
            url = url.replace(/^url\(["']?/i, '').replace(/["']?\)$/, '');
            var name = url.substr(0, url.lastIndexOf('.'));
            var ext = url.substr(url.lastIndexOf('.'), url.length);
            name += '@2x';

            $('<img/>').attr('src', name + ext).load(function () {
                $(this).remove();
                $this.css('background-image', 'url(' + name + ext + ')');
            }).error(function () {
                $(this).remove();
            });
        }

        setTimeout(function () {
            pixflow_retinaCheck($this);
        }, 1)
    });
}

function isMobile() {
    try {

        if (/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        }
        if (navigator.platform.indexOf('Pad') > 0 || navigator.platform.indexOf('Phone') > 0)
            return true;

        return false;
    }
    catch (e) {
        console.log("Error in isMobile");
        return false;
    }
}

function pixflow_fixflickityheight(resized, element) {
    "use strict";
    var timeout = resized ? 100 : 3000;
    window.setTimeout(function () {

        if ($(element).legnth <= 0) {
            return;
        }

        var widthdif = ( parseInt($(window).width()) - parseInt($("main #content").width())  );
        var extraheight = (widthdif > 200) ? 320 : 200;
        if (parseInt($(window).width()) < 1281) {
            extraheight += 100;
        }
        var maxh = 0;
        $(element).each(function () {

            var postcontenth = parseInt($(this).find(".post-content-container").height());
            var postdateh = parseInt($(this).find(".post-date ").height());
            if (maxh < postcontenth + postdateh) {
                maxh = postcontenth + postdateh;
            }
            $(this).height(maxh + extraheight);
        });

    }, timeout);

}

function pixflow_Products() {
    "use strict";

    if (!$('.woocommerce').length)
        return;



    $("ul.products li.type-product").each(function () {
        $(this).addClass("product");
    });

    var product = $('.products .product');


    product.each(function () {
        var $this = $(this),
            itemURL = $this.find('a:first-child').attr('href'),
            thumbImg = $this.find('.attachment-woocommerce_thumbnail').attr('src'),
            hoverImg = $this.attr('data-img'),
            thumbHeight;
        if (typeof thumbImg == 'undefined') {
            return true;
        }
        if ($this.parents('.thumbnails-height').length) {
            thumbHeight = $this.parents('.thumbnails-height').attr('data-thumbnail-height');
        } else {
            thumbHeight = 285;
        }

        if (hoverImg == '') {
            hoverImg = thumbImg;
        }

        $this.find('.title-link').attr('href', itemURL);
        $this.find('.add_to_cart_button').html('<span class="icon icon-shopcart"></span>');
        $this.find('.purchase-buttom-holder a:first-child img,.purchase-buttom-holder a:first-child .item-image').remove();
        $this.find('.purchase-buttom-holder a:first-child').append('<div class="thumb-image" style="background-image: url(' + thumbImg + ')"></div>   ' +
            '<div class="hover-image" style="background-image: url(' + hoverImg + ')"></div>');
        $this.find('.thumb-image,.hover-image').css({'height': thumbHeight});
    })
}

function pixflow_blogPage() {
    "use strict";

    if ($('.loop-post-content').length < 1 && $('.single-post-media').length < 1) {
        return;
    }

    if ($('.flexslider').length >= 1) {
        $('.flexslider').flexslider({
            directionNav: "true"
        });
        $('.flex-nav-prev .flex-prev').html('');
        $('.flex-nav-next .flex-next').html('');
    }

    $('body:not(.blog) .loop-post-content').each(function () {
        if ($(this).find('.more-link').length >= 1) {
            $(this).find('.post-share').css({'margin': '-63px 45px 0 0'});
            $(this).find('.post-comment-holder').css({'margin': '-63px 0 0 0'});
        }
    });

    var $sidebar = $('.sidebar');
    if ($('.sidebar').length >= 1) {
        if ($sidebar.attr('widgetid') == 'main-sidebar') {
            $('#content .posts').css('width', '97.5%');
        } else if ($sidebar.attr('widgetid') == 'post-sidebar') {
            $('#content .post').css('width', '97.5%');
        }
    }

    $('body').on('click', '.no-prev-page, .no-next-page', function (e) {
        e.preventDefault();
        return false;
    })
}

function pixflow_remove_flex(on_resize) {
    if (on_resize && $(window).width() > 768){
        $('.remove-flex').removeClass('remove-flex');
    }
    if($(window).width() <= 768 ){
        $('.vc_row').each(function(){
            if($(this).find('.responsive-full-width').length){
                $(this).addClass('remove-flex');
            }
        })
    }
}

$(document).ready(function () {
    "use strict";
    document.body.className = document.body.className.replace('no-js', 'js-enabled');
    pixflow_macBookFix();
    pixflow_remove_flex();
    pixflow_blogPage();
    pixflow_loadSemiAjax();
    pixflow_addNicesroll();        // add nice scroll in body
    pixflow_mobileNavigation();
    pixflow_mobileSidebar();
    pixflow_gatherHeader();
    pixflow_gatherWidthMenu();
    pixflow_gatherBlockHover();       //Hover for Header Top Gather Block
    pixflow_headerSideModern();
    pixflow_underlineAnimation();   // Menu top classic hover animation effect
    pixflow_retinaCheck($('body'));
    pixflow_modernTop();
    pixflow_headerSideClassic();     // Header side classic social icons hover effect
    pixflow_headerSideEffect();      // Header side classic * Info hover effect ... and ... Header side classic Search hover effect
    pixflow_menuTopBlockSquare();    // Header top menu block square
    pixflow_menuTopBlockRec();       // Header top block rectangle (3D)
    pixflow_sidebarBoxStyle();       // Function for sidebar box style
    pixflow_headerStates();       // Header scroll Mode
    pixflow_callDropdown();
    pixflow_classicDropdown();
    pixflow_goToTopButton();       // Footer back to top button
    pixflow_calendarWidget();     // set day name, day color for calendar
    pixflow_searchWidget();
    pixflow_shortcodeScrollAnimation();
    pixflow_notificationCenter();
    pixflow_sidebarWidgets();
    pixflow_onePageMenu();
    pixflow_setCenteredFooterHeight();
    pixflow_footerParallax();
    if ($("body").hasClass('one_page_scroll')) {
        pixflow_init_one_page_scroll();
    }
    pixflow_classicTopWireframeStyle();
    pixflow_portfolioDetail();
    pixflow_portfolioDetailFull();
    pixflow_animateSvgInitiate();
    pixflow_portfolioSplit();
    pixflow_call_retina();
    pixflow_wc_clear_selection();
    pixflow_relatedProducts();
    pixflow_Products();
    pixflow_recentViewedWidget();
    pixflow_topRatedWidget();
    pixflow_apply_parallax();
    pixflow_clear_md_cache();
    pixflow_detect_mobile();
    pixflow_style_number_input();
    pixflow_load_more_post_blog_masonry();

    //calling functions
    for (var func in document_ready_functions) {
        // skip loop if the property is from prototype
        if (!document_ready_functions.hasOwnProperty(func)) continue;
        var params = document_ready_functions[func];
        window[func].apply(this,params);
    }


    window.addEventListener("orientationchange", function () {
        // Trigger some function on orientation change event
        //calling functions
        for (var func in orientation_change_functions) {
            // skip loop if the property is from prototype
            if (!orientation_change_functions.hasOwnProperty(func)) continue;
            var params = orientation_change_functions[func];
            window[func].apply(this,params);
        }

    }, false);


    if (!$('.vc_md_skill_style1').length && $('.skill-style1').length)
        pixflow_onScrollFindIDs('skill-style1');

    if ($('.md-counter').length)
        pixflow_onScrollFindIDs('md-counter');

    if ($('.md-pie-chart').length)
        pixflow_onScrollFindIDs('md-pie-chart');


    if ($('.md-counter').length || (!$('.vc_md_skill_style1').length && $('.skill-style1').length)) {
        pixflow_eventRunFirstTime();
    }

    pixflow_ajaxSearch();
    pixflow_responsive();

    // Skill Shortcode
    if (!$('.vc_md_skill_style1').length && $('.skill-style1').length) {
        pixflow_onScrollFindIDs('skill-style1');
        pixflow_eventRunFirstTime('skill-style1');
    }

    pixflow_shortcodeAnimation();
    pixflow_shortcodeAnimationScroll();



    if ($('ul.products li.product').length) {

        $('ul.products').each(function () {
            var maxHeight = 0;
            $(this).find('li.product').each(function () {
                if ($(this).height() > maxHeight) {
                    maxHeight = $(this).height();
                }
            })
            $(this).find('li.product').css('min-height', maxHeight);
        });

    }
    pixflow_parallax_set_original_offset();
});

$(window).on("load", function () {
    "use strict";

    pixflow_calculateFixHeader();
    pixflow_loadSite();
    pixflow_teammemberCarousel('resized');
    //calling functions
    for (var func in window_load_functions) {
        // skip loop if the property is from prototype
        if (!window_load_functions.hasOwnProperty(func)) continue;
        var params = window_load_functions[func];
        window[func].apply(this,params);
    }

    pixflow_VcUpdate();

    var $body = $('body');

    pixflow_animateSvgExecute();
    pixflow_post_carousel();



    // Team Member Carousel

    if ($('.blog').length) {

        $('.no-next-page').click(function (e) {
            e.preventDefault();
        });
        $('.no-prev-page').click(function (e) {
            e.preventDefault();
        });
    }

    if ($('body').hasClass('blog') || $('body').hasClass('archive')) {
        var x = parseInt($('header').height()) + parseInt($('header').css('top')) + 30;
        $('main').css({marginTop: x + 'px'});
    }

    pixflow_businesBarEnable();

    //pixflow_wooCommerce();
    if (pixflow_detectPosition() == 'front-end') {
        pixflow_headerWidth();
    }

    // Counter Shortcode
    if (!$('.vc_md_counter').length && $('.md-counter').length) {


        pixflow_onScrollFindIDs('md-counter');

        pixflow_eventRunFirstTime('md-counter');
    }

    pixflow_shortcodeAnimation();
    pixflow_shortcodeAnimationScroll();
    pixflow_footerParallax();
    pixflow_parallax_set_original_offset();
    $('window').resize();

});

var doItGlobal, doItTransition, windowWith = $(window).width();
window.onresize = function (e) {

    "use strict";

    if (doItGlobal) {
        clearTimeout(doItGlobal);
    }
    doItGlobal = setTimeout(function () {

        if (typeof(e) != 'undefined') {
            if ($(e.target).hasClass('header-item')) {
                e.stopPropagation();
                return
            }
            ;
        }
        pixflow_responsive();
        pixflow_remove_flex(true);
        pixflow_detect_mobile();
        //calling functions
        for (var func in window_resize_functions) {
            // skip loop if the property is from prototype
            if (!window_resize_functions.hasOwnProperty(func)) continue;
            var params = window_resize_functions[func];
            window[func].apply(this,params);
        }
        pixflow_calculateFixHeader();
        //header top modern
        // Music
        if ($('.music-sc').length) {
            pixflow_musicFitSizes();
        }
        // Portfolio
        /*        if ($('.portfolio').length) {
                    //Fix Iphone/Ipad: fire resize when scrolling
                    if ($(window).width() != windowWith) {
                        windowWith = $(window).width();
                        pixflow_portfolioMultisize();
                    }
                }*/
        if ($('ul.products li.product').length) {

            $('ul.products').each(function () {
                var maxHeight = 0;
                $(this).find('li.product').each(function () {
                    if ($(this).height() > maxHeight) {
                        maxHeight = $(this).height();
                    }
                })
                $(this).find('li.product').css('min-height', maxHeight);
            });

        }
        //Footer Parallax
        pixflow_footerParallax();
        //iconbox Side
        // Product Categories
        // portfolio detail
        pixflow_portfolioDetailFull();
        pixflow_portfolioDetail();
        pixflow_set_business_bar_width_macbook();
        pixflow_modernTop();
        pixflow_parallax_set_original_offset();
    }, 150);

};


var array_parallax = new Array();
/**
 * Build An Array That Contains The List Of Shortcodes
 * @param elem id or class of parallax element
 *
 * @return boolean
 * @since 4.1
 */
function pixflow_parallax(selector){
    'use strict';
    var $selector = $(selector);
    array_parallax.push($selector);
    return false ;
}

function pixflow_parallax_set_original_offset(){
    "use strict";
    setTimeout(function(){
        for( var i in array_parallax) {
            var $selector = array_parallax[i];
            $selector.each(function () {
                var $this = $(this);
                var transform = $this.css('transform');
                $this.css('transfrom','');
                $this.data('original_offset_top', $this.offset().top);
                $this.data('original_offset_left', $this.offset().left);
                $this.css('transfrom',transform);
            });
        }
    },100);
}

/**
 * Check The parallax element exists or not
 * @param elem id or class of parallax element
 *
 * @return true if exists and false if not exists
 * @since 4.1
 */
function  pixflow_check_element_exists(elem){
    if(elem.length == 0){
        array_parallax.splice( i , 1 );
        return false ;
    }
    return true;
}


/**
 * detect the position of user and run parallax
 * @param elem id or class of parallax element
 *
 * @return boolean
 * @since 4.1
 */
function pixflow_check_element_info(elem){
    var speed = parseFloat(elem.attr('data-parallax-speed'));
    if($('.pixflow-builder:not(.gizmo-off)').length){
        elem.css({"transform": "translate3d(0px,0px,0px)", "top": "0px" , "margin-top":"0px"});
        return;
    }
    if(pixflow_should_apply(elem)){
        pixflow_do_parallax(elem,speed);
    }
    return false ;
}


/**
 * bind events and decide parallax should apply or not
 *
 * @return boolean
 * @since 4.1
 */
function pixflow_apply_parallax(){
    'use strict';
    if ($(window).width() < 1279)
        return;
    $(window).bind('scroll', function() {
        for(var i in array_parallax){

            var elem = array_parallax[i] ;
            if( ! pixflow_check_element_exists(elem) ){
                continue;
            }
            pixflow_check_element_info(elem);
        }
    });
    return false ;
}

/**
 * get the position of element
 * @param elem id or class of parallax element
 *
 * @return int of compare the position of element and screen
 * @since 4.1
 */
function pixflow_should_apply(elem){
    var bottom_of_element = elem.offset().top + elem.height();
    var bottom_of_screen = $(window).scrollTop() + $(window).height();
    var window_top = $(window).scrollTop();
    var top_of_element = elem.offset().top;

    return (window_top < bottom_of_element) && (bottom_of_screen > top_of_element);
}

/**
 * Get the position of element
 * @param Elem id or class of parallax element
 * @param Float Speed of parallax animation
 *
 * @return boolean
 * @since 4.1
 */
function pixflow_do_parallax(elem,speed){

    var new_coord = ((elem.data('original_offset_top') + elem.height()/2) - ($(window).scrollTop() + $(window).height()/2)) * (speed/8);
    TweenMax.to(elem, .5, {transform: 'translateY(' + new_coord + 'px)'});

    return false;
}

/**
 * Check the device is mobile or not
 *
 * @return boolean
 * @since 4.1
 */
function pixflow_isMobile() {
    'use strict';

    try {
        if(/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        }
        return false;
    } catch(e){ console.log("Error in isMobile"); return false; }
}


/** Clear Md_cache folder */
function  pixflow_clear_md_cache(){
    $("#wp-admin-bar-md_clear_cache_button").click(function(e){
        $("#wp-admin-bar-md_clear_cache_button a").html("Please Wait ..");
        e.preventDefault();
        jQuery.ajax({
            type: 'post',
            url: ajax_var.url,
            data: {
                action: 'pixflow_clear_md_cache',
            },
            success: function (response) {
                setTimeout(function(){
                    $("#wp-admin-bar-md_clear_cache_button a").html("Clear Cache");
                },2000);

            },
        });
    });
}

function pixflow_detect_mobile(){
    if(isMobile()){
        $('body').addClass('mobile-browser');
    }
}

function  pixflow_load_more_post_blog_masonry(){
    $(".masonry-blog .button").click(function(e){
        if($('body').hasClass('wp-customizer') || $('body').hasClass('compose-mode') ){
            return;
        }
        e.preventDefault();
        $button=$(this);
        butttonHtml=$button.html();
        $button.html("<span>Please Wait</span>");
        $parentElem=$(this).closest(".masonry-blog");
        parentID=$parentElem.attr("id");
        attr=JSON.parse($parentElem.attr('data-attr'));
         args=JSON.parse($parentElem.attr('data-args'));

        args.paged=args.paged+1;
        $.ajax({
            type: 'post',
            url: ajax_var.url,
            data: {
                action: 'pixflow_load_more_posts',
                atts :      attr,
                paged :     args.paged,
                parent_id : parentID
            },
            success: function (response) {
                if(response.length>3){
                    var $newItems = $(response);
                    $parentElem.isotope( 'insert', $newItems );
                    $button.html(butttonHtml);
                    args=JSON.stringify(args);
                    $parentElem.attr("data-args",args);
                    pixflow_blogMasonry(parentID);
                } else {
                    $button.remove();
                }
            }
        });
    });

}



function rearange_blog_masonry(id){
    'use strict';

    var $elem = (typeof id === "undefined" ) ? $('.masonry-blog') : $('.' + id),
        $elem2 = $('#' + $('.masonry-blog').attr('id'));


    if ($elem.find('.flexslider').length >= 1) {

        $elem.find('.flexslider').each(function () {
            $(this).flexslider({
                directionNav: "true"
            });
        });

        $('.flex-nav-prev .flex-prev').html('');
        $('.flex-nav-next .flex-next').html('');
    }

    $elem.find('.blog-masonry-container').each(function () {
        if ($(this).find('.post-like-holder').length >= 1) {
            if ($(this).find('.like-count').html() == 'already0' || $(this).find('.like-count').html() == '&nbsp;') {
                $(this).find('.like-count').html('0');
            }
        }
    });
    $elem.isotope({
        // options
        itemSelector: '.blog-masonry-container',
        layoutMode: 'masonry',
        transitionDuration: '0.9s'
    });

    setTimeout(function () {
        $elem.isotope('layout');
    }, 1000);
    $(window).load(function () {
        $elem.isotope('layout');
    });



}


function pixflow_style_number_input(){
    $('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
    $('.single-product .quantity').each(function() {
        var spinner = jQuery(this),
            input = spinner.find('input[type="number"]'),
            btnUp = spinner.find('.quantity-up'),
            btnDown = spinner.find('.quantity-down'),
            min = input.attr('min'),
            max = input.attr('max');

        btnUp.click(function() {
            var oldValue = parseFloat(input.val());
            if (oldValue >= max) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue + 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

        btnDown.click(function() {
            var oldValue = parseFloat(input.val());
            if (oldValue <= min) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue - 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

    });
}