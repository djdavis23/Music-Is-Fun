import ItunesService from "./itunes-service.js";

//PRIVATE

const itunesService = new ItunesService()
//activePlayer holds the HTML src element of the last played preview
var activePlayer;

function drawSongs(results) {
  console.log(results)
  //YOUR CODING STARTS HERE
  let template = ""
  let i = 1;
  results.forEach(song => {
    //if statement ensures videos are filtered out
    if (song.preview.search("video") == -1) {
      template += `
    <div class="col-md-6 col-xs-12 song-card">
      <div class="card bg-light mb-3">
          <h3 class="card-header">${song.artist}</h3>
          <div class="card-body">
              <h5 class="card-title" onclick="app.controllers.itunesCtrl.playTitle('${i}')">${song.title}</h5>
              <h6 class="card-subtitle text-muted">${song.collection}</h6>
          </div>
          <img style="width: 100%; display: block;" src="${song.albumArt}" alt="Card image">
          <div class="card-body">
              <audio controls id="player${i}" onplay="app.controllers.itunesCtrl.prevPlay(event)">
                  <source src="${song.preview}" type="audio/ogg">
                  <source src="${song.preview}" type="audio/aac">
                  <source src="${song.preview}" type="audio/mp4">
                  Your browser does not support the audio element.
              </audio>
          </div>
          <div class="card-footer">
              Price: $${song.price} @itunes.apple.com
          </div>
      </div>
    </div>    
    `
      i++
    }
  })


  document.getElementById("songs").innerHTML = template;
}


//PUBLIC
class ItunesController {
  //DO NOT MODIFY THIS METHOD
  getMusic(e) {
    e.preventDefault();
    var artist = e.target.artist.value;
    //changes the button to loading while songs load
    //@ts-ignore
    $('#get-music-button').text('LOADING....');
    itunesService.getMusicByArtist(artist).then(results => {
      drawSongs(results)
      //changes button back to GET MUSIC once songs are loaded
      //@ts-ignore
      $('#get-music-button').text('GET MUSIC');
    })
  }
  //this function will pause the previously selected audio track and set
  //current track as the active player
  prevPlay(e) {
    if (activePlayer) {
      activePlayer.pause()
    }
    activePlayer = e.srcElement
  }

  //this function plays the preview for the selected title element
  playTitle(i) {
    let aud = document.getElementById("player" + i)
    console.log(aud)
    //@ts-ignore
    aud.play()
  }


}


export default ItunesController