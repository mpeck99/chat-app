<template>
    <div class="wrapper">
        <div class="chat-bubbles">
            <div class="chat-bubble" v-for="(msg, index) in messages" :key="index" :class="bubbleClass"><p>{{msg.message}}</p></div>
        </div>
        <div class="form-wrapper">
            <div class="form-group">
                <label for="message">Message:</label>
                <input type="text" v-model="message" class="form-control">
            </div>
            <input type="submit" class="btn" value="Send" @click="sendMessage"/> 
        </div>
    </div>

</template>

<script>
import io from 'socket.io-client';

export default {
    props: ['name', 'userType'],
    data() {
        return {
            username: "",
            type: "",
            message: '',
            messages: [],
            bubbleClass:"",
            socket : io('localhost:3000')
        }
    },
    methods: {
        sendMessage(e) {
            e.preventDefault();

            this.socket.emit('SEND_MESSAGE', {
                user: this.type,
                message: this.message,

                
            });
            this.message = ''
            
        }
    },
    created(){
        this.username = this.$route.params.data.name;
        this.type = this.$route.params.data.type;

        this.socket.on('MESSAGE', (data)=>{
            if(this.type == "agent"){
                console.log('agent');
            }
            else {
                console.log('nonagent')
            }
            this.messages.push({
                message: data, 
                user: this.type,
            })
        });
    },
    mounted() {
    //     this.socket.on('MESSAGE', (data) => {
            
    //         this.messages = [...this.messages, data];
    //         // you can also do this.messages.push(data)
    //     });
    //     this.socket.on('connect', ()=>{
    //         console.log(this.data.name+'connected')
    //     });
    }
}
</script>

<style>

</style>