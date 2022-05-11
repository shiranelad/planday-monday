<template>
  <section class="task-options">
    <div class="input-container">
      <label for="remove">
        Remove Task
        <input
          class="d-none"
          @change="removeTask"
          type="radio"
          name="options"
          id="remove"
          value="remove"
          v-model="optionsValue"
        />
      </label>
    </div>
    <!-- 
      <select>
          <option>Rename Task</option>
          <option>Copy</option>
          <option>Delete</option>
      </select> -->
  </section>
</template>

<script>
export default {
  // props: [''],
  name: "task-options",
  components: {},
  created() {},
  data() {
    return {
      optionsValue: "",
    };
  },
  methods: {
    removeTask(){
      this.$emit('removeTask');
    }
  },
  computed: {},
  unmounted() {},
};
</script>
