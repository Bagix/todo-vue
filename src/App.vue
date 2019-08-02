<template>
  <div class="container container--lg mt-5">
    <add-task ></add-task>
    <show-tasks></show-tasks>
    <delete-popup></delete-popup>
  </div>
</template>

<script>
import addTask from "./components/addTask.vue";
import showTasks from "./components/showTasks.vue";
import deletePopup from "./components/deletePopup.vue";

export default {
  components: {
    "add-task": addTask,
    "show-tasks": showTasks,
    "delete-popup": deletePopup,
  },
  data() {
    return {

    }
  },

}
</script>

<style lang="scss">
@import "@/styles/global.scss";
</style>
