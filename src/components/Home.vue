<template>
  <div class="wrapper">
      <h1>Chat</h1>
      <p>Welcome to my chat app. Please enter your name and select which user type you are and hit connect to enter a chat.</p>
      <ul class="errors">
          <li v-for="(error, index) in errorMsgs" :key="index">{{error}}</li>
      </ul>
      <form action="">
          <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" name="name" id="name">
          </div>
          <fieldset class="fieldset">
              <legend>User type</legend>
              <label for="agent"><input type="radio" name="type" id="agent" value="agent">Agent</label>
              <label for="customer"><input type="radio" name="type" id="customer" value="customer">Customer</label>             
          </fieldset>
          <input type="button" value="Connect" @click="storeData" class="btn">
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
            const userType = document.querySelector('input[name="type"]:checked')
            this.errorMsgs =[];
            if(name === null || name === undefined || name ==="" || name ===" "){
                this.errorMsgs.push('Please enter a name');
            }
        
            else {
                this.name = name;
            }
            
            if(userType){
                this.userType = userType.value;
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

<style>
input[type="button"] {
    margin: 1rem;
}

.errors {
    padding-left: 0;

    list-style-type: none;

    color: var(--red);
}

.errors li {
    margin-bottom: 0.5rem;
}

.fieldset {
    padding-left: 0;
    margin-left: 0;

    border: none;
}

</style>