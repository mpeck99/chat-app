<template>
    <div class="wrapper wrapper-chat">
        <div class="inner">
            <div class="chat-body">
                <div class="chat-bubble"  v-for="(msg, index) in messages" :key="index" :class="msg.message.class">
                    <span class="name">{{msg.message.name}}</span>
                    <p>{{msg.message.message}}</p>
                </div>
            </div>
        </div>
        <span :class="typing ? 'active' : ''" id="typing" ><span>.</span><span>.</span><span>.</span></span>
        <form class="form-wrapper">
            <div class="form-group">
                <label for="message">Message:</label>
                <textarea name="message" @keyup="isTyping" @keydown.enter.prevent="sendMessage"  id="message" class="form-control" cols="30" rows="10" v-model="message" ></textarea>
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
            socket : io('localhost:3000'), 
            typing: false,
            typingContent: '',
        }
    },
    methods: {
        sendMessage(e) {
            const messageInput = document.getElementById('message').value;
            e.preventDefault();
            if(messageInput){
               this.socket.emit('send', {
                user: this.type,
                message: this.message,
                class: this.bubbleClass,
                name: this.username
            });
                this.message = '' 
            }
            
        },
        notTyping(){
            this.typing = false;
        },
        isTyping(e){
            e.preventDefault();
              this.socket.emit('typing',{
                    typing: true
                });
        },
        
    },
    mounted(){
        this.username = this.$route.params.data.name;
        this.type = this.$route.params.data.type;

    if(this.type == "agent"){
                this.bubbleClass = 'chat-bubble--agent';
            }
            else {
                this.bubbleClass='chat-bubble--client';
            }
        this.socket.on('message', (data)=>{
            this.messages.push({
                message: data, 
                user: this.type,
                class: this.bubbleClass,
            });

        });

        this.socket.on('typing', (data)=>{
            let timer;
            this.typing = data.typing;
            clearTimeout(timer);
            timer=setTimeout(this.notTyping, 1000);
        })

    },

 
    
}
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

#typing {
    display: none;

    &.active {
        display: block;
    }
}

.inner{
    height: 100%;
    overflow: auto;
}

.chat-body {
    width: 100%;
    min-height: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-end;

     >:first-child {
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
        content: '';

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
</style>