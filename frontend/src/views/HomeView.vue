<template>
  <div class="main-hp">
    <div class="main-board">
      <div class="title">A platform built for a new way of working</div>
      <p class="description">What would you like to manage with Planday?</p>
      <button class="demo-btn" @click="lastBoard">
        See Demo
        <span class="arrow">
          <svg
            width="10"
            height="14"
            viewBox="0 0 9 7"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.628.616a.5.5 0 1 0-.64.768L6.203 3.23H.5a.5.5 0 0 0 0 1h5.612L3.988 6a.5.5 0 1 0 .64.769l3.23-2.693a.5.5 0 0 0 0-.768L4.628.616z"
            ></path>
          </svg>
        </span>
      </button>
    </div>
    <!-- <picture class="jsx-4212101279 picture-component"> -->
    
      <img @click="lastBoard"
        alt="image"
        class="jsx-4212101279 main-image regular-asset-image"
        src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured images/Home Page - 2022 Rebrand/first_fold/image.png"
        
      />
    <!-- </picture> -->
  </div>
</template>

<script>
export default {
  name: "homePage",

  data() {
    return {};
  },

  methods: {
    lastBoard(){
      this.$router.push(`/board/${this.boards[this.boards.length-1]._id}/`)
    }
  },
  computed: {
        boards(){
      return this.$store.getters.boards;
    }

  },
};
</script>

<style></style>
