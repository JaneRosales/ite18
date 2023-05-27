<template>
  <div>
    <div class="bg-gray-800 py-4 px-4">
      <NuxtLink class="text-white p-2 hover:bg-gray-700" to="/">Home</NuxtLink>
    </div>
    <div class="max-w-md w-full mx-auto mt-8">
      <h1 class="text-3xl font-extrabold mb-4">Welcome, {{ user && user.name ? user.name : 'User' }}!</h1>
      <p class="mb-6">You are now logged in.</p>
      <button
        class="
          text-white
          bg-red-700
          hover:bg-red-800
          focus:ring-4 focus:outline-none focus:ring-red-300
          font-medium
          rounded-lg
          text-sm
          px-5
          py-2.5
          text-center
        "
        @click="logout"
      >
        Sign Out
      </button>
    </div>
  </div>
</template>
  
<script>
export default {
  auth: 'user',
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push('/'); // Redirect to the home page after logging out
    },
  },
};
</script>
