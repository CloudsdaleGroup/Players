/* Copyright (C) Cloudsdale Radio - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Cloudsdale Radio Dev Team <Developement@Cloudsaleradio.com>, 2016
 *
 * if you need some help go check our github we share some code there!
 * https://github.com/CloudsdaleGroup
 */
console.log('%c Cloudsdale Radio', 'font-size:100px;color:#fff;text-shadow:0 3px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);')
console.log('Version 5.2')
console.log('Environement: Production')
checkStation();
setInterval(function (){
    checkStation();
}, 10000);
function checkStation(){
var xhr = new XMLHttpRequest()
            xhr.open("GET", "http://broadcaster.animefm.co/api/nowplaying/3", true)
            xhr.onreadystatechange = function(channel) {
                if(xhr.readyState == 4) {
                var data = JSON.parse(xhr.responseText)
                var elm  = document.getElementById("info")
                if(data["station"] === null){
                    console.log("API OFFLINE :/")
                }else{
                    var listen = null;
                    //Now Playing
                    $('.song').html('Now Playing: <br> <strong> ' + data.now_playing.song.text + '</strong>');
                    $('.navsong').text('Now Playing: ' + data.now_playing.song.text);
                    //Check if requested or not. if true  show it.
                    $('.nowRequest').text('Now Playing: ' + data.now_playing.song.text);
                    //song cover
                    $('.art').html('<img class="rounded" src="' + data.now_playing.song.art + '"> ');
                    $('.art2').html('<img class="img-rounded" src="' + data.now_playing.song.art +'" width="90px" >');
                    $('.navArt').html('<img src="' + data.now_playing.song.art +'" width="21px" >');
                    //Listner count
                    $('.listen').html('<i class="fas fa-users"> </i> ' + listen);
                    //Next Playing
                    //$('.next').text(data.playing_next.song.text);
                    //Next song cover
                    //$('.nextArt').html('<img src="' + data.playing_next.song.art +'"> ');   
                    //Hisotia
                    //$('.history').text(data.song_history.song.text);

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