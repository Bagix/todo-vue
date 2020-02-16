<template>
  <div id="delete-popup" v-bind:class="{show: taskToDelete}">
    <div class="content">
      <h5>Do you really want to delete this task?</h5>
      <h3>{{ taskName }}</h3>
      <div class="btn-container">
      <button class="btn btn btn-dark" v-on:click="deleteTask">Yes</button>
      <button class="btn btn-light" v-on:click="hideDeletePopup">No</button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../main'
import { bus } from '../main'

export default {
  data() {
    return {
      taskToDelete: "",
      taskName: "",
    };
  },
  methods: {
    deleteTask: function() {
      db.collection("tasks").doc(this.taskToDelete).delete().then(() => {
        this.taskToDelete = ""
        this.taskName = ""
        this.$router.replace("/my-tasks")
      });
      bus.$emit("hideDeletePopup", {id: "", name: ""})
    },
    hideDeletePopup: function() {
      bus.$emit("hideDeletePopup", {id: "", name: ""})
    },
  },
  created() {
    bus.$on("showDeletePopup", (task) => {
      this.taskToDelete = task.id
      this.taskName = task.name
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/deletePopup.scss";
</style>


