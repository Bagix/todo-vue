<template>
  <div id="add-task">
    <button class="close btn-close" v-on:click="hideTaskForm"><span aria-hidden="true">×</span></button>
    <div class="md-form input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text md-addon" id="inputGroupMaterial-sizing-default">Task Name</span>
      </div>
      <input type="text" class="form-control" v-model="task.name">
    </div>
    <div class="md-form input-group">
      <div class="input-group-prepend">
        <span class="input-group-text md-addon">Task Description</span>
      </div>
      <textarea class="md-textarea form-control" v-model="task.description"></textarea>
    </div>

    <button type="button" v-on:click="saveTask" class="col-md-12 btn btn--save">Save</button>
  </div>
</template>

<script>
import { db } from "../main"
import { bus } from '../main'

export default {
  data() {
    return {
      task: {
        name: "",
        description: "",
        status: 0
      }
    }
  },
    computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  methods: {
    saveTask: function() {
      this.task.author = db.doc("users/" + this.currentUser.uid)
      this.task.createdAt = new Date();
      db.collection("tasks").add(this.task).then(() => {
        this.task.name = ""
        this.task.description = ""
        bus.$emit("showTaskPop", 0);
      });
    },
    hideTaskForm: function() {
      bus.$emit("showTaskPop", 0);
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/components/addTask.scss";
</style>
