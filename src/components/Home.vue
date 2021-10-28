<template>
  <div class="wrapper">
    <h1>Chat</h1>
    <p>
      Welcome to my chat app. Please enter your name and select a user type and
      click chat to continue.
    </p>
    <div class="form-wrapper">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" />
      </div>
      <div class="form-group custom-select">
        <label for="user" id="user">User type</label>
        <button class="select-toggle" type="button" aria-haspopup="true" @click="customSelect" id="type"
        >Select user type</button>
        <ul class="select" role="listbox" aria-expanded="false" aria-labelledby="user">
          <li role="option" value="agent" tabindex="0" aria-selected="false">Agent</li>
          <li role="option" value="client" tabindex="0" aria-selected="false">Client</li>
        </ul>
      </div>
      <div class="error-wrapper" v-if="errorMsgs[0]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        ><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <ul class="errors">
          <li v-for="(error, index) in errorMsgs" :key="index">{{ error }}</li>
        </ul>
      </div>
    </div>
    <input type="submit" value="Chat" @click="storeData" class="btn" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      userType: "",
      errorMsgs: [],
    };
  },

  methods: {
    storeData(e) {
      e.preventDefault();

      const name = document.querySelector("#name").value;
      const userType = document.querySelector("#type").textContent;
      this.errorMsgs = [];
      if (name === null || name === undefined || name === "" || name === " ") {
        this.errorMsgs.push("Please enter a name");
      } else {
        this.name = name;
      }

      if (userType != "Select user type") {
        this.userType = userType;
      } else {
        this.errorMsgs.push("Please select a user type.");
      }

      if (this.errorMsgs.length == 0) {
        localStorage["data"] = JSON.stringify({
          name: this.name,
          type: this.userType,
        });
        
        if (this.userType === 'Agent') {
          this.windowRef = window.open(
            "/agent",
            "",
            ""
          );
          this.$router.resolve({
            path: "/agent",
          });
        } else {
          this.windowRef = window.open(
            "/chat",
            "",
            "width=400,height=600,left=200,top=200"
          );
          this.$router.resolve({
            path: "/chat",
          });
        }
      }
    },
    customSelect() {
      const toggler = document.querySelector(".select-toggle");
      const select = document.querySelector(".select");

      const selectOptions = select.children;

      [...selectOptions].forEach((item) => {
        item.setAttribute("aria-selected", false);

        item.addEventListener("click", function () {
          const value = item.textContent;
          toggler.textContent = value;
          this.value = value;
          if (item.getAttribute("aria-selected") !== "true") {
            item.setAttribute("aria-selected", true);
          }

          select.setAttribute("aria-expanded", false);
          toggler.classList.remove("active");
        });
      });

      if (select.getAttribute("aria-expanded") !== "true") {
        select.setAttribute("aria-expanded", "true");
        toggler.classList.add("active");
      } else {
        select.setAttribute("aria-expanded", false);
        toggler.classList.remove("active");
      }
    },
  },
};
</script>

<style lang="scss">
.error-wrapper {
  width: calc(100% - 3rem);
  min-height: 4rem;

  display: flex;
  align-items: center;

  position: absolute;
  bottom: -4.25rem;

  padding: 0.25rem;

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

.form-wrapper {
  width: 100%;

  display: flex;
  flex-direction: column;

  position: relative;

  padding: 1.5rem;
}

.form-group {
  width: 100%;

  display: flex;

  position: relative;

  margin: 1.75rem 0;

  label {
    position: absolute;
    top: -2.25rem;
  }

  input,
  select,
  .form-control {
    height: 2.5rem;

    flex-grow: 1;

    border-radius: 0;
    border: 2px solid var(--black);

    box-shadow: 0 1px 4px rgba(150, 150, 150, 0.65);

    &:hover,
    &:focus {
      border-color: var(--blue);
      border-radius: 0;
    }
  }
}

.btn, input[type="submit"] {
  width: 100%;
  min-height: 2.5rem;

  justify-self: flex-end;
  align-self: flex-end;

  padding: 1rem;
  margin-top: 6rem;

  border: none;
  background-color: var(--blue);
  box-shadow: 0 1px 4px rgba(150, 150, 150, 0.65);

  color: var(--grey);
  font-weight: 700;
  font-size: 1.25rem;

  -webkit-appearance:none;

  &:hover,
  &:focus {
    background-color: var(--blued);
  }
}

.custom-select {
  display: flex;
  flex-direction: column;

  max-height: 2.75rem;

  position: relative;

  cursor: pointer;

  box-shadow: 0 1px 4px rgba(150, 150, 150, 0.65);

  *:before,
  &:after {
    box-sizing: border-box;
  }

  .select-toggle {
    appearance: none;

    position: relative;

    padding: 0.75rem 2rem 0.75rem 0.75rem;

    background: transparent;
    color: var(--black);
    border: 2px solid var(--black);

    font-family: var(--body-font);
    font-size: 1rem;
    text-align: left;

    &:after {
      content: "";

      height: 0;
      width: 0;

      position: absolute;
      right: 1rem;
      top: 1rem;

      border-left: 0.5rem solid transparent;
      border-right: 0.5rem solid transparent;
      border-top: 0.75rem solid var(--blue);
    }

    &.active {
      &:after {
        border-top: 0;
        border-bottom: 0.75rem solid var(--blue);
      }
    }

    &:hover,
    &:focus {
      cursor: pointer;

      border-color: var(--blue);
    }
  }

  .select {
    padding: 0;
    margin: 0;

    list-style-type: none;

    background: #fff;
    box-shadow: 0 1px 4px rgba(150, 150, 150, 0.65);

    text-align: left;

    z-index: 10;

    visibility: hidden;
    opacity: 0;

    transition: visibility 0.3s linear, opacity 0.3s linear;

    li {
      display: flex;
      flex-direction: column;

      padding: 1rem 0.75rem;

      border-bottom: 1px solid var(--grey);

      &:last-of-type {
        border-bottom: 0;
      }

      &:hover,
      &:focus {
        background-color: lighten(#e3e3e2, 8%);
      }
    }
  }

  .select[aria-expanded="true"] {
    visibility: visible;
    opacity: 1;
  }
}
</style>