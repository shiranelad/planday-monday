<template>
  <section class="inline-task flex">
    <div class="si-left sticky" :style="{ backgroundColor: groupColor }">1</div>
    <div class="add-task">
      <input
        type="text"
        @focus="isOnFocus = true"
        @blur="isOnFocus = false"
        @keydown.enter="addTask"
        v-model="value"
        placeholder="+ Add task"
      />
      <!-- <button v-show="isOnFocus" :class="addFocus" @mousedown="addTask">
        add
      </button> -->
    </div>
    <div class="si-right">2</div>

    <!-- <button :class="addFocus" @click="addTask">ok</button> -->
  </section>
</template>

<script>
export default {
  name: 'newInlineTask',
  emits: ['add-task'],
  props: { groupColor: String },
  created() {
    
  },
  data() {
    return {
      value: '',
      isOnFocus: true,
    }
  },
  methods: {
    add() {
      this.isOnFocus = false
      // console.log('ok')
    },
    addTask() {
      // console.log(this.value)
      this.$emit('add-task', this.value)
      this.isOnFocus = false
    },
  },
  computed: {
    addFocus() {
      return this.isOnFocus ? 'focused' : ''
    },
  },
}
</script>

<style></style>
