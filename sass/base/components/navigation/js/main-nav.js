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

      $this.children('ul.main-nav__items')
        .find('.menu-item--duplicate > a')
          .attr('href', $this.children('a').attr('href'))
            .find('span').text($this.children('a').text());
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
