<script setup lang="ts"></script>

<template>
  <div class="error-page">
    <h1>Error</h1>
    <p>Sorry, something went wrong.</p>
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>

<style scoped>
.error-page {
  text-align: center;
  margin-top: 50px;
}

.error-page h1 {
  font-size: 3em;
  color: #ff0000;
}

.error-page p {
  font-size: 1.5em;
}

.error-page a {
  color: #007bff;
  text-decoration: none;
}

.error-page a:hover {
  text-decoration: underline;
}
</style>
