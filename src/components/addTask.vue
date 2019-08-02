<template>
  <div id="add-task" class="row">
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

    <button type="button" v-on:click="saveTask" class="col-md-12 btn btn-primary btn--save">Save</button>
  </div>
</template>

<script>
import { db } from "../main"

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
  methods: {
    saveTask: function() {
     /* this.$http.post("https://todo-app-a0fc8.firebaseio.com/tasks.json", this.task).then(function(data) {
        this.$emit("refreshTasks");
        console.log(data);
      });*/
      this.task.createdAt = new Date();
      db.collection("tasks").add(this.task).then(function(data) {
        this.task.name = ""
        this.task.description = ""
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/components/addTask.scss";
</style>
