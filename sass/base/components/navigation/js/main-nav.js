(function ($) {

  var animationSpeed = 0;
  var totalItems = 0;

  $('.main-nav').addClass("crNavigation-processed");

  setUpNav();
  
  function setUpNav() {
    $('#main-menu .menu-item a').wrapInner('<span class="menu-item__text"></span>');

    duplicateParentLink();
    toggleMenu();
    stickyNav();

    // Create our aria label dynamically
    totalItems =  $('#main-menu').find('a').not('.has-submenu').length;
    
    $('.main-nav-toggle').attr('aria-label', 'Open and close Navigation Menu, ' +totalItems+ ' items listed');

    // Set our speed depending on the type of nav
    animationSpeed =  $('#main-menu').hasClass('main-nav--feature__items') ? 0 : 250;
  }

  /* Updates empty duplicate link (added by template) with the parent item's text and link, dynamically */
  function duplicateParentLink() {
    /* Update text and link */
    $('.navigation > .main-nav__items > .menu-item--expanded').each(function () {

      $this = $(this);

      // Allow our duplicate link to 'inherit' all active classes if present
      var activeTrailClass = $this.hasClass('menu-item--active-trail') ? 'menu-item--active-trail' : '';
      var isActiveClass = $this.children('a').hasClass('is-active') ? 'is-active' : '';
    
      $thisDuplicate = $this.children('ul.main-nav__items').find('.menu-item--duplicate');

      $thisLink = $this.children('a');

      $thisDuplicate.addClass(activeTrailClass) // Add activeclass to li item
        .children('a').addClass(isActiveClass) // Add active class to link itself
          .attr('href', $thisLink.attr('href'))  // Add active class and url
            .children('span').text($thisLink.text()); // Add link copy
    });
  }

  function toggleMenu() {

    var isOpen = false;

    $('a.main-nav-toggle').on('click', function (e) {

      // Allow us to add a '#' href value to the burger nav to make it tab-focussable 
      e.preventDefault();

      isOpen = !isOpen;

      // Change state for visual effect, and also update the aria-expanded attribute for assistive tech
      $(this).toggleClass('is-active').attr('aria-expanded', function (i, attr) {
        return attr == 'true' ? 'false' : 'true'
      });

      // Change state of menu itself, animating with jQuery so we're hiding the UL only once it's finished animating closed, making sure assistive
      // technologies can't read-out the nav items 
      $('#main-menu', $(this).parents('.main-nav__wrapper')).toggleClass('menu-open', isOpen).slideToggle( animationSpeed );

      // Close all menus if we've closed the nav
      if (!($(this).hasClass('is-active'))) {
        $('.main-nav__wrapper:not(.main-nav--feature__wrapper) li.item-open').removeClass('item-open');
      };
    });

    toggleSubMenu();
    focusState();        
  }

  function toggleSubMenu() {

    $context = $('.main-nav__wrapper:not(.main-nav--feature__wrapper) .navigation');

    $('li.menu-item--expanded > a', $context).on('click', function (e) {

      // Basic check to see if the mobile nav is use before making
      // the parent link function as a 'button' rather than a link
      if ( $('.main-nav__burger').is(":visible")) {

        e.preventDefault();

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
    $context = $('.main-nav__wrapper .navigation');

    // To store the currently focused/blurred anchor
    var $thisAnchor = null;
    var focusState = false;

    // Cache our selectors
    var $subAnchor = $('li.menu-item--expanded > a ~ ul li a', $context);
    var $parentAnchor = $('li.menu-item--expanded > a', $context);
    var $parentLi = $('li.menu-item--expanded', $context);

    $('html body a').on('focus blur', function(e) {
      
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

  function stickyNav() {
    
    // Cache the our 'sticky nav' header only
    $thisHeader = $('.sticky-nav__header');

    $(window).scroll(function() {
      // Toggle between our 'scrolling' classes to let us add a background colour
      // to the sticky nav once it's being scrolled down the page
      $thisHeader.toggleClass('scrolling', $(window).scrollTop() > 0);
    });
  }
})(jQuery);
