<template>
  <div class="wrapper wrapper-agent">
    <div class="sidebar">
      <h1>Clients in chat</h1>
      <ul class="client-list">
        <li v-for="user in users" :key="user.id">
          <button @click="joinChat(user.id)"  type="button" :id="'client' + user.id" class="btn-user">
            {{ user.name }}
          </button>
        </li>
      </ul>
    </div>
    <div class="chat-wrapper">
      <div class="chat-body">
        <div
          class="chat-bubble"
          v-for="(msg, index) in messages"
          :key="index"
          :class="!msg.message.class ? msg.class : msg.message.class"
        >
          <span v-if="msg.message.name" class="name">{{
            msg.message.name
          }}</span>
          <p v-if="msg.message.message">{{ msg.message.message }}</p>
          <p v-else>{{ msg.message }}</p>
        </div>
      </div>
      <form class="form-wrapper">
        <div :class="typing ? 'active' : ''" class="typing">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea
            name="message"
            @keyup="isTyping"
            @keydown.enter.prevent="sendMessage"
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="message"
          ></textarea>
        </div>
        <button type="submit" class="btn" value="Send" @click="sendMessage" @keyup.enter="sendMessage">
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      users: [],
      socket: io(),
      username: "",
      type: "",
      message: "",
      messages: [],
      bubbleClass: "",
      typing: false,
      typingContent: "",
      connectedUser: "",
      user: "",
    };
  },

  methods: {
    joinChat(user) {
      this.messages = [];

      // Variables to grab all the buttons and a specific button that is using the variable passed
      const buttonList = document.querySelectorAll(".btn-user");
      const button = document.querySelector("#client" + user);

      // If the button does not have a class of active it will be added for styling purposes
      if (!button.classList.contains("active")) {
        button.classList.add("active");
      }
      // Removing active class from all the other buttons
      else {
        buttonList.forEach((e) => {
          e.classList.remove("active");
        });
      }
      // Creating a connected message to send to the agent when they successfully join a chat
      const connectMsg = {
        message: "Chat started. Type message to begin.",
        class: "disclaimer",
      };

      // Pusing the connect messages to the messages array to display on the agents side
      this.messages.push(connectMsg);

      // See if this can be removed
      this.connectedUser = "";

      // Setting a data variable to emit to the client that an agent has joined and to create a conenction between the two
      const data = {
        user: user,
        agentId: this.socket.id,
      };

      // Emitting that the agent has connected
      this.socket.emit("agent", data);

      // Setting which user is connected
      this.connectedUser = user;
    },

    sendMessage(e) {
      // Setting the message input to whatever the value for the textarea field is to send to the client
      const messageInput = document.getElementById("message").value;

      e.preventDefault();

      // Making sure that the input had text before it sends so that it doesnt send an empty bubble
      if (messageInput) {
        this.socket.emit("send", {
          user: this.connectedUser,
          agent: this.socket.id,
          message: this.message,
          class: "chat-bubble--agent",
          type: "Agent",
          name: "Agent",
        });
        // Clearing out this message
        this.message = "";
      }
    },

    // Function for when users isnt typing (need to check out and see if needed)
    notTyping() {
      this.typing = false;
    },

    // Function for when user us typing to emit to the client
    isTyping(e) {
      e.preventDefault();
      this.socket.emit("agentTyping", {
        typing: true,
        user: this.connectedUser,
      });
    },
  },

  created() {
    // When an agent is connected it grabs the list of users emitted from connected and adds them to the users array
    this.socket.on("connected", (data) => {
      for (var i = 0; i < data.length; i++) {
        this.users.push(data[i]);
      }
    });

    this.socket.on('join', (data)=>{
      for (var i = 0; i < data.length; i++) {
        this.users.push(data[i]);
      }
    })

    this.socket.on("message", (data) => {
      // Setting the bubble class so that the classes are sent back appropriately
      this.bubbleClass = "chat-bubble--client";

      // Adding the message to the array to display to agent and client
      this.messages.push({
        message: data,
        user: data.type,
        class: this.bubbleClass,
      });
    });

    this.socket.on("clientTyping", (data) => {
      let timer;
      this.typing = data.typing;
      clearTimeout(timer);
      timer = setTimeout(this.notTyping, 2000);
    });
  },

  watch: {
    messages(){
      const chatBody = document.querySelector('.chat-body');
 
      setTimeout(function(){
        chatBody.scrollTop = chatBody.scrollHeight; 
      }, 10)
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper-agent {
  min-width: 100%;
  min-height: 95%;

  display: grid;
  grid-template-columns: 25rem 1fr;
  grid-template-rows: 100%;
  justify-content: flex-start;

  padding: 0;

  .sidebar {
    height: 95%;

    display: flex;
    flex-direction: column;
    grid-column: 1 / 2;
    grid-row: 1 / 2;

    padding: 0.8rem;

    background-color: var(--grey);
  }

  .client-list {
    list-style-type: none;
    padding-left: 0;

    li {
      min-width: 100%;

      display: flex;
      flex-direction: column;

      margin-left: -0.8em;
      margin-right: -0.8rem;

      button {
        padding: 1rem 2rem;

        position: relative;

        border-radius: 0;
        border: 0;

        &:hover,
        &:focus {
          background-color: darken(#e3e3e2, 15%);
        }
      }
    }

    .active {
      background-color: var(--white);
    }
  }

  .chat-wrapper {
    height: 100%;

    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 21rem 1fr;
    justify-content: flex-end;

    overflow: auto;

    position: relative;
    grid-column: 2 / 3;
    grid-row: 1 / 2;

    .form-wrapper {
      padding: 1rem;

      textarea {
        width: calc(100% - 1rem);
        height: 8rem;

        border-radius: 0;
        border: 2px solid var(--grey);
      }
    }
  }
}

.chat-body {
  width: calc(100% - 3.5rem);
  height: 16rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  padding: 1.5rem 1.5rem 0 1.5rem;
  margin-bottom: 0.75rem;

  overflow: auto;

  > :first-child {
    margin-top: auto;
  }
}

.chat-bubble--agent {
  max-width: 45%;

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
}

.chat-bubble--client {
  align-self: flex-start;

  background: var(--blue);

  p {
    text-align: left;
    color: var(--white);
  }

  .name {
    left: 0;
    right: auto;
  }

  &:after {
    left: -1rem;
    bottom: 0;

    border-bottom: 1.25rem solid var(--blue);
    border-left: 1.25rem solid transparent;
    border-right: 0;
  }
}

.typing {
  left: 1.25rem;
  bottom: 16rem;
}
</style>