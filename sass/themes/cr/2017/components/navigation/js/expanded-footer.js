(function ($) {

  var $menuButton = $('.footer--expanded .menu.menu--level-0:not(.menu--level-1) > li.menu-item > a');

  $menuButton.click(function(e){
    e.preventDefault();
    $(this).toggleClass('js-show');
  })

})(jQuery);
