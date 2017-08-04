(function ($) {
  // Activate lightcase
  // Video lightcase
  $('a[data-rel^=lightcase]').lightcase({
    overlayOpacity: .95,
    

    iframe: {
      width: "100%",
      height: "100%",
      frameborder: 0
    },
    
    onFinish : {

      custom: function() {

        var caption = $(this).parent().find('.media-block__caption');

        $('.lightcase-contentInner iframe').focus();

        if (caption.length) {
          lightcase.get('caption').html(caption.html());
          $('#lightcase-caption').show();
        }

        lightcase.resize();
      }
    }
  });
})(jQuery);
