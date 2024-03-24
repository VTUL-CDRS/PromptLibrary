<template>
  <div id="prompt-library">
    <div class="filters">
      <!-- Dropdowns for Rating Range -->
      <div class="rating-range-container">
        <label for="rating-lower">Rating From:</label>
        <select id="rating-lower" v-model="ratingRange.lower">
          <option v-for="n in 10" :key="n" :value="n / 2">{{ n / 2 }}</option>
        </select>

        <label for="rating-upper">Rating To:</label>
        <select id="rating-upper" v-model="ratingRange.upper">
          <option v-for="n in 10" :key="n" :value="n / 2">{{ n / 2 }}</option>
        </select>
      </div>

      <!-- Multi-select Dropdown for Tags -->
      <div class="tag-selector-container">
        <label for="tag-select">Select Tags:</label>
        <select id="tag-select" v-model="selectedTags" multiple>
          <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
        </select>
      </div>

      <!-- Filter Button -->
      <button @click="filterPrompts">Filter</button>
    </div>

    <!-- List of Prompts will be rendered here -->
    <div v-for="prompt in filteredPrompts" :key="prompt.id">
      <!-- Prompt details -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ratingRange: {
        lower: 0,
        upper: 5
      },
      selectedTags: [],
      tags: ['Science', 'History', 'Technology'], // These should come from your backend
      filteredPrompts: [], // Filtered prompts go here
    };
  },
  methods: {
    filterPrompts() {
      // Logic to filter prompts based on the selected rating range and tags
      // In a real scenario, this would be an API call to your backend
      this.filteredPrompts = this.getFilteredPrompts();
    },
    getFilteredPrompts() {
      // Replace this with actual filtering logic using the backend data
      return [
        // Example filtered prompts
      ];
    },
    // Add other methods if needed
  },
  mounted() {
    // Fetch initial data when component mounts
    this.filterPrompts();
  },
};
</script>

<style scoped>
.filters {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
}

.filters label {
  margin-right: 8px;
}

.filters select {
  padding: 10px;
  margin-right: 8px;
}

.filters button {
  padding: 10px 20px;
  background-color: var(--button-color);
  border: none;
  color: var(--white-text);
  cursor: pointer;
  border-radius: 5px;
}

.filters button:hover {
  background-color: var(--button-highlight);
}

.tag-selector-container select {
  width: 150px; /* Adjust width as necessary */
}

/* Add responsive design as needed */
@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }
}
</style>
