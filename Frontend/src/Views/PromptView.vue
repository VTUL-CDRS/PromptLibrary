<script setup lang="ts">
</script>

<template>
  <div class="login-page-container">
    <h1 class="header-text">Log In</h1>
    <form class="login-form">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <input class="input-button-login" type="submit" value="Login" />
      <input class="input-button-google" type="submit" value="Log in with Gmail" />
    </form>
  </div>
</template>

<style scoped>
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
</style>