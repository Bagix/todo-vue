<template>
    <nav id="nav">
      <ul class="menu">
        <li><button class="btn btn-success btn-uhe" v-on:click="showTaskForm">Add Task</button></li>
      </ul>
      <button class="btn btn-amber btn-logout" v-on:click="logout">Logout</button>
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
      bus.$emit("showTaskPop", 1);
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


