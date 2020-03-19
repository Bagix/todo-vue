<template>
  <div id="user-profile">
    <top-nav></top-nav>
    <section class="container mt-5">
      <user-profile></user-profile>
    </section>
  </div>
</template>

<script>

import { fireAuth } from '../main'
import topNav from '@/components/topNav.vue'
import userProfile from '@/components/UserProfile.vue'

export default {
    components: {
    "top-nav": topNav,
    "user-profile": userProfile,
  },
}
</script>
