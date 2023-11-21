<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import Portlet from "../../../components/widgets/Portlet";
import ErrorMessage from "../../../components/general/errorMessage";
import CrudHelper from "../../../helpers/mixen/crudHelper";
import CreatePage from "../../../components/general/createPage";
import SearchPage from "../../../components/general/searchPage";
import TableCustom from "../../../components/general/tableCustom";
import Order from "../order/order";

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
      tableSetting: [
        {label: 'User',name: 'user',col:'name',isV: 'user_id', type: 'relation',},
        {label: 'Room',name: 'room',col:'name',isV: 'room_id', type: 'relation',},
        {label: 'Start Date',isV: 'start_date', type: 'string',},
        {label: 'End Date',isV: 'end_date', type: 'string',},
        {label: 'Agree',isV: 'agree', type: 'boolean1',}
      ],
      title: "Reservation",
      tableTitle: 'Reservation',
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
                :createPermission="hasPermission('reservation create')"
            />
            <!-- end -->

            <!--  create   -->
            <Order
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
                :isSearch="false" createPermission=""
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
                :isDelete="false"
                :editPermission="hasPermission('reservation edit')"
                :deletePermission="hasPermission('reservation delete')"
            />
            <!-- Table -->

          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
