<template>
  <div>
    <div v-if="prompt">
      <h1>Prompt Detail</h1>
      <p>Prompt ID: {{ promptId }}</p>
      <p>Prompt: {{ prompt.prompt }}</p>
      <!-- Other content of the PromptDetail component -->
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

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
    }
  },
  mounted() {
    this.promptId = this.$route.params.id;
    this.fetchPrompt();
  }
};
</script>
