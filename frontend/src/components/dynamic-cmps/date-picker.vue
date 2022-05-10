<template>
  <div class="block">
    <el-date-picker
      v-model="taskDate"
      type="date"
      @change="setDate"
    />
  </div>
</template>
<script>
export default {
  name: 'date-picker',
  emits: ['add', 'remove', 'update-date', 'update-priority', 'updateTask'],
  props: {
    task: Object,
    group: Object,
    value: String,
    boardMembers: Object
  },
  data() {
    return {
      taskDate: null,
    }
  },
  methods: {
    setDate() {
      const currTask = JSON.parse(JSON.stringify(this.task))
      currTask.cols[2].value = this.taskDate
      this.$emit('update-date', currTask)
    },
  },

  created() {
    this.taskDate = this.task.cols[2].value
  },
}
</script>
<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: unset !important;
  border: none !important;
}
</style>

// .demo-date-picker { // display: flex; // width: 100%; // height: 100%; //
padding: 0; // flex-wrap: wrap; // opacity: 0; // } // .demo-date-picker .block
{ // text-align: center; // border-right: solid 1px var(--el-border-color); //
flex: 1; // } // .demo-date-picker .block:last-child { // border-right: none; //
} // .demo-date-picker .demonstration { // display: block; // color:
var(--el-text-color-secondary); // font-size: 14px; // margin-bottom: 20px; // }
// .actual-date { // position: absolute; // }
