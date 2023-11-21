<template>
  <b-modal
      :id="'create'"
      :title="type != 'edit'?'Add a new Role':'Modify the Role'"
      title-class="font-18"
      body-class="p-4 "
      size="lg"
      :hide-footer="true"
      @show="resetModal"
      @hidden="resetModalHidden"
  >
    <form>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="field-1" class="control-label">
              Name
              <span class="text-danger">*</span>
            </label>
            <input
                type="text"
                class="form-control arabicInput"
                v-model="$v.create.name.$model"
                :class="{
                    'is-invalid': $v.create.name.$error || errors.name,
                    'is-valid':
                      !$v.create.name.$invalid && !errors.name,
                  }"
                id="field-1"
            />
            <div
                v-if="!$v.create.name.minLength"
                class="invalid-feedback"
            >
              {{ $t("general.Itmustbeatleast") }}
              {{ $v.create.name.$params.minLength.min }}
              {{ $t("general.letters") }}
            </div>
            <div
                v-if="!$v.create.name.maxLength"
                class="invalid-feedback"
            >
              {{ $t("general.Itmustbeatmost") }}
              {{ $v.create.name.$params.maxLength.max }}
              {{ $t("general.letters") }}
            </div>
            <template v-if="errors.name">
              <ErrorMessage
                  v-for="(errorMessage, index) in errors.name"
                  :key="index"
              >
                {{ errorMessage }}
              </ErrorMessage>
            </template>
          </div>
        </div>
        <div class="col-md-12">
            <div class="d-flex">
              <template v-for="item in curds">
                <div class="col-4 mb-2">
                  <b-dropdown
                      menu-class="w-100"
                      variant="primary"
                      class="dropdown-permission"
                      :html="item"
                  >
                    <template
                        v-for="da in filterPermission(item)"
                    >
                      <b-form-checkbox
                          class="dropdown-permission dropdown-menu-custom-company mb-1 mx-1"
                          :value="da.id"
                          v-model="$v.create.permissions.$model"
                      >
                        {{ da.name }}
                      </b-form-checkbox>
                    </template>
                  </b-dropdown>
                </div>
              </template>
            </div>
        </div>
      </div>
      <div class="mt-3 d-flex justify-content-end">
        <template>
          <b-button
              variant="success"
              type="button"
              class="mx-1"
              v-if="!isLoader"
              @click.prevent="AddSubmit"
          >
            {{ type != 'edit'? "Add": "Edit" }}
          </b-button>

          <b-button variant="success" class="mx-1" disabled v-else>
            <b-spinner small></b-spinner>
            <span class="sr-only">{{ $t("login.Loading") }}...</span>
          </b-button>
        </template>
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button
            variant="danger"
            type="button"
            @click.prevent="resetModalHidden"
        >
          Cancel
        </b-button>
      </div>
    </form>
  </b-modal>
</template>

<script>
import {maxLength, minLength, required,minValue,integer,email} from "vuelidate/lib/validators";
import adminApi from "../../../api/adminAxios";
import SuccessError from "../../../helpers/mixen/success&error";
import ErrorMessage from "../../../components/general/errorMessage";
import Multiselect from "vue-multiselect";

export default {
  name: "room",
  data() {
    return {
      errors: {},
      create: {
        name: '',
        permissions: []
      },
      isLoader: false,
      permissions: [],
      curds: []
    };
  },
  mixins: [SuccessError],
  components: {
    ErrorMessage,
    Multiselect
  },
  validations: {
    create: {
      name: {required, minLength: minLength(2), maxLength: maxLength(100)},
      permissions: {required},
    }
  },
  props: {
    url: {default: '/role'},
    type: {default: 'create'},
    tables: {default: []},
    editId: {default: null}
  },
  methods: {
    resetModal(){
      setTimeout(() => {
        if(this.type != 'edit'){
          this.create =  {
            name: '',
            permissions: []
          };
          this.getPermissions();
        }else {
          let item = this.tables.find(el => el.id == this.editId);
          this.create.name = item.name;
          let perms = [];
          item.permissions.forEach(el => perms.push(el.id));
          this.create.permissions = perms;
          this.getPermissions();
        }
      },100);
      this.$nextTick(() => {this.$v.$reset();});
    },
    resetModalHidden(){
      this.create =  {
        name: '',
        permissions: []
      };
      this.$nextTick(() => { this.$v.$reset(); });
      this.$bvModal.hide(`create`);
      this.$emit('typeFun');
    },
    AddSubmit(){
      this.$v.create.$touch();
      if (this.$v.create.$invalid) {
        return;
      } else {
        this.isLoader = true;
        if(this.type != 'edit'){
          adminApi
              .post(`${this.url}`, this.create)
              .then(async (res) => {
                this.successFun('Added successfully');
                this.$bvModal.hide(`create`);
                this.$emit('getData');
              })
              .catch((err) => {
                if (err.response.data) {
                  this.errors = err.response.data.errors;
                } else {
                  this.errorFun('Error','There is an error in the system !');
                }
              })
              .finally(() => {
                this.isLoader = false;
              });
        }else {
          adminApi
              .put(`${this.url}/${this.editId}`, this.create)
              .then(async (res) => {
                this.successFun('Edit successfully');
                this.$bvModal.hide(`create`);
                this.$emit('getData');
              })
              .catch((err) => {
                if (err.response.data) {
                  this.errors = err.response.data.errors;
                } else {
                  this.errorFun('Error','There is an error in the system !');
                }
              })
              .finally(() => {
                this.isLoader = false;
              });
        }
      }
    },
    getPermissions() {
      adminApi
          .get(`/role/get-permission-dropdown`)
          .then((res) => {
            let l = res.data.data;
            l.forEach(el => {
              if( !this.curds.includes(el.role) ){
                this.curds.push(el.role);
              }
            });
            this.permissions = l;
          })
          .catch((err) => {
            this.errorFun("Error", "Thereisanerrorinthesystem");
          });
    },
    filterPermission(crud){
      let data = this.permissions.filter(el => el.role == crud);
      return data;
    },
  }
}
</script>

<style scoped>
.dropdown-permission {
  width: 100% !important;
}
.dropdown-menu-custom-company.dropdown .dropdown-menu {
  overflow-y: scroll;
  height: 300px;
}
</style>