(function($) {

  var allVideos = [],
      thisID = "",
      thisSrc = "";

  $(document).ready(function() {

    var isIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);

    // If we get an iOS match (iOS not supporting video in this way), just stick with the image
    if (isIOS !== null) { 
      console.log("iOS: no video");
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

      $thisVideo.addClass('js-loaded');
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