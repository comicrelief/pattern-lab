(function ($) {

  $( document ).ready(function() {

    var allVideos = {};
    var videoCounter = 0;

    $('.paragraph--background-video-copy').each(function( index ) {
      allVideos[index] = $(this);
      var pos = $(this).offset();
      console.log( pos.top);
    });

    handleScroll();

    console.log(allVideos);

  });

  function handleScroll(){
      
    console.log("handle that scroll");

    $(window).on('scroll', function(){
      console.log('scrolling2');
    });
  };






})(jQuery);
