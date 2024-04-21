<template>
  <div class="login-page-container">
    <h1 class="header-text">Sign In</h1>
    <form class="login-form" @submit.prevent="handleLogin">
      <input type="text" placeholder="Username" v-model="credentials.username" />
      <input type="password" placeholder="Password" v-model="credentials.password" />
      <button class="input-button-login" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import {store} from '../store/store.ts';
import router from '../router/index.ts';
export default {
  data() {
    return {
      accounts: [],
      credentials: {
        username: '',
        password: ''
      },
    };
  },
  computed: {
    moderators() {
      return this.accounts.filter(account => account.isModerator);
    }
  },
  methods: {
    async fetchAccount() {
      try {
        console.log("trying to fetch accounts");
        const bodyJSON = {username: this.credentials.username, password: this.credentials.password};
        const requestOptions = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyJSON)
        }
        const response = await fetch('http://localhost:8080/account/', requestOptions);
        if (!response.ok) {
          throw new Error('Failed to fetch account');
        }
        this.accounts = await response.json();
      } catch (error) {
        console.error(error);
      }
    },
    handleLogin() {
      console.log('Login attempted with:', this.credentials);
      const userAccount = this.accounts.find(account =>
          account.username === this.credentials.username &&
          account.password === this.credentials.password);
      if (userAccount) {
        if (userAccount.isModerator) {
          store.isAdminLoggedIn = true; // Set the global boolean
          console.log('Logged in as a moderator');
        } else {
          store.isAdminLoggedIn = false;
          console.log('Logged in as a regular user');
        }
        router.push("/");
      } else {
        store.isAdminLoggedIn = false; // Set the global boolean
        console.error('Invalid credentials');
        alert("Username or password is incorrect.")
      }
      this.credentials.username = '';
      this.credentials.password = '';

    },
  },
  mounted() {
    this.fetchAccount();
  },
};
</script>

<style scoped>
.login-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 133px);
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.login-form input[type="text"],
.login-form input[type="password"] {
  width: 20rem; /* Adjust as needed */
  height: 3rem;
  padding: 1em;
  font-size: 1.2em;
  border: 2px solid #aaa;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.input-button-login {
  width: 20rem; /* Adjust as needed */
  height: 3rem;
  padding: 0.5em;
  font-size: 1.4rem;
  margin-top: 1em; /* Adjust space above the button */
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: var(--button-color);
  color: var(--white-text);
  cursor: pointer;
}

.header-text {
  font-size: 45px;
  color: var(--black-text);
  margin-bottom: 1rem; /* Spacing after the header */
}

/* You might want to add :focus styles and transitions similar to your home page for consistency */
</style>
