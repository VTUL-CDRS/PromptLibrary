<template>
  <div class="database-view-container">
    <section class="prompts-container">
      <div class="prompt">
        <h1 class="header-text">Submit a Prompt</h1>
        <h3>Fill in the details for the prompt below.</h3>
        <form class="database-form" @submit.prevent="submitPrompt">
          <div class="input_box">
            <label for="prompt">Prompt:</label>
            <input id="prompt" type="text" placeholder="Enter the prompt" v-model="newPrompt.prompt" />
          </div>

          <div class="input_box">
            <label for="response">Response:</label>
            <textarea id="response" placeholder="Enter the expected response" v-model="newPrompt.response"></textarea>
          </div>

          <div class="input_box">
            <label for="tags">Tags:</label>
            <input id="tags" type="text" placeholder="Include tags as comma separated values" v-model="newPrompt.tags" />
          </div>

          <div class="input_box">
            <label for="llmName">Language Model:</label>
            <select id="llmName" v-model="newPrompt.llmName">
              <option disabled value="">Select a Language Model</option>
              <option value="gpt-3">GPT-3</option>
              <option value="gpt-3.5">GPT-3.5</option>
              <option value="gpt-4">GPT-4</option>
              <!-- Add other models as needed -->
            </select>
          </div>

          <input class="submit-button" type="submit" value="Submit" />
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';

const bodyJSON = {ids: this.selectedPrompts};
const requestOptions = {
  method: "POST",
  body: {bodyJSON}
}


// Form data
const newPrompt = ref({
  prompt: '',
  response: '',
  tags: '', // Will need to be processed into an array before submission
  llmName: ''
});

// Dummy function to handle form submission
const submitPrompt = () => {
  // Process tags into an array
  const tagsArray = newPrompt.value.tags.split(',').map(tag => tag.trim());

  // Construct the form submission object
  const submission = {
    ...newPrompt.value,
    tags: tagsArray
  };

  console.log('Submitting:', submission);
  // Here you would send 'submission' to your backend API
};

</script>

<style scoped>
.database-view-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center children horizontally */
  justify-content: center; /* Center children vertically */
  height: 80vh; /* Take full viewport height */
  padding-top: var(--header-height); /* Add padding to account for fixed header, if present */
}

.prompts-container {
  width: 100%; /* Use the full container width */
  max-width: 600px; /* Maximum width for the form */
  margin: 0 auto; /* Center the form in the available space */
}

.prompt {
  background-color: #f0f0f0;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 4px;
  margin-bottom: 2rem; /* Add some space at the bottom */
}

.database-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.database-form input[type="text"],
.database-form select,
.database-form textarea {
  width: 100%; /* Make the input take the full width of its parent */
  padding: 1rem;
  border: 2px solid #aaa;
  border-radius: 8px; /* More pronounced rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.submit-button {
  padding: 1rem;
  width: 100%; /* Full width button */
  font-size: 1rem;
  margin-top: 1rem;
  background-color: var(--button-color);
  color: var(--white-text);
  border: none;
  border-radius: 8px; /* Match input border-radius */
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-button:hover {
  background-color: var(--button-highlight);
}

.header-text, .database-form h3 {
  text-align: center; /* Center the titles and headers */
  color: var(--header-color);
}

/* If you have a fixed header, you need to account for its height with padding-top */
/* This is an example variable, adjust as needed for your project */
:root {
  --header-height: 60px;
}

</style>

