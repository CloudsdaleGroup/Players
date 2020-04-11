/* Copyright (C) Cloudsdale Radio - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Cloudsdale Radio Dev Team <Developement@Cloudsaleradio.com>, 2016
 *
 * if you need some help go check our github we share some code there!
 * https://github.com/CloudsdaleGroup
 */
checkStation();
setInterval(function () {
  checkStation();
}, 10000);
function checkStation() {
  var xhr = new XMLHttpRequest()
  xhr.open("GET", "https://api.asthriona.com/animefm", true)
  xhr.onreadystatechange = function (channel) {
    if (xhr.readyState == 4) {
      var data = JSON.parse(xhr.responseText)
      var elm = document.getElementById("info")
      if (data["station"] === null) {
        console.log("API OFFLINE :/")
      } else {
        var listen = null;
        $('.song').html('Now Playing: <br> <strong> ' + data.artist + " </strong> -" + data.title);
        $('.navsong').text('Now Playing: ' + data.artist + " - " + data.title);
        $('.art').html('<img class="rounded" src="' + data.art + '"> ');
        $('.listen').html('<i class="fas fa-users"> </i> ' + data.listen);

        //NOTIFY
        if ('mediaSession' in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: data.now_playing.song.title,
            artist: data.now_playing.song.artist,
            album: data.now_playing.song.album,
            artwork: [
              { src: data.now_playing.song.art, sizes: '96x96', type: 'image/png' },
              { src: data.now_playing.song.art, sizes: '128x128', type: 'image/png' },
              { src: data.now_playing.song.art, sizes: '192x192', type: 'image/png' },
              { src: data.now_playing.song.art, sizes: '256x256', type: 'image/png' },
              { src: data.now_playing.song.art, sizes: '384x384', type: 'image/png' },
              { src: data.now_playing.song.art, sizes: '512x512', type: 'image/png' },
            ]
          });
          navigator.mediaSession.setActionHandler('play', function () { });
          navigator.mediaSession.setActionHandler('pause', function () { });
        }
      }
      // Script reexecute it self every 5 sec
    }
    xhr.send();
  }