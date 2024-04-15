<template>
  <div>
    <component :is="selectedComponent" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import AdminPromptDetail from './AdminPromptDetail.vue';
import PromptDetail from './PromptDetail.vue';
import { store } from '../store/store.ts';

const selectedComponent = computed(() => {
  return store.isAdminLoggedIn ? AdminPromptDetail : PromptDetail;
});
</script>