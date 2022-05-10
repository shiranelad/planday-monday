<template>
<!-- MEMBER PICKER COMPONENT -->
  <div class="member-picker">
    <ul v-if="value.length" class="members-container clean-list flex">
      <li
        @click="updateMemberList"
        v-for="member in value"
        :key="member.id"
        class="member flex"
        :style="{ backgroundColor: member.color }"
      >
        <img class="member-img" :src="member.imgUrl" :alt="member.fullname" />
      </li>
    </ul>
    <div v-else @click="updateMemberList" class="no-member-container flex">
      <img
        class="no-member"
        src="https://cdn.monday.com/icons/dapulse-person-column.svg"
        alt="no member"
      />
    </div>
  </div>



  <div v-if="updateMember" class="update-members">
    <members-modal
      :task="task"
      :members="value"
      :boardMembers="boardMembers"
      @removeMember="removeMember"
      @addMember="addMember"
      @close="updateMemberList"
    />
  </div>
</template>

<script>

import miniMember from '../mini-member.vue'
import membersModal from './../members-modal.vue'
export default {
  name: 'memberPicker',
  emits: ['add', 'remove', 'update-priority', 'update-date','updateTask'],
  props: {
    value: Array,
    group: Object,
    task: Object,
    boardMembers: Array
  },

  components: {
    miniMember,
    membersModal,
  },
  data() {
    return {
      isMiniMember: false,
      updateMember: false,
    }
  },
  methods: {
    displayMini() {
      this.isMiniMember = !this.isMiniMember
    },

    updateMemberList() {
      this.updateMember = !this.updateMember
    },
    removeMember(task, member) {
      this.$emit('remove', task, member)
    },
    addMember(task, member) {
      // console.log('memberName', memberName);
      this.$emit('add', task, member)
    },
  },
}
</script>

<style></style>
