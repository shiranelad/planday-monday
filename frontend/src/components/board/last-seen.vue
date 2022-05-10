<template>
  <div class="member-picker">
    <ul class="members-container clean-list flex">
      <li v-for="member in members" :key="member.id" class="member">
         <img  class="member-img" :src="member.imgUrl" :alt="member.fullname" />
      
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'last-seen',
  props: {
    members: Array,
  },
}
</script>

<style>

</style>
