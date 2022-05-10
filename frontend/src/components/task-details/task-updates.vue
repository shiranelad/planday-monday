<template>
  <section class="task-updates">
    <textarea
      type="text"
      v-model="commentText"
      placeholder="Write an update..."
      @keydown.enter="addTaskComment"
    />
    <div class="activity-action-container flex">
      <button class="update" @mousedown="addTaskComment">Update</button>
    </div>
    <ul v-if="task" class="update-list clean-list">
      <li v-for="(msg, idx) in msgs" :key="idx">
        <div class="user-container flex">
          <!-- <img class="user-img" :src="msg.img" alt="" /> -->
          <h4 class="comment-title">{{ msg.creator }}</h4>
          <div class="online-indicator"></div>
        </div>

        <p>{{ msg.content }}</p>
        <div class="update-actions-container flex">
          <div class="action-container flex">
            <button class="reply">
              <i class="fa-solid fa-reply"></i>
              Reply
            </button>
          </div>
          <div class="action-container flex">
            <button>
              <i class="fa-solid fa-thumbs-up"></i>
              like
            </button>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'task-updates',
  emits: ['addTaskComment', 'updateToSocket'],
  props: {
    msgs: Object,
    task: Object,
    boardMembers: Array,
  },
  data() {
    return {
      commentText: null,
      writing: false,
      BoardNames: [],
      comments: [],
    }
  },
  methods: {
    addTaskComment() {
      this.$emit("updateToSocket", this.commentText);
      this.commentText = null
    },
  },
  
}
</script>
