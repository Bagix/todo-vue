<template>
  <div class="row task">
    <div class="col-md-2">
      <div class="task__author">
        Author:<br>
        {{ task.author }}
      </div>
    </div>
    <div class="col-md-8">
      <h2 class="task__name" v-bind:class="{done: task.status}"> {{ task.name }} </h2>
      <p class="task__description"> {{ task.description }}</p>
    </div>
    <div class="col-md-2 task__actions" v-if="task.author == currentUser.email">
      <div class="wrapper">
        <button class="btn btn-warning btn-uhe" v-if="task.status" v-on:click="changeStatus(task.id, 0)">Undo</button>
        <button class="btn btn-success btn-uhe" v-else v-on:click="changeStatus(task.id, 1)">Done</button> 
        <button class="btn btn-danger btn-uhe" v-on:click="showDeletePopup(task.id, task.name)">Delete</button>
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
      id: this.$route.params.id,
      task: {},
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  methods: {
    changeStatus: function(taskId, status) {
       db.collection("tasks").doc(taskId).set({
        status: status
       },{merge: true})
    },
    showDeletePopup: function(taskId,taskName) {
      bus.$emit("showDeletePopup", {id: taskId, name: taskName})
    },
  },
  firestore () {
    return {
      task: db.collection('tasks').doc(this.id)
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/showSingleTask.scss";
</style>