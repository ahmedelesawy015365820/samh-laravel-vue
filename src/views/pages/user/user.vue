<template>
  <b-modal
      :id="'create'"
      :title="type != 'edit'?'Add a new Role':'Modify the Role'"
      title-class="font-18"
      body-class="p-4 "
      :hide-footer="true"
      @show="resetModal"
      @hidden="resetModalHidden"
  >
    <form>
      <div class="row">
        <div class="col-md-12">
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
          <div class="form-group">
            <label class="mr-2">
              Email
              <span class="text-danger">*</span>
            </label>
            <input
                type="email"
                class="form-control arabicInput"
                v-model="$v.create.email.$model"
                :class="{
                  'is-invalid': $v.create.email.$error || errors.email,
                  'is-valid':
                    !$v.create.email.$invalid && !errors.email,
                }"
                id="field-2"
            />
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <label class="mr-2">
              Username
              <span class="text-danger">*</span>
            </label>
            <input
                type="text"
                class="form-control"
                v-model="$v.create.username.$model"
                :class="{
                  'is-invalid': $v.create.username.$error || errors.username,
                  'is-valid':
                    !$v.create.username.$invalid && !errors.username,
                }"
                id="field-3"
            />
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group position-relative">
            <label class="control-label">
              Role
              <span class="text-danger">*</span>
            </label>
            <multiselect
                v-model="$v.create.role_id.$model"
                :options="roles.map((type) => type.id)"
                :custom-label="
                  (opt) =>
                    roles.find((x) => x.id == opt)
                      ?  roles.find((x) => x.id == opt).name
                      : null
                "
            >
            </multiselect>
            <div
                v-if="$v.create.role_id.$error || errors.role_id"
                class="text-danger"
            >
              {{ $t("general.fieldIsRequired") }}
            </div>
            <template v-if="errors.role_id">
              <ErrorMessage
                  v-for="(errorMessage, index) in errors.role_id"
                  :key="index"
              >{{ errorMessage }}</ErrorMessage
              >
            </template>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <label class="mr-2">
              Password
              <span class="text-danger">*</span>
            </label>
            <input
                type="password"
                class="form-control"
                v-model="$v.create.password.$model"
                :class="{
                  'is-invalid': $v.create.password.$error || errors.password,
                  'is-valid':
                    !$v.create.password.$invalid && !errors.password,
                }"
                id="field-5"
            />
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <label class="mr-2">
              Status
              <span class="text-danger">*</span>
            </label>
            <b-form-group>
              <b-form-radio
                  class="d-inline-block"
                  v-model="$v.create.status.$model"
                  name="some-radios"
                  value="1"
              >Active</b-form-radio>
              <b-form-radio
                  class="d-inline-block m-1"
                  v-model="$v.create.status.$model"
                  name="some-radios"
                  value="0"
              >Inactive</b-form-radio>
            </b-form-group>
            <template v-if="errors.status">
              <ErrorMessage
                  v-for="(errorMessage, index) in errors.status"
                  :key="index"
              >{{ errorMessage }}
              </ErrorMessage>
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
        email: '',
        username: '',
        password: '',
        role_id: null,
        status: 1
      },
      isLoader: false,
      roles: [],
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
      password: {required, minLength: minLength(8), maxLength: maxLength(16)},
      email: {required, email},
      username: {required, minLength: minLength(2), maxLength: maxLength(30)},
      role_id: {required,integer},
      status: {required}
    }
  },
  props: {
    url: {default: '/user'},
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
            email: '',
            username: '',
            password: '',
            role_id: null,
            status: 1
          };
          this.getRoles();
        }else {
          let item = this.tables.find(el => el.id == this.editId);
          this.create.name = item.name;
          this.create.email = item.email;
          this.create.username = item.username;
          this.create.password = item.password;
          this.create.role_id = item.role.length > 0 ? item.role[0].id: null;
          this.create.status = item.status;
          this.getRoles();
        }
      },100);
      this.$nextTick(() => {this.$v.$reset();});
    },
    resetModalHidden(){
      this.create =  {
        name: '',
        email: '',
        username: '',
        password: '',
        role_id: null,
        status: 1
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
    getRoles() {
      adminApi
          .get(`/role/getDropdown`)
          .then((res) => {
            let l = res.data.data;
            this.roles = l;
          })
          .catch((err) => {
            this.errorFun("Error", "Thereisanerrorinthesystem");
          });
    }
  }
}
</script>

<style scoped>

</style>