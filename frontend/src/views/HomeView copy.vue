<template>
  <div class="home-wrapper">
    <div class="bulbs-container">
      <div class="bulb red"></div>
      <div class="bulb yellow"></div>
      <div class="bulb green"></div>
    </div>
    <div class="welcome flex shadow-drop-2-center">
      <h1>Welcome to <span class="name">PlanDay</span></h1>
      <h4 class="subtitle">
        A collaboration system to run projects and workflows with confidence.
      </h4>
      <p>Start planning today, by creating or choosing a board on the left</p>
      <div class="links-container flex">
        <span class="go-to">Go-to demo </span>

        <a
          class="go-to"
          target="blank"
          href="https://github.com/tal0311/finalsprint-funday"
          >See the code</a
        >
      </div>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: 'homePage',

  data() {
    return {}
  },
  computed: {
    changeSize() {
      var size = Math.floor(Math.random() * 200)
      console.log(size, size + 100)
      return size
    },
  },
}
</script>

<style></style>
