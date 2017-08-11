(function ($) {

  $('.main-nav').addClass("crNavigation-processed");

  setUpNav();
  
  function setUpNav() {
    $('#main-menu .menu-item a').wrapInner('<span class="menu-item__text"></span>');

    duplicateParentLink();
    toggleMenu();
    /* Setup the Smartmenus plugin with our main menu */
    $('#main-menu').smartmenus({
      subIndicatorsText: "",
      keepHighlighted: false,
      hideOnClick: true,
    });

    /* Bind the 'show' function to also hide all the other submenus */
    $('#main-menu').bind('activate.smapi', function (e, menu) {
      $('#main-menu').smartmenus('menuHideAll');
    });
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
    $('a.main-nav-toggle').on('click', function (e) {

      // Change state for visual effect.
      $(this).toggleClass('is-active');

      // Change state of menu itself.
      $('#main-menu', $(this).parents('.main-nav__wrapper')).toggleClass('menu-open');

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

        $listItem = $(this).parent('li.menu-item--expanded');
        $listItemParents = $listItem.parents('li.item-open');

        // Remove any 'item-open' classes and add class to clicked item
        $('li.item-open', $context).not($listItem).not($listItemParents).removeClass('item-open');

        $($listItem).toggleClass('item-open');
      }
    });    
  }

  function focusState() {

    // Set our context for non-feature nav
    $context = $('.main-nav__wrapper:not(.main-nav--feature__wrapper) .navigation');
    var focusState = false;

    // Cache our selectors for ease of us
    var $parentAnchor = $('li.menu-item--expanded > a');
    var $parentLi = $('li.menu-item--expanded');

    var $subAnchor = $('li.menu-item--expanded > a ~ ul li a');

    // To store the currently focused/blurred anchor
    var $thisAnchor = null;


    // Focus-handler on parent nav items, to allow us to control the focus state in the parent element for styling
    /*    $('li.menu-item--expanded > a', $context).on('focus', function(e) {
      $(this).closest('li.menu-item--expanded').addClass("focused");
    });*/


    $('html body a').on('focus blur', function(e) {

      // Cache the anchor being focused/blurred
      $thisAnchor = $(this);

      // Cache where this is a focus or blur event
      focusState = e.type == "focus" ? true : false;

      if (focusState) {

        // If we're focussing on a nav item anchor, add our focus
        // to the parent li, so we can effect all subnav styling
        if ( $thisAnchor.is( $parentAnchor, $context ) ) {
          $(this).closest( $parentLi ).addClass("focused");
        }

        // Else, we're focussing on something else, so remove focus class from all nav items
        else {

          // TODO: make this work properly
          //$($parentLi, $context).removeClass("focused");
        }
      }

      // If not focus event, then this is a blur event
      else {

        console.log("BLUR");

          if ( $thisAnchor.is( $( $subAnchor, $context) )) {

            console.log("blurring last child item");
            // Cache parent element
            
            $thisLi = $thisAnchor.closest('li');

            // If we're removing focus from the last li in the submenu, remove our overall active class
            if ( $thisLi.is(":last-child") ){
              $thisLi.closest('li.menu-item--expanded.focused').removeClass("focused");
            }
          }
        }
      });
    }
})(jQuery);
