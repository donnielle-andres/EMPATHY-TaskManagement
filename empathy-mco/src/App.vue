<template>
  <div class="app">
     <div class="side-content">
        <side-nav></side-nav>
     </div>

     <div class="main-content">
        <router-view></router-view>
     </div>

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
  height: 100vh; /* Ensure the container takes up the full viewport height */
  }

  .side-content {
  width: 200px; /* Adjust this value to match the width of your side navigation */
  }

  .main-content {
  flex-grow: 1; /* This makes the main content area take up the remaining space */
  overflow-y: auto; /* Enable scrolling if the content exceeds the viewport height */
  }

  /** DO NOT DELETE. STYLE FOR THE SCHEDULE CALENDAR */
   @import '/node_modules/@syncfusion/ej2-base/styles/material.css';
   @import '/node_modules/@syncfusion/ej2-buttons/styles/material.css';
   @import '/node_modules/@syncfusion/ej2-calendars/styles/material.css';
   @import '/node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
   @import '/node_modules/@syncfusion/ej2-inputs/styles/material.css';
   @import '/node_modules/@syncfusion/ej2-navigations/styles/material.css';
   @import '/node_modules/@syncfusion/ej2-popups/styles/material.css';
   @import '/node_modules/@syncfusion/ej2-vue-schedule/styles/material.css';
</style>
 