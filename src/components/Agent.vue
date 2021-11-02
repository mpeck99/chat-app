<template>
  <div class="wrapper">
    <h1>Clients in chat</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        <a @click="joinChat">{{user.name}}</a>
        </li>
    </ul>
  </div>
</template>

<script>
import io from "socket.io-client";

var socket = io();

export default {
  // props: ["name", "userType"],
  data() {
    return {
      users: [],
    };
  },

  methods: {
    joinChat(){
      console.log('click');
    }
  },
  created() {
    socket.on('connected', (data)=>{
      for(var i = 0; i < data.length; i++){
       this.users.push(data[i]); 
      }
    });

    socket.on('disconnect', function(){
      this.users.pop(socket.id);
      console.log(this.users);
    })
  },
};

</script>

<style lang="scss">
</style>