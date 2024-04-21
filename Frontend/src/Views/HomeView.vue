<script>
import { defineModel } from "vue";
import router from '../router/index.ts';
export default {
  data() {
    const searchInput = defineModel();
    return {
      searchInput
    }

  },
  methods: {
    search() {
      router.push("/database")

    }
  }
}
</script>

<style scoped>

.main-page-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* this will vertically center your items */
  justify-content: center; /* this will horizontally center your items */
  min-height: calc(100vh - 133px); /* this makes the container take full viewport height */
  gap: 0.5rem; /* this adds space between your child elements */
}

form {
  display: flex;
  justify-content: center; /* This centers the form content horizontally */
  align-items: center; /* This centers the form content vertically */
  width: 100%; /* Ensure the form takes the full width of its parent container */
}

.input-button-search {
  width: 15rem;
  height: 3rem;
  padding: 0.5em;
  font-size: 1.4rem;
  margin: 0.5em 0; /* Adds some space above and below each input */
  border: 1px solid #ccc;
  border-radius: 4px; /* Optional: Rounds the corners of the input fields */
  background-color: var(--button-color);
  color: var(--white-text);
  cursor: pointer;
}

.input-button-explore {
  width: 15rem;
  height: 3rem;
  padding: 0.5em;
  font-size: 1.4rem;
  margin: 0.5em 0; /* Adds some space above and below each input */
  border: 1px solid #ccc;
  border-radius: 4px; /* Optional: Rounds the corners of the input fields */
  background-color: var(--second-button-color);
  color: var(--white-text);
  cursor: pointer;
}

.search-bar input[type="text"] {
  width: 50%; /* Adjust the width as needed */
  height: 5%;
  padding: 1em; /* Makes the input taller and the text inside it larger */
  font-size: 1.2em; /* Increase the font size for better readability */
  border: 2px solid #aaa; /* Solid border with a light grey color */
  border-radius: 25px; /* Rounded corners for the border */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  transition: border-color 0.3s, box-shadow 0.3s; /* Transition for effects on focus */
  text-align: center;
}

.header-text {
  font-size: 45px;
}

</style>


<template>
  <div class = "main-page-container">
    <div class = "">
      <h1 class="header-text">PromptLibrary</h1>
    </div>
    <form class="search-bar">
      <input type="text" placeholder="Enter search terms" v-model="searchInput"/>
    </form>
    <div>
      <router-link to="/database">
        <form class="search-button">
          <input class="input-button-search" type="submit" value="Search"/>
        </form>
      </router-link>
      <router-link to="/database">
        <form class="explore-button">
          <input class="input-button-explore" type="submit" value="Explore" />
        </form>
      </router-link>
    </div>
  </div>
</template>


