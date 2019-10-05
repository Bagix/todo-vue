<template>
  <div id="delete-popup" v-bind:class="{show: tasktoDelete}">
    <h5>Do you really want to delete this task?</h5>
    <h3>{{ taskName }}</h3>
    <div class="btn-container">
      <button class="btn btn btn-dark" v-on:click="deleteTask">Yes</button>
      <button class="btn btn-light" v-on:click="hideDeletePopup">No</button>
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
      bus.$emit("hideDeletePopup", {id: "", name: ""})
    },
    hideDeletePopup: function() {
      bus.$emit("hideDeletePopup", {id: "", name: ""})
    }
  },
  created() {
    bus.$on("deletePopup", (task) => {
      this.tasktoDelete = task.id
      this.taskName = task.name
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/deletePopup.scss";
</style>


