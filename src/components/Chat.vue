<template>
  <div class="wrapper wrapper-chat">
    <div class="inner">
      <div class="chat-body">
        <div
          class="chat-bubble"
          v-for="(msg, index) in messages"
          :key="index"
          :class="msg.class"
        >
          <span v-if="msg.message.name" class="name">{{
            msg.message.name
          }}</span>
          <p v-if="msg.message.message">{{ msg.message.message }}</p>
          <p v-else>{{ msg.message }}</p>
        </div>
      </div>
    </div>
    <form class="form-wrapper">
      <div :class="typing ? 'active' : ''" class="typing">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="form-group">
        <label for="message" class="sr-only">Message:</label>
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
        <button type="submit" class="btn" value="Send" @click="sendMessage" @keyup.enter="sendMessage">
          Send
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import io from "socket.io-client";

var socket = io();

export default {
  props: ["name", "userType", "id"],
  data() {
    return {
      username: "",
      type: "",
      message: "",
      messages: [],
      bubbleClass: "",
      typing: false,
      typingContent: "",
      connectedUsers: [],
    };
  },
  methods: {
    // Function to send message to an agent
    sendMessage(e) {
      // Storing the message input fields value into a variable
      const messageInput = document.getElementById("message").value;
      e.preventDefault();
      // Checking to see if there is a message before sending
      if (messageInput) {
        socket.emit("send", {
          socket: socket.id,
          message: this.message,
          class: 'chat-bubble--client',
          name: this.username,
          type: this.type
        });
        this.message = "";
      }
      // Need to work on this to make it stay at the bottom of the chat window
      const inner = document.querySelector(".inner");
      inner.lastChild.scrollIntoView();
      window.scrollTo(0, document.querySelector(".chat-body").scrollHeight);
    },
    // Function to show no one is typing
    notTyping() {
      this.typing = false;
    },
    // Typing function to emit that a user is typing on a key stroke
    isTyping(e) {
      e.preventDefault();
       socket.emit("clientTyping", {
        typing: true,
        agent: socket.id
      });
    },
    userJoined() {
      socket.emit("join", {
        name: this.username,
        msg: " has joined the chat.",
      });
    },
  },

  created() {
    // check to see if this can be removed belive that its old
    let data = {};
    try {
      data = JSON.parse(localStorage["data"]);
      this.username = data.name;
      this.type = data.type;
    } catch (error) {
      // ignore
    }

    // Socket.io messaging -- check if the if/else can be removed might be old
    socket.on("message", (data) => {
      if (data.type == "Agent") {
      this.bubbleClass = "chat-bubble--agent";
    } else {
      this.bubbleClass = "chat-bubble--client";
    }
    // Storing the data into the messages array to display to the user
      this.messages.push({
        message: data,
        user: this.type,
        class: this.bubbleClass,
      });
    });

  // Socket.io agent typing
    socket.on("agentTyping", (data) => {
      // Creating a variable to store the typing boolean to display if the agent is typing to the client
      let timer;
      this.typing = data.typing;
      clearTimeout(timer);
      timer = setTimeout(this.notTyping, 2000);
    });

  // Socket.io connection
    socket.on("connect", (data) => {
      // On connection adding the users to a connected users list
      this.connectedUsers.push(data);

      // Socket.io Join
      socket.on("join", (data) => {
        this.connectedUsers.push(data);

        // Setting a message disclaimer to display to the user when they enter a chat
        let messageDisclaimer = {
            message: this.username + " is in the queue",
            class: "disclaimer",
            user: this.type,
          }
        // Storing that disclaimer into the message array
        this.messages.push(messageDisclaimer);
      });

      // Socket.io agent join
      socket.on('agentJoin', (data)=>{
        // Setting the message disclaimer to let a client know when an agent has joined the chat
         let messageDisclaimer = {
            message: 'Agent has joined the chat.',
            class: "disclaimer",
            user: this.type,
          }
        this.messages.push(messageDisclaimer);
        console.log(data);
      })
      socket.emit("join", data);
    });

    // On connection emitting the user that has joined a chat so they can be dispayed on the agents end
    socket.emit("users", {
      name: this.username,
      type: this.type,
    });
  },
};
</script>

<style lang="scss" scoped>
.wrapper-chat {
  max-height: calc(100% - 7rem);
  height: 100%;

  .form-wrapper {
    position: relative;

    padding: 0;

    .form-group {
      width: 100%;

      margin: 0;

      display: flex;
      flex-direction: row;
      
      .form-control {
        height: 4rem;

        padding: 0.75rem;

        border: 2px solid var(--grey);

        word-break: break-all;
        resize: none;
      }

      textarea {
        border-right: 0;
      }
    }

    .btn {
      width: auto;
      height: 5.75rem;
      padding: 0.5rem;

      border-radius: 0;
    }
  }

  .inner {
    height: 100%;
    min-width: 100%;

    display: flex;

    margin-bottom: 1rem;

    overflow-y: auto;

    position: relative;
  }
}

.chat-body {
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-bottom: 1rem;

  > :first-child {
    margin-top: auto;
  }
}

.chat-bubble--agent {
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
  bottom: 6.5rem;
  right: 0;
}
</style>