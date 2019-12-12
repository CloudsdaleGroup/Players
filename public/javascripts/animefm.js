/* Copyright (C) Cloudsdale Radio - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Cloudsdale Radio Dev Team <Developement@Cloudsaleradio.com>, 2016
 *
 * if you need some help go check our github we share some code there!
 * https://github.com/CloudsdaleGroup
 */
checkStation();
setInterval(function (){
    checkStation();
}, 10000);
function checkStation(){
var xhr = new XMLHttpRequest()
            xhr.open("GET", "https://broadcaster.animefm.co/api/nowplaying/3", true)
            xhr.onreadystatechange = function(channel) {
                if(xhr.readyState == 4) {
                var data = JSON.parse(xhr.responseText)
                var elm  = document.getElementById("info")
                if(data["station"] === null){
                    console.log("API OFFLINE :/")
                }else{
                    var listen = null;
                    $('.song').html('Now Playing: <br> <strong> ' + data.now_playing.song.text + '</strong>');
                    $('.navsong').text('Now Playing: ' + data.now_playing.song.text);
                    $('.nowRequest').text('Now Playing: ' + data.now_playing.song.text);
                    $('.art').html('<img class="rounded" src="' + data.now_playing.song.art + '"> ');
                    $('.art2').html('<img class="img-rounded" src="' + data.now_playing.song.art +'" width="90px" >');
                    $('.navArt').html('<img src="' + data.now_playing.song.art +'" width="21px" >');
                    $('.listen').html('<i class="fas fa-users"> </i> ' + listen);

                    //test author & title
                    $('.title').text(data.now_playing.song.title);
                    $('.author').text(data.now_playing.song.artist);

                    //request Now
                    if(data.now_playing.is_request === false ){
                        $('.request').html('');
                    }else{
                        $('.request').html('song requested');
                    };
                    // next request
                    //if(data.playing_next.is_request === false ){
                    //    $('.nrequest').text('');
                    //}else{
                    //    $('.nrequest').text('song requested');
                    //};

                    //Weekly party @ Cloudsdale
                    if(data.now_playing.playlist === "Weekly party @ Cloudsdale!"){
                        
                        $('.special').html('<h4>Show:</h4><p><strong>' + data.now_playing.playlist + '</strong></p>');
                    }else{
                        $('.special').html('');
                    };
                    
                    //NOTIFY
                    if ('mediaSession' in navigator) {
                        navigator.mediaSession.metadata = new MediaMetadata({
                          title: data.now_playing.song.title,
                          artist: data.now_playing.song.artist,
                          album: data.now_playing.song.album,
                          artwork: [
                            { src: data.now_playing.song.art,  sizes: '96x96',   type: 'image/png' },
                            { src: data.now_playing.song.art, sizes: '128x128', type: 'image/png' },
                            { src: data.now_playing.song.art, sizes: '192x192', type: 'image/png' },
                            { src: data.now_playing.song.art, sizes: '256x256', type: 'image/png' },
                            { src: data.now_playing.song.art, sizes: '384x384', type: 'image/png' },
                            { src: data.now_playing.song.art, sizes: '512x512', type: 'image/png' },
                          ]
                          
                        });
                        playButton.addEventListener('pointerup', function(event) {
                            playAudio();
                          });
                      
                        navigator.mediaSession.setActionHandler('play', function() {});
                        navigator.mediaSession.setActionHandler('pause', function() {});
                      }
                                        
                }
                if(data.live.is_live === false) {
                    //IKD dude!  ¯\_(ツ)_/¯
                    $('.request').html('<a href="/request" target="_blank" class="text-muted"><i class="fas fa-question"></i> Request a Song</a>')
                    
                }else{
                    $('.live').html('<center><div class="onair"> <b>On air!</b></div></center>Streamer: <b>' + data.live.streamer_name + '</b>');
                    $('.next').text("NaN");
                    $('.request').html(' <a href="#" class="text-muted"><i class="fas fa-question"></i> Song Request disable.</a>')
                }
            }
            // Script reexecute it self every 5 sec
            }
            xhr.send();

        }
        function checkUpdate(e) {
            $.getJSON("https://broadcaster.cloudsdaleradio.com/api/nowplaying/3",function(streamData) {
                console.log('Requesting CR API ' + streamData)
              if(streamData && streamData.stream) {
                 var title = data.now_playing.song.text;
                 if(!checkLastStatus == data.now_playing.sh_id -1) {
                     checkLastStatus = data.now_playing.sh_id -1; 
                     console.log(checkLastStatus + data.now_playing.song.text)
                    var opt = {
                      type: 'basic',
                        iconUrl: 'icon/icon.png',
                      title: "Cloudsdale Radio",
                      message: 'On Air:' + data.now_playing.song.text
                    }
                     chrome.browserAction.setIcon({path:"icon/on.png"});
                     chrome.notifications.create(opt, function() {});
                     chrome.notifications.onClicked.addListener(function(notificationId, byUser) {
                       chrome.tabs.create({url: "http://SiriusTV.fr"});
                     });
                 
                }
              } else {

              }
           })
        }