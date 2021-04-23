<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  components: {
 
  }
}
</script>
<style>
:root {
  --body-font: 'Roboto', sans-serif;
  --header-font: 'Oswald', sans-serif;
}

body, html {
  font-size: 16px;
}

h1, h2, h3, h4, h5, h6, label, legend {
  font-family: var(--header-font);
}

p, ul, ol, a, input, .btn{
  font-family: var(--body-font);
}

.wrapper {
  max-width: 1200px;

  margin: 0 auto;
}
</style>
