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
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0;

  font-size: 16px;

  color: var(--black);

  box-sizing: border-box;
  background-color: var(--blue);


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
  max-width: 500px;
  width: 100%;

  min-height: 75%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:  center;

  position: relative;

  padding: 1.5rem;

  line-height: 1.75rem;

  background: #fff;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);

  overflow-x: hidden;
}
</style>
