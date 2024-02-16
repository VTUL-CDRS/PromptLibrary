<script setup lang="ts">
import TheHeader from "../src/components/TheHeader.vue";

import { RouterView, useRoute } from "vue-router";
import TheFooter from "./components/TheFooter.vue";
import HomeView from "./Views/HomeView.vue";
const route = useRoute();

</script>

<template>
  <the-header></the-header>
  <home-view></home-view>
  <the-footer></the-footer>
</template>

<style>

</style>
