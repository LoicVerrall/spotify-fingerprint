<template>
  <div class="container">
    <img alt="Vue logo" src="../assets/logo/logo.png" width="80">
    <h1>Welcome to SpøtifyFingerprint</h1>
    <p>
      Fancy a visual 'fingerprint' of your Spotify Top Songs profile? SpotifyFingerprint has got you covered.
    </p>
    <h3>1. Log in to your Spotify account.</h3>
    <h3>2. Choose an artist, album, playlist, or song.</h3>
    <h3>3. Generate your bespoke musical fingerprint.</h3>
    <a @click="getSongData()"><div class="cta">Get Data</div></a>
    <a @click="getSongAverages()"><div class="cta">Generate Fingerprint</div></a>
    <h3>{{ danceabilityAvg }}</h3>
    <h3>{{ tempoAvg }}</h3>
    <h3>{{ energyAvg }}</h3>
    <h3>{{ loudnessAvg }}</h3>
    <h3>{{ livenessAvg }}</h3>

  </div>
</template>

<script>
  var Spotify = require('spotify-web-api-js')

  export default {
    name: 'Main',
    data: function() {
      return {
        songCollection: [],
        jackToken: 'BQBk0HJ-6uNJtdvRPRdi-Ciec4RrLWX7EsFksyOq-yFmDRaSaNihRTZscxhGkU7jNMCvCXTkd8iN_gUieFRxjUfj96emqzt1WgrKtC4WmWIl0QWRj--jvbeSmgkGe5BjOqpGHapFTyPtDTQcRg',
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
        s.setAccessToken(this.jackToken);
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
    margin: 40px 0 0;
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
    width: 200px;
  }

  a {
    text-decoration: none;
  }
</style>
