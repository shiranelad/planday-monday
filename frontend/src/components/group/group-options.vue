<template>
  <div class="group-options">
    <div class="input-container">
      <label for="remove">
        Remove Group
        <input
          class="d-none"
          @change="setUpdateValue(optionsValue)"
          type="radio"
          name="options"
          id="remove"
          value="remove"
          v-model="optionsValue"
        />
      </label>
    </div>
    <div class="input-container">
      <label for="duplicate">
        Duplicate Group
        <input
          class="d-none"
          @change="setUpdateValue(optionsValue)"
          type="radio"
          name="options"
          id="duplicate"
          value="duplicate"
          v-model="optionsValue"
        />
      </label>
    </div>
    <div class="input-container color-input flex">
      <input
        @change="setUpdateValue(newColor)"
        type="color"
        name="options"
        id="color"
        v-model="newColor"
      />
      <label for="color">Change Group Color</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'group-options',
  emits: ['update'],
  props: {
    groupColor: String,
  },
  data() {
    return {
      optionsValue: '',
      newColor: null
    }
  },
  mounted(){
    this.newColor = this.groupColor
  },
  methods: {
    setUpdateValue(val) {
      this.optionsValue = val
      this.$emit('update', this.optionsValue)
    },
  },
}
</script>

<style></style>
