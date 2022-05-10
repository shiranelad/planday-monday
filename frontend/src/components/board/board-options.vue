<template>
  <div class="board-options">
    <div class="input-container">
      <label
        class="remove"
        for="remove-board"
        @click="setUpdateValue('remove')"
      >
        Remove Board</label
      >
    </div>
    <div class="input-container">
      <label
        class="duplicate"
        for="duplicate-board"
        @click="setUpdateValue('duplicate')"
      >
        Duplicate Board
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'board-options',
  emits: ['setBoardUpdate'],
  data() {
    return {
      optionsValue: '',
    }
  },

  methods: {
    setUpdateValue(val) {
      this.$emit('setBoardUpdate', val)
    },
  },
}
</script>

<style></style>
