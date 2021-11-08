<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>
<style lang="scss">
:root {
  --body-font: "Roboto", sans-serif;
  --header-font: "Oswald", sans-serif;
  --red: #c14b46;
  --black: #333;
  --blue: #2778bc;
  --bluem: #015987;
  --blued: #015987;
  --grey: #e3e3e2;
  --greyD: #72726e;
  --white: #ffffff;
}

body,
html {
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

h1,
h2,
h3,
h4,
h5,
h6,
label,
legend {
  font-family: var(--header-font);
}

h1 {
  font-size: 2.5rem;
}

label,
legend {
  font-size: 1.75rem;
}

p,
ul,
ol,
a,
input,
select,
.btn,
.form-control {
  font-family: var(--body-font);
  font-size: 1rem;
}

p {
  width: 100%;
}

input {
  padding-left: 0.5rem;
}

.wrapper {
  max-width: 500px;
  width: 100%;

  max-height: 95%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  position: relative;

  padding: 1.5rem;

  line-height: 1.75rem;

  background: #fff;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3);

  text-align: center;

  overflow-x: hidden;

  .inner {
    max-width: 85%;
  }
}

.btn,
input[type="submit"] {
  width: 100%;
  min-height: 3.5rem;

  justify-self: flex-end;
  align-self: flex-end;

  padding: 1rem;

  border: none;
  background-color: var(--blue);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  color: var(--white);
  font-weight: 700;
  font-size: 1.25rem;

  -webkit-appearance: none;

  &:hover,
  &:focus {
    background-color: var(--blued);
  }
}
.sr-only {
  border: 0;
  padding: 0;
  margin: 0;
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(
    1px 1px 1px 1px
  ); /* IE6, IE7 - a 0 height clip, off to the bottom right of the visible 1px box */
  clip: rect(
    1px,
    1px,
    1px,
    1px
  ); /*maybe deprecated but we need to support legacy browsers */
  clip-path: inset(
    50%
  ); /*modern browsers, clip-path works inwards from each corner*/
  white-space: nowrap;
}

textarea, input {
  outline: none;

  &:hover, &:focus {
    border-color: var(--blue);
  }
}

.form-group {
  position: relative;

   label {
    position: absolute;
    top: -2.25rem;
  }
}
</style>
