<template>
  <div id="signup-panel" class="panel" v-on:keyup.enter="signUp">
    <h4 class="panel__title">Signup</h4>
    <input type="email" v-model="email" class="form-control form-control-lg" placeholder="Email">
    <input type="password" v-model="password" class="form-control form-control-lg" placeholder="Password">
    <button class="btn btn-lg btn-uhe" v-on:click="signUp">Signup</button>
    <!-- <span>Already have account? <router-link to="/login">Login</router-link></span>-->
  </div>
</template>

<script>
import { fireAuth } from '../main'

export default {
  name: 'signup',
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    signUp: function() {
      fireAuth.createUserWithEmailAndPassword(this.email, this.password).then(user => {
        this.$router.replace("dashboard")
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
