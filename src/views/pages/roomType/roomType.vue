<template>
  <b-modal
      :id="'create'"
      :title="type != 'edit'?'Add a new Room Type':'Modify the Room Type'"
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
            <div dir="rtl">
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
            </div>
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
import {maxLength, minLength, required} from "vuelidate/lib/validators";
import adminApi from "../../../api/adminAxios";
import SuccessError from "../../../helpers/mixen/success&error";
import ErrorMessage from "../../../components/general/errorMessage";

export default {
  name: "createOrUpdate",
  data() {
    return {
      errors: {},
      create: {
        name: '',
        status: 1
      },
      isLoader: false
    };
  },
  components: {
    ErrorMessage,
  },
  mixins: [SuccessError],
  validations: {
    create: {
      name: {required, minLength: minLength(3), maxLength: maxLength(100)},
      status: {required}
    }
  },
  props: {
    url: {default: '/room-types'},
    type: {default: 'create'},
    tables: {default: []},
    editId: {default: null}
  },
  methods: {
    resetModal(){
      setTimeout(() => {
        if(this.type != 'edit'){
          this.create = {name: '',status: 1};
        }else {
          let item = this.tables.find(el => el.id == this.editId);
          this.create.name = item.name;
          this.create.status = item.status;
        }
      },100);
      this.$nextTick(() => {this.$v.$reset();});
    },
    resetModalHidden(){
      this.create = {name: '',status: 1};
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
    }
  }
}
</script>

<style scoped>

</style>