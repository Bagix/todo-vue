<template>
  <div id="show-tasks">
    <button v-on:click="logout">Logout</button>
    <div class="row">
      <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="hideTasks" v-on:click="hide = !hide">
      <label class="custom-control-label" for="hideTasks">Hide done tasks</label>
      </div>
    </div>
    <div class="row">
    <template v-for="task in tasks">
      <div class="col-lg-4 col-md-6 mb-3" v-if="(!hide && !task.status)|| (!hide && task.status) || (hide && !task.status)">
        <div class="card card-image task" :style="{'background-image':'url(http://placeimg.com/501/400/'+task.id+')'}">
        <button class="btn btn-sm btn-danger btn--delete" v-on:click="showDeletePopup(task.id, task.name)">Delete</button>
          <div class="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4 justify-content-center">
            <div v-bind:class="{done: task.status}">
              <h5 class="orange-text task__status" v-if="task.status">
                Done 
              </h5>
              <h5 class="pink-text task__status" v-else>
              NOT Done
              </h5>
              <h3 class="card-title pt-2 task__name">
                <strong>{{ task.name }}</strong>
              </h3>
              <p class="task__desc">
                {{ task.description }}
              </p>
              <button class="btn btn-orange" v-if="task.status" v-on:click="changeStatus(task.id, 0)">Undo</button>
              <button class="btn btn-pink" v-else v-on:click="changeStatus(task.id, 1)">Done</button>
            </div>
          </div>
        </div>
      </div>
    </template>
    </div>
  </div>
</template>

<script>
import { db } from '../main'
import { bus } from '../main'
import { fireAuth } from '../main'

export default {
  data() {
    return {
      tasks: [],
      hide: 0,
    };
  },
  methods: {
    changeStatus: function(taskId, status) {
       db.collection("tasks").doc(taskId).set({
        status: status
       },{merge: true})
    },
    showDeletePopup: function(taskId,taskName) {
      bus.$emit("showPopup", {id: taskId, name: taskName})
    },
    deleteTask: function() {
      db.collection("tasks").doc(this.tasktoDelete).delete().then(() => {this.showDP = 0;});
    },
    logout: function() {
      fireAuth.signOut().then(() => {
        this.$router.replace("login")
      })
    }
  },
  firestore () {
    return {
      tasks: db.collection('tasks').orderBy("createdAt")
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/showTasks.scss";
</style>


