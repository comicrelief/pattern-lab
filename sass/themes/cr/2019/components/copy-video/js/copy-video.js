// To store each YT player object per video
var players = {}

jQuery(document).ready(function(){
  // Only load the YT API if we've got a Copy-Video element on the page
  if(jQuery(".paragraph--copy-video").length){
    var tag = document.createElement('script')
    tag.src = "//www.youtube.com/player_api";
    jQuery('head').append(tag);

    // Update all our our 'play' buttons to show loading state
    jQuery('button.copy-video__button').addClass('js-loading');
  }
});

// Only called on successful YT API load
function onYouTubePlayerAPIReady() {
  // Loop through each iframe video on the page
  jQuery( "iframe.copy-video__video").each(function (index) {

    // Create IDs dynamically
    var iframeID = "js-copy-video-" + index;
    var buttonID = "js-copy-video-" + index + "__button";

    // Set IDs
    jQuery(this).attr('id', iframeID);
    jQuery(this).next('button.copy-video__button').attr('id', buttonID);

    // Associate video player with button via index
    players[buttonID] = { player: null, }

    // Set-up a player object for each video
    players[buttonID].player =  new YT.Player(iframeID, {
      events: { 'onReady': onPlayerReady }
    });
  });
}

function onPlayerReady(event) {
  // The iframe that's ready to be used
  var readyIframeID = event.target.a.id;

  // Construct button ID, pass to clickhandler
  var readyButtonID = readyIframeID + "__button";

  // Update state classes
  $('#'+readyButtonID).removeClass('js-loading').addClass('js-ready')

  // Attach handler for this specific button      
  clickHandler(readyButtonID);
}

function clickHandler(thisButtonID) {

  jQuery('#'+thisButtonID).on('click', function() {
    // Remove from DOM

    jQuery(this).next('img').remove().end().remove();

    // Trigger YT player
    players[thisButtonID].player.playVideo();
  });
}