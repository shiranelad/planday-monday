<template>
  <section class="filter flex">
    <button
      @click="isSearch = !isSearch"
      class="btn search"
      :class="{ 'd-none': isSearch }"
    >
      Search
      <div v-if="setSearch">
        <input @blur="isSearch = false" type="text" name="search" />
      </div>
    </button>
    <input
      type="text"
      class="search"
      v-model="filterBy.title"
      @input="setFilter"
      placeholder="Search..."
      :class="{ 'd-none': !isSearch }"
    />
    <button class="btn person">Person</button>

    <button class="btn filter" @click="showFilter = !showFilter">Filter</button>
    <div class="filter-modal" :class="{'d-none' : !showFilter}">
      <div class="flex col filter-header">Filter</div>
      <hr />
      <div class="flex filter-categories">
        <div>
          <h1>Status</h1>
          <ul class="flex col">
            <li class="done" @click="toggleStatus($event, 'done')">Done</li>
            <li class="working on it" @click="toggleStatus($event, 'working on it')">
              Working on it
            </li>
            <li class="stuck" @click="toggleStatus($event, 'stuck')">Stuck</li>
            <li class="empty" @click="toggleStatus($event,'empty')">Empty</li>
          </ul>
        </div>
        <div>
          <h1>Priority</h1>
          <ul class="flex col">
            <li class="low" @click="togglePriority($event, 'low')">Low</li>
            <li class="medium" @click="togglePriority($event, 'medium')">Medium</li>
            <li class="high" @click="togglePriority($event, 'high')">High</li>
            <li class="empty" @click="togglePriority($event, 'empty')">Empty</li>
          </ul>
        </div>
      </div>
    </div>

    <button class="btn sort">Sort</button>
  </section>
</template>

<script>
export default {
  name: "board-filter",
  emits: ["filter"],
  data() {
    return {
      isSearch: false,
      filterBy: { status: [], priority: [], title: "" },
      setSearch: false,
      showFilter: false,
    };
  },
  methods: {
    setFilter() {
      this.$emit("filter", this.filterBy);
    },

    toggleStatus(ev, value) {
      if (this.filterBy.status.includes(value)) {
        var idx = this.filterBy.status.indexOf(value);
        this.filterBy.status.splice(idx, 1);
      } else {
        this.filterBy.status.push(value);
      }
      ev.target.classList.toggle('chosen')
      this.setFilter();
    },

    togglePriority(ev, value) {
      if (this.filterBy.priority.includes(value)) {
        var idx = this.filterBy.priority.indexOf(value);
        this.filterBy.priority.splice(idx, 1);
      } else {
        this.filterBy.priority.push(value);
      }
      ev.target.classList.toggle('chosen')
      this.setFilter();

    },
  },
  computed: {
    toggleClass(){
      // return { pressed: }
    }
    // setSearch() {
    //   console.log(this.isSearch)
    //   return this.isSearch
    // },
  },
};
</script>

<style></style>
