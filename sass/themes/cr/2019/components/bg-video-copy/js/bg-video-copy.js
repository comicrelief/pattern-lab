(function($) {

  var allVideos = [],
      thisID = "",
      thisSrc = "";

  $(document).ready(function() {

    var isIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);
    var isSMBreakpoint = $('span.md-breakpoint').is(":not(:visible)");

    // Stop any video functionality if we're using iOS and/or on the SM breakpoint
    if (isIOS !== null || isSMBreakpoint) { 
      return;
    }

    // Otherwise, do cool video stuff
    $('.paragraph--background-video-copy').each(function(index) {

      $this = $(this);
      $thisVideo = $this.find('video');

      // Dynamically create an ID and add it to the video for triggering purposes
      thisID = 'background-video-copy__video-' + index;

      $thisVideo.attr('id', thisID);

      // Store a ref to this video and its offset bottom position
      allVideos[index] = {
        top: $this.offset().top,
        id: thisID
      };
    });

    // Only attach the handler if we've got vids in the current page
    if (allVideos.length) {
      handleScroll();
    }
  });


  function handleScroll() {
    // Won't recalculate this *every* scroll; resizes be damned
    var winHeight = window.innerHeight,
      winBottom = winHeight,
      thisVideo = null,
      videoCounter = 0;

    // Initial check to trigger any videos that are already on-screen
    if (winBottom >= allVideos[videoCounter].top) {
      document.getElementById(allVideos[videoCounter].id).play();
      videoCounter++;
    }

    $(window).on("scroll", function() {

      // Figure out the current bottom position of the window
      winBottom = window.pageYOffset + winHeight;

      // Unbind the scroll handler if we've reached our total video number
      if (videoCounter >= allVideos.length) {
        $(window).off("scroll");
      }

      // If we've scrolled a video into view, trigger play
      else if (winBottom >= allVideos[videoCounter].top && videoCounter < allVideos.length ) {
        document.getElementById(allVideos[videoCounter].id).play();
        videoCounter++;
      }
    });
  }
})(jQuery);
