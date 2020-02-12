<template>
  <div id="my-profile">
    <top-nav></top-nav>
    <h1>My Profile</h1>
  </div>
</template>

<script>

import { fireAuth } from '../main'
import topNav from '@/components/topNav.vue'

export default {
    components: {
    "top-nav": topNav,
  },
}
</script>
