<template>
  <div id="show-tasks" class="container">

      <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="hideTasks" v-on:click="hide = !hide">
      <label class="custom-control-label" for="hideTasks">Hide done tasks</label>
      </div>

    <div class="row">
    <template v-for="task in tasks">
      <div :key="task.id" class="col-lg-4 col-md-6 mb-3" v-if="(!hide && !task.status)|| (!hide && task.status) || (hide && !task.status)">
        <div class="card card-image task" :style="{'background-image':'url(http://placeimg.com/501/400/'+task.id+')'}">
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
                <router-link :to="{ name: 'singleTask', params: {id: task.id}}" class="btn btn-uhe btn-action">View</router-link>
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
      tasks: db.collection('tasks').orderBy('createdAt', 'desc')
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/components/showTasks.scss";
</style>


