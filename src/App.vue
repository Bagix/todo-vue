<template>
    <router-view/>
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
