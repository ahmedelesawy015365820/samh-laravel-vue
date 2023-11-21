<template>
  <div class="row mb-2">
    <div class="col-sm-12 col-md-6">
      <div id="tickets-table_length" class="dataTables_length">
        <label class="d-inline-flex align-items-center">
          Display&nbsp;
          <b-form-select
              v-model="perPage"
              size="sm"
              :options="pageOptions"
          ></b-form-select
          >&nbsp;{{ tableTitle }}
        </label>
      </div>
    </div>
    <!-- Search -->
    <div class="col-sm-12 col-md-6">
      <div
          id="tickets-table_filter"
          class="dataTables_filter text-md-right"
      >
        <label class="d-inline-flex align-items-center" v-if="isSearch">
          Search:
          <b-form-input
              v-model="filter"
              type="search"
              placeholder="Search..."
              class="form-control form-control-sm ml-2"
          ></b-form-input>
        </label>
      </div>
    </div>
    <!-- End search -->
  </div>
</template>

<script>
export default {
  name: "searchPage",
  data(){
      return {
        perPage: 15,
        pageOptions: [15,30,60,90],
        filter: ''
      }
  },
  props: {
    tableTitle: {default: ''},
    isSearch: {default: true}
  },
  watch: {
    perPage(after,befour){
      if(this.perPage){
        this.$emit('perPageFun',this.perPage);
      }
    },
    filter(after, befour){
      clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
        this.$emit('searchFun',this.filter);
      }, 700);
    },
  }
}
</script>

<style scoped>

</style>