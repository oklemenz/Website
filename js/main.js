/*
 * Website Main v1.3
 * Copyright 2013-2024, Oliver Klemenz, https://www.oklemenz.de
 */
(function ($, $window) {

  $(this).okLanguage({
    langCode: $(this).okGetLangCode()
  });

  var okScrollImageSize = [];
  okScrollImageSize["desktop"] = {
    width: 1600,
    height: 1060
  };
  okScrollImageSize["tablet"] = {
    width: 1024,
    height: 678
  };
  okScrollImageSize["phone"] = {
    width: 568,
    height: 376
  };

  var okConfig = {
    scrollImageWidth: okScrollImageSize[$(this).okGetDeviceType()].width,
    scrollImageHeight: okScrollImageSize[$(this).okGetDeviceType()].height,
    scrollDynamicContent: !$(this).okIsMobileDevice() && !$(this).okIsIE()
  };

  $(this).okImageRetina();
  $(this).okNowDate();
  $(this).okNowYearsSince();
  $(this).okDropDownMenu();
  $(this).okScrollZoomIn();

  var touchCarousel;

  if (okConfig.scrollDynamicContent) {
    function update(event) {
      $(this).okResizeAutoSize();
      $(this).okScrollSizeHeight();
      $(this).okScrollZoomIn();
      $(this).okScrollSpeed();
      $(this).okScrollOpacity();
      $(this).okScrollClass();
    }

    var parallexScrolling = $(this).okParallexScroll({
      speed: 0.25,
      scrollImageWidth: okConfig.scrollImageWidth,
      scrollImageHeight: okConfig.scrollImageHeight
    });

    $window.load(function (event) {
      update();
      touchCarousel = $(this).okCarousel();
      parallexScrolling.init();
      parallexScrolling.update();
    });

    $window.resize(function (event) {
      update();
      parallexScrolling.init();
      parallexScrolling.refresh();
    });

    $window.scroll(function (event) {
      if (okConfig.scrollDynamicContent) {
        update();
        parallexScrolling.refresh({
          scrollPos: $(event).okScrollPos()
        });
      }
    });
  } else {
    $(this).okNoScrollDyanmicContent();

    $window.load(function (event) {
      touchCarousel = $(this).okCarousel();
      $(this).okNoScrollDyanmicContentUpdate();
    });

    $window.resize(function (event) {
      $(this).okNoScrollDyanmicContentUpdate();
    });
  }

  // Orientation change
  $(window).bind("onorientationchange" in window ? "orientationchange" : "resize", function () {
    if (touchCarousel) {
      //touchCarousel.data("touchCarousel");
    }
  });

  // Status bar fix in standalone mode
  if (!!window.navigator.standalone) {
    $("#header").addClass("header_status_bar");
    $(".header_title_status_bar").addClass("header_title_status_bar_show");
  }

}(jQuery, $(window)));