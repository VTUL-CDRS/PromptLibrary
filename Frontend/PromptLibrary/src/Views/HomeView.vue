<template>
  <div class = "">
    <h1 class="header-text">PromptLibrary</h1>
  </div>
  <form class="search-bar">
    <input type="text" /> &nbsp
  </form>
  <form class="search-button">
    <input type="submit" value="Search" />
  </form>
  <form class="explore-button">
    <br>
    <input type="submit" value="Explore" />
  </form>
</template>

<script setup lang="ts">
</script>

<style scoped>
.search-bar {
  margin-top: 5em;
  margin-left: 50em;
  width: 12em;
  background-color: var(--background-color);
}

.search-button {
  margin-top: -1.3em;
  margin-left: 62em;
  width: 12em;
  background-color: var(--background-color);
}

.explore-button {
  margin-top: 0em;
  margin-left: 55em;
  width: 12em;
  background-color: var(--background-color);
}

.header-text {
  margin-top: 5em;
  margin-left: 25em;
  color: var(--black-text);
}

</style>