<template>
  <section class="activity-log-wrapper">
    <ul class="activity-log clean-list">
      <li class="activity flex" v-for="activity in activities" :key="activity.id">
        <small>{{ activity.createdAt.substring(0,10) }}</small>
        <h4> <span>{{ activity.byMember.substring(0,1) }}</span></h4>
        <p>{{ activity.txt }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'activity-log',
  props: {
    activities: Array,
  },
  created() {
    console.log(this.activities)
  },
 
}
</script>
