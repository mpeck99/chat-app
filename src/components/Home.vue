<template>
  <div class="wrapper">
    <div class="inner">
      <h1>Chat</h1>
      <p>
        Welcome to my chat app. Please enter your name and select a user type and
        click chat to continue.
      </p>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" />
      </div>
      <div class="fieldset fieldset--radio">
        <legend>Who are you?</legend>
        <div class="form-group form-group--radio checked">
          <label for="client">
            <input
              type="radio"
              id="client"
              name="type"
              value="client"
              @click="addChecked"
              v-model="checked"
            />
            Client
          </label>
        </div>
        <div class="form-group form-group--radio" id="type">
          <label for="agent"
            ><input
              type="radio"
              id="agent"
              name="type"
              value="agent"
              @click="addChecked"
            />
            Agent
          </label>
        </div>
      </div>
      <div class="error-wrapper" v-if="errorMsgs[0]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <ul class="errors">
          <li v-for="(error, index) in errorMsgs" :key="index">{{ error }}</li>
        </ul>
      </div>
      <input type="submit" value="Chat" @click="storeData" class="btn" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      userType: "",
      errorMsgs: [],
      checked: 'client',
    };
  },

  methods: {
    storeData(e) {
      e.preventDefault();

      const name = document.querySelector("#name").value;

      this.errorMsgs = [];
      if (name === null || name === undefined || name === "" || name === " ") {
        this.errorMsgs.push("Please enter a name");
      } else {
        this.name = name;
      }
      console.log(this.userType);

      if (this.errorMsgs.length == 0) {
        localStorage["data"] = JSON.stringify({
          name: this.name,
          type: this.userType,
        });

        if (this.userType === "agent") {
          this.windowRef = window.open("/agent", "", "width=900,height=600");
          this.$router.resolve({
            path: "/agent",
          });
        } else {
          this.windowRef = window.open("/chat", "", "width=400,height=600");
          this.$router.resolve({
            path: "/chat",
          });
        }
      }
    },
    addChecked(e) {
      const userType = e.target;
      const parent = userType.parentElement.parentElement;
      const allRadios = document.querySelectorAll('input[type="radio"]');

      if (userType.checked) {
        if (!parent.classList.contains("checked")) {
          parent.classList.add("checked");
          this.userType = userType.value;
          allRadios.forEach((element) => {
            if (element != userType) {
              element.parentElement.parentElement.classList.remove("checked");
            }
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.error-wrapper {
  min-height: 4rem;

  display: flex;
  align-items: center;

  padding: 0.25rem;
  margin-top: -6rem;
  margin-bottom: 1rem;

  color: darken(#c14b46, 10%);
  text-align: left;

  background-color: lighten(#c14b46, 35%);
  border-radius: 0.25rem;

  svg {
    width: 2rem;
    height: 2rem;

    margin: 0 1rem;
  }

  ul {
    padding-left: 0;

    list-style-type: none;
  }
}

.form-group {
  width: 100%;

  display: flex;

  margin: 3.5rem 0 0 0;

  input[type="text"] {
    height: 3.5rem;

    flex-grow: 1;

    border-radius: 0;
    border: 2px solid var(--grey);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    font-family: var(--body-font);
    font-size: 1.25rem;
  }
}

.fieldset--radio {
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-top: 2rem;
  margin-bottom: 7rem;

  text-align: left;

  legend {
    grid-row: 1 / 2;
    grid-column: 1 / 3;

    margin-bottom: 1rem;
  }

  .form-group--radio {
    width: 11.5rem;

    align-self: center;
    margin: 1rem 0;

    label {
      width: 100%;

      display: flex;

      position: static;

      padding: 1rem;

      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);      
      background-color: var(--white);
      border: 2px solid var(--grey);
      color: var(--greyD);

      font-size: 1.25rem;
      font-family: var(--body-font);

      &:hover, &:focus {
        border-color: var(--blue);
      }
    }

    &.checked {
      label {
        background-color: var(--blue);
        border: none;
        color: var(--white);
      }
    }

    input[type="radio"] {
      width: 2rem;
      height: 2rem;

      margin: 0 1rem 0 0;

      border: 0.2rem solid var(--grey);
      border-radius: 50%;

      transition: 0.2s all linear;

      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      &:checked {
        border: 0.5rem solid var(--white);
      }
    }

    &:first-of-type {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
    }
    &:last-of-type {
      grid-row: 2 / 3;
      grid-column: 2 / 3;
    }
  }

  @media (min-width: 767px) {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;

    justify-content: space-between;
  }
}
</style>