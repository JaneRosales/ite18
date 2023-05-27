<template>
  <div>
    <Navbar />
    <nuxt />
    <div>
      <figure class="carousel">
          <div class="overlay">Travel & Adventure</div>
          <img class="myslide w-screen object-cover object-center image-margin" src="img1.jpg">
          <img class="myslide w-screen object-cover object-center image-margin" src="img2.jpg">
          <img class="myslide w-screen object-cover object-center image-margin" src="img.jpg">
          <img class="myslide w-screen object-cover object-center image-margin" src="img3.jpg">
        </figure>
        <div class="container mx-auto py-8 px-4">
          <h2 class="text-3xl font-bold text-gray-800 mb-4 text-center">Tourist Spots</h2>

          <div class="flex flex-wrap -mx-2">
            <div class="w-full md:w-1/3 px-2">
              <div class="bg-white rounded-lg shadow-lg">
                <img class="w-full h-64 object-cover object-center rounded-t-lg" src="gg.jpg">
                <div class="px-4 py-2">
                  <h3 class="text-gray-800 font-bold text-xl mb-2">Golden Gate Bridge</h3>
                  <p class="text-gray-600 text-base">San Francisco, California</p>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-2">
              <div class="bg-white rounded-lg shadow-lg">
                <img class="w-full h-64 object-cover object-center rounded-t-lg" src="gg2.jpg">
                <div class="px-4 py-2">
                  <h3 class="text-gray-800 font-bold text-xl mb-2">Eiffel Tower</h3>
                  <p class="text-gray-600 text-base">Paris, France</p>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-2">
              <div class="bg-white rounded-lg shadow-lg">
                <img class="w-full h-64 object-cover object-center rounded-t-lg" src="gg3.jpeg">
                <div class="px-4 py-2">
                  <h3 class="text-gray-800 font-bold text-xl mb-2">Grand Canyon</h3>
                  <p class="text-gray-600 text-base">Arizona, United States</p>
                </div>
              </div>
            </div>
          </div>
      </div>
      <footer class="bg-gray-800 text-gray-100 py-4">
        <div class="container mx-auto px-4">
          <p class="text-center">&copy; 2023 Travel&Adventure</p>
        </div>
      </footer>
    </div>
  </div>    
</template>

<script>
export default {
  mounted() {
    // Automatic Slideshow - change image every 3 seconds
    let myIndex = 0;
    carousel();

    function carousel() {
      let i;
      const x = document.getElementsByClassName("myslide");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      myIndex++;
      if (myIndex > x.length) {myIndex = 1}
      x[myIndex-1].style.display = "block";
      setTimeout(carousel, 3000);
    }
  }
}
</script>

<style>
.carousel {
  position: relative;
  height: 50vh;
  width: 100%;
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px #000;
  z-index: 1;
}

.myslide {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

</style>

</script>