<template>
    <div class="wrapper wrapper-chat">
        <div class="inner">
            <div class="chat-bubble" v-for="(msg, index) in messages" :key="index" :class="msg.message.class">
                <span class="name">{{msg.message.name}}</span>
                <p>{{msg.message.message}}</p></div>
        </div>
        <form class="form-wrapper">
            <div class="form-group">
                <label for="message">Message:</label>
                <textarea name="message" @keydown.enter.prevent="sendMessage" id="message" class="form-control" cols="30" rows="10" v-model="message" ></textarea>
            </div>
            <button type="submit" class="btn" value="Send" @click="sendMessage">Send</button> 
        </form>
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
                name: this.username
            });
            this.message = ''
        }
    },
    created(){
        this.username = this.$route.params.data.name;
        this.type = this.$route.params.data.type;
    if(this.type == "agent"){
                this.bubbleClass = 'chat-bubble--agent';
            }
            else {
                this.bubbleClass='chat-bubble--client';
            }
        this.socket.on('MESSAGE', (data)=>{
           
            this.messages.push({
                message: data, 
                user: this.type,
                class: this.bubbleClass
            });

        });

         this.socket.on('connect', ()=>{
            console.log(this.type+' connected')
        });
    }
}
</script>

<style lang="scss">
.wrapper-chat {
    max-width: 95%;
    height: 90%;

    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr 5rem;

    .form-wrapper {
        height: 100%;

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

.inner {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
}

.chat-bubble {
    max-width: 45%;
    min-width: 4rem;

    padding: 0.5rem 1rem;
    margin: 2rem 0;

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
        content: '';

        width: 0;
        height: 0;

        margin: auto 0;

        position: absolute;
        top: 0;
        bottom: -1.5rem;
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

            border-bottom: 1.25rem solid var(--blue);
            border-left: 1.25rem solid transparent;
            border-right: 0;
        }    
    }
}
</style>