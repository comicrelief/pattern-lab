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
  }

  function toggleSubMenu() {

    $context = $('.main-nav__wrapper:not(.main-nav--feature__wrapper) .navigation');

    $('li.menu-item--expanded > a', $context).on('click', function (e) {

      e.preventDefault();

      $listItem = $(this).parent('li.menu-item--expanded');
      $listItemParents = $listItem.parents('li.item-open');

      // Remove any 'item-open' classes and add class to clicked item
      $('li.item-open', $context).not($listItem).not($listItemParents).removeClass('item-open');

      $($listItem).toggleClass('item-open');
    });    
  }
})(jQuery);
