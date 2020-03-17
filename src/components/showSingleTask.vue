<template>
  <div class="row task">
    <div class="col-lg-2">
      <div class="task__author">
        <p class="label">Author</p>
        <img v-bind:src="user.avatar" class="avatar">
        <p class="name">{{ user.first_name }}<br>
        {{ user.last_name }}</p>
      </div>
    </div>
    <div class="col-lg-8">
      <h2 class="task__name" v-bind:class="{done: task.status}"> {{ task.name }} </h2>
      <p class="task__description"> {{ task.description }}</p>
    </div>
    <div class="col-lg-2 task__actions" v-if="task.author == currentUser.email">
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
      user: {},
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
      task: db.collection('tasks').doc(this.id),
      user: db.collection('users').doc('sFG4RWZvndfXKVVqhIyUrR7B7SE3')
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/showSingleTask.scss";
</style>