<template>
  <div id="my-profile">
    <top-nav></top-nav>
    <transition name="expand">
      <div class="task-window" v-if="showAddTask">
        <add-task></add-task>
      </div>
    </transition>
    <section class="container mt-5">
      <transition name="slideInUp">
        <user-info v-show="loaded"></user-info>
      </transition>
    </section>
  </div>
</template>

<script>

import { fireAuth } from '../main'
import { bus } from '../main'
import topNav from '@/components/topNav.vue'
import userInfo from '@/components/UserInfo.vue'
import addTask from '@/components/addTask.vue'

export default {
    components: {
    "top-nav": topNav,
    "user-info": userInfo,
    "add-task": addTask,
  },
  data() {
    return {
      showAddTask: 0,
      loaded: 0
    }
  },
  created() {
    bus.$on("showTaskPop", () => this.showAddTask = !this.showAddTask)
  },
  mounted() {
    this.loaded = 1
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/views/profile.scss";
</style>
