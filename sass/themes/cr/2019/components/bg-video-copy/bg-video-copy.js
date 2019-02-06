(function ($) {

  var allVideos = [];
  var videoCounter = 0;
  var numberOfVideos = 0;
  var thisID = "";

  $( document ).ready(function() {

    $('.paragraph--background-video-copy').each(function(index) {
      
      $this = $(this);

      // Dynamically create an ID
      thisID = 'background-video-copy--' + index;

      $this.attr('id', thisID);

      // Store a ref to this video and its offset bottom position
      allVideos[index] = {
        top: $this.offset().top,
        id: thisID
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
        console.log("I will trigger video ", allVideos[videoCounter].id );
        videoCounter++;

        // Unbind the scroll handler if we've reached our total video number
        if (videoCounter >= numberOfVideos) {
          $( window ).off("scroll");
        }
      }
    });
  }

})(jQuery);
