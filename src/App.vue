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
<style lang="scss">
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
  height: 100%;

  margin: 0;

  font-size: 16px;

  color: var(--black);

  box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6, label, legend {
  font-family: var(--header-font);
}

h1 {
  font-size: 2.5rem;
}

label, legend {
  font-size: 1.5rem;
}

p, ul, ol, a, input, select, .btn{
  font-family: var(--body-font);
}

.wrapper {
  max-width: 1200px;
  min-height: calc(100% - 4rem);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;

  margin: 0 auto;
  padding: 2rem 1rem;
}

.wrapper h1 {
  margin-top: 0;
}
</style>
