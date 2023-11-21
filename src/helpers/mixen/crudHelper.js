import adminApi from "../../api/adminAxios";
import Swal from "sweetalert2";
import SuccessError from './success&error';

export default {
    data(){
        return {
            perPage: 15,
            filter: '',
            tables: [],
            objPagination: {},
            dataApi: {},
            debounce: {},
            editId: null,
            type: 'create',
            isLoader: false,
        }
    },
    mixins: [SuccessError],
    methods: {
        async getDate (page = 1,url,query = ''){

            await adminApi.get(`${url}?page=${page}&per_page=${this.perPage}&search=${this.filter}${query}`)
                .then((res) => {
                    let l = res.data;
                    this.tables = l.data;
                    this.objPagination = l.pagination;
                    this.dataApi = {
                        data: l.data,
                        current_page: l.pagination.current_page,
                        first_page_url: l.pagination.first_page_url,
                        from: l.pagination.from,
                        last_page: l.pagination.last_page,
                        last_page_url: l.pagination.last_page_url,
                        links: l.pagination.links,
                        next_page_url: l.pagination.next_page_url,
                        path: l.pagination.path,
                        per_page: l.pagination.per_page,
                        prev_page_url: l.pagination.prev_page_url,
                        to: l.pagination.to,
                        total: l.pagination.total
                    };
                    this.type = 'create';
                })
                .catch((err) => {
                    this.errorFun('Error','There is an error in the system !');
                })
                .finally(() => {});
        },
        perPageFun(numPage,url,query = ''){
            this.perPage = numPage;
            this.getDate(1,url,query);
        },
        searchFun(search,url,query){
            this.filter = search;
            this.getDate(1,url,query);
        },
        deleteRow(id,url) {
            Swal.fire({
                title: `Are you sure ?`,
                text: `You won't be able to revert this!`,
                type: "warning",
                showCancelButton: true,
                confirmButtonText: `Yes, delete it!`,
                cancelButtonText: `No, cancel!`,
                confirmButtonClass: "btn btn-success mt-2",
                cancelButtonClass: "btn btn-danger ml-2 mt-2",
                buttonsStyling: false,
            }).then((result) => {
                if (result.value) {
                    this.isLoader = true;
                    adminApi.delete(`${url}/${id}`)
                        .then((res) => {
                            this.successFun('Your row has been deleted.','Deleted');
                            this.getDate(this.objPagination.current_page,url);
                        })
                        .catch((err) => {
                            this.errorFun('Error','There is an error in the system !');
                        })
                        .finally(() => {
                            this.isLoader = false;
                        });
                }
            });
        },
        editShow(id){
            this.editId = id;
            this.type = 'edit';
            this.$bvModal.show(`create`);
        },
        hasPermission(item){
            return this.$store.state.auth.permissions.includes(item);
        }
    }
}