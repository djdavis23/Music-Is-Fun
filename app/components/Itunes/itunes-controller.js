import ItunesService from "./itunes-service.js";

//PRIVATE

const itunesService = new ItunesService()

function drawSongs(results) {
  console.log(results)
  //YOUR CODING STARTS HERE
  let template = ""

  results.forEach(song => {
    template += `
    <div class="col-md-3 col-xs-12">
      <div class="card bg-light mb-3">
          <h3 class="card-header">${song.artist}</h3>
          <div class="card-body">
              <h5 class="card-title">${song.title}</h5>
              <h6 class="card-subtitle text-muted">${song.collection}</h6>
          </div>
          <img style="width: 100%; display: block;" src="${song.albumArt}" alt="Card image">
          <div class="card-body">
              <audio controls volume="0.3">
                  <source src="${song.preview}" type="audio/ogg">
                  <source src="${song.preview}" type="audio/aac">
                  <source src="${song.preview}" type="audio/mp4">
                  Your browser does not support the audio element.
              </audio>
          </div>
          <div class="card-footer">
              Price: $${song.price}
          </div>
      </div>
    </div>    
    `
  })
  // let top = document.getElementById("header")
  // top.style.backgroundImage = 'url("assets/music2.jpg")'
  // document.getElementById("welcome").style.color = "#325d88"
  document.getElementById("songs").innerHTML = template;
}


//PUBLIC
class ItunesController {
  //DO NOT MODIFY THIS METHOD
  getMusic(e) {
    e.preventDefault();
    var artist = e.target.artist.value;
    //changes the button to loading while songs load
    $('#get-music-button').text('LOADING....');
    itunesService.getMusicByArtist(artist).then(results => {
      drawSongs(results)
      //changes button back to GET MUSIC once songs are loaded
      $('#get-music-button').text('GET MUSIC');
    })
  }


}


export default ItunesController