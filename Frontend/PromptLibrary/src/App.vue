<script setup lang="ts">
import TheHeader from "../src/components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";

import { RouterView, useRoute } from "vue-router";
const route = useRoute();

</script>

<template>
  <div id="app" :class="{'app-hero': route.path === '/'}">
    <the-header></the-header>
    <router-view :key="route.fullPath"></router-view>
    <the-footer></the-footer>
  </div>
</template>

<style>

</style>
