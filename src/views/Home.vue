<template>
  <div class="home">
    <div class="video-wrapper">
      <video src="../assets/video/home_bg.mp4" autoplay loop muted></video>
      <div class="shadow-layer const"></div>
    </div>
    <transition name="fadeIn">
      <div class="container" v-show="loaded">
        <div class="jumbotron text-center">
          <h3>To Do</h3>
          <h1>Just Do It!</h1>
        </div>
        <div class="btn-container">
          <button type="button" class="btn btn-lg btn-uhe" v-on:click="showLoginPanel">Login</button>
          <button type="button" class="btn btn-lg btn-uhe" v-on:click="showSignUpPanel">Signup</button>
        </div>
      </div>
    </transition>
    
    <div class="user-popup" v-if="showLogin || showSignup" v-bind:class="{show: addShowClass}">
      <button class="close btn-close" v-on:click="hidePanel"><span aria-hidden="true">×</span></button>
      <login v-if="showLogin"></login>
      <sign-up v-if="showSignup"></sign-up>
    </div>

    <transition name="fadeIn">
      <div class="shadow-layer" v-if="showLogin || showSignup" v-on:click="hidePanel"></div>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'
import { setTimeout } from 'timers';

export default {
  name: 'home',
  components: {
    "login": Login,
    "sign-up": Signup
  },
  data() {
    return {
      showLogin: 0,
      showSignup: 0,
      addShowClass: 0,
      delay: 150,
      loaded: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.loaded = 1
    }, 500)
  },
  methods: {
    showLoginPanel: function() {
      this.showLogin = 1;
      setTimeout(() => {this.addShowClass = 1;}, this.delay)
    },
    showSignUpPanel: function() {
      this.showSignup = 1;
      setTimeout(() => {this.addShowClass = 1;}, this.delay)
    },
    hidePanel: function() {
      this.addShowClass = 0;
      setTimeout(() => {
        this.showLogin = 0;
        this.showSignup = 0;
      }, this.delay)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/views/home.scss";
</style>

