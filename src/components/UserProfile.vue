<template>
  <div id="user-profile" class="col-md-6 m-auto">
    <div class="card">
      <div class="card-body">
        <p class="h4 text-center py-4">User Info</p>
        <div class="user-image">
          <img class="avatar" v-if="user.avatar" v-bind:src="user.avatar">
          <div v-else class="avatar-placeholder">
            <font-awesome-icon icon="user" size="3x" />
          </div>
        </div>
        <div class="user-info">
          <p>{{user.first_name}}</p>
          <p>{{user.last_name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fireAuth } from '../main'
import { db } from '../main'


export default {
  data() {
    return {
      id: this.$route.params.id,
      user: {}
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser
    }
  },
  firestore () {
    return {
      user: db.collection('users').doc(this.id)
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "@/styles/components/userProfile.scss";
</style>