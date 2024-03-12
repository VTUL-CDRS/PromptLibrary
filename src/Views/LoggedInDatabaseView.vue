<script setup lang="ts">
</script>

<template>
  <div class="database-view-container">
    <aside class="filter-sidebar">
      <h2>Filter By...</h2>
      <!-- Filter options go here -->
    </aside>
    <section class="prompts-container">
      <!-- Hardcoded prompts for demonstration -->
      <div class="prompt" v-for="n in 4" :key="n">
        <h3>Category Here</h3>
        <p>xxxxxxxxxxxxxxxxxxxxxxxx</p>
        <a href="#">See sample here</a>
      </div>
    </section>
  </div>
  <div>
    <input class="submit-button" type="submit" value="Submit a prompt" />
  </div>

</template>



<style scoped>
.database-view-container {
  display: flex;
  height: 100vh; /* Adjust height as needed, considering the header height */
}

.filter-sidebar {
  width: 250px; /* or whatever width you prefer */
  background-color: #e0e0e0; /* your grey background */
  padding: 20px;
  box-sizing: border-box; /* Include padding in width */
  overflow-y: auto; /* In case filters exceed the height */
}

.prompts-container {
  flex-grow: 1;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-height: 45rem;
  max-width: 200rem;
  overflow-y: auto; /* In case prompts exceed the height */
}

.prompt {
  background-color: #f0f0f0; /* your prompt box background */
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 4px;
  transition: box-shadow 0.3s ease;
}

.prompt:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.submit-button {
  width: 20rem; /* Adjust as needed */
  height: 3rem;
  padding: 0.5em;
  font-size: 1.4rem;
  margin-top: 1em; /* Adjust space above the button */
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: var(--black-text);
  cursor: pointer;
}

/* Style the prompt content, like category titles, paragraphs, and links, as needed */
</style>
