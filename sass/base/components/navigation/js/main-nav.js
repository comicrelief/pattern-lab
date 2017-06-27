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
      // Change state of menu itself.
      $('#main-menu').toggleClass('menu-open');
    });

    toggleSubMenu();       
  }

  function toggleSubMenu() {

    $('.main-nav__wrapper:not(.main-nav--feature__wrapper) .navigation li.menu-item--expanded > a').on('click', function (e) {

      e.preventDefault();
      $listItem = $(this).parent('li.menu-item--expanded');
      // Remove any item open classes an add class to clicked item
      $('.menu-open > li.item-open').not($listItem).removeClass('item-open');
      $($listItem).toggleClass('item-open');
    });    
  }
})(jQuery);
