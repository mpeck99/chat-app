<template>
  <div class="wrapper wrapper-chat">
    <div class="inner">
      <div class="chat-body">
        <div class="chat-bubble" v-for="(msg, index) in messages" :key="index" :class="msg.message.class">
          <span class="name">{{ msg.message.name }}</span>
          <p>{{ msg.message.message }}</p>
        </div>
      </div>
      <ul class="users" v-if="connectedUsers">
        <li v-for="(user, index) in connectedUsers" :key="index">
          {{ user }}
        </li>
      </ul>
    </div>
    <form class="form-wrapper">
      <div :class="typing ? 'active' : ''" class="typing">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea name="message" @keyup="isTyping" @keydown.enter.prevent="sendMessage" id="message" class="form-control" cols="30" rows="10" v-model="message"
        ></textarea>
      </div>
      <button type="submit" class="btn" value="Send" @click="sendMessage">
        Send
      </button>
    </form>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  props: ["name", "userType"],
  data() {
    return {
      username: "",
      type: "",
      message: "",
      messages: [],
      bubbleClass: "",
      socket: io('http://chat.morganpeck.com:3000'),
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
        this.socket.emit("send", {
          user: this.type,
          message: this.message,
          class: this.bubbleClass,
          name: this.username,
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
      this.socket.emit("typing", {
        typing: true,
      });
    },
    userJoined() {
      this.socket.emit("join", {
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
 

   

    if (this.type == 'Agent') {
      this.bubbleClass = "chat-bubble--agent";
    } else {
      this.bubbleClass = "chat-bubble--client";
    }
    this.socket.on("message", (data) => {
      this.messages.push({
        message: data,
        user: this.type,
        class: this.bubbleClass,
      });
    });

    this.socket.on("typing", (data) => {
      let timer;
      this.typing = data.typing;
      clearTimeout(timer);
      timer = setTimeout(this.notTyping, 2000);
    });

    this.socket.on("connect", () => {
      this.socket.on("join", (data) => {
        this.connectedUsers.push(data);
        console.log(data);
      });

      this.socket.on("queue", () => {
        console.log("Placed in queue"); 
      });
      this.socket.emit("queue", "You have been put into the queue");
      this.socket.emit("join", this.username + " has joined the chat");
    });
  },
};
</script>

<style lang="scss">
.wrapper-chat {
  max-width: 95%;
  height: 90vh;

  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: calc(100% - 8rem) 8rem;

  position: relative;

  .form-wrapper {
    height: 100%;

    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    grid-column: 1 / 2;
    grid-row: 2 / 3;

    position: relative;

    padding: 0;

    .form-group {
      margin: 0;

      width: 100%;

      .form-control {
        height: 4rem;

        padding: 0.75rem;

        border: 1px solid var(--black);

        word-break: break-all;
        resize: none;
      }
    }

    .btn {
      width: auto;
      height: 5.6rem;
      padding: 0.5rem;

      border-radius: 0;
    }
  }
}

.inner {
  min-height: calc(100% - 4rem);
  height: 100%;
  overflow: auto;

  position: relative;
}

.chat-body {
  width: 100%;
  min-height: calc(100% - 4rem);

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  > :first-child {
    margin-top: auto;
  }
}

.chat-bubble {
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

  &.chat-bubble--agent {
    align-self: flex-start;

    background: var(--blue);

    p {
      text-align: left;
      color: var(--grey);
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
  top: -0.5rem;

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

.users {
  padding: 0;
  margin-bottom: 0;

  list-style-type: none;

  color: darken(#ebebeb, 50%);
  font-style: italic;
  font-size: 0.9rem;
}
</style>