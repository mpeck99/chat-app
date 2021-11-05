<template>
  <div class="wrapper wrapper-agent">
    <div class="sidebar">
      <h1>Clients in chat</h1>
      <ul class="client-list">
        <li v-for="user in users" :key="user.id" >
          <button @click="joinChat(user.id)" type="button">{{user.name}}</button>
        </li>
      </ul>
    </div>
    <div class="chat-wrapper">
      <div class="chat-body">
        <div
          class="chat-bubble"
          v-for="(msg, index) in messages"
          :key="index"
          :class="msg.message.class"
        >
          <span class="name">{{ msg.message.name }}</span>
          <p>{{ msg.message.message }}</p>
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
        <button type="submit" class="btn" value="Send" @click="sendMessage">
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

// var socket = io();

export default {
  // props: ["name", "userType"],
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
    };
  },

  methods: {
    joinChat(user){
      this.connectedUser = "";
      this.messages = [];

      this.socket.emit('agent', user);
      this.connectedUser = user;
    },
     sendMessage(e) {
      const messageInput = document.getElementById("message").value;
      
      e.preventDefault();
      if (messageInput) {
        this.socket.emit("send", {
          user: this.connectedUser,
          message: this.message,
          class: this.bubbleClass,
          name: 'Agent',
        });
        this.message = "";
      }
      const inner = document.querySelector(".chat-wrapper");
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
        user: this.connectedUser
      });
    },
  },
  created() {
    this.socket.on('connected', (data)=>{
      for(var i = 0; i < data.length; i++){
       this.users.push(data[i]); 
      }
    });

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
  },
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

  .sidebar{
    height: 95%;

    display: flex;
    flex-direction: column;
    grid-column: 1 / 2;
    grid-row: 1 / 2;

    padding: 1.5rem;

    background-color: var(--grey);
  }

  .client-list {
    list-style-type: none;
    padding-left: 0;
    
    li {
      min-width: 100%;
      
      display: flex;
      flex-direction: column;
      
      margin-left: -1.5rem;
      margin-right: -1.5rem;

      button {
        padding: 1rem 2rem;

        position: relative;

        border-radius: 0;
        border: 0;


        &:hover, &:focus {
          background-color: var(--white);
        }

        &:after {
          content: '';

          width: 90%;
          height: 2px;

          position: absolute;
          left: 1rem;
          bottom: 0rem;
          
          background-color: var(--grey);
        }
      }      
    }
  }

  .chat-wrapper {
    height: 100%;
    
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: auto;

    position: relative;
    grid-column:  2 / 3;
    grid-row:  1 / 2;
  }
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
</style>