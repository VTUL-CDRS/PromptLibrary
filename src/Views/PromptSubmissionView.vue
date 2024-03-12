<template>
  <div class="database-view-container">
    <section class="prompts-container">
      <!-- Hardcoded prompts for demonstration -->
      <div class="prompt">
        <h1 class="header-text">Submit a prompt</h1>
        <h3>Instructions go here: Ideas: leave blanks if not needed</h3>
        <form class="database-form">
<!--          Split all into individual forms .input_box-->
          <h3>Tags: </h3>
          <input type="text" placeholder="Include tags as comma separated values" />
          <h3>Context: </h3>
          <input type="text" placeholder="Context" />
          <h3>Instruction: </h3>
          <input type="text" placeholder="Instruction" />
          <h3>Task: </h3>
          <input type="text" placeholder="Task" />
          <h3>Output: </h3>
          <input type="text" placeholder="Output" />
          <h3>Refinement: </h3>
          <input type="text" placeholder="Refinement" />
          <h3>Refined Output: </h3>
          <input type="text" placeholder="Refined Output" />
          <h3>Language Model: </h3>
<!--          <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">-->
<!--            <b-dropdown-item>First Action</b-dropdown-item>-->
<!--            <b-dropdown-item>Second Action</b-dropdown-item>-->
<!--            <b-dropdown-item>Third Action</b-dropdown-item>-->
<!--            <b-dropdown-divider></b-dropdown-divider>-->
<!--            <b-dropdown-item active>Active action</b-dropdown-item>-->
<!--            <b-dropdown-item disabled>Disabled action</b-dropdown-item>-->
<!--          </b-dropdown>-->
          <input type="drop-down" placeholder="placeholder dropdown for llm" />
          <input class="submit-button" type="submit" value="Submit" />
        </form>
      </div>
    </section>
  </div>

</template>

<script setup lang="ts">
// import { BDropdown } from 'bootstrap-vue'
// Vue.component('b-dropdown', BDropdown)
// Vue script setup logic will go here
</script>



<style scoped>

.database-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.database-form input[type="text"] {
  /*width: 90rem; !* Adjust as needed *!*/
  height: 10rem;
  padding: 1em;
  font-size: 1.2em;
  border: 2px solid #aaa;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}


.database-view-container {
  display: flex;
  height: 100vh; /* Adjust height as needed, considering the header height */
}

.prompts-container {
  flex-grow: 1;
  padding: 150px;
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
