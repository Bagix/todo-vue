<template>
  <div id="dashboard">
    <top-nav></top-nav>
      <div class="task-window" v-if="showAddTask">
        <add-task></add-task>
      </div>
    <show-tasks></show-tasks>
  </div>
</template>

<script>

import { bus } from '../main'
import { setTimeout } from 'timers';
import { fireAuth } from '../main'
import showTasks from '@/components/showTasks.vue'
import topNav from '@/components/topNav.vue'
import addTask from '@/components/addTask.vue'

export default {
  components: {
    "show-tasks": showTasks,
    "top-nav": topNav,
    "add-task": addTask,
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


