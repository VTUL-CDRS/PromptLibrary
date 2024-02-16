<template>
  <div class = "">
    <h1 class="">PromptLibrary</h1>
  </div>
  <form class=".search-bar">
    <input type="text" /> &nbsp <input type="submit" value="Search" /> <br>
    <input type="submit" value="Explore" />
  </form>
</template>

<script setup lang="ts">
</script>

<style scoped>
.search-bar {
  display: flex;
  flex-direction: row;
  top: 0;
  left: 0%;
  width: 100%;
  padding-right: 2rem;
  background-color: var(--header-color);
}

.header-text {
  color: var(--white-text);
}

</style>