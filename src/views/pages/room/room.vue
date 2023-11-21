<template>
  <b-modal
      :id="'create'"
      :title="type != 'edit'?'Add a new Room':'Modify the Room'"
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
              Code
              <span class="text-danger">*</span>
            </label>
            <input
                type="text"
                class="form-control arabicInput"
                v-model="$v.create.code.$model"
                :class="{
                  'is-invalid': $v.create.code.$error || errors.code,
                  'is-valid':
                    !$v.create.code.$invalid && !errors.code,
                }"
                id="field-2"
            />
            <div
                v-if="!$v.create.code.minLength"
                class="invalid-feedback"
            >
              {{ $t("general.Itmustbeatleast") }}
              {{ $v.create.code.$params.minLength.min }}
              {{ $t("general.letters") }}
            </div>
            <div
                v-if="!$v.create.code.maxLength"
                class="invalid-feedback"
            >
              {{ $t("general.Itmustbeatmost") }}
              {{ $v.create.code.$params.maxLength.max }}
              {{ $t("general.letters") }}
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <label class="mr-2">
              Price
              <span class="text-danger">*</span>
            </label>
            <input
                type="number"
                step=".01"
                class="form-control"
                v-model="$v.create.price.$model"
                :class="{
                  'is-invalid': $v.create.price.$error || errors.price,
                  'is-valid':
                    !$v.create.price.$invalid && !errors.price,
                }"
                id="field-3"
            />
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group position-relative">
            <label class="control-label">
              Room Type
              <span class="text-danger">*</span>
            </label>
            <multiselect
                v-model="$v.create.room_type_id.$model"
                :options="roomTypes.map((type) => type.id)"
                :custom-label="
                  (opt) =>
                    roomTypes.find((x) => x.id == opt)
                      ?  roomTypes.find((x) => x.id == opt).name
                      : null
                "
            >
            </multiselect>
            <div
                v-if="$v.create.room_type_id.$error || errors.room_type_id"
                class="text-danger"
            >
              {{ $t("general.fieldIsRequired") }}
            </div>
            <template v-if="errors.room_type_id">
              <ErrorMessage
                  v-for="(errorMessage, index) in errors.room_type_id"
                  :key="index"
              >{{ errorMessage }}</ErrorMessage
              >
            </template>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group position-relative">
            <label class="control-label">
              Status
              <span class="text-danger">*</span>
            </label>
            <multiselect
                v-model="$v.create.status_id.$model"
                :options="statuses.map((type) => type.id)"
                :custom-label="
                  (opt) =>
                    statuses.find((x) => x.id == opt)
                      ?  statuses.find((x) => x.id == opt).name
                      : null
                "
            >
            </multiselect>
            <div
                v-if="$v.create.status_id.$error || errors.status_id"
                class="text-danger"
            >
              {{ $t("general.fieldIsRequired") }}
            </div>
            <template v-if="errors.status_id">
              <ErrorMessage
                  v-for="(errorMessage, index) in errors.status_id"
                  :key="index"
              >{{ errorMessage }}</ErrorMessage>
            </template>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <label for="field-1" class="control-label">
              Description
              <span class="text-danger">*</span>
            </label>
            <textarea
                class="form-control"
                v-model="$v.create.description.$model"
                :class="{
                    'is-invalid': $v.create.description.$error || errors.description,
                    'is-valid':
                      !$v.create.description.$invalid && !errors.description,
                  }"
            ></textarea>
            <div
                v-if="!$v.create.description.minLength"
                class="invalid-feedback"
            >
              {{ $t("general.Itmustbeatleast") }}
              {{ $v.create.description.$params.minLength.min }}
              {{ $t("general.letters") }}
            </div>
            <div
                v-if="!$v.create.description.maxLength"
                class="invalid-feedback"
            >
              {{ $t("general.Itmustbeatmost") }}
              {{ $v.create.description.$params.maxLength.max }}
              {{ $t("general.letters") }}
            </div>
            <template v-if="errors.description">
              <ErrorMessage
                  v-for="(errorMessage, index) in errors.description"
                  :key="index"
              >
                {{ errorMessage }}
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
import {maxLength, minLength, required,minValue,integer} from "vuelidate/lib/validators";
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
        description: '',
        code: '',
        price: 0,
        room_type_id: null,
        status_id: null
      },
      isLoader: false,
      roomTypes: [],
      statuses: []
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
      description: {required, minLength: minLength(1), maxLength: maxLength(1000)},
      code: {required, minLength: minLength(3), maxLength: maxLength(100)},
      price: {required,minValue: minValue(0)},
      room_type_id: {required,integer},
      status_id: {required,integer}
    }
  },
  props: {
    url: {default: '/room'},
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
            description: '',
            code: '',
            price: '',
            room_type_id: null,
            status_id: null
          };
          this.getRoomType();
          this.getStatus();
        }else {
          let item = this.tables.find(el => el.id == this.editId);
          this.create.name = item.name;
          this.create.description = item.description;
          this.create.code = item.code;
          this.create.price = item.price;
          this.create.room_type_id = item.room_type_id;
          this.create.status_id = item.status_id;
          this.getRoomType();
          this.getStatus();
        }
      },100);
      this.$nextTick(() => {this.$v.$reset();});
    },
    resetModalHidden(){
      this.create =  {
        name: '',
        description: '',
        code: '',
        price: 0,
        room_type_id: null,
        status_id: null
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
    getRoomType() {
      adminApi
          .get(`/room-types`)
          .then((res) => {
            let l = res.data.data;
            this.roomTypes = l;
          })
          .catch((err) => {
            this.errorFun("Error", "Thereisanerrorinthesystem");
          });
    },
    getStatus() {
      adminApi
          .get(`/status`)
          .then((res) => {
            let l = res.data.data;
            this.statuses = l;
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