<template>
    <nav id="nav">
      <button class="btn btn-add-task btn-uhe" v-on:click="showTaskForm">Add Task</button>
      <ul class="menu">
        <li><router-link to="/mytasks" class="btn btn-uhe">My Tasks</router-link></li>
        <li><router-link to="/general" class="btn btn-uhe">All Tasks</router-link></li>
      </ul>
      <button class="btn btn-logout" v-on:click="logout">Logout</button>
    </nav>
</template>

<script>
import { bus } from '../main'
import { fireAuth } from '../main'

export default {
  data() {
    return {

    };
  },
  methods: {
    showTaskForm: function() {
      bus.$emit("showTaskPop", 1)
    },
    redirect: function(event) {
      let destination = event.currentTarget.getAttribute('data-redirect-to')
      console.log(destination)
      this.$router.replace(destination)
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


