<template>
  <div>
    <div>
      <figure class="carousel">
        <div class="overlay">Travel & Adventure</div>
        <img class="myslide w-screen object-cover object-center image-margin" src="img1.jpg">
        <img class="myslide w-screen object-cover object-center image-margin" src="img2.jpg">
        <img class="myslide w-screen object-cover object-center image-margin" src="img.jpg">
        <img class="myslide w-screen object-cover object-center image-margin" src="img3.jpg">
      </figure>

    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    let myIndex = 0;
    carousel();

    function carousel() {
      const x = document.getElementsByClassName("myslide");
      if (x.length === 0) return; // Exit if no elements with the 'myslide' class

      for (let i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }

      myIndex++;
      if (myIndex > x.length) {
        myIndex = 1;
      }
      x[myIndex - 1].style.display = "block";
      setTimeout(carousel, 5000);
    }
  },
};
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
