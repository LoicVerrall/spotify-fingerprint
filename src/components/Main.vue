<template>
  <div class="container">
    <img alt="Vue logo" src="../assets/logo/logo.png" width="80">
    <h1>Welcome to SpøtifyFingerprint</h1>
    <p>
      Fancy a visual 'fingerprint' of your Spotify Top Songs profile? SpotifyFingerprint has got you covered.
    </p>

    <h3>1. Supply your Spotify Access Token.</h3>
    <input placeholder="Spotify Access Token" v-model="accessToken" />

    <h3>2. Provide Spotify playlist ID.</h3>
    <input placeholder="Spotify playlist ID" v-model="playlistID"/>
    <a @click="getSongData()"><div class="cta" style="margin-top: 20px;">Retrieve Playlist</div></a>

    <h3>3. Fetch the next song in your playlist.</h3>
    <a @click="getSongAverages()"><div class="cta">Fetch Song</div></a>

    <h3>4. Choose a colour that you feel represents this song — this is your fingerprint.</h3>
    <verte picker="square" model="hex"></verte>

    <h3>5. Upload your fingerprint.</h3>
    <a @click="getSongAverages()"><div class="cta">Upload Fingerprint</div></a>

    <h3>{{ danceabilityAvg }}</h3>
    <h3>{{ tempoAvg }}</h3>
    <h3>{{ energyAvg }}</h3>
    <h3>{{ loudnessAvg }}</h3>
    <h3>{{ livenessAvg }}</h3>

  </div>
</template>

<script>
  import Verte from 'verte';
  import Vue from 'vue';
  import 'verte/dist/verte.css';
  Vue.component('verte', Verte);

  var Spotify = require('spotify-web-api-js')

  export default {
    name: 'Main',
    data: function() {
      return {
        songCollection: [],
        accessToken: 'BQAAW7soVySo-ZtSk-ZigfqWtUMw9IWiQ6WvZTYnzOSeAj8bP5TMsfpDSoiWDTCPYLCYNmB9lIPl2_nUdbI97iiyp6yyuSq8tFof4Hx725Jok99ot-c90ZRiZnTaqA-XFrhHW03qLDWA42XNhVkhYotPaBXo',
        playlistID: '3fVeOU4Nz3VcgtJx5PToqQ',
        danceabilityAvg: '',
        tempoAvg: '',
        energyAvg: '',
        loudnessAvg: '',
        livenessAvg: '',
      }
    },
    //Spotify: require('spotify-web-api-js'),
    //s: new Spotify(),
    methods: {
      getSongData: function() {
        var s = new Spotify()
        var tempList = []
        s.setAccessToken(this.accessToken);
        s.getPlaylist(this.playlistID, function(err, data) {
          if (err) console.error(err);
          else {
            var ids = []
            for (let i = 0; i < data.tracks.items.length; i++){
              ids.push(data.tracks.items[i].track.id)
            }
            for (let j = 0; j < ids.length; j++){
              s.getAudioFeaturesForTracks(ids[j], function(err, data) {
                if (err) console.error(err);
                else{
                  tempList.push({
                  songID: ids[j],
                  danceability: data.audio_features[0].danceability,
                  tempo: data.audio_features[0].tempo,
                  energy: data.audio_features[0].energy,
                  loudness: data.audio_features[0].loudness,
                  liveness: data.audio_features[0].liveness})
                if (j == ids.length - 1){
                  return tempList
                }
                }
              })
            }
          }
        });
        this.songCollection = tempList
      },
      getSongAverages: function() {
        if(this.songCollection != null){
          console.log(this.songCollection)
          var danceabilityAvg = 0;
          var tempoAvg = 0;
          var energyAvg = 0;
          var loudnessAvg = 0;
          var livenessAvg = 0;
          var count = 0;
          for(let i = 0; i < this.songCollection.length; i++){
            count++
            danceabilityAvg += this.songCollection[i].danceability;
            tempoAvg += this.songCollection[i].tempo;
            energyAvg += this.songCollection[i].energy;
            loudnessAvg += this.songCollection[i].loudness;
            livenessAvg += this.songCollection[i].liveness;

            if(i + 1 == this.songCollection.length){
              this.danceabilityAvg = "Danceability Average: " + (danceabilityAvg / count);
              this.tempoAvg = "Tempo Average: " + (tempoAvg / count);
              this.energyAvg = "Energy Average: " + (energyAvg / count);
              this.loudnessAvg = "Loudness Average: " + (loudnessAvg / count);
              this.livenessAvg = "Liveness Average: " + (livenessAvg / count);
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  h3 {
    margin: 40px 0 20px;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .cta {
    font-weight: 600;
    margin-left: 30px;
    margin-right: 30px;
    padding: 5px 15px 5px 15px;
    border-radius: 20px;
    background-color: #1bd760;
    color: white;
    text-decoration: none;
    cursor: pointer;
    width: 200px;
  }

  a {
    text-decoration: none;
  }

  input {
    font-size: 14pt;
    padding: 10px;
    width: 70%;
    min-width: 200px;
    height: 35px;
    border-radius: 12px;
    border: 3px solid lightgray;
  }
</style>
