<template>
    <div class="wrapper wrapper-chat">
        <div class="chat-bubbles">
            <div class="chat-bubble" v-for="(msg, index) in messages" :key="index" :class="msg.message.class"><p>{{msg.message}}</p></div>
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
            console.log('click')

            this.socket.emit('SEND_MESSAGE', {
                user: this.type,
                message: this.message,
                class: this.bubbleClass,
            });
            this.message = ''
            
        }
    },
    created(){
        this.username = this.$route.params.data.name;
        this.type = this.$route.params.data.type;
    if(this.type == "agent"){
                this.bubbleClass = 'chatbubble--agent';
            }
            else {
                this.bubbleClass='chatbubble--client';
            }
        this.socket.on('MESSAGE', (data)=>{
           
            this.messages.push({
                message: data, 
                user: this.type,
                class: this.bubbleClass
            })
        });
    },
    mounted() {
        // this.socket.on('MESSAGE', (data) => {
            
        //     this.messages = [...this.messages, data];
        //     // you can also do this.messages.push(data)
        // });
        // this.socket.on('connect', ()=>{
        //     console.log(this.data.name+'connected')
        // });
    }
}
</script>

<style lang="scss">
.wrapper-chat {
    max-width: 95%;
    height: 90%;

    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr auto;

    .form-wrapper {
        flex-direction: row;
        justify-content: center;
        align-items: flex-end;

        padding: 0;

        .form-group {
            margin: 0;

            width: 100%;

            input {
                border: 1px solid var(--black);
            }
        }

        .btn {
            width: auto;
            height: 2.75rem;
            padding: 0.5rem;

            border-radius: 0;
        }
    }
}
</style>