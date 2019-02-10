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
    <a href='google.com'><div class="cta">Generate Fingerprint</div></a>
  </div>
</template>

<script>
  export default {
    name: 'Main'
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
