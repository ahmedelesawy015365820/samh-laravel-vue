<template>
  <b-modal
      :id="'create'"
      :title="type != 'edit'?'Add a new Order':'Modify the Order'"
      title-class="font-18"
      body-class="p-4 "
      :hide-footer="true"
      @show="resetModal"
      @hidden="resetModalHidden"
  >
    <form>
      <div class="row">
        <div class="col-md-12" v-if="isOrder">
          <div class="form-group position-relative">
            <label class="control-label">
              User
              <span class="text-danger">*</span>
            </label>
            <multiselect
                v-model="$v.create.user_id.$model"
                :disabled="type == 'edit'"
                :options="users.map((type) => type.id)"
                :custom-label="
                  (opt) =>
                    users.find((x) => x.id == opt)
                      ?  users.find((x) => x.id == opt).name
                      : null
                "
            >
            </multiselect>
            <div
                v-if="$v.create.user_id.$error || errors.user_id"
                class="text-danger"
            >
              {{ $t("general.fieldIsRequired") }}
            </div>
            <template v-if="errors.user_id">
              <ErrorMessage
                  v-for="(errorMessage, index) in errors.user_id"
                  :key="index"
              >{{ errorMessage }}</ErrorMessage>
            </template>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group position-relative">
            <label class="control-label">
              Room
              <span class="text-danger">*</span>
            </label>
            <multiselect
                v-model="$v.create.room_id.$model"
                :options="rooms.map((type) => type.id)"
                :custom-label="
                  (opt) =>
                    rooms.find((x) => x.id == opt)
                      ?  rooms.find((x) => x.id == opt).name
                      : null
                "
            >
            </multiselect>
            <div
                v-if="$v.create.room_id.$error || errors.room_id"
                class="text-danger"
            >
              {{ $t("general.fieldIsRequired") }}
            </div>
            <template v-if="errors.room_id">
              <ErrorMessage
                  v-for="(errorMessage, index) in errors.room_id"
                  :key="index"
              >{{ errorMessage }}</ErrorMessage>
            </template>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group position-relative">
            <label class="control-label">
              Start Date
              <span class="text-danger">*</span>
            </label>
            <date-picker
                v-model="$v.create.start_date.$model"
                type="date"
                format="YYYY-MM-DD"
                valueType="format"
                lang="en" :confirm="false"
            >
            </date-picker>
            <div
                v-if="$v.create.start_date.$error || errors.start_date"
                class="text-danger"
            >
              {{ $t("general.fieldIsRequired") }}
            </div>
            <template v-if="errors.start_date">
              <ErrorMessage
                  v-for="(errorMessage, index) in errors.start_date"
                  :key="index"
              >{{ errorMessage }}</ErrorMessage>
            </template>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group position-relative">
            <label class="control-label">
              Start Date
              <span class="text-danger">*</span>
            </label>
            <date-picker
                v-model="$v.create.end_date.$model"
                type="date"
                format="YYYY-MM-DD"
                valueType="format"
                lang="en" :confirm="false"
            >
            </date-picker>
            <div
                v-if="$v.create.end_date.$error || errors.end_date"
                class="text-danger"
            >
              {{ $t("general.fieldIsRequired") }}
            </div>
            <template v-if="errors.end_date">
              <ErrorMessage
                  v-for="(errorMessage, index) in errors.end_date"
                  :key="index"
              >{{ errorMessage }}</ErrorMessage>
            </template>
          </div>
        </div>
        <div class="col-md-12" v-if="isOrder">
          <div class="form-group">
            <label class="mr-2">
              Agree
              <span class="text-danger">*</span>
            </label>
            <b-form-group>
              <b-form-radio
                  class="d-inline-block"
                  v-model="$v.create.agree.$model"
                  name="some-radios"
                  value="1"
              >Agree</b-form-radio>
              <b-form-radio
                  class="d-inline-block m-1"
                  v-model="$v.create.agree.$model"
                  name="some-radios"
                  value="2"
              >Disagree</b-form-radio>
              <b-form-radio
                  class="d-inline-block m-1"
                  v-model="$v.create.agree.$model"
                  name="some-radios"
                  value="3"
              >Pending</b-form-radio>
            </b-form-group>
            <template v-if="errors.agree">
              <ErrorMessage
                  v-for="(errorMessage, index) in errors.agree"
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
import DatePicker from "vue2-datepicker";

export default {
  name: "room",
  data() {
    return {
      errors: {},
      create: {
        room_id: null,
        agree: 3,
        user_id: null,
        start_date: '',
        end_date: ''
      },
      isLoader: false,
      rooms: [],
      users: []
    };
  },
  mixins: [SuccessError],
  components: {
    ErrorMessage,
    Multiselect,
    DatePicker
  },
  validations: {
    create: {
      room_id: {required,integer},
      agree: {required},
      user_id: {required},
      start_date: {required},
      end_date: {required}
    }
  },
  props: {
    url: {default: '/order'},
    type: {default: 'create'},
    tables: {default: []},
    editId: {default: null},
    isOrder: {default: true}
  },
  methods: {
    resetModal(){
      setTimeout(() => {
        if(this.type != 'edit'){
          this.create =  {
            room_id: null,
            agree: 3,
            user_id: null,
            start_date: '',
            end_date: ''
          };
          this.getRooms();
          if(this.isOrder) this.getUser();
        }else {
          let item = this.tables.find(el => el.id == this.editId);
          this.create.room_id = item.room_id;
          this.create.agree = item.agree;
          this.create.user_id = item.user_id;
          this.create.start_date = item.start_date;
          this.create.end_date = item.end_date;
          this.getRooms();
          if(this.isOrder) this.getUser();
        }
      },100);
      this.$nextTick(() => {this.$v.$reset();});
    },
    resetModalHidden(){
      this.create =  {
        room_id: null,
        agree: 3,
        user_id: null,
        start_date: '',
        end_date: ''
      };
      this.$nextTick(() => { this.$v.$reset(); });
      this.$bvModal.hide(`create`);
      this.$emit('typeFun');
    },
    AddSubmit(){
      this.create.user_id = this.$store.state.auth.user.id;
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
    getRooms() {
      adminApi
          .get(`/room/getDropdown`)
          .then((res) => {
            let l = res.data.data;
            this.rooms = l;
          })
          .catch((err) => {
            this.errorFun("Error", "Thereisanerrorinthesystem");
          });
    },
    getUser() {
      adminApi
          .get(`/user/getDropdown`)
          .then((res) => {
            let l = res.data.data;
            this.users = l;
          })
          .catch((err) => {
            this.errorFun("Error", "Thereisanerrorinthesystem");
          });
    },
  }
}
</script>

<style scoped>

</style>