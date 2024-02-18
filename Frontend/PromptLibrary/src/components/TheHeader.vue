<script>
import "../assets/global.css"
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

</style>

<template>
 <header class="container">
   <div class="">
     <router-link to="/" style=""><h2 class="header-text">PromptLibrary</h2></router-link>
   </div>
   <div class="">
     <router-link to="/login" style=""><h2 class="header-text">Login</h2></router-link>
   </div>
 </header>
</template>