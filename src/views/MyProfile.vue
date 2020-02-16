<template>
  <div id="my-profile">
    <top-nav></top-nav>
    <section class="container mt-5">
      <user-info></user-info>
    </section>
  </div>
</template>

<script>

import { fireAuth } from '../main'
import topNav from '@/components/topNav.vue'
import userInfo from '@/components/UserInfo.vue'

export default {
    components: {
    "top-nav": topNav,
    "user-info": userInfo,
  },
}
</script>
