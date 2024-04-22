<script setup lang="ts">
import "../assets/global.css";
import {ref, onMounted, computed} from "vue";
import { vOnClickOutside } from "@vueuse/components"
import {getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, User} from "firebase/auth";
import { store } from '../store/store.ts';

const auth = getAuth();
const userState = ref<User | null>(null);
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    userState.value = user ? user : null;
  });
});

const dropdown = ref(false);
function toggleDropdown() {
  dropdown.value = !dropdown.value
}

function closeDropdown() {
  if (dropdown) {
    dropdown.value = false
  }
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

const signOutUser = () => {
  store.isAdminLoggedIn = false;
  signOut(auth).then(() => {
    console.log("user signed out");
    alert("You have been signed out.")
  }).catch((error) => {
    console.log("Error when signing out", error);
  });
};

const isAdmin = computed(() => store.isAdminLoggedIn);
</script>

<template>
  <header class="container">
    <div class="">
      <router-link to="/" style="">
        <h2 class="header-text">PromptLibrary</h2>
      </router-link>
    </div>
    <div v-if="!userState && !isAdmin" class="">
      <h2 @click="toggleDropdown()" class="sign-in-container">Sign in</h2>
      <div v-if="dropdown" v-on-click-outside="closeDropdown" class="sign-in-dropdown">


        <!-- Google compliant button from https://developers.google.com/identity/branding-guidelines -->
        <button @click="signInWithGoogle(); toggleDropdown();" class="gsi-material-button" style="width:160px">
          <div class="gsi-material-button-state"></div>
          <div class="gsi-material-button-content-wrapper">
            <div class="gsi-material-button-icon">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </div>
            <span class="gsi-material-button-contents">Sign in with Google</span>
            <span style="display: none;">Sign in with Google</span>
          </div>
        </button>
        <router-link to="/signin" style="">
          <button class="gsi-material-button" @click="toggleDropdown()">
            <div class="gsi-material-button-state"></div>
            <span class="gsi-material-button-contents">Sign in as Administrator</span>
          </button>
        </router-link>

      </div>
    </div>
    <div v-else class="">
      <router-link to="/" style="">
      <h2 @click="signOutUser()" class="sign-in-container">Log out</h2>
      </router-link>
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
  height: 120px;
  background-color: var(--header-color);
}

.header-text {
  margin-left:10px;
  color: var(--white-text);
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

/* Google compliant CSS for button from https://developers.google.com/identity/branding-guidelines */
.gsi-material-button {
  display: block;
  margin: 10px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-appearance: none;
  background-color: WHITE;
  background-image: none;
  border: 1px solid black;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #1f1f1f;
  cursor: pointer;
  font-family: 'Roboto', arial, sans-serif;
  font-size: 14px;
  height: 40px;
  letter-spacing: 0.25px;
  outline: none;
  overflow: hidden;
  padding: 8px;
  position: relative;
  text-align: center;
  -webkit-transition: background-color .218s, border-color .218s, box-shadow .218s;
  transition: background-color .218s, border-color .218s, box-shadow .218s;
  vertical-align: middle;
  white-space: nowrap;
  width: auto;
  max-width: 400px;
  min-width: min-content;
}

.gsi-material-button .gsi-material-button-icon {
  height: 20px;
  margin-right: 12px;
  min-width: 20px;
  width: 20px;
}

.gsi-material-button .gsi-material-button-content-wrapper {
  -webkit-align-items: center;
  align-items: center;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: nowrap;
  flex-wrap: nowrap;
  height: 100%;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.gsi-material-button .gsi-material-button-contents {
  -webkit-flex-grow: 1;
  flex-grow: 1;
  font-family: 'Roboto', arial, sans-serif;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
}

.gsi-material-button .gsi-material-button-state {
  -webkit-transition: opacity .218s;
  transition: opacity .218s;
  bottom: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.gsi-material-button:disabled {
  cursor: default;
  background-color: #ffffff61;
  border-color: #1f1f1f1f;
}

.gsi-material-button:disabled .gsi-material-button-contents {
  opacity: 38%;
}

.gsi-material-button:disabled .gsi-material-button-icon {
  opacity: 38%;
}

.gsi-material-button:not(:disabled):active .gsi-material-button-state,
.gsi-material-button:not(:disabled):focus .gsi-material-button-state {
  background-color: #303030;
  opacity: 12%;
}

.gsi-material-button:not(:disabled):hover {
  -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
}

.gsi-material-button:not(:disabled):hover .gsi-material-button-state {
  background-color: #303030;
  opacity: 8%;
}


</style>


