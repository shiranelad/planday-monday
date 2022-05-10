<template>
  <section class="filter flex">
    <!-- <button
      @click="isSearch = !isSearch"
      class="btn search"
      :class="{ 'd-none': isSearch }"
    >
      Search
      <div v-if="setSearch">
        <input
          @enter="setSearchTerm"
          @blur="isSearch = false"
          type="text"
          name="search"
        />
      </div>
    </button>
    <input
      type="text"
      class="search"
      v-model="filterBy"
      @input="onFilter"
      placeholder="Search..."
      :class="{ 'd-none': !isSearch }"
    /> -->
    <button class="btn person">Person</button>

    <button class="btn filter">Filter</button>

    <button class="btn sort">Sort</button>
  </section>
</template>

<script>
export default {
  name: 'board-filter',
  data() {
    return {
      isSearch: false,
      filterBy: '',
      setSearch: false,
    }
  },
  methods: {
    onFilter() {
      console.log(this.filterBy);
      this.$emit("filter", this.filterBy);
    },
  },
  computed: {
    // setSearch() {
    //   console.log(this.isSearch)
    //   return this.isSearch
    // },
  },
}
</script>

<style></style>
