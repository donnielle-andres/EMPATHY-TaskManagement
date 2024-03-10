<template>
  <div class="app">
     <side-nav></side-nav> <!-- Makes the sidebar present on all pages -->
     <router-view></router-view>
  </div>
 </template>
 
 <script>
 export default {
  name: 'App'
 }
 </script>
 
 <style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
    font-weight: auto;
    font-style: normal;
  }

  .app {
  display: flex;
  flex-direction: row; /* This is the default, but it's good to be explicit */
  height: 100vh; /* Ensure the container takes up the full viewport height */
  }

 </style>
 