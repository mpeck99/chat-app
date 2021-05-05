<template>
  <div class="wrapper">
    <span class="icn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="icn-chat" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
    </span>
    <h1>Chat</h1>
    <p>
      Welcome to my chat app. Please enter your name and select which user type
      you are and hit connect to enter a chat.
    </p>
    <div class="form-wrapper">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" />
      </div>
      <div class="form-group">
        <label for="type">User type</label>
        <select name="type" id="type">
          <option value="Select user type">Select user type</option>
          <option value="agent">Agent</option>
          <option value="client">Client</option>
        </select>
      </div>
      <div class="error-wrapper" v-if="errorMsgs[0]" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
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
      const userType = document.querySelector("#type").value;
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
 
        this.$router.push({
          name: "Chat",
          params: {
            data: {
              name: this.name,
              type: this.userType,
            },
          },
        });
      }
    },
  },
};
</script>

<style lang="scss">
.icn-circle {
    width: 9rem;
    height: 9rem;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 1rem;

    background: var(--blue);
    border-radius: 50%;
}
.icn-chat {
    width: 6em;
    height: 6rem;

    stroke: #fff;
}

.error-wrapper {
  width: calc(100% - 3.5rem);
  height: 4.5rem;

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

    input, select, .form-control {
        height: 2.5rem;

        flex-grow: 1;

        border-radius: 0;
    }

    select {
        height: 3rem;
    }
}

.btn {
    width: 100%;
    min-height: 2.5rem;
    
    justify-self: flex-end;
    align-self: flex-end;

    padding: 1rem;
    margin-top: 6rem;

    border: none;
    background-color: var(--blue);

    color: var(--grey);
    font-weight: 700;
    font-size: 1.25rem;

    &:hover,
    &:focus {
        background-color: var(--blued);
    }
}
</style>