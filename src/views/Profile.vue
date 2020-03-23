<template>
  <div id="user-profile">
    <top-nav></top-nav>
    <div class="task-window" v-if="showAddTask">
      <add-task></add-task>
    </div>
    <section class="container mt-5">
      <transition name="slideInUp">
        <user-profile v-show="loaded"></user-profile>
      </transition>
    </section>
  </div>
</template>

<script>

import { fireAuth } from '../main'
import { bus } from '../main'
import topNav from '@/components/topNav.vue'
import userProfile from '@/components/UserProfile.vue'
import addTask from '@/components/addTask.vue'

export default {
    components: {
    "top-nav": topNav,
    "user-profile": userProfile,
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