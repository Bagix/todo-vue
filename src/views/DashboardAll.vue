<template>
  <div id="dashboard-all">
    <top-nav></top-nav>
    <transition name="expand">
      <div class="task-window" v-if="showAddTask">
        <add-task></add-task>
      </div>
    </transition>
    <show-tasks></show-tasks>
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
import showAllTasks from '@/components/showAllTasks.vue'
import topNav from '@/components/topNav.vue'
import addTask from '@/components/addTask.vue'
import deleteTask from '@/components/deletePopup.vue'

export default {
  components: {
    "show-tasks": showAllTasks,
    "top-nav": topNav,
    "add-task": addTask,
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
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/views/dashboard.scss";
</style>


