<template>
  <div id="single-task">
    <top-nav></top-nav>
    <div class="task-window" v-if="showAddTask">
      <add-task></add-task>
    </div>
    <section class="container mt-5">
      <single-task></single-task>
    </section>
    <div class="user-popup user-popup--delete" v-if="showDeleteTask" v-bind:class="{show: addShowClass}">
      <delete-task></delete-task>
    </div>
    <div class="shadow-layer" v-if="showDeleteTask" v-bind:class="{show: addShowClass}"></div>
  </div>
</template>

<script>
import { bus } from '../main'
import { setTimeout } from 'timers';
 import { fireAuth } from '../main'
import topNav from '@/components/topNav.vue'
import addTask from '@/components/addTask.vue'
import showSingleTask from '@/components/showSingleTask.vue'
import deleteTask from '@/components/deletePopup.vue'

export default {
  components: {
    "top-nav": topNav,
    "add-task": addTask,
    "single-task": showSingleTask,
    "delete-task": deleteTask,
  },
  data() {
    return {
      showAddTask: 0,
      showDeleteTask: 0,
      addShowClass: 0
    };
  },
  created() {
    bus.$on("showTaskPop", () => this.showAddTask = !this.showAddTask)
    bus.$on("showDeletePopup", (task) => {
      this.showDeleteTask = !this.showDeleteTask
      setTimeout(() => {
        this.addShowClass = !this.addShowClass
        bus.$emit("deletePopup", task)
      }, 250)
    });
    bus.$on("hideDeletePopup", () => {
      this.addShowClass = !this.addShowClass
      setTimeout(() => {
        this.showDeleteTask = !this.showDeleteTask
        bus.$emit("deletePopup", task)
      }, 250)
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/views/singleTask.scss";
</style>


