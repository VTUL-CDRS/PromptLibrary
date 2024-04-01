<template>
  <div class="login-page-container">
    <h1 class="header-text">Log In</h1>
    <form class="login-form">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <input class="input-button-login" type="submit" value="Login" />
    </form>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.login-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh;
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

.input-button-google {
  width: 20rem; /* Adjust as needed */
  height: 3rem;
  padding: 0.5em;
  font-size: 1.4rem;
  margin-top: 1em; /* Adjust space above the button */
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: var(--black-text);
  cursor: pointer;
}

.header-text {
  font-size: 45px;
  color: var(--black-text);
  margin-bottom: 1rem; /* Spacing after the header */
}

/* You might want to add :focus styles and transitions similar to your home page for consistency */
</style>
