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
// Structure/base styles
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
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0;

  font-size: 16px;

  color: var(--black);

  box-sizing: border-box;
  background-color: var(--blue);

  @media (min-width: 767px){
    height: 100%;
  }
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
  max-width: 600px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // position: relative;

  padding: 2rem;

  line-height: 1.75rem;

  background: var(--white);
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3);
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

// Form styles
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

textarea, input {
  outline: none;

  &:hover, &:focus {
    border-color: var(--blue) !important;
  }
}

.form-group {
  position: relative;

   label {
    position: absolute;
    top: -2.25rem;
  }
}

// Chat bubble 
.chat-bubble {
  max-width: 80%;

  min-width: 4rem;

  padding: 0.5rem 1rem;
  margin: 2rem 1rem;

  position: relative;

  background: var(--grey);

  p {
    max-width: 100%;

    margin: 0;

    word-break: break-all;
    text-align: right;
  }

  .name {
    position: absolute;
    bottom: -1.5rem;
    right: 0;

    font-size: 0.9rem;
    text-transform: capitalize;
    font-family: var(--header-font);
  }

  &:after {
    content: "";

    width: 0;
    height: 0;

    position: absolute;
    bottom: 0;
    right: -1rem;

    border-bottom: 1.25rem solid var(--grey);
    border-right: 1.25rem solid transparent;
  }

  &.disclaimer {
    max-width: 100%;

    padding: 0;
    margin-bottom: 0;

    list-style-type: none;

    background-color: transparent;
    color: darken(#ebebeb, 50%);
    font-style: italic;
    font-size: 0.9rem;

    &:after {
      display: none;
    }
  }
}

// Typing
.typing {
  height: 1.5rem;
  width: 3rem;

  display: none;

  position: absolute;

  background: var(--grey);
  // border-radius: 3.125rem;

  &.active {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      animation: typing 1.5s infinite ease-in-out;

      &:nth-of-type(2){
        animation-delay: 100ms;
      }
      &:nth-of-type(3){
        animation-delay: 200ms;
      }
    }
  }

  span {
    width: 0.5rem;
    height: 0.5rem;

    display: block;

    margin: 0 0.1rem;

    border-radius: 3.125rem;
    background: var(--greyD);
  }
}

// Keyframes
@keyframes typing {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.2rem);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
