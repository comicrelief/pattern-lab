(function ($) {

  var allVideos = [];
  var videoCounter = 0;
  var numberOfVideos = 0;

  $( document ).ready(function() {

    $('.paragraph--background-video-copy').each(function(index) {

      $this = $(this);

      // Store a ref to this video and its offset bottom position
      allVideos[index] = {
        item: $this,
        top: $this.offset().top
      };
    });

    numberOfVideos = allVideos.length;
    
    // Only attach the handler if we've got vidz
    if (numberOfVideos){
      handleScroll();
    }
  });

  function handleScroll() {
    // Won't recalculate this *every* scroll; resizes be damned
    var winHeight = window.innerHeight;
    var winBottom = winHeight;

    $(window).on("scroll", function() {

      // Figure out the current bottom position of the window
      winBottom = window.scrollY + winHeight;

      // If we've scrolled a video into view, trigger play
      if ( winBottom >= allVideos[videoCounter].top ) {
        console.log("I will trigger video ", videoCounter);
        videoCounter++;

        // Unbind the scroll handler if we've reached our total video number
        if (videoCounter >= numberOfVideos) {
          $( window ).off("scroll");
        }
      }
    });
  }

})(jQuery);
