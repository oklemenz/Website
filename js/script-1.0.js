/*
 * Website Script v1.2
 * Copyright 2013-2017, Oliver Klemenz, http://www.oklemenz.de
 */
(function ($, $window) {

    // Animation Frame
    (function () {
        if (!window.requestAnimationFrame) {
            var time = 0;
            var browsers = ["webkit", "moz", "o", "ms"];
            for (var i = 0; i < browsers.length; i++) {
                var browser = browsers[i];
                window.requestAnimationFrame = window[browser + "RequestAnimationFrame"];
                window.cancelRequestAnimationFrame = window[browser + "CancelRequestAnimationFrame"];
                if (!window.requestAnimationFrame) {
                    window.requestAnimationFrame = function (callback) {
                        var now = (new Date).getTime();
                        var diff = Math.max(0, 16 - (now - time));
                        var timeout = window.setTimeout(function () {
                            callback(now + diff);
                        }, diff);
                        time = now + diff;
                        return timeout;
                    };
                }
            }
        }
        window.cancelAnimationFrame || (window.cancelAnimationFrame = function (callback) {
            clearTimeout(callback);
        });
    })();

    // Is Internet Explorer
    $.fn.okIsIE = function (options) {
        options = $.extend({}, $.fn.okIsIE.config, options);
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    };
    $.fn.okIsIE.config = {};

    // Is Mobile Device
    $.fn.okIsMobileDevice = function (options) {
        options = $.extend({}, $.fn.okIsMobileDevice.config, options);
        return (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i) ||
            navigator.userAgent.match(/Opera Mini/i) ||
            navigator.userAgent.match(/IEMobile/i));
    };
    $.fn.okIsMobileDevice.config = {};

    // Get Device Type
    $.fn.okGetDeviceType = function (options) {
        options = $.extend({}, $.fn.okGetDeviceType.config, options);
        var bounds = $(this).okGetBounds();
        if (bounds.width > 1024) {
            return "desktop";
        } else if (bounds.width > 568) {
            return "tablet";
        } else {
            return "phone";
        }
    };
    $.fn.okGetDeviceType.config = {};

    // Get Language Code
    $.fn.okGetLangCode = function (options) {
        options = $.extend({}, $.fn.okGetLangCode.config, options);
        var match = RegExp("[?&]lang=([^&]*)").exec(window.location.search);
        var langCode = match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        if (!langCode) {
            langCode = "en";
        }
        return langCode;
    };
    $.fn.okGetLangCode.config = {};

    // Image Retina
    $.fn.okImageRetina = function (options) {
        options = $.extend({}, $.fn.okImageRetina.config, options);
        if (window.devicePixelRatio == 2) {
            $("[data-image]").each(function () {
                var type = $(this).data("image");
                if (type == "retina") {
                    var extPos = this.src.lastIndexOf(".");
                    var imageType = this.src.substr(extPos);
                    var imageName = this.src.substr(0, extPos);
                    this.src = imageName + "-retina" + imageType;
                }
            });
        }
    };
    $.fn.okImageRetina.config = {};

    // Get Bounds
    $.fn.okGetBounds = function (options) {
        options = $.extend({}, $.fn.okGetBounds.config, options);
        var bounds = {
            width: 0,
            height: 0
        };
        if (window.innerWidth) {
            bounds.width = window.innerWidth;
        } else if (document.documentElement && document.documentElement.clientWidth) {
            bounds.width = document.documentElement.clientWidth;
        } else if (document.body) {
            bounds.width = document.body.clientWidth;
        }
        if (window.innerHeight) {
            bounds.height = window.innerHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) {
            bounds.height = document.documentElement.clientHeight;
        } else if (document.body) {
            bounds.height = document.body.clientHeight;
        }
        return bounds;
    };
    $.fn.okGetBounds.config = {};

    // Scroll Position
    $.fn.okScrollPos = function (options) {
        options = $.extend({}, $.fn.okScrollPos.config, options);
        var event = this[0];
        return event.target ? event.target.body.scrollTop ||
            document.documentElement.scrollTop : event.srcElement ? event.srcElement.body.scrollTop ||
            document.documentElement.scrollTop : document.documentElement.scrollTop;

    };
    $.fn.okScrollPos.config = {};

    // Scroll to Top
    $.fn.okScrollToTop = function (options) {
        options = $.extend({}, $.fn.okScrollToTop.config, options);
        var speed = options.speed ? options.speed : 1000;
        $("html, body").animate({
            scrollTop: 0
        }, speed);
    };
    $.fn.okScrollToTop.config = {};

    // Scroll to Target
    $.fn.okScrollTo = function (options) {
        options = $.extend({}, $.fn.okScrollTo.config, options);
        var speed = options.speed ? options.speed : 500;
        var anchor = $("#" + options.target);
        if (anchor) {
            var height = anchor.height();
            var heightOffset = 0;
            if (options.offset) {
                heightOffset = options.offset;
                height -= heightOffset;
            }
            var top = anchor.offset().top;
            var offset = 0;
            if (options.header) {
                offset += $(options.header).height();
            }
            if (options.footer) {
                offset -= $(options.footer).height();
            }
            if ($window.height() > height + $(options.header).height() + $(options.footer).height()) {
                top = top - ($window.height() - height + offset) / 2;
            } else {
                top = top - $(options.header).height() - heightOffset - 21;
            }
            $("html, body").animate({
                scrollTop: top
            }, speed);
        }
    };
    $.fn.okScrollTo.config = {};

    // Check on Screen    
    $.fn.okOnScreen = function (options) {
        options = $.extend({}, $.fn.okOnScreen.config, options);
        var viewport = {
            top: $window.scrollTop(),
            left: $window.scrollLeft()
        };
        viewport.right = viewport.left + $window.width();
        viewport.bottom = viewport.top + $window.height();

        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();
        return (!(viewport.right < bounds.left || viewport.left > bounds.right ||
            viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    };
    $.fn.okOnScreen.config = {};

    // Now Date
    $.fn.okNowDate = function (options) {
        options = $.extend({}, $.fn.okNowDate.config, options);
        return $("[data-now-date]").each(function () {
            var type = $(this).data("now-date");
            if (type == "year") {
                $(this).text(new Date().getFullYear());
            }
        });
    };
    $.fn.okNowDate.config = {};

    // Now Year Since
    $.fn.okNowYearsSince = function (options) {
        options = $.extend({}, $.fn.okNowYearsSince.config, options);
        return $("[data-now-years-since]").each(function () {
            var year = $(this).data("now-years-since");
            if (year) {
                var space = $(this).okIsIE() ? " " : "";
                $(this).text(new Date().getFullYear() - year + space);
            }
        });
    };
    $.fn.okNowYearsSince.config = {};

    // Drop Down Menu
    $.fn.okDropDownMenu = function (options) {
        options = $.extend({}, $.fn.okDropDownMenu.config, options);
        $("[data-dropdown-menu]").on("focusin", function () {
            $("[data-select-hide]").hide();
            var currentScroll = $(window).scrollTop();
            $("html, body").animate({
                scrollTop: currentScroll
            }, 1);
        });
        $("[data-dropdown-menu]").on("focusout", function () {
            $("[data-select-hide]").show();
            $("select").val(-1);
        });
        $(window).scroll(function () {
            $("[data-select-hide]").show();
        });
        return $("[data-dropdown-menu]").change(function (event) {
            var scrollTarget = $(event.target).val();
            var offset = 0;
            var selectedIndex = event.target.selectedIndex;
            var option = event.target.options[selectedIndex];
            if (scrollTarget) {
                var offset = $(option).data("height-offset") ? $(option).data("height-offset") : 0;
                setTimeout(function () {
                    $(this).okScrollTo({
                        target: scrollTarget,
                        header: '#header',
                        footer: '#footer',
                        offset: offset
                    });
                }, 250);
            } else {
                var action = $(option).data("select-action");
                if (action) {
                    if (action == "TOP") {
                        $(this).okScrollToTop();
                    } else if (action == "LANG") {
                        $(this).okSwitchLanguage();
                    } else if (action == "MAIL") {
                        $(this).okMail();
                    }
                }
            }
            event.target.selectedIndex = 0;
        });
    };
    $.fn.okDropDownMenu.config = {};

    // Mail
    $.fn.okMail = function (options) {
        options = $.extend({}, $.fn.okMail.config, options);
        var p1 = "oklemenz";
        var p2 = "web";
        var p3 = "de";
        location.href = "mailto:" + p1 + "@" + p2 + "." + p3;
    };
    $.fn.okMail.config = {};

    // Language
    $.fn.okLanguage = function (options) {
        options = $.extend({}, $.fn.okLanguage.config, options);
        var langCode = options.langCode;
        $.getJSON("lang/" + langCode + ".json", function (langText) {
            var space = $(this).okIsIE() ? " " : "";
            $("[data-i18n-text]").each(function (index, element) {
                var sCode = $(element).data("i18n-text");
                if (sCode && langText[sCode]) {
                    $(element).html(langText[sCode] + space);
                }
            });
            $("[data-i18n-title]").each(function (index, element) {
                var sCode = $(element).data("i18n-title");
                if (sCode && langText[sCode]) {
                    $(element).attr("title", langText[sCode]);
                }
            });
            $("[data-i18n-attr-content]").each(function (index, element) {
                var sCode = $(element).data("i18n-attr-content");
                if (sCode && langText[sCode]) {
                    $(element).attr("content", langText[sCode]);
                }
            });
            $("[data-i18n-href]").each(function (index, element) {
                var sCode = $(element).data("i18n-href");
                if (sCode && langText[sCode]) {
                    $(element).attr("href", langText[sCode]);
                }
            });
            $("[data-i18n-src]").each(function (index, element) {
                var sCode = $(element).data("i18n-src");
                if (sCode && langText[sCode]) {
                    $(element).attr("src", langText[sCode]);
                }
            });
            $("[data-i18n-class]").each(function (index, element) {
                var sClass = $(element).data("i18n-class");
                if (sClass) {
                    if (langText[sClass]) {
                        $(element).addClass(langText[sClass]);
                    } else {
                        $(element).addClass(sClass);
                    }
                }
            });
            $("[data-i18n-echo]").each(function (index, element) {
                var sContent = $(element).data("i18n-echo");
                $(element).html(sContent + space);
            });
            $("[data-i18n-switch]").each(function (index, element) {
                var sCode = $(element).data("i18n-switch");
                if (sCode && langText[sCode]) {
                    $(element).data("lang-code", langText[sCode]);
                }
            });
            $("[data-i18n-switch-url]").each(function (index, element) {
                var sCode = $(element).data("i18n-switch-url");
                if (sCode && langText[sCode]) {
                    $(element).data("lang-url", langText[sCode]);
                }
            });
        });
    };
    $.fn.okLanguage.config = {};

    // Switch Language
    $.fn.okSwitchLanguage = function (options) {
        options = $.extend({}, $.fn.okSwitchLanguage.config, options);
        var element = $("[data-i18n-switch]").first();
        var langCode = element.data("lang-code");
        $(this).okLanguage({
            langCode: langCode
        });
        var sUrl = element.data("lang-url");
        if (sUrl && history.replaceState) {
            history.replaceState({}, "", sUrl);
        }
    };
    $.fn.okSwitchLanguage.config = {};

    // Resize Auto Size
    $.fn.okResizeAutoSize = function (options) {
        options = $.extend({}, $.fn.okResizeAutoSize.config, options);
        return $("[data-auto-size]").each(function () {
            var element = $(this);
            var fHeight = $window.height() * parseFloat(element.data("auto-size"));
            element.css("height", fHeight);
        });
    };
    $.fn.okResizeAutoSize.config = {};

    // Scroll Size Height
    $.fn.okScrollSizeHeight = function (options) {
        options = $.extend({}, $.fn.okScrollSizeHeight.config, options);
        var scrollPos = $window.scrollTop();
        $("[data-scroll-size-height]").each(function () {
            var element = $(this);
            if (element.data("scroll-size-height")) {
                var windowHeight = $window.height();
                var top = element.offset().top;
                var height = element.height();
                if (top + height < scrollPos || top > scrollPos + windowHeight) {
                    return;
                }
                var scrollHeight = 0;
                scrollHeight = element.data("scroll-size-height");
                var speed = scrollPos > 0 ? 0.2 : 0.6;
                var newHeight = scrollHeight - Math.round(scrollPos * speed);
                element.css("height", newHeight + "px");
            }
            return;
        });
    };
    $.fn.okScrollSizeHeight.config = {};

    // Scroll Zoom In
    $.fn.okScrollZoomIn = function (options) {
        options = $.extend({}, $.fn.okScrollZoomIn.config, options);
        var scrollPos = $window.scrollTop();
        $("[data-scroll-zoom-in]").each(function () {
            var element = $(this);
            if (element.data("scroll-zoom-in")) {
                var sStyle = element.data("scroll-zoom-in");
                if (sStyle && element.okOnScreen()) {
                    element.addClass(sStyle);
                }
            }
        });
    };
    $.fn.okScrollZoomIn.config = {};

    // Scroll Speed
    $.fn.okScrollSpeed = function (options) {
        options = $.extend({}, $.fn.okScrollSpeed.config, options);
        var scrollPos = $window.scrollTop();
        $("[data-scroll-speed]").each(function () {
            var element = $(this);
            if (element.data("scroll-speed")) {
                var speed = element.data("scroll-speed");
                if (speed) {
                    if (window.Modernizr && Modernizr.csstransforms3d) {
                        element.css("-webkit-transform", "translate3d(0px, " + -(scrollPos * speed) + "px, 0)");
                        element.css("-moz-transform", "translate3d(0px, " + -(scrollPos * speed) + "px, 0)");
                        element.css("-o-transform", "translate3d(0px, " + -(scrollPos * speed) + "px, 0)");
                        element.css("-ms-transform", "translate3d(0px, " + -(scrollPos * speed) + "px, 0)");
                    } else if (window.Modernizr && Modernizr.csstransforms) {
                        element.css("-webkit-transform", "translate(0px, " + -(scrollPos * speed) + "px)");
                        element.css("-moz-transform", "translate(0px, " + -(scrollPos * speed) + "px)");
                        element.css("-o-transform", "translate(0px, " + -(scrollPos * speed) + "px)");
                        element.css("-ms-transform", "translate(0px, " + -(scrollPos * speed) + "px)");
                    }
                }
            }
        });
    };
    $.fn.okScrollSpeed.config = {};

    // Scroll Opacity
    $.fn.okScrollOpacity = function (options) {
        options = $.extend({}, $.fn.okScrollOpacity.config, options);
        var scrollPos = $window.scrollTop();
        $("[data-scroll-opacity]").each(function () {
            var element = $(this);
            if (element.data("scroll-opacity")) {
                if (element.okOnScreen() && element.data("scroll-initial-pos") === undefined) {
                    element.data("scroll-initial-pos", scrollPos);
                }
                if (element.data("scroll-initial-pos") != undefined) {
                    var initialScrollPos = element.data("scroll-initial-pos");
                    var speed = element.data("scroll-opacity");
                    if (speed) {
                        element.css("opacity", 1 - ((scrollPos - initialScrollPos) * speed) / 100);
                    }
                }
            }
        });
    };
    $.fn.okScrollOpacity.config = {};

    // Scroll Class
    $.fn.okScrollClass = function (options) {
        options = $.extend({}, $.fn.okScrollClass.config, options);
        var scrollPos = $window.scrollTop();
        return $("[data-scroll-class]").each(function () {
            var element = $(this);
            if (element.data("scroll-class") && element.data("scroll-pos")) {
                var sClass = element.data("scroll-class");
                var pos = element.data("scroll-pos");
                if (sClass && pos) {
                    if (scrollPos > pos) {
                        $(this).addClass(sClass);
                    } else {
                        $(this).removeClass(sClass);
                    }
                }
            }
        });
    };
    $.fn.okScrollClass.config = {};

    // Carousel
    $.fn.okCarousel = function (options) {
        options = $.extend({}, $.fn.okCarousel.config, options);
        return $("[data-carousel]").touchCarousel({
            pagingNav: false,
            snapToItems: false,
            itemsPerMove: 2,
            scrollToLast: false,
            loopItems: false,
            scrollbar: true
        });
    };
    $.fn.okCarousel.config = {};

    // Parallex scrolling
    $.fn.okParallexScroll = function (options) {
        options = $.extend({}, $.fn.okParallexScroll.config, options);
        return {
            elements: $("[data-scroll-background]") || [],
            speed: options.speed,
            scrollPos: 0,
            busy: 0,
            init: function () {
                var that = this;
                that.bounds = $.fn.okGetBounds();
                that.panes = [];
                this.elements.each(function () {
                    var element = this;
                    var width = that.bounds.width;
                    var height = 0.75 * that.bounds.height;
                    height = height > 250 ? height : 250;
                    if (!element.scrollParallex) {
                        element.scrollParallex = $("<div class='scroll_parallex'><div class='" +
                            $(element).data("scroll-background") + "'/></div>")[0];
                        $("body").prepend(element.scrollParallex);
                    }
                    $(element.scrollParallex).width(width);
                    $(element).height(height);
                    var bgHeight = options.scrollImageWidth;
                    var bgWidth = options.scrollImageHeight;
                    var paneHeight = that.bounds.height - (that.bounds.height - height) * that.speed;
                    var paneWidth = bgHeight * (paneHeight / bgWidth);
                    if (paneWidth >= that.bounds.width) {
                        bgHeight = paneHeight;
                    } else {
                        paneWidth = that.bounds.width;
                        bgHeight = bgWidth * (paneWidth / bgHeight);
                    }
                    var initBackgroundOffsetX = -(paneWidth - that.bounds.width) / 2;
                    var initBackgroundOffsetY = -(bgHeight - paneHeight) / 2;
                    that.panes.push({
                        element: element,
                        scrollParallex: element.scrollParallex,
                        scrollImage: element.scrollParallex.firstChild,
                        initBackgroundOffset: {
                            x: initBackgroundOffsetX || 0,
                            y: initBackgroundOffsetY || 0
                        },
                        backgroundOffset: {
                            x: initBackgroundOffsetX || 0,
                            y: initBackgroundOffsetY || 0
                        },
                        backgroundWidth: paneWidth,
                        backgroundHeight: bgHeight,
                        initScrollParallexLocation: {
                            x: element.offsetLeft,
                            y: element.offsetTop
                        },
                        scrollParallexLocation: {
                            x: element.offsetLeft,
                            y: element.offsetTop
                        },
                        scrollParallexWidth: width || 0,
                        scrollParallexHeight: height || 0,
                        visibility: "visible",
                        render: function () {
                            this.setStyle(this.scrollParallex, {
                                x: this.scrollParallexLocation.x,
                                y: this.scrollParallexLocation.y,
                                width: this.scrollParallexWidth,
                                height: this.scrollParallexHeight,
                                visibility: this.visibility
                            });
                            this.setStyle(this.scrollImage, {
                                x: this.backgroundOffset.x,
                                y: this.backgroundOffset.y,
                                width: this.backgroundWidth,
                                height: this.backgroundHeight,
                                visibility: this.visibility
                            });
                        },
                        setStyle: function (element, style) {
                            var transformation = [];
                            var x = (style.x || 0) | 0;
                            var y = (style.y || 0) | 0;
                            if (x !== 0 || y !== 0) {
                                transformation = window.Modernizr && Modernizr.csstransforms3d ?
                                    transformation.concat([
                                        "-webkit-transform: translate3d(" + x + "px, " + y + "px, 0)",
                                        "-moz-transform: translate3d(" + x + "px, " + y + "px, 0)",
                                        "-o-transform: translate3d(" + x + "px, " + y + "px, 0)",
                                        "-ms-transform: translate3d(" + x + "px, " + y + "px, 0)"
                                    ]) :
                                    window.Modernizr && Modernizr.csstransforms ?
                                    transformation.concat([
                                        "-webkit-transform: translateX(" + x + "px) translateY(" + y + "px)",
                                        "-moz-transform: translateX(" + x + "px) translateY(" + y + "px)",
                                        "-o-transform: translateX(" + x + "px) translateY(" + y + "px)",
                                        "-ms-transform: translateX(" + x + "px) translateY(" + y + "px)"
                                    ]) :
                                    transformation.concat([
                                        "position: absolute", "left: " + d + "px", "top: " + g + "px"
                                    ]);
                            }
                            style.backgroundImageUrl && transformation.push('background-image: url("' + style.backgroundImageUrl + '")');
                            style.width && transformation.push("width: " + (style.width | 0) + "px");
                            style.height && transformation.push("height: " + (style.height | 0) + "px");
                            style.visibility && transformation.push("visibility: " + style.visibility);
                            element.style.cssText = transformation.join(";");
                        }
                    });
                });
            },
            update: function () {
                if (this.panes) {
                    for (var i = 0; i < this.panes.length; i++) {
                        var pane = this.panes[i];
                        if (this.scrollPos < pane.initScrollParallexLocation.y + pane.scrollParallexHeight &&
                            this.scrollPos + this.bounds.height > pane.initScrollParallexLocation.y) {
                            pane.scrollParallexLocation.y = pane.initScrollParallexLocation.y - this.scrollPos;
                            pane.backgroundOffset.y = pane.initBackgroundOffset.y - pane.scrollParallexLocation.y +
                                pane.scrollParallexLocation.y * this.speed;
                            pane.visibility = "visible";
                        } else {
                            pane.visibility = "hidden";
                        }
                    }
                    for (var j = 0; j < this.panes.length; j++) {
                        this.panes[j].render();
                    }
                    this.busy = false;
                }
            },
            refresh: function (options) {
                if (options) {
                    this.scrollPos = options.scrollPos;
                }
                if (!this.busy) {
                    this.busy = true;
                    var that = this;
                    window.requestAnimationFrame(function () {
                        that.update();
                    });
                }
            }
        };
    };
    $.fn.okParallexScroll.config = {};

    // No Scroll Dynamic Content
    $.fn.okNoScrollDyanmicContent = function (options) {
        options = $.extend({}, $.fn.okNoScrollDyanmicContent.config, options);
        $(this).okResizeAutoSize();
        $("[data-scroll-background]").each(function (i, element) {
            $(element).addClass($(element).data("scroll-background"));
        });
        $(".zoom_0").each(function (i, element) {
            $(element).removeClass("zoom_0");
        });
        $(".header_profile_round").each(function (i, element) {
            $(element).addClass("header_profile_round_min");
        });
        return this;
    };
    $.fn.okNoScrollDyanmicContent.config = {};

    // No Scroll Dynamic Content Update
    $.fn.okNoScrollDyanmicContentUpdate = function (options) {
        options = $.extend({}, $.fn.okNoScrollDyanmicContentUpdate.config, options);
        $(this).okResizeAutoSize();
        $("[data-scroll-background]").each(function (i, element) {
            var fHeight = $window.height() * parseFloat(0.6);
            $(element).css("height", fHeight);
        });
    };
    $.fn.okNoScrollDyanmicContentUpdate.config = {};

}(jQuery, $(window)));