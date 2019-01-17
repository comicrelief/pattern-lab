// Load YT player api
var tag = document.createElement('script')
tag.src = "//www.youtube.com/player_api";
$('head').append(tag);

// To store each YT player object per video
var players = {}

// Update all our our 'play' buttons to show loading state
$('button.copy-video__button').addClass('js-loading');

function onYouTubePlayerAPIReady() {

  // Loop through each iframe video on the page
  $( "iframe.copy-video__video").each(function (index) {

    // Create IDs dynamically
    var iframeID = "js-copy-video-" + index;
    var buttonID = "js-copy-video-" + index + "__button";

    // Set IDs
    $(this).attr('id', iframeID);
    $(this).next('button.copy-video__button').attr('id', buttonID);

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
  $('#'+readyButtonID)
    .removeClass('js-loading')
        .addClass('js-ready')

  // Attach handler for this specific button      
  clickHandler(readyButtonID);
}

function clickHandler(thisButtonID) {

  $('#'+thisButtonID).on('click', function() {
    // Remove from DOM
    $(this).remove();

    // Trigger YT player
    players[thisButtonID].player.playVideo();
  });
}