(function ($) {

  var $context = $('.navigation.menu--expanded-footer');

  $context.addClass("crExpandedFooter-processed");

  setUpFooter();
  
  function setUpFooter() {
    $('.menu-item a', $context).wrapInner('<span class="menu-item__text"></span>');
    stopClick();
    focusState();
  }

  function stopClick() {
    $('li.menu-item--expanded > a', $context).on('click', function (e) {
      e.preventDefault();

      if ($(this).parent('li.menu-item--expanded')){

      }
    });
  }

  function focusState() {

    // To store the currently focused/blurred anchor
    var $thisAnchor = null;

    // Cache our selectors
    var $subAnchor = $('li.menu-item--expanded > a ~ ul li a', $context);
    var $parentAnchor = $('li.menu-item--expanded > a', $context);
    var $parentLi = $('li.menu-item--expanded', $context);

    $('a', $context).on('focus blur', function(e) {

      console.log("buh");

      // Basic check to ensure we're running this code on the right breakpoints
      if ($('span.lg-breakpoint', $context).is(":not(:visible)")) {
              
        // Cache the anchor being focused/blurred
        $thisAnchor = $(this);
  
        /* FOCUS event */
        if ( e.type == "focus" ? true : false ) {
    
          // If we're focussing on a nav item anchor, add focus class to the parent li, so we can affect all subnav styling
          if ($thisAnchor.is($('a', $context))) {
            if ($thisAnchor.is($parentAnchor)) {
              // Unfocus all other focussed parent items
              // TODO: do we want this or not?
              // $parentLi.removeClass("focused item-open");
              $(this).closest( $parentLi ).addClass("focused item-open").children('a').attr('aria-expanded', 'true');
            }
          }
        }

        /* BLUR event */
        else {
          // If we're blurring away from the last-child subnav item, remove our overall focus class from the menu
          if ($thisAnchor.is($subAnchor)) {
            $thisAnchor.parent('li:last-child').closest('li.focused').removeClass("focused");
          }
        }
      }
    });
  }
})(jQuery);
