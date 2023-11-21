<template>
  <div class="row mb-2">
    <div class="col-sm-6">
      <b-button
          variant="primary"
          @click.prevent="$bvModal.show(`create`);"
          v-if="isCreate && createPermission"
      >
        Add
        <i class="mdi mdi-plus-circle mr-1"></i>
      </b-button>
    </div>
    <!-- end col-->
  </div>
</template>

<script>
export default {
  name: "searchPage",
  props: {
    isCreate: {default: true},
    createPermission: {default: true},
  }
}
</script>

<style scoped>

</style>