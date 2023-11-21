<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import Portlet from "../../../components/widgets/Portlet";
import ErrorMessage from "../../../components/general/errorMessage";
import CrudHelper from "../../../helpers/mixen/crudHelper";
import CreatePage from "../../../components/general/createPage";
import SearchPage from "../../../components/general/searchPage";
import TableCustom from "../../../components/general/tableCustom";
import Order from "./order";

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
      url: `/order`,
      query: `&user_id=${this.$store.state.auth.user.id}`,
      tableSetting: [
        {label: 'Room',name: 'room',col:'name',isV: 'room_id', type: 'relation',},
        {label: 'Start Date',isV: 'start_date', type: 'string',},
        {label: 'End Date',isV: 'end_date', type: 'string',},
        {label: 'Agree',isV: 'agree', type: 'boolean1',}
      ],
      title: "Order",
      tableTitle: 'Order',
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
    ErrorMessage,
    CreatePage,
    SearchPage,
    TableCustom,
    Order
  },
  mounted() {
    this.getDate(1,this.url,this.query);
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
                :createPermission="hasPermission('order create')"
            />
            <!-- end -->

            <!--  create   -->
            <Order
                :url="url"
                :type="type"
                :tables="tables"
                :editId="editId"
                @getData="getDate(1,url,query)"
                @typeFun="type = 'create'"
                :isOrder="false"

            />
            <!--  /create   -->

            <!-- start -->
            <SearchPage
                :tableTitle="tableTitle"
                @perPageFun="numPerPage => perPageFun(numPerPage,url,query)"
                @searchFun="search => searchFun(search,url,query)"
                :isSearch="false"
            />
            <!-- end -->

            <!-- Table -->
            <TableCustom
                @getData="page => getDate(page,url,query)"
                @editShow="id => editShow(id)"
                @deleteShow="id => deleteRow(id,url)"
                :dataApi="dataApi"
                :tables="tables"
                :tableTitle="tableTitle"
                :tableSetting="tableSetting"
                :isDelete="false"
                :isEdit="false"
                :editPermission="false"
                :deletePermission="false"
            />
            <!-- Table -->

          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
