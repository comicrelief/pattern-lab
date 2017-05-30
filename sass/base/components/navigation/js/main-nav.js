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
    $('.main-nav > .main-nav__items > .menu-item--expanded').each(function () {
      $this = $(this);

      // Populate duplicate link with parent link info.
      $(this).children('ul.main-nav__items')
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
      $('#main-menu').toggleClass('menu-open');

      // Disable default event for links with sub menu
      var link = $('.menu-open').find('.has-submenu');
      link.click(function (e) {
        e.preventDefault();
      });
      toggleSubMenu();

    });
  }


  function toggleSubMenu() {
    $('.menu-open > li').on('click', function (e) {

      if ($(this).find('a').hasClass('has-submenu')) {
        // Remove any item open classes an add class to clicked item
        $('.menu-open > li.item-open').not(this).removeClass('item-open');
        $(this).toggleClass('item-open'); 
      }
    });
  }
})(jQuery);
