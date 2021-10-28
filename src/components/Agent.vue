<template>
  <div class="wrapper">
    <h1>Clients in chat</h1>
    <ul>
      <li v-for="user in users" :key="user.id">{{user}}</li>
    </ul>
  </div>
</template>

<script>
import io from "socket.io-client";

var socket = io();

export default {
  data() {
    return {
      users: [],
    };
  },

  methods: {},
  created() {
    socket.on("users", (users) => {
      users.forEach((user)=>{
        users.push(user);
      })
    });
  },
};

</script>

<style lang="scss">
</style>