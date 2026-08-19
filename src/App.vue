<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="nav">
      <RouterLink to="/booking">Book a room</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style>
body {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
}
.nav {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}
.nav a {
  color: #2c3e50;
  text-decoration: none;
}
</style>
