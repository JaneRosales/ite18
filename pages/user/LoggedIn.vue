<template>
  <div>
    <div class="bg-gray-800 py-4 px-4">
      <NuxtLink class="text-white p-2 hover:bg-gray-700" to="/">Home</NuxtLink>
    </div>
    <div class="max-w-md w-full mx-auto mt-8">
        <h1 class="text-3xl font-extrabold mb-4">Your profile</h1>
        <form @submit.prevent="userLogin">
          <div class="mb-6">
            <label
              for="email"
              class="
                block
                mb-2
                text-sm
                font-medium
                text-gray-900
                dark:text-gray-300
              "
              >Your email</label
            >
            <input
              type="email"
              class="
                mb-6
                bg-gray-100
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                p-2.5
                cursor-not-allowed
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-500
                dark:text-gray-500
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
              :value="loggedInUser.email"
              disabled
            />
          </div>
          <div class="mb-6">
            <label
              for="username"
              class="
                block
                mb-2
                text-sm
                font-medium
                text-gray-900
                dark:text-gray-300
              "
              >Your username</label
            >
            <input
              type="text"
              class="
                mb-6
                bg-gray-100
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                p-2.5
                cursor-not-allowed
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-500
                dark:text-gray-500
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
              "
              :value="loggedInUser.username"
              disabled
            />
          </div>
        </form>
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
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['loggedInUser']),
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push('/'); // Redirect to the home page after logging out
    },
  },
};
</script>
