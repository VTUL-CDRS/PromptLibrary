<template>
  <div class="database-view-container">
    <section class="prompts-container">
      <!-- Hardcoded prompts for demonstration -->
      <div class="prompt">
        <form class="database-form">
          <h1>Submit a prompt</h1>
          <h3>Category: </h3>
          <input type="text" placeholder="Category" />
          <h3>Context: </h3>
          <input type="text" placeholder="Context" />
          <h3>Instruction: </h3>
          <input type="text" placeholder="Instruction" />
          <h3>Task: </h3>
          <input type="text" placeholder="Task" />
          <h3>Refinement: </h3>
          <input type="text" placeholder="Refinement" />
          <h3>Language Model: </h3>
          <input type="drop-down" placeholder="Category" />
          <input class="submit-button" type="submit" value="Submit" />
        </form>
      </div>
    </section>
  </div>

</template>

<script setup>
// Vue script setup logic will go here
</script>

<style scoped>

.database-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}


.database-view-container {
  display: flex;
  height: 100vh; /* Adjust height as needed, considering the header height */
}

.prompts-container {
  flex-grow: 1;
  padding: 200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-height: 60rem;
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
