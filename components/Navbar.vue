<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="navbar bg-blue-800 py-4 px-4">
    <NuxtLink class="text-white p-2 hover:bg-gray-700" to="/">Home</NuxtLink>
    <NuxtLink v-if="!isAuthenticated" class="text-white p-2 hover:bg-gray-700" to="/user/login">Sign In</NuxtLink>
    <NuxtLink v-if="!isAuthenticated" class="text-white p-2 hover:bg-gray-700" to="/user/register">Sign Up</NuxtLink>
    <NuxtLink v-if="isAuthenticated" class="text-white p-2 hover:bg-gray-700" to="/user/loggedin">Profile</NuxtLink>
    <button v-if="isAuthenticated" class="text-white p-2 hover:bg-red-700" @click="userLogout">Sign Out</button>
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
      try {
        await this.$auth.logout()
        // Perform any additional actions after successful logout
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error occurred during logout:', error)
      }
    },
  },
}
</script>

<style>
.navbar {
  height: 60px; /* Adjust the height as needed */
  display: flex;
  align-items: center;
}
</style>