<template>
  <div class="bg-blue-300">
    <Navbar />
    <ImgCarousel />

    <!-- Search a City by City API - API Ninjas -->
    <div class="bg-blue-300 container d-flex justify-content-center align-items-center">
      <div class="city-info text-center bg-blue-300">
        <h1 class="font-weight-bold text-3xl font-extrabold mb-4">SEARCH A CITY</h1>
        <form class="search-form" @submit.prevent="fetchCityInfo">
          <div class="input-group mb-3">
            <input
              v-model="cityName"
              type="text"
              placeholder="Enter a city name"
              class="form-control border border-gray-300"
            />
            <button
              type="submit"
              class="
                text-white
                bg-blue-700
                hover:bg-blue-800
                focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium
                rounded-lg
                text-sm
                px-5
                py-2.5
                text-center
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
              "
            >
              Search
            </button>
          </div>
        </form>
        <div v-if="cityData" class="city-details card bg-light mb-4">
          <div class="card-body">
            <p><span class="font-weight-bold">City:</span> {{ cityData.name }}</p>
            <p><span class="font-weight-bold">Latitude:</span> {{ cityData.latitude }}</p>
            <p><span class="font-weight-bold">Longitude:</span> {{ cityData.longitude }}</p>
            <p><span class="font-weight-bold">Country:</span> {{ cityData.country }}</p>
            <p><span class="font-weight-bold">Population:</span> {{ cityData.population }}</p>
            <p><span class="font-weight-bold">Is Capital:</span> {{ cityData.is_capital }}</p>
          </div>
        </div>
        <div v-if="loading" class="loading">Loading...</div>
        <div v-if="error" class="error alert alert-danger mt-4">{{ error }}</div>
      </div>
    </div>

    <!-- Search Results -->
    <div v-if="searchResults && searchResults.length > 0" class="container mt-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">Search Results</h2>
      <div class="grid grid-cols-3 gap-4">
        <div v-for="result in searchResults" :key="result.name" class="bg-blue-100 rounded-lg shadow-lg p-4">
          <p><span class="font-weight-bold">City:</span> {{ result.name }}</p>
          <p><span class="font-weight-bold">Latitude:</span> {{ result.latitude }}</p>
          <p><span class="font-weight-bold">Longitude:</span> {{ result.longitude }}</p>
          <p><span class="font-weight-bold">Country:</span> {{ result.country }}</p>
          <p><span class="font-weight-bold">Population:</span> {{ result.population }}</p>
          <p><span class="font-weight-bold">Is Capital:</span> {{ result.is_capital }}</p>
        </div>
      </div>
    </div>

    <MyFooter />
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityName: "",
      cityData: null,
      loading: false,
      error: null,
      searchResults: [],
    };
  },
  mounted() {
    // Retrieve search results from localStorage if available
    const storedSearchResults = localStorage.getItem("searchResults");
    if (storedSearchResults) {
      this.searchResults = JSON.parse(storedSearchResults);
    }
  },
  methods: {
    fetchCityInfo() {
      if (!this.cityName) {
        return;
      }

      const apiKey = "0Uuz9X0ulyWDbU9tXc81Pg==ejzgb3TayLE5hhKE";

      const url = `https://api.api-ninjas.com/v1/city?name=${encodeURIComponent(this.cityName)}`;

      this.loading = true;
      this.error = null;

      this.$axios
        .get(url, {
          headers: { "X-Api-Key": apiKey },
        })
        .then((response) => {
          if (response.data.length > 0) {
            this.cityData = response.data[0];
            // Add the search result to the list
            this.searchResults.push(response.data[0]);
            // Store search results in localStorage
            localStorage.setItem("searchResults", JSON.stringify(this.searchResults));
          } else {
            this.cityData = null;
            this.error = "City not found";
          }
          this.loading = false;
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error("Error: ", error.response);
          this.error = "An error occurred. Please try again later.";
          this.loading = false;
        });
    },
  },
};
</script>

<style>
.city-info {
  margin-top: 2rem;
}

.search-form {
  margin-bottom: 1rem;
}

.city-details {
  margin-top: 2rem;
}

.font-weight-bold {
  font-weight: bold;
}

.loading {
  margin-top: 1rem;
}

.error {
  margin-top: 1rem;
}

/* Custom styles for shades of blue */
.bg-blue-100 {
  background-color: #ebf8ff;
}

.bg-blue-200 {
  background-color: #bee3f8;
}

.bg-blue-300 {
  background-color: #90cdf4;
}

.bg-blue-400 {
  background-color: #63b3ed;
}

.bg-blue-500 {
  background-color: #4299e1;
}

.bg-blue-600 {
  background-color: #3182ce;
}

.bg-blue-700 {
  background-color: #2b6cb0;
}

.bg-blue-800 {
  background-color: #2c5282;
}

.bg-blue-900 {
  background-color: #2a4365;
}
</style>
