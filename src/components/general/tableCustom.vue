<template>
  <div>
      <!-- Table -->
      <div class="table-responsive mb-0">
        <Portlet :headertitle="tableTitle">
          <div class="card-body pt-0">
            <div class="table-responsive mb-0">
              <table class="table table-hover table-centered mb-0">
                <thead>
                <tr>
                  <th>#</th>
                  <template v-for="item in tableSetting">
                    <th>
                      {{ item.label }}
                    </th>
                  </template>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody v-if="tables.length > 0">
                  <tr v-for="(data,index) in tables" :key="data.id">
                  <td>{{ index + 1 }}</td>
                  <template v-for="item in tableSetting">
                    <td v-if="item.type == 'string'">
                      <h5 class="m-0 font-weight-normal">
                        {{ data[item.isV] }}
                      </h5>
                    </td>
                    <td v-if="item.type == 'relation'">
                      {{
                        data[item.name]
                            ? data[item.name][item.col]
                            : " - "
                      }}
                    </td>
                    <td v-if="item.type == 'relationMany'">
                      <h5 v-if="data[item.name].length > 0" class="m-0 font-weight-normal">
                        <span v-for="(i,index) in data[item.name]" :key="i.id">
                            {{ i[item.col] }}
                        </span>
                      </h5>
                    </td>
                    <td v-if="item.type == 'boolean'">
                      <span
                          :class="[
                              data[item.isV] == 'active' || data[item.isV] == 1
                                ? 'text-success'
                                : 'text-danger',
                              'badge',
                            ]"
                      >
                        {{
                          data[item.isV] == "active" || data[item.isV] == 1
                              ? `Active`
                              : `Inactive`
                        }}
                      </span>
                    </td>
                    <td v-if="item.type == 'boolean1'">
                      <span :class="['text-success','badge']" v-if="data[item.isV] == 1">{{ `Agree` }}</span>
                      <span :class="['text-danger','badge']" v-if="data[item.isV] == 2">{{ `Disagree` }}</span>
                      <span :class="['text-secondary','badge']" v-if="data[item.isV] == 3">{{ `Pending` }}</span>
                    </td>
                   </template>
                  <td>
                    <ul class="list-inline table-action m-0">
                      <li class="list-inline-item" v-if="isEdit && editPermission">
                        <a href="javascript:void(0);" class="action-icon" @click.prevent="$emit('editShow',data.id)">
                          <i class="mdi mdi-square-edit-outline"></i>
                        </a>
                      </li>
                      <li class="list-inline-item" v-if="isDelete && deletePermission">
                        <a href="javascript:void(0);" class="action-icon" @click.prevent="$emit('deleteShow',data.id)">
                          <i class="mdi mdi-delete"></i>
                        </a>
                      </li>
                    </ul>
                  </td>
                </tr>
                </tbody>
                <tbody v-else>
                      <tr>
                          <td class="text-center" colspan="10"> Not Data Found </td>
                      </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Portlet>
      </div>
      <div class="row">
        <div class="col">
          <div
              class="dataTables_paginate paging_simple_numbers float-right"
          >
            <ul class="pagination pagination-rounded">
              <div class="row justify-content-end">
                <Pagination
                    :data="dataApi"
                    @pagination-change-page="page => $emit('getData',page)"
                ></pagination>
              </div>
            </ul>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Portlet from "../widgets/Portlet";

export default {
  name: "tableCustom",
  props: {
    dataApi: {default: {}},
    tables: {default: []},
    tableTitle: {default: ''},
    tableSetting: {default: []},
    isDelete: {default: true},
    isEdit: {default: true},
    editPermission: {default: true},
    deletePermission: {default: true},
  },
  components: {Portlet}
}
</script>

<style scoped>

</style>