/*(function ($) {

  var $menuButton = $('.footer--expanded .menu.menu--level-0:not(.menu--level-1) > li.menu-item > a');

  $menuButton.click(function(e){
    e.preventDefault();
    $(this).toggleClass('js-show');
  })

})(jQuery);*/



(function ($) {

  var animationSpeed = 250;
  var totalItems = 0;

  $('#block-expandedfooter').addClass("crExpandedFooter-processed");

  setUpFooter();
  
  function setUpFooter() {

    $('#block-expandedfooter .menu-item a').wrapInner('<span class="menu-item__text"></span>');

    toggleSubMenu();
    focusState();
  }


  function toggleSubMenu() {

    $context = $('#block-expandedfooter');

    $('li.menu-item--expanded > a', $context).on('click', function (e) {

      e.preventDefault();

      // Only run this code if we're not on LG
      if ( $('span.lg-breakpoint').is(":not(:visible)")) {
        
        console.log("not LG");

        $this = $(this);
        $listItem = $this.parent('li.menu-item--expanded');
        $listItemParents = $listItem.parents('li.item-open');

        // Remove any 'item-open' classes and add class to clicked item
        $('li.item-open', $context).not($listItem).not($listItemParents).attr('aria-expanded', 'false').removeClass('item-open');

        // Remove expanded attribute from all menu items
        $('li.menu-item--expanded > a', $context).attr('aria-expanded', 'false');

        // Add active class
        $listItem.addClass('item-open');

        // Add expanded state
        $this.attr('aria-expanded', 'true');
      }
    });    
  }

  function focusState() {

    // Set our context for non-feature nav
    $context = $('#block-expandedfooter');

    // To store the currently focused/blurred anchor
    var $thisAnchor = null;
    var focusState = false;

    // Cache our selectors
    var $subAnchor = $('li.menu-item--expanded > a ~ ul li a', $context);
    var $parentAnchor = $('li.menu-item--expanded > a', $context);
    var $parentLi = $('li.menu-item--expanded', $context);

    $('a', $context).on('focus blur', function(e) {
      
      // Cache the anchor being focused/blurred
      $thisAnchor = $(this);

      /* FOCUS event */
      if ( e.type == "focus" ? true : false ) {

        // Focussed on a non-nav anchor? Remove active states
        if (!($thisAnchor.is($('a', $context)))) {
          $parentLi.removeClass("focused item-open").children('a').attr('aria-expanded', 'false'); 
        }

        // If we're focussing on a nav item anchor, add focus class to the parent li, so we can affect all subnav styling
        else {
          if ($thisAnchor.is($parentAnchor)) {
            // Unfocus all other focussed parent items
            $parentLi.removeClass("focused item-open");
            $(this).closest( $parentLi ).addClass("focused item-open").children('a').attr('aria-expanded', 'true');

          }
          // Else, check its not a subitem, then remove focus class from all nav item
          else if (!($thisAnchor.is($subAnchor))) {
            $parentLi.removeClass("focused item-open").children('a').attr('aria-expanded', 'false'); ; 
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
    });
  }


})(jQuery);
