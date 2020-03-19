<template>
  <div id="signup-panel" class="panel" v-on:keyup.enter="signUp">
    <h4 class="panel__title">Signup</h4>
    <input type="test" v-model="first_name" class="form-control form-control-lg" placeholder="Name">
    <input type="test" v-model="last_name" class="form-control form-control-lg" placeholder="Last Name">
    <input type="email" v-model="email" class="form-control form-control-lg" placeholder="Email">
    <input type="password" v-model="password" class="form-control form-control-lg" placeholder="Password">
    <button class="btn btn-lg btn-uhe" v-on:click="signUp">Signup</button>
    <!-- <span>Already have account? <router-link to="/login">Login</router-link></span>-->
  </div>
</template>

<script>
import { fireAuth } from '../main'
import { db } from '../main'
import store from '../store/store'

export default {
  name: 'signup',
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    }
  },
  methods: {
    signUp: function() {
      if(this.first_name === "" || this.last_name === "") {
        return false
      }
      fireAuth.createUserWithEmailAndPassword(this.email, this.password).then(user => {
        store.commit('setCurrentUser', fireAuth.currentUser)
        db.collection("users").doc(fireAuth.currentUser.uid).set({
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          user_id: fireAuth.currentUser.uid
        }).then(() => {
          this.$router.replace("my-tasks")
        })
      },
      error => {
        alert("Oops! " + error.message)
      })
    }
  },
}
</script>

<style lang="scss">
@import "@/styles/components/signup.scss";
</style>
