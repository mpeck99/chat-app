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
        <!-- <div
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
      </form> -->
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
    };
  },

  methods: {
    joinChat(user){
      this.socket.emit('agent', user);
    },
    sendMessage(){
      console.log('something will happen eventually')
    }
  },
  created() {
    this.socket.on('connected', (data)=>{
      for(var i = 0; i < data.length; i++){
       this.users.push(data[i]); 
      }
    });

    // socket.on('disconnect', function(){
    //   this.users.pop(socket.id);
    //   console.log(this.users);
    // })
  },
};

</script>

<style lang="scss">

.wrapper-agent {
  min-width: 100%;
  min-height: 95%;

  display: grid;
  grid-template-columns: 25rem auto;
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
    grid-column:  2 / 3;
    grid-row:  1 / 2;
  }
}
</style>