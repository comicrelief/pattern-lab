(function ($) {

  $('footer.footer--expanded ul.menu.menu--level-0>li.menu-item>a').click(function(e){
    e.preventDefault();
    $(this).toggleClass('js-show');
  })

})(jQuery);
