<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const selectedRating = ref('');
    const selectedTag = ref('');
    const tags = ref([]);
    const prompts = ref([]);

    onMounted(async () => {
      tags.value = await fetchTags();
      prompts.value = await fetchPrompts();
    });

    const fetchTags = async () => {
      const response = await axios.get('/api/tags');
      return response.data;
    };

    const fetchPrompts = async (rating = '', tag = '') => {
      const response = await axios.get('/api/prompts', {
        params: { rating, tag },
      });
      return response.data;
    };

    const filterPrompts = async () => {
      prompts.value = await fetchPrompts(selectedRating.value, selectedTag.value);
    };

    const filteredPrompts = computed(() => prompts.value);

    return {
      selectedRating,
      selectedTag,
      tags,
      filterPrompts,
      filteredPrompts,
    };
  },
};
</script>

<template>
  <div id="prompt-library">
    <!-- Add dropdown for ratings -->
    <select v-model="selectedRating">
      <option value="">Select Rating</option>
      <option value="1">1 Star</option>
      <!-- Add options for other star ratings -->
    </select>

    <!-- Add dropdown for tags -->
    <select v-model="selectedTag">
      <option value="">Select Tag</option>
      <option v-for="tag in tags" :key="tag.name" :value="tag.name">{{ tag.name }}</option>
    </select>

    <button @click="filterPrompts">Filter</button>

    <!-- List prompts -->
    <div v-for="prompt in filteredPrompts" :key="prompt.id">
      <!-- Display prompt information -->
    </div>
  </div>
</template>



<style scoped>
#prompt-library .filters {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; /* Adjust the space between elements */
  margin-top: 20px; /* Add some space at the top */
}

#prompt-library select {
  padding: 10px 30px; /* Larger padding for a larger dropdown */
  font-size: 1rem; /* Match the font size in global.css */
  border: 2px solid var(--second-button-color); /* Use color from global.css */
  border-radius: 20px; /* Rounded borders for style */
  background-color: var(--background-color);
  color: var(--black-text);
  cursor: pointer;
}

#prompt-library button {
  padding: 10px 30px;
  font-size: 1rem;
  background-color: var(--second-button-color); /* Match button color */
  color: var(--white-text);
  border: none; /* No border for button */
  border-radius: 20px; /* Rounded borders to match the selects */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Shadow for depth */
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

#prompt-library button:hover {
  background-color: var(--button-highlight); /* Color for hover state */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Larger shadow on hover */
  transform: translateY(-2px); /* Lift button on hover */
}

/* Container to center .filters horizontally and vertically */
#prompt-library {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh; /* Use the full height of the viewport */
}

/* Ensure the .filters div is as wide as it needs to be while centered */
#prompt-library .filters {
  width: fit-content;
  margin: 0 auto;
}

@media (max-width: 768px) {
  #prompt-library .filters {
    flex-direction: column;
  }

  #prompt-library select,
  #prompt-library button {
    width: 100%; /* Full width on smaller screens */
  }
}
</style>

