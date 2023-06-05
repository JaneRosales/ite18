<template>
  <div class="bg-blue-200">
    <Navbar />
    <ImgCarousel />

    <!-- Features -->
    <div class="container mx-auto py-8 px-4">
      <h2 class="text-3xl font-bold text-gray-800 mb-4 text-center">Features</h2>
      <div class="flex flex-wrap justify-center">
        <div class="w-full md:w-1/3 px-4 mb-8">
          <div class="bg-white rounded-lg shadow-lg">
            <img class="w-full h-48 object-cover object-center rounded-t-lg" src="ninja.png">
            <div class="px-4 py-4">
              <h3 class="text-gray-800 font-bold text-xl mb-2 text-center">Search A City</h3>
              <p class="text-gray-600 text-base text-center">Display Information About a City</p>
              <nuxt-link
                class="
                  block
                  mt-4
                  rounded-full
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
                to="/city"
              >
                Use Feature
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 mb-8">
          <div class="bg-white rounded-lg shadow-lg">
            <img class="w-full h-48 object-cover object-center rounded-t-lg" src="strapi.png">
            <div class="px-4 py-4">
              <h3 class="text-gray-800 font-bold text-xl mb-2 text-center">Add A Place</h3>
              <p class="text-gray-600 text-base text-center">Add Information About a Place</p>
              <nuxt-link
                class="
                  block
                  mt-4
                  rounded-full
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
                to="/place"
              >
                Use Feature
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MyFooter />
  </div>
</template>
