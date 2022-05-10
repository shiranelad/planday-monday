<template>
<!-- STATUS PICKER COMPONENT -->
  <section @click="toggleShow" :class="statusClass" class="status-picker">
    <div class="status">
      {{ task.cols[0].value === 'empty' ? '&nbsp;' : task.cols[0].value }}
    </div>
    <div v-if="menuOpen" class="picker-box">
      
      <div @click="setStatus('Working on it')" class="working">
        Working on it
      </div>
      <div @click="setStatus('Stuck')" class="stuck">Stuck</div>
      <div @click="setStatus('Done')" class="done">Done</div>
      <div @click="setStatus('empty')" class="empty">&nbsp;</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'status-picker',
  emits: ['updateTask', 'add', 'remove', 'update-date','update-priority' ],
  props: {
    task: Object,
    group: Object,
    boardMembers: Object
  },
  data() {
    return {
      menuOpen: false,
      currStatus: null,
    }
  },
  methods: {
    toggleShow() {
      this.menuOpen = !this.menuOpen
    },
     setStatus(status) {
      // this.$emit('setStatus', status, this.task)
      // const board = this.$store.getters.currBoard
      // const { boardId, groupId, task } = await this.$store.dispatch({
      //   type: "findTask",
      //   boardId: board._id,
      //   taskId: this.task.id,
      // });
      // this.task.cols[0].value = status
      //  this.$store.dispatch({
      //   type: 'updateTask',
      //   groupId: this.group.id,
      //   task: this.task,
      // })
      this.$emit('updateTask', status, this.task)
    },
  },
  computed: {
    statusClass() {
      if (this.task.cols[0].value === 'Working on it') return 'working'
      if (this.task.cols[0].value === '&nbsp;') return 'empty'
      if (this.task.cols[0].value === null) return 'empty'
      if (this.task.cols[0].value === '') return 'empty'
      return this.task.cols[0].value.toLowerCase()
    },
  },
  created() {
    if (!this.task.cols[0].value) this.task.cols[0].value = ''
  },
  components: {},
}
</script>
