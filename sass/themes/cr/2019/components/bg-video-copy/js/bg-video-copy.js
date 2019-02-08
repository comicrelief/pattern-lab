(function($) {

  var allVideos = [],
      thisID = "";

  $(document).ready(function() {

    $('.paragraph--background-video-copy').each(function(index) {

      $this = $(this);

      // Dynamically create an ID and add it to the video for triggering purposes
      thisID = 'background-video-copy__video-' + index;
      $this.find('video').attr('id', thisID);

      // Store a ref to this video and its offset bottom position
      allVideos[index] = {
        top: $this.offset().top,
        id: thisID
      };
    });

    // Only attach the handler if we've got vidz
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

    $(window).on("scroll", function() {

      // Figure out the current bottom position of the window
      winBottom = window.scrollY + winHeight;

      // If we've scrolled a video into view, trigger play
      if (winBottom >= allVideos[videoCounter].top) {

        document.getElementById(allVideos[videoCounter].id).play();

        videoCounter++;

        // Unbind the scroll handler if we've reached our total video number
        if (videoCounter >= allVideos.length) {
          $(window).off("scroll");
        }
      }
    });
  }
})(jQuery);