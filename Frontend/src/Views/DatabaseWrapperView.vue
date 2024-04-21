<template>
  <div>
    <component :is="selectedComponent" :search-query="searchQuery" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AdminDatabaseView from './AdminDatabaseView.vue';
import DatabaseView from './DatabaseView.vue';
import { store } from '../store/store.ts';

const route = useRoute();

const searchQuery = computed(() => route.query.search);

const selectedComponent = computed(() => {
  return store.isAdminLoggedIn ? AdminDatabaseView : DatabaseView;
});
</script>