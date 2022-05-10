<template>
  <!-- TASK-PREVIEW COMPONENT -->
  <div class="task-preview flex" @mouseleave="delHover = false">
    <div
      class="btn-remove-task btn"
      @mouseover="delHover = true"
      @mouseleave="delHover = false"
      @click="removeTask"
      :class="{
        'btn-remove-task': delHover,
        'btn-remove-task-hidden': !delHover,
      }"
    >
      <i class="fa fa-caret-down"></i>
    </div>
    <div class="task-left-side sticky">
      <div
        class="side-indicator"
        @click="setIsOptions"
        :style="{ backgroundColor: groupColor }"
      ></div>
      <span
        class="title-chat flex space-between"
        @click.stop="openTaskDetails"
        @mouseover=";[(taskHover = true), (delHover = true)]"
        @mouseleave="taskHover = false"
      >
        <div class="title-edit">
          <div
            :class="{
              'mark-outline': editHover,
              'task-title': !editHover,
              'bgc-white': focus,
            }"
            class="task-title"
            contenteditable="true"
            ref="title"
            @blur="updateTask(task, $event)"
            @keydown.enter="updateTask(task, $event)"
          >
            {{ task.title }}
          </div>
          <span>
            <button
              class="edit"
              @mouseover="editHover = true"
              @mouseleave="editHover = false"
              @click.prevent.stop="editTaskTitle"
              :class="{ 'd-none': !taskHover }"
            >
              Edit
            </button>
          </span>
        </div>
        <span class="chat">
          <span class="comments-indicator" v-if="task.comments?.length"
            >{{ task.comments.length }}
          </span>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            width="24"
            height="24"
            aria-hidden="true"
            :class="[
              task.comments?.length > 0
                ? ['on', 'chat-without-update']
                : 'chat-without-update',
            ]"
          >
            <path
              d="M10.4339 1.94996C11.5976 1.94797 12.7458 2.21616 13.7882 2.7334C14.8309 3.25083 15.7393 4.00335 16.4416 4.93167C17.144 5.85999 17.6211 6.93874 17.8355 8.08291C18.0498 9.22707 17.9956 10.4054 17.6769 11.525C17.3583 12.6446 16.7839 13.6749 15.9992 14.5347C15.2145 15.3945 14.2408 16.0604 13.1549 16.4797C12.069 16.8991 10.9005 17.0605 9.7416 16.9513C8.72154 16.8552 7.7334 16.5518 6.83723 16.0612L4.29494 17.2723C3.23222 17.7785 2.12271 16.6692 2.62876 15.6064L3.83948 13.0636C3.26488 12.0144 2.94833 10.8411 2.91898 9.64114C2.88622 8.30169 3.21251 6.97789 3.86399 5.8071C4.51547 4.63631 5.4684 3.66119 6.62389 2.98294C7.77902 2.30491 9.09451 1.94825 10.4339 1.94996ZM10.4339 1.94996C10.4343 1.94996 10.4348 1.94996 10.4352 1.94996L10.4341 2.69996L10.4327 1.94996C10.4331 1.94996 10.4335 1.94996 10.4339 1.94996ZM13.1214 4.07707C12.2868 3.66289 11.3673 3.44821 10.4355 3.44996L10.433 3.44996C9.36086 3.44842 8.30784 3.73382 7.38321 4.27655C6.45858 4.81929 5.69605 5.59958 5.17473 6.53645C4.65341 7.47332 4.39232 8.53263 4.41853 9.60446C4.44475 10.6763 4.75732 11.7216 5.32382 12.6318C5.45888 12.8489 5.47411 13.1197 5.36422 13.3505L4.28601 15.615L6.55002 14.5365C6.78078 14.4266 7.05164 14.4418 7.26869 14.5768C8.05992 15.0689 8.95463 15.3706 9.88231 15.458C10.81 15.5454 11.7453 15.4161 12.6145 15.0805C13.4838 14.7448 14.2631 14.2118 14.8913 13.5236C15.5194 12.8353 15.9791 12.0106 16.2342 11.1144C16.4893 10.2182 16.5327 9.27499 16.3611 8.35913C16.1895 7.44328 15.8076 6.57978 15.2454 5.8367C14.6832 5.09362 13.9561 4.49125 13.1214 4.07707Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
            <path
              :class="task.comments?.length > 0 ? 'd-none' : ''"
              d="M11.25 6.5C11.25 6.08579 10.9142 5.75 10.5 5.75C10.0858 5.75 9.75 6.08579 9.75 6.5V8.75H7.5C7.08579 8.75 6.75 9.08579 6.75 9.5C6.75 9.91421 7.08579 10.25 7.5 10.25H9.75V12.5C9.75 12.9142 10.0858 13.25 10.5 13.25C10.9142 13.25 11.25 12.9142 11.25 12.5V10.25H13.5C13.9142 10.25 14.25 9.91421 14.25 9.5C14.25 9.08579 13.9142 8.75 13.5 8.75H11.25V6.5Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </span>
      </span>
    </div>
    <div class="task-right-side flex">
      <!-- DYNAMIC COMPONENT -->
      <div
        :class="[cmp.type, 'dyn-cmp flex']"
        v-for="(cmp, idx) in task.cols"
        :key="idx"
      >
        <component
          v-if="task"
          :is="cmp.type"
          :task="task"
          :value="cmp.value"
          :group="group"
          :boardMembers="currBoardMembers"
          @add="addMember"
          @remove="removeMember"
          @update-date="setDate"
          @update-priority="setPriority"
          @updateTask="setStatus"
        />
      </div>

      <div class="right-indicator"></div>
    </div>
  </div>
