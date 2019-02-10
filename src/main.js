import Vue from 'vue'
import App from './App.vue'
var Spotify = require('spotify-web-api-js');
var s = new Spotify();
var jackToken = 'BQCZb0n7_cFT068pcEUJIvnAsrZZ11kNhj_RZpk5bPayE_W1lCd7qazNPI2fK6lqyNITmvYzrrTgs1spXsJerfbJc1UGYGkUM8EGjSa-UsPXAGNSXvFNOzRG7Ucx16qHhMcduxkIoNbyIjlR3A'
var trackID = 'spotify:track:2374M0fQpWi3dLnB54qaLX'.substring(14)
var songCollection = []
var albumID = 'spotify:album:1OHFrZ1T34sjnqvy9Hqc4z'.substring(14)
var playlistID = 'spotify:user:1197173707:playlist:7xCh8QqB8HQMDU012eIFDf'.substring(33)
s.setAccessToken(jackToken);

//Get artist (Probably wont be used
//
//  s.getArtistAlbums('1LhK7wn59Hq6GNN4sUS3ih', function(err, data) {
//    if (err) console.error(err);
//    else console.log('Artist albums', data);
//  });/

//Get track.
//
// var track = s.getAudioAnalysisForTrack(trackID, function(err, data) {
//   if (err) console.error(err);
//   else{
//    console.log('Track details:', data);
//    trackTempo = data.track.tempo;
//    console.log(trackTempo)
//   }
// })

//Get album.
//
s.getAlbum(albumID, function(err, data) {
  if (err) console.error(err);
  else console.log('Album details:', data);
});

//Get playlist.
//
s.getPlaylist(playlistID, function(err, data) {
  if (err) console.error(err);
  else {
    //console.log('Playlist details:', data);
    var ids = []
    for (let i = 0; i < data.tracks.items.length; i++){
      ids.push(data.tracks.items[i].track.id)
      //console.log(data.tracks.items[i].track.id)
    }
    for (let j = 0; j < ids.length; j++){
      var track = s.getAudioFeaturesForTracks(ids[j], function(err, data) {
        if (err) console.error(err);
        else{
         //console.log('Track details:', data);
         songCollection.push({
            songID: ids[j],
            danceability: data.audio_features[0].danceability,
            tempo: data.audio_features[0].tempo,
            energy: data.audio_features[0].energy,
            loudness: data.audio_features[0].loudness,
            liveness: data.audio_features[0].liveness});
         if (j == 99){
           getAverages();
           console.log(songCollection);
         }
        }
      })
    }
  }
});

function getAverages(){
  var danceabilityAvg = 0;
  var tempoAvg = 0;
  var energyAvg = 0;
  var loudnessAvg = 0;
  var livenessAvg = 0;
  var count = 0;
  for(let i = 0; i < songCollection.length; i++){
    count++
    danceabilityAvg += songCollection[i].danceability;
    tempoAvg += songCollection[i].tempo;
    energyAvg += songCollection[i].energy;
    loudnessAvg += songCollection[i].loudness;
    livenessAvg += songCollection[i].liveness;

    if(i + 1 == songCollection.length){
      console.log(count)
      danceabilityAvg = (danceabilityAvg / count);
      tempoAvg = (tempoAvg / count);
      energyAvg = (energyAvg / count);
      loudnessAvg = (loudnessAvg / count);
      livenessAvg = (livenessAvg / count);
      console.log('danceabilityAvg: ' + danceabilityAvg)
      console.log('tempoAvg: ' + tempoAvg)
      console.log('energyAvg: ' + energyAvg)
      console.log('loudnessAvg: ' + loudnessAvg)
      console.log('livenessAvg: ' + livenessAvg)
    }
  }
}

//User top tracks.
//
// s.getMyTopTracks('1114629857', function(err, data) {
//   if (err) console.error(err);
//   else console.log('Artist albums', data);
// });
  

Vue.config.productionTip = false
console.log("hello")
new Vue({
  render: h => h(App),
}).$mount('#app')
