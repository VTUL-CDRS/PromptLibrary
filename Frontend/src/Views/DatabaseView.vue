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
#prompt-library {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers the filters container */
  justify-content: center;
  min-height: 70vh; /* Ensures the library takes full height of the viewport */
  padding: 20px;
  box-sizing: border-box; /* Ensures padding does not add to the width */
}

.filters {
  display: flex;
  justify-content: space-around; /* Spaces out the children elements evenly */
  align-items: center;
  width: 80%; /* Adjust this as necessary to control the width of the filters area */
  max-width: 600px; /* Adjust this as necessary */
  margin: auto; /* Centers the filters area horizontally */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional shadow for some depth */
  border-radius: 10px; /* Optional border radius for rounded corners */
  background-color: #fff; /* Optional background color */
}

.rating-range-container,
.tag-selector-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.rating-range-container select,
.tag-selector-container select,
.filters button {
  padding: 10px;
  margin: 5px 0; /* Adds margin to the top and bottom for spacing */
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
}

.tag-selector-container select {
  width: 100%; /* Ensures the tag selector takes up the full width */
}

.filters button {
  background-color: var(--button-color);
  color: var(--white-text);
  border: none;
  cursor: pointer;
}

.filters button:hover {
  background-color: var(--button-highlight);
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    width: 95%; /* Allows for a small margin on small screens */
  }

  .rating-range-container select,
  .tag-selector-container select,
  .filters button {
    width: auto; /* Allows the elements to fit the content on small screens */
  }
}
</style>
