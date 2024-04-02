<template>
  <div id="prompt-library">
    <div class="filters">
      Search:
      <form class="search-bar">
        <input type="text" placeholder="Enter key words to search"/>
      </form>
      Tags:
      <form class="search-bar">
        <input type="text" placeholder="Enter tags to search"/>
        example: +code +vue_js -real
      </form>

      <!-- Filter Button -->
      <button @click="filterPrompts" class ="filter-button">Filter</button>
    </div>

    <!-- List of Prompts will be rendered here -->
    <div class = "prompt-container"> <!--v-for="prompt in filteredPrompts" :key="prompt.id"-->
      <!-- Prompt details -->
      <div class = "prompt-card">Sample card</div>
      <div class = "prompt-card">Sample card</div>
      <div class = "prompt-card">Sample card</div>
      <div class = "prompt-card">Sample card</div>
    </div>
    <div>
    <router-link to="/submit" style="">
      <button class="submit-button">Submit a prompt</button> <!-- v-if = "true"-->
    </router-link>
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

.search-bar input[type="text"] {
  width: 90%; /* Adjust the width as needed */
  height: 5%;
  padding: 0.5em; /* Makes the input taller and the text inside it larger */
  font-size: 1em; /* Increase the font size for better readability */
  border: 2px solid #aaa; /* Solid border with a light grey color */
  border-radius: 25px; /* Rounded corners for the border */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  transition: border-color 0.3s, box-shadow 0.3s; /* Transition for effects on focus */
  text-align: left;
  margin-bottom: 10px;
}

.filter-button {
  width: 160px; /* Adjust as needed */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: var(--black-text);
  cursor: pointer;
}

.filters {
  position: absolute;
  left: 2%;
  top: 15%;
  width: 25%; /* Adjust this as necessary to control the width of the filters area */
  min-height: 20%;
  margin: auto; /* Centers the filters area horizontally */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional shadow for some depth */
  border-radius: 10px; /* Optional border radius for rounded corners */
  background-color: #fff; /* Optional background color */
}

.submit-button {
  position: absolute;
  left: 3%;
  bottom: 10%;
  width: 25rem; /* Adjust as needed */
  height: 3rem;
  padding: 0.5em;
  font-size: 1.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: black;
  cursor: pointer;
}

.prompt-container {
  position: absolute;
  left: 28%;
  top: 15%;
  width: 70%; /* Adjust this as necessary to control the width of the filters area */
  min-height: 75%;
  margin: auto; /* Centers the filters area horizontally */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional shadow for some depth */
  border-radius: 10px; /* Optional border radius for rounded corners */
  background-color: #fff; /* Optional background color */
}

.prompt-card {
  position: relative;
  display: inline-block;
  margin: 6px;
  width: 24%; /* Adjust this as necessary to control the width of the filters area */
  min-height: 170px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional shadow for some depth */
  border-radius: 10px; /* Optional border radius for rounded corners */
  background-color: #ccc; /* Optional background color */
  cursor: pointer;
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
