<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import Portlet from "../../../components/widgets/Portlet";
import ErrorMessage from "../../../components/general/errorMessage";
import CrudHelper from "../../../helpers/mixen/crudHelper";
import CreatePage from "../../../components/general/createPage";
import SearchPage from "../../../components/general/searchPage";
import TableCustom from "../../../components/general/tableCustom";
import Room from "./room";

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
      url: '/room',
      tableSetting: [
        {label: 'Name',isV: 'name', type: 'string'},
        {label: 'Description',isV: 'description', type: 'string',},
        {label: 'Code',isV: 'code', type: 'string',},
        {label: 'Price',isV: 'price', type: 'string',},
        {label: 'Room Type',name: 'roomType',col:'name',isV: 'room_type_id', type: 'relation',},
        {label: 'Status',name: 'status',col:'name',isV: 'status_id', type: 'relation',},
      ],
      title: "Room",
      tableTitle: 'Room',
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
    Room
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
                :createPermission="hasPermission('room create')"
            />
            <!-- end -->

            <!--  create   -->
            <Room
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
                :editPermission="hasPermission('room edit')"
                :deletePermission="hasPermission('room delete')"
            />
            <!-- Table -->

          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
