<template>
  <div>
    <component :is="selectedComponent" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import AdminDatabaseView from './AdminDatabaseView.vue';
import DatabaseView from './DatabaseView.vue';
import { store } from '../store/store.ts';

const selectedComponent = computed(() => {
  return store.isAdminLoggedIn ? AdminDatabaseView : DatabaseView;
});
</script>