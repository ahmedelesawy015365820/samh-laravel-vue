<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/Page-header";
import Portlet from "../../../components/widgets/Portlet";
import ErrorMessage from "../../../components/general/errorMessage";
import CrudHelper from "../../../helpers/mixen/crudHelper";
import CreatePage from "../../../components/general/createPage";
import SearchPage from "../../../components/general/searchPage";
import TableCustom from "../../../components/general/tableCustom";
import User from "./user";

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
      url: '/user',
      tableSetting: [
        {label: 'Name',isV: 'name', type: 'string'},
        {label: 'Email',isV: 'email', type: 'string',},
        {label: 'Username',isV: 'username', type: 'string',},
        {label: 'Role',name: 'role',col:'name',isV: 'role_id', type: 'relationMany',},
        {label: 'Status',isV: 'status', type: 'boolean',}
      ],
      title: "User",
      tableTitle: 'User',
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
    User
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
                :createPermission="hasPermission('user create')"
            />
            <!-- end -->

            <!--  create   -->
            <User
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
                :editPermission="hasPermission('user edit')"
                :deletePermission="hasPermission('user delete')"
            />
            <!-- Table -->

          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
