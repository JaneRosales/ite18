<template>
  <div>
    <div class="bg-gray-800 py-4 px-4">
      <NuxtLink class="text-white p-2 hover:bg-gray-700" to="/">Home</NuxtLink>
      <NuxtLink v-if="!isAuthenticated" class="text-white p-2 hover:bg-gray-700" to="/user/register">Sign Up</NuxtLink>
    </div>
    <div class="max-w-md w-full mx-auto mt-8">
      <h1 class="text-3xl font-extrabold mb-4">Sign in</h1>
      <form @submit.prevent="userLogin">
        <div v-if="err" class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
          {{ err }}
        </div>
        <div class="mb-6">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
          <input v-model="email" type="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@strapi.io" required>
        </div>
        <div class="mb-6">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
          <input v-model="password" type="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <NuxtLink to="/user/Reset">Reset Password</NuxtLink>
          </p>
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  data() {
    return {
      err: null,
      email: '',
      password: '',
    };
  },
  methods: {
    async userLogin() {
      try {
        await this.$auth.loginWith('local', { // Use 'local' as the provider
          data: { identifier: this.email, password: this.password },
        });
        this.$router.push('/user/loggedin'); // Redirect after successful login
      } catch (e) {
        if (e.response && e.response.data && e.response.data.error) {
          this.err = e.response.data.error.message;
        }
      }
    },
  },
}
</script>
