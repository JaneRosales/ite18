<template>
  <div class="container">
    <div class="wave" :style="{ top: mouseY + 'px', left: mouseX + 'px' }"></div>
    <!-- Content goes here -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      mouseX: 0,
      mouseY: 0
    };
  },
  mounted() {
    window.addEventListener('mousemove', this.updateMousePosition);
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.updateMousePosition);
  },
  methods: {
    updateMousePosition(event) {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    }
  }
};
</script>


<style scoped>
.container {
  position: relative;
  height: 100vh;
  background-color: #ffffff; /* Blue color */
  overflow: hidden;
}

.wave {
  position: absolute;
  pointer-events: none;
  width: 200px;
  height: 200px;
  background-color: #0975e0; /* Light blue color */
  border-radius: 50%;
  opacity: 0.5;
  transform: translate(-50%, -50%) scale(0);
  animation: waveAnimation 1s linear infinite;
}

@keyframes waveAnimation {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.2;
  }
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}
</style>

