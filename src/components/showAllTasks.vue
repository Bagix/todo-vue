<template>
  <div id="show-tasks" class="container">

      <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="hideTasks" v-on:click="hide = !hide">
      <label class="custom-control-label" for="hideTasks">Hide done tasks</label>
      </div>

    <div class="row">
    <template v-for="task in tasks">
      <div class="col-lg-4 col-md-6 mb-3" v-if="(!hide && !task.status)|| (!hide && task.status) || (hide && !task.status)">
        <div class="card card-image task" :style="{'background-image':'url(http://placeimg.com/501/400/'+task.id+')'}">
        <template v-if="task.author === currentUser.email">
          <button class="btn btn-sm btn-danger btn--delete" v-on:click="showDeletePopup(task.id, task.name)">Delete</button>
        </template>
          <div class="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4 justify-content-center">
            <div v-bind:class="{done: task.status}">
              <h5 class="task__status" v-if="task.status">
                Done 
              </h5>
              <h5 class="task__status" v-else>
              NOT Done
              </h5>
              <h3 class="card-title pt-2 task__name">
                <strong>{{ task.name }}</strong>
              </h3>
              <p class="task__desc">
                {{ task.description }}
              </p>
              <template v-if="task.author === currentUser.email">
                <button class="btn btn-uhe btn-action" v-if="task.status" v-on:click="changeStatus(task.id, 0)">Undo</button>
                <button class="btn btn-uhe btn-action" v-else v-on:click="changeStatus(task.id, 1)">Done</button>
              </template>
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


export default {
  data() {
    return {
      tasks: [],
      hide: 0,
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
      tasks: db.collection('tasks').orderBy('createdAt')
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/showTasks.scss";
</style>


