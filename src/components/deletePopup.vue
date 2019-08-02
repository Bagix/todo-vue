<template>
  <div id="delete-popup-layer" v-bind:class="{show: tasktoDelete}">
    <div id="delete-popup">
      <h5>Do you really want to delete this task?</h5>
      <h3>{{ taskName }}</h3>
      <button class="btn btn btn-dark" v-on:click="deleteTask">Yes</button>
      <button class="btn btn-light" v-on:click="tasktoDelete = ''">No</button>
    </div>
  </div>
</template>

<script>
import { db } from '../main'
import { bus } from '../main'

export default {
  data() {
    return {
      tasktoDelete: "",
      taskName: ""
    };
  },
  methods: {
    deleteTask: function() {
      db.collection("tasks").doc(this.tasktoDelete).delete().then(() => {
        this.tasktoDelete = "";
        this.taskName = "";
      });
    }
  },
  created() {
    bus.$on("showPopup", (task) => {
      this.tasktoDelete = task.id
      this.taskName = task.name
    })
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/deletePopup.scss";
</style>


