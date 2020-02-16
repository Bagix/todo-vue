<template>
  <div id="login-panel" class="panel" v-on:keyup.enter="login">
    <h4 class="panel__title">Login</h4>
    <input type="email" v-model="email" class="form-control form-control-lg" placeholder="Email" name="username">
    <input type="password" v-model="password" class="form-control form-control-lg" placeholder="Password" name="password">
    <button class="btn btn-lg btn-uhe" v-on:click="login">Login</button>
  </div>
</template>

<script>
import { fireAuth } from '../main'
import store from '../store/store'

export default {
  name: 'login',
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    login: function() {
      fireAuth.signInWithEmailAndPassword(this.email, this.password).then(user => {
      store.commit('setCurrentUser', fireAuth.currentUser)
      this.$router.replace("my-tasks")
      },
      error => {
        alert("Oops! " + error.message)
      })
    }
  },
}
</script>
