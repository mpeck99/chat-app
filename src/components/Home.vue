<template>
  <div class="wrapper">
      <h1>Chat</h1>
      <p>Welcome to my chat app. Please enter your name and select which user type you are and hit connect to enter a chat.</p>
      <form action="" class="form-group-inline">
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" name="name" id="name">
        </div>
        <div class="form-group">
           <label for="type">User type</label>
            <select name="type" id="type">
                <option value="Select user type">Select user type</option>
                <option value="agent">Agent</option>
                <option value="customer">Customer</option>
            </select> 
        </div>
        <input type="button" value="Connect" @click="storeData" class="btn">
        <ul v-if="errorMsgs[0]" class="errors">
            <li v-for="(error, index) in errorMsgs" :key="index">{{error}}</li>
        </ul>
    </form>
  </div>
</template>

<script>
export default {
 data(){
     return{
         name: '',
         userType: '', 
         errorMsgs: [],
     }
 }, 

    methods :{
        storeData(){
            const name = document.querySelector('#name').value;
            const userType = document.querySelector('#type').value;
            this.errorMsgs =[];
            if(name === null || name === undefined || name ==="" || name ===" "){
                this.errorMsgs.push('Please enter a name');
            }
        
            else {
                this.name = name;
            }
            
            if(userType != 'Select user type'){
                this.userType = userType;
            }
            else {
                this.errorMsgs.push('Please select a user type.')
            }
            
            if(this.errorMsgs.length == 0){
                this.$router.push({name: 'Chat', params: {
                    data: {
                        name: this.name,
                        type: this.userType
                    }
                }});
            }
        }
    }
}
</script>

<style lang="scss">
.errors {
    width: calc(100% - 2rem);

    position: absolute;
    bottom: -8rem;

    padding: 1rem;

    list-style-type: none;

    color: var(--red);

    background-color: lighten(#c14b46, 35%);
    border-radius: 0.25rem;

    li {
    margin-bottom: 0.5rem;
    }
}

.form-group {
    position: relative;

    label {
        position: absolute;
        top: -2.25rem;
    }

}

.form-group-inline {
    display: flex;
    flex-direction: column;
    justify-content: center;

    position: relative;

    margin: 2.5rem 0;

    @media screen and (min-width: 767px) {
        flex-direction: row;

    }

    .form-group {
        
        margin-bottom: 2.25rem;

        input, select {
            min-width: 20rem;
            height: 1.5rem;

            border-radius: 0.25rem;

            border: 1px solid var(--black);
        }

        input {
            @media (min-width: 767px){
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }
        }

        select {
            height: 1.75rem;

              

            @media (min-width: 767px){
                border-radius: 0;   
            }    
        }

        @media screen and (min-width: 767px) {
            margin-bottom: 0;            
        }
    }

    .btn {
        @media screen and (min-width: 767px) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;           
        }   
    }
}

.btn {
    border: none;
    background-color: var(--blue);
    border-radius: 0.25rem;

    color: var(--grey);
    font-weight: 700;

    &:hover, &:focus {
        background-color: var(--blued);
    }
}
</style>