<template>
  <div class = "">
    <h1 class="header-text">User Authentication</h1>
  </div>
  <form class="login-bars">
    <input type="text" value="Username"/> <br>
    <input type="text" value="Password"/> <br>
  </form>
  <form class="login-button">
    <input type="submit" value="Login" />
  </form>
</template>

<script setup lang="ts">
</script>

<style scoped>
.login-bars {
  margin-top: 0em;
  margin-left: 51.5em;
  width: 12em;
}

.login-button {
  margin-top: -1.35em;
  margin-left: 63.5em;
  width: 12em;
}

.header-text {
  margin-top: 5em;
  margin-left: 25em;
  color: var(--black-text);
}

</style>