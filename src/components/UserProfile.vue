<template>
  <div id="profile">

  </div>
</template>

<script>
import { fireAuth } from '../main'
import { db } from '../main'


export default {
  data() {
    return {
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser
    }
  },
}
</script>

<style lang="scss" scoped>

</style>