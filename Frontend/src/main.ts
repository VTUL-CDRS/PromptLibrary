import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/global.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8Q4RVCislNH50J5r_xDzveBeQp9vLm1g",
    authDomain: "promptlibrary-418919.firebaseapp.com",
    projectId: "promptlibrary-418919",
    storageBucket: "promptlibrary-418919.appspot.com",
    messagingSenderId: "691481515437",
    appId: "1:691481515437:web:0c26a6b0058b0660b8fd24"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App);
// const auth = getAuth(app);


app.use(router);

app.mount("#app");
