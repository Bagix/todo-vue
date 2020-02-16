<template>
  <div id="user-info" class="col-md-6 m-auto">
    <div class="card">
      <div class="card-body">
          <p class="h4 text-center py-4">Your Info</p>
          <div class="md-form">
            <i class="fa fa-user prefix grey-text"></i>
            <input type="text" id="first-name" class="form-control" placeholder="First name" v-model="user.first_name">
          </div>
          <div class="md-form">
            <i class="fa fa-envelope prefix grey-text"></i>
            <input type="text" id="last-name" class="form-control" placeholder="Last name" v-model="user.last_name">
          </div>
          <div class="text-center py-4 mt-3">
            <button class="btn btn-cyan" v-on:click="SaveUserInfo()">Save</button>
          </div>
      </div>
    </div>
    <transition name="fade-down">
      <div class="alert alert-success" role="alert" v-show="saved">
        Saved!
      </div>
      <div class="alert alert-danger" role="alert" v-if="error">
        Error! Try again later.
      </div>
    </transition>
  </div>
</template>

<script>

import { fireAuth } from '../main'
import { db } from '../main'

export default {
  data() {
    return {
      user:{},
      saved: 0,
      error: 0,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser
    }
  },
  methods: {
    SaveUserInfo: function() {
      db.collection("users").doc(this.currentUser.uid).set({
        first_name: this.user.first_name,
        last_name: this.user.last_name,
      })
      .then(() => {
        this.error = 0
        this.saved = 1
      })
      .catch(error => {
        this.saved = 0
        this.error = 1
      })
    }
  },
  firestore () {
    return {
      user: db.collection('users').doc(this.currentUser.uid)
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "@/styles/components/userInfo.scss";
</style>