</template>

<script>
import memberPicker from '../dynamic-cmps/member-picker.vue'
import datePicker from '../dynamic-cmps/date-picker.vue'
import statusPicker from './../dynamic-cmps/status-picker.vue'
import priorityPicker from '../dynamic-cmps/priority-picker.vue'
import taskOptions from './task-options.vue'

export default {
  name: 'task-preview',
  emits: ['updateTask', 'add', 'remove'],
  props: {
    task: Object,
    groupColor: String,
    group: Object,
  },
  components: {
    datePicker,
    memberPicker,
    statusPicker,
    taskOptions,
    priorityPicker,
  },

  data() {
    return {
      isOptions: false,
      editHover: false,
      taskHover: false,
      delHover: false,
      focus: false,
    }
  },
  methods: {
    addMember(task, memberToAdd) {
      task = JSON.parse(JSON.stringify(task))
      const board = this.$store.getters.currBoard
      const member = board.members.find((curr) => curr.id === memberToAdd.id)
      task.cols[1].value.push(member)
      this.$store.dispatch({
        type: 'updateTask',
        groupId: this.group.id,
        task,
      })
    },
    removeMember(task, member) {
      task = JSON.parse(JSON.stringify(task))
      const idx = task.cols[1].value.findIndex((curr) => curr.id === member.id)
      task.cols[1].value.splice(idx, 1)
      this.$store.dispatch({
        type: 'updateTask',
        groupId: this.group.id,
        task,
      })
    },
    setStatus(status, task) {
       const board = this.$store.getters.currBoard
       task.cols[0].value = status
       this.$store.dispatch({
        type: 'updateTask',
        groupId: this.group.id,
        task: this.task,
      })
      
    },
    setIsOptions() {
      this.isOptions = !this.isOptions
    },
    async updateTask(newTask, $event) {
      // console.log('updateTask:', newTask)
      this.focus = false
      const task = JSON.parse(JSON.stringify(newTask))
      task.title = $event.target.innerText
      // console.log('updateTask:', task)
      await this.$store.dispatch({
        type: 'updateTask',
        groupId: this.group.id,
        task,
      })
    },
    async removeTask() {
      const taskToDelete = this.task
      const board = this.$store.getters.currBoard
      // const { boardId, groupId, task } = await this.$store.dispatch({
      //   type: "findTask",
      //   boardId: board._id,
      //   taskId: taskToDelete.id,
      // });
      await this.$store.dispatch({
        type: 'removeTask',
        boardId: board._id,
        groupId: this.group.id,
        task: taskToDelete,
      })
      this.$emit('updateTask')
    },
    editTaskTitle() {
      this.focus = true
      this.$refs.title.focus()
    },
    openTaskDetails() {
      this.$store.commit({ type: 'setTaskToShow', task: this.task })
    },

    setDate(currTask) {
      this.$store.dispatch({
        type: 'updateTask',
        groupId: this.group.id,
        task: currTask,
      })
    },
    setPriority(task, groupId) {
      this.$store.dispatch({
        type: 'updateTask',
        groupId,
        task,
      })
    },
  },
  computed: {
    currBoardMembers() {
      return this.$store.getters.currBoard.members
    },
  },
}
</script>

<style></style>
