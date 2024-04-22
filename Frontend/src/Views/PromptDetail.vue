<template>
  <div class="database-view-container">
    <section class="prompts-container">
      <div class="prompt">
        <div v-if="prompt">
          <h1 class="title-text">{{ prompt.title }}</h1>
          <p>Summary: {{prompt.summary}}</p>
          <hr class="dividing-line"/>
          <p>Prompt: {{ prompt.prompt }}</p>
          <hr class="dividing-line"/>
          <p>Response: {{ prompt.response }}</p>
          <hr class="dividing-line"/>
          <p>LLM: {{ prompt.llmName }}</p>
          <hr class="dividing-line"/>
          Tags:
          <div class="tagText" v-if="prompt.hasTag.length != 0" v-for="tag in prompt.hasTag" :key="tagId">{{tag.tag.name}}&nbsp;</div>
          <p v-else>Tags: None</p>
          <!-- Other content of the PromptDetail component -->
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
      </div>
    </section>
    <div>
      <router-link to="/database" style="">
        <button class="back-button">Back to Library</button>
      </router-link>
    </div>
  </div>
</template>

<style>

.tagText {
  display: inline;
}

.title-text {
  text-align: center;
}

.prompt {
  background-color: #f0f0f0;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 4px;
  margin-bottom: 2rem; /* Add some space at the bottom */
  min-height: 100%;
}

.prompts-container {
  width: 100%; /* Use the full container width */
  max-width: 75%; /* Maximum width for the form */
  min-height: 75%;
  margin: 0 auto; /* Center the form in the available space */
}

.dividing-line {
  border-top: 1px solid #000000;
  border-radius: 5px;
}

.database-view-container {
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  align-items: center; /* Center children horizontally */
  justify-content: normal; /* Center children vertically */
  min-height: calc(100vh - 150px - 1rem - 2px); /* Take full viewport height */
}

.back-button {
  padding: 1rem;
  width: auto;
  font-size: 1rem;
  margin-top: 1rem;
  background-color: var(--button-color);
  color: var(--white-text);
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
}
</style>

<script>
export default {
  data() {
    return {
      promptId: null,
      prompt: null
    };
  },
  methods: {
    async fetchPrompt() {
      try {
        console.log("Trying to fetch detailed prompt");
        const promptId = this.$route.params.id;
        const response = await fetch(`http://localhost:8080/prompt/${promptId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch prompt');
        }
        const prompt = await response.json();
        this.prompt = prompt;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.promptId = this.$route.params.id;
    this.fetchPrompt();
  }
};
</script>
