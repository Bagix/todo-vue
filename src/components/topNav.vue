<template>
    <nav id="nav">
      <button class="btn btn-add-task btn-uhe" v-on:click="showTaskForm">Add Task</button>
      <ul class="menu">
        <li><router-link to="/my-tasks" class="btn btn-uhe">My Tasks</router-link></li>
        <li><router-link to="/general" class="btn btn-uhe">All Tasks</router-link></li>
      </ul>
      <!-- <button class="btn btn-logout" v-on:click="logout">Logout</button> -->
      <button class="btn btn-logout" v-on:click="showUserMenu">User</button>
      <ul class="user-menu" ref="user-menu">
        <li>
          <router-link to="/my-profile">Profile</router-link>
        </li>
          <li  v-on:click="logout"><span>Logout</span></li>
      </ul>

    </nav>
</template>

<script>

import { bus } from '../main'
import { fireAuth } from '../main'
import { setTimeout } from 'timers';

export default {
  data() {
    return {

    };
  },
  methods: {
    showTaskForm: function() {
      bus.$emit("showTaskPop", 1)
    },
    showUserMenu: function() {
      // this.$refs["user-menu"].classList.toggle("show")
      const user_menu = this.$refs["user-menu"]
      if(!user_menu.classList.contains("show")) {
      user_menu.style.display = "block"
      setTimeout(() => {
        user_menu.classList.add("show")
      }, 50)
      } else {
        user_menu.classList.remove("show")
      setTimeout(() => {
        user_menu.style.display = "none"
      }, 250)
      }
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


