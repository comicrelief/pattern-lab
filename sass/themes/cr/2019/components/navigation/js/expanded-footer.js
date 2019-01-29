(function ($) {

  var $context = $('.navigation.menu--expanded-footer');

  $context.addClass("crExpandedFooter-processed");

  setUpFooter();
  
  function setUpFooter() {
    $('.menu-item a', $context).wrapInner('<span class="menu-item__text"></span>');
    handleClick();
  }

  function handleClick() {

    $('li.menu-item--expanded > a', $context).on('click', function (e) {

      e.preventDefault();

      // Only run this code if we're not on LG
      if ( $('span.md-breakpoint').is(":not(:visible)")) {
                
        $(this).parent('li.menu-item--expanded').toggleClass('item-open');

        $(this).attr('aria-expanded', function (i, attr) {
          return attr == 'true' ? 'false' : 'true'
        });
      }
    });  
  }
})(jQuery);
