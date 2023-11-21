<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import Portlet from "../../../components/widgets/Portlet";
import CrudHelper from "../../../helpers/mixen/crudHelper";
import CreatePage from "../../../components/general/createPage";
import SearchPage from "../../../components/general/searchPage";
import TableCustom from "../../../components/general/tableCustom";
import Status from "./status";

/**
 * Starter component
 */
export default {
  head() {
    return {
      title: `${this.title} | Minton - Nuxtjs Responsive Admin Dashboard Template`,
    };
  },
  mixins: [CrudHelper],
  data() {
    return {
      url: '/status',
      tableSetting: [
        {label: 'Name',isV: 'name', type: 'string'},
        {label: 'Status',isV: 'status', type: 'boolean',}
      ],
      title: "Status",
      tableTitle: 'Status',
      items: [
        {
          text: "Minton",
          href: "/",
        },
        {
          text: "Pages",
          href: "/",
        },
        {
          text: "Starter",
          active: true,
        },
      ],
    };
  },
  components: {
    Layout,
    PageHeader,
    Portlet,
    CreatePage,
    SearchPage,
    TableCustom,
    Status
  },
  mounted() {
    this.getDate(1,this.url);
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">

            <!-- start -->
            <CreatePage
                :createPermission="hasPermission('status create')"
            />
            <!-- end -->

            <!--  create   -->
            <Status
                :url="url"
                :type="type"
                :tables="tables"
                :editId="editId"
                @getData="getDate(1,url)"
                @typeFun="type = 'create'"
            />
            <!--  /create   -->

            <!-- start -->
            <SearchPage
                :tableTitle="tableTitle"
                @perPageFun="numPerPage => perPageFun(numPerPage,url)"
                @searchFun="search => searchFun(search,url)"
            />
            <!-- end -->

            <!-- Table -->
            <TableCustom
                @getData="page => getDate(page,url)"
                @editShow="id => editShow(id)"
                @deleteShow="id => deleteRow(id,url)"
                :dataApi="dataApi"
                :tables="tables"
                :tableTitle="tableTitle"
                :tableSetting="tableSetting"
                :editPermission="hasPermission('status edit')"
                :deletePermission="hasPermission('status delete')"
            />
            <!-- Table -->

          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
