<template>
  <div class="row task">
    <div class="col-lg-2">
      <div class="task__author">
        <p class="label">Author</p>
          <router-link :to="{ name: 'userProfile', params: {id: author.user_id}}" v-if="author.user_id != currentUser.uid">
            <img v-if="author.avatar" v-bind:src="author.avatar" class="avatar">
            <div v-else class="avatar-placeholder">
              <font-awesome-icon icon="user" size="3x" />
            </div>
            <p class="name">{{ author.first_name }}<br>
            {{ author.last_name }}</p>
          </router-link>
          <router-link to="/my-profile" v-else>
            <img v-if="author.avatar" v-bind:src="author.avatar" class="avatar">
            <div v-else class="avatar-placeholder">
              <font-awesome-icon icon="user" size="3x" />
            </div>
            <p class="name">{{ author.first_name }}<br>
            {{ author.last_name }}</p>
          </router-link>
      </div>
    </div>
    <div class="col-lg-8">
      <h2 class="task__name" v-bind:class="{done: task.status}"> {{ task.name }} </h2>
      <p class="task__description"> {{ task.description }}</p>
    </div>
    <div class="col-lg-2 task__actions" v-if="author.user_id == currentUser.uid">
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
      author: {}
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
    db.collection('tasks').doc(this.id).get()
    .then(doc => {
        let single_task = doc.data();
        single_task.author.get()
        .then(res => { 
          this.author = res.data()
        })
        .catch(err => console.error(err));
    })
    .catch(err => { console.error(err) });

    return { 
       task: db.collection('tasks').doc(this.id),
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/showSingleTask.scss";
</style>