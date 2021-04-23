<template>
  <div class="wrapper">
      <h1>Chat</h1>
      <p>Welcome to my chat app. Please enter your name and select which user type you are and hit connect to enter a chat.</p>
      <form action="">
          <div class="form-item">
              <label for="name">Name:</label>
              <input type="text" name="name" id="name">
          </div>
          <fieldset class="form-item">
              <legend>User type</legend>
              <label for="agent">Agent <input type="radio" name="type" id="agent" value="agent"></label>
              <label for="customer">Customer <input type="radio" name="type" id="customer" value="customer"></label>             
          </fieldset>
          <input type="button" value="Connect" @click="storeData">
      </form>
  </div>
</template>

<script>
export default {
 data(){
     return{
         name: '',
         userType: '', 
         errorMsg: [],
     }
 }, 

    methods :{
        storeData(){
            const name = document.querySelector('#name').value;
            const userType = document.querySelector('input[name="type"]:checked')
            
            if(name === null || name === undefined || name ==="" || name ===" "){
                this.errorMsg.push('Please enter a name');
            }
        
            else {
                this.name = name;
            }
            
            if(userType){
                this.userType = userType.value;
            }
            else {
                this.errorMsg.push('Please select a user type.')
                console.log(this.errorMsg);
            }
            
            if(this.errorMsg.length == 0){
                this.$router.push({name: 'Chat', params: {
                    data: {
                        'name': this.name,
                        'type': this.userType
                    }
                }});
            }

            this.errorMsg = [];
        }
    }
}
</script>

<style>
input[type="button"] {
    margin: 1rem;

}
</style>