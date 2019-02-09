<template>
  <div class="header">
    <a href='google.com'>About</a>
    <a href='google.com'><div class="cta">Login to Spotify</div></a>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-end;
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
}

a {
  font-weight: 500;
  color: #1bd760;
  text-decoration: none;
}
</style>
