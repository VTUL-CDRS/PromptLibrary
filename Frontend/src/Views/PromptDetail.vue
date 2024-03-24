<template>
  <div class="prompt-detail">
    <h1>{{ prompt.prompt }}</h1>
    <p>{{ prompt.response }}</p>
    <!-- Add more details here -->
  </div>
</template>

<script>
// export default {
//   props: ['id'],
//   data() {
//     return {
//       prompt: null,
//     };
//   },
//   async mounted() {
//     // Fetch the prompt data based on the id
//     // Here, just an example with a direct import
//     const prompts = await import('/dummy_data.json');
//     this.prompt = prompts.find((p) => p.id === this.id);
//   },
// };
</script>
