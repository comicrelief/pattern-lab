  console.log('copy-video.js');

  // Load YT player api
  var tag = document.createElement('script');
  tag.src = "//www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
  var players = {}

  function onYouTubePlayerAPIReady() {

    // Loop through each iframe video on the page
    jQuery( "iframe.copy-video__video").each(function (index) {

      // Create IDs dynamically
      var frameID = "js-copy-video__video-" + index;
      var buttonID = "js-copy-video__button-" + index;

      // Set IDs
      jQuery(this).siblings('button.copy-video__button').attr('id', buttonID);
      jQuery(this).attr('id', frameID);

      // Associate video player with button via index
      players[buttonID] = { player: null, }

      // Set-up a player object for each video
      players[buttonID].player =  new YT.Player(frameID, {
        events: { 'onReady': onPlayerReady }
      });
    });

    console.log("Players:", players );
  }

  function onPlayerReady(event) {

    console.log('onPlayerReady')

    jQuery('.copy-video__button').on('click', function() {

      var thisID = jQuery(this).attr('id');

      console.log('thisID', thisID);
      console.log('players', players);

      jQuery(this).remove();

      players[thisID].player.playVideo();

    });
  }
