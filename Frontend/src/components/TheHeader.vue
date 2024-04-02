<script setup lang="ts">
import "../assets/global.css";
import {ref} from "vue";
import { vOnClickOutside } from "@vueuse/components"
import {getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from "firebase/auth";
import {useRouter} from 'vue-router';

// const router = useRouter();
const auth = getAuth();
const user = auth.currentUser;

const dropdown = ref(false);
function toggleDropdown() {
  dropdown.value = !dropdown.value
}

function closeDropdown() {
  if (dropdown) {
    dropdown.value = false
  }
}

const isLoggedIn = () => {
  console.log("checking if the user is logged in")
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      console.log("user logged in")
      return true
    } else {
      console.log("user not logged in")
      return false
    }
  });
}

const signInWithGoogle = () => {
  console.log("clicked sign in with gmail");
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log("Error logging in with google", error);
      })
}

</script>

<template>
  <header class="container">
    <div class="">
      <router-link to="/" style="">
        <h2 class="header-text">PromptLibrary</h2>
      </router-link>
    </div>
    <div v-if="!isLoggedIn()" class="">
      <h2 @click="toggleDropdown()" class="sign-in-container">Sign in</h2>
      <div v-if="dropdown" v-on-click-outside="closeDropdown" class="sign-in-dropdown">

        <button @click="signInWithGoogle(); toggleDropdown(); !isLoggedIn" class="google-button">Sign in with Gmail</button>

        <router-link to="/login" style="">
          <button class="button-not-google" @click="toggleDropdown()">Sign in as Administrator</button>
        </router-link>

      </div>
    </div>
    <div v-else class="">
      <h2 @click="toggleDropdown(); isLoggedIn" class="sign-in-container">Log out</h2>

    </div>
  </header>
</template>

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
  margin-left:10px;
  color: var(--white-text);
}

.google-button {
  /*NOTE: This style will eventually need to be changed to meet Google's styling guidelines, which we can
  gank from their website.*/
  color: dodgerblue;
  margin: 10px;
  width: 160px; /* Adjust as needed */
  padding: 8px;
  border: 1px solid black;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  display: block;
  z-index: 3;
}

.button-not-google {
   /*NOTE: This style will eventually need to be changed to meet Google's styling guidelines, which we can
   gank from their website.*/
   color: dodgerblue;
   margin: 10px;
   width: 160px; /* Adjust as needed */
   padding: 8px;
   border: 1px solid black;
   border-radius: 4px;
   background-color: white;
   cursor: pointer;
   display: block;
  z-index: 3;
 }

.sign-in-dropdown {
  color: #ffffff;
  background-color: white;
  position: absolute;
  right: 42px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  z-index: 2;

}

.sign-in-container {
  background-color: #E5751F;
  color: white;
  padding: 8px;
  margin: 10px;
  cursor: pointer
}

</style>


