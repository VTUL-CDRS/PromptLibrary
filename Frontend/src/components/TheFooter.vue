<script setup lang="ts">
import "../assets/global.css";
</script>

<style scoped>
footer {
  position: relative;
  height: 50px;
  width: 100%;
  background-color: var(--footer-color);
}
.footer-text {
  display: flex;
  position: absolute;
  left: 42%;
  top: 1%;

}
</style>

<template>
  <footer class="container">
    <div class="">
      <h5 class="footer-text"> © 2024 Brandon Hoang, Daniel Shin, Gabriel Shin, Ryan Wang </h5>
    </div>
  </footer>
</template>
