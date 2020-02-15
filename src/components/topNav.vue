<template>
    <nav id="nav">
      <button class="btn btn-add-task btn-uhe" v-on:click="showTaskForm">Add Task</button>
      <ul class="menu">
        <li><router-link to="/my-tasks" class="btn btn-uhe">My Tasks</router-link></li>
        <li><router-link to="/general" class="btn btn-uhe">All Tasks</router-link></li>
      </ul>
      <button class="btn btn-logout" v-on:click="show_user_panel = !show_user_panel">User</button>
      <transition name="expand">
        <ul class="user-menu" ref="user-menu" v-show="show_user_panel">
          <li>
            <router-link to="/my-profile">Profile</router-link>
          </li>
            <li  v-on:click="logout"><span>Logout</span></li>
        </ul>
      </transition>
    </nav>
</template>

<script>

import { bus } from '../main'
import { fireAuth } from '../main'

export default {
  data() {
    return {
      show_user_panel: 0,
    };
  },
  methods: {
    showTaskForm: function() {
      bus.$emit("showTaskPop", 1)
    },
    logout: function() {
      fireAuth.signOut().then(() => {
        this.$router.replace("home")
      })
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/topNav.scss";
</style>


