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
  --red : #c14b46;
  --black: #333;
  --blue: #2778bc;
  --bluem: #015987;
  --blued: #015987;
  --grey:  #e3e3e2;
}

body, html {
  font-size: 16px;

  color: var(--black);
}

h1, h2, h3, h4, h5, h6, label, legend {
  font-family: var(--header-font);
}

legend, label {
  padding-left: 0;

  font-size: 1.25rem;
}

input {
  margin: 0 0.5rem;
}

.form-group {
  display: flex;

  align-items: center;
}

p, ul, ol, a, input, .btn{
  font-family: var(--body-font);
}

.wrapper {
  max-width: 1200px;

  margin: 0 auto;
}
</style>
