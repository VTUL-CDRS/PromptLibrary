<script setup lang="ts">
import "../assets/global.css";

let dropdown = false;
function toggleDropdown() {
  if (dropdown) {
    dropdown = false;
  }
  else (dropdown = true);
}

function isLoggedIn() {
  return false;
}

function gmailLogIn(){

}

</script>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  padding: 1rem;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;
  padding-right: 2rem;
  background-color: var(--header-color);
}

.header-text {
  color: var(--white-text);
}

.google-button {
  /*NOTE: This style will eventually need to be changed to meet Google's styling guidelines, which we can
  gank from their website.*/
  color: dodgerblue;
  padding: 8px;
  width: 160px;
  margin: 10px;
}

.sign-in-dropdown {
  color: #ffffff;
  background-color: var(--background-color);
  position: absolute;
}

.sign-in-container {
  background-color: #E5751F;
  color: white;
  padding: 8px;
  margin: 10px;
  cursor: pointer;
}

.input-button-google {
  width: 160px; /* Adjust as needed */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: var(--black-text);
  cursor: pointer;
}

</style>

<template>
  <header class="container">
    <div class="">
      <router-link to="/" style="">
        <h2 class="header-text">PromptLibrary</h2>
      </router-link>
    </div>
    <div v-if="isLoggedIn" class="">
        <h2 @click="toggleDropdown" class="sign-in-container">Sign in</h2>
        <div v-if="dropdown" class="sign-in-dropdown">

          <button @click="gmailLogIn" class="input-button-google">Sign in with Gmail</button>

          <router-link to="/login" style="">
            <button class="input-button-google">Sign in as Administrator</button>
          </router-link>

        </div>
    </div>
    <div v-else class=""></div>
  </header>
</template>
