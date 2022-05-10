<template>
  <section>
    <div>
      <p>{{ member.username.substring }}</p>
      <div class="member-info">
        <div>{{ member.username }}</div>
        <span>🌦</span> <time datetime="">{{ getTime }}</time>
        <address>some address</address>
      </div>
      <div class="contact-details">
        <button>contact Details</button>
        <button>ask for update</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'mini-member',
  props: {
    member: Object,
  },
  computed: {
    getTime() {
      return new Date().getTime()
    },
  },
}
</script>

<style></style>
