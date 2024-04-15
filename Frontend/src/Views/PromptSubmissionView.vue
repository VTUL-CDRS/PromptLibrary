<template>
  <div>
  <router-link to="/database" style="">
    <button class="back-button">Back to Library</button>
  </router-link>
  </div>
  <div class="database-view-container">
    <section class="prompts-container">
      <div class="prompt">
        <h1 class="header-text">Submit a Prompt</h1>
        <h3>Fill in the details for the prompt below.</h3>
        <h4>Fields with "*" are required.</h4>
        <form class="database-form">
          <div>
            <label>Title*</label>
            <input type="text" placeholder="Enter a one to three word title for the prompt" v-model="subTitle" />
          </div>
          <div>
            <label>Summary*</label>
            <input type="text" placeholder="Enter a short one to three sentence summary of the prompt" v-model="subSummary" />
          </div>
          <div>
            <label>Prompt*</label>
            <input type="text" placeholder="Enter prompt" v-model="subPrompt" />
          </div>

          <div>
            <label>Response*</label>
            <input type="text" placeholder="Enter sample response" v-model="subResponse"/>
          </div>

          <div>
            <label>Tags</label>
            <input type="text" placeholder="Include tags as comma separated values with no spaces between tags" v-model="subTags" />
          </div>

          <div>
            <label>Language Model*</label>
            <select class="dropdown" v-model="subLlmName">
              <option disabled value="">Select a Language Model</option>
              <option value="ChatGPT">ChatGPT</option>
              <option value="Bard">Bard</option>
              <option value="CoPilot">CoPilot</option>
              <!-- Add other models as needed -->
            </select>
          </div>

          <button class="submit-button" type="button" @click="submitPrompt()">Submit</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  data() {
    const subPrompt = ref("");
    const subResponse = ref("");
    const subTags = ref("");
    const subLlmName = ref("");
    const subSummary = ref("");
    const subTitle = ref("");
    return {
      subPrompt,
      subResponse,
      subTags,
      subLlmName,
      subSummary,
      subTitle
    };
  },
  methods: {
    async submitPrompt() {
      try {
        console.log("Attempting submit");
        // Process tags into an array
        const tagsArray = this.subTags.split(',').map(tag => ({tagName: tag.trim()}));
        console.log(tagsArray);
        //const prompts: {id: number, prompt: string, response: string, image: string, rating: number, approved: boolean, llmName: string, createdAt: Date, summary: string, title: string}
        const bodyJSON = {
          prompt: this.subPrompt,
          response: this.subResponse,
          image: "",
          rating: 0,
          approved: false,
          llmName: this.subLlmName,
          summary: this.subSummary,
          title: this.subTitle,
          tags: tagsArray
        };
        const postOptions = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyJSON)
        }
        const response = await fetch("http://localhost:8080/prompt/", postOptions);
        // console.log(this.subPrompt);
        // console.log(this.subResponse);
        // console.log(this.subLlmName);
        // console.log(this.subSummary);
        // console.log(this.subTitle);
        // console.log(tagsArray);
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to submit");
        }
        alert("Prompt has been submitted. Please wait for Admin approval.")
        this.clearFields()
      } catch (error) {
        alert("Something went wrong, or at least one required field is empty.")
        console.error(error);
      }
    },
    clearFields() {
      this.subPrompt = ""
      this.subResponse = ""
      this.subTags = ""
      this.subLlmName = ""
      this.subSummary = ""
      this.subTitle = ""
    },
  }
};

</script>

<style scoped>
.database-view-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center children horizontally */
  justify-content: center; /* Center children vertically */
  min-height: calc(100vh - 215px);
  padding-top: var(--header-height); /* Add padding to account for fixed header, if present */
}

.prompts-container {
  width: 100%; /* Use the full container width */
  max-width: 75%; /* Maximum width for the form */
  margin: 0 auto; /* Center the form in the available space */
}

.dropdown {
  cursor: pointer;
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
.database-form select {
  width: 100%; /* Make the input take the full width of its parent */
  overflow: scroll;
  padding: 0.5rem;
  border: 2px solid #aaa;
  font-size: 15px;
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

.back-button {
  padding: 1rem;
  width: 100%; /* Full width button */
  font-size: 1rem;
  margin-top: 1rem;
  background-color: var(--button-color);
  color: var(--white-text);
  border: none;
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

</style>

