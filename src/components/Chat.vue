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
        <button type="submit" class="btn" value="Send" @click="sendMessage">
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
    sendMessage(e) {
      const messageInput = document.getElementById("message").value;
      e.preventDefault();
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
      const inner = document.querySelector(".inner");
      inner.lastChild.scrollIntoView();
      window.scrollTo(0, document.querySelector(".chat-body").scrollHeight);
    },
    notTyping() {
      this.typing = false;
    },
    isTyping(e) {
      e.preventDefault();
      socket.emit("typing", {
        typing: true,
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
    let data = {};
    try {
      data = JSON.parse(localStorage["data"]);
      this.username = data.name;
      this.type = data.type;
    } catch (error) {
      // ignore
    }

    
    socket.on("message", (data) => {
      if (data.type == "Agent") {
      this.bubbleClass = "chat-bubble--agent";
    } else {
      this.bubbleClass = "chat-bubble--client";
    }
      this.messages.push({
        message: data,
        user: this.type,
        class: this.bubbleClass,
      });
    });

    socket.on("typing", (data) => {
      let timer;
      this.typing = data.typing;
      clearTimeout(timer);
      timer = setTimeout(this.notTyping, 2000);
    });

    socket.on("connect", (data) => {
      this.connectedUsers.push(data);

      socket.on("join", (data) => {
        this.connectedUsers.push(data);
        let messageDisclaimer = {
            message: this.username + " is in the queue",
            class: "disclaimer",
            user: this.type,
          }
        console.log(data);
        this.messages.push(messageDisclaimer);
      });
      socket.on('agentJoin', (data)=>{
         let messageDisclaimer = {
            message: 'Agent has joined the chat.',
            class: "disclaimer",
            user: this.type,
          }
        console.log(data);
        this.messages.push(messageDisclaimer);
      })
      socket.emit("join", data);
    });

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

        &:hover, &:focus {
          border-color: var(--blue);
        }
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
    max-width: 85%;
    width: 100%;

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

  > :first-child {
    margin-top: auto;
  }
}

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

  &.chat-bubble--agent {
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
}

.typing {
  height: 1rem;
  width: 4rem;

  display: none;

  position: absolute;
  top: -2rem;
  left: 40%;

  &.active {
    display: flex;
    justify-content: space-around;
  }

  span {
    width: 1rem;
    height: 1rem;

    display: block;

    border-radius: 50%;
    background: var(--grey);
  }
}
</style>