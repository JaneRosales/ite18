<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
// frontend/components/Navbar.vue
<template>
  <div class="bg-gray-800 py-4 px-4">
    <NuxtLink class="text-white p-2 hover:bg-gray-700" to="/">Home</NuxtLink>
    <NuxtLink v-if="isAuthenticated" class="text-white p-2 hover:bg-gray-700" to="/user/loggedin">Profile</NuxtLink>
    <NuxtLink
      v-if="!isAuthenticated"
      class="text-white p-2 hover:bg-gray-700"
      to="/user/login"
      >Sign In</NuxtLink
    >
    <NuxtLink
      v-if="!isAuthenticated"
      class="text-white p-2 hover:bg-gray-700"
      to="/user/register"
      >Sign Up</NuxtLink
    >
  
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    async userLogout() {
      await this.$auth.logout()
    },
  },
}
</script>