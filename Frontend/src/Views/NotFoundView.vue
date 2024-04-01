<template>
  <div class="not-found-container">
    <h1>404</h1>
    <p>Oops! The page you're looking for isn't here.</p>
    <router-link to="/">
      <button>Go Home</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh;
  text-align: center;
  background-color: var(--background-color);
}

.not-found-container h1 {
  font-size: 6rem;
  color: var(--header-color);
}

.not-found-container p {
  font-size: var(--default-font-size);
  color: var(--black-text);
}

.not-found-container button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: var(--button-color);
  border: none;
  color: var(--white-text);
  cursor: pointer;
  border-radius: 5px;
}

.not-found-container button:hover {
  background-color: var(--button-highlight);
}
</style>
