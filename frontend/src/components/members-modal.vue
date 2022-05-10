<template>
  <div class="member-modal">
    <button @click="closeModal" class="close-btn">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="members-at-task">
      <ul class="clean-list">
          <p class="no-members-notification" v-if="members.length===0">Choose member</p>
        <li
          class="member-in-modal flex"
          v-for="(member, index) in members"
          :key="index"
          :style="{ backgroundColor: member.color }"
        >
          <img
            v-if="member.imgUrl"
            class="member-img"
            :src="member.imgUrl"
            :alt="member.fullname"
          />

          <!-- <div v-else class="member-name">
            {{ member.fullname.split(' ')[0] }}
          </div> -->
          <button @click="removeMember(member)" class="remove">X</button>
        </li>
        <div class="member-input flex">
          <!-- <button @click="addMember" class="add">+</button>
          <input type="text" v-model="memberName" placeholder="Member name" /> -->
        </div>
      </ul>
    </div>

    <div class="board-members-wrapper flex">
      <div>
        <ul class="board-members clean-list flex">
          <li
            v-for="(boardMember, idx) in setMembers"
            class="member-in-modal flex"
            :key="idx"
            @click="addMember(boardMember)"
          >
            <img
              v-if="boardMember.imgUrl"
              class="member-img"
              :src="boardMember.imgUrl"
              :alt="boardMember.fullname"
            />
            <p>{{ boardMember.username }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'membersModal',
  emits: ['remove', 'addMember', 'close', 'removeMember'],
  props: {
    members: Array,
    task: Object,
    boardMembers: Array,
  },
  created() {
    this.members.map((member) => {
      var id = member.id
      this.membersIds.push(id)
     
    })
    
  },
  data() {
    return {
      membersIds: [],
    }
  },

  methods: {
    removeMember(member) {
      // console.log('remove')
      this.$emit('removeMember', this.task, member)
    },
    addMember(memberToAdd) {
      this.$emit('addMember', this.task, memberToAdd)
      console.log('member to add:', memberToAdd)
    },
    closeModal() {
      console.log('close')
      this.$emit('close')
    },
  },
  computed: {
    setMembers() {
      return this.boardMembers.filter((boardMember) => {
        return !this.membersIds.includes(boardMember.id)
      })
    },
  },
}
</script>

<style></style>
