<script>
import Auth from "../../layouts/auth";
import appConfig from "../../../../app.config";

import { required, email } from "vuelidate/lib/validators";
import adminApi from "../../../api/adminAxios";

/**
 * Login component
 */
export default {
  page: {
    title: "Login",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data() {
    return {
      login: {
        email: "admin@admin.com",
        password: "12345678",
      },
      type: "password",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
      isSuccess: false
    };
  },
  components: {
    Auth,
  },
  validations: {
    login: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    }
  },
  methods: {
    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      this.submitted = true;
      this.isAuthError = false;
      // stop here if form is invalid
      this.$v.login.$touch();

      if (this.$v.login.$invalid) {
        return;
      } else {
        adminApi
            .post(`/login`, this.login)
            .then(async (res) => {
              let l = res.data.data;
              this.$store.commit("auth/editToken", l.token);
              this.$store.commit("auth/editUser", l.user);
              this.$store.commit("auth/editPermission", l.user.permissions);
              this.isSuccess = true;
              this.$router.push({ name: "home" });
            })
            .catch((err) => {
              this.isAuthError = true;
            })
            .finally(() => {
              this.submitted = false;
            });
      }
    },
  },
};
</script>

<template>
  <Auth>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card">
          <div class="card-body p-4">
            <div class="text-center w-75 m-auto">
              <div class="auth-logo">
                <router-link to="/" class="logo logo-dark text-center">
                  <span class="logo-lg">
                    <img
                      src="@/assets/images/logo-dark.png"
                      alt=""
                      height="22"
                    />
                  </span>
                </router-link>

                <router-link to="/" class="logo logo-light text-center">
                  <span class="logo-lg">
                    <img
                      src="@/assets/images/logo-light.png"
                      alt=""
                      height="22"
                    />
                  </span>
                </router-link>
              </div>
              <p class="text-muted mb-4 mt-3">
                Enter your email address and password to access admin panel.
              </p>
            </div>

            <form action="#">
<!--              <b-alert-->
<!--                :variant="notification.type"-->
<!--                class="mt-3"-->
<!--                v-if="isSuccess"-->
<!--                :show="notificationAutoCloseDuration"-->
<!--                dismissible-->
<!--                >{{ notification.message }}</b-alert-->
<!--              >-->

<!--              <b-alert-->
<!--                variant="danger"-->
<!--                class="mt-3"-->
<!--                v-model="isAuthError"-->
<!--                :show="notificationAutoCloseDuration"-->
<!--                dismissible-->
<!--                >{{ authError }}</b-alert>-->
              <div class="form-group mb-3">
                <label for="emailaddress">Email address</label>
                <input
                  class="form-control"
                  v-model="login.email"
                  type="email"
                  id="emailaddress"
                  placeholder="Enter your email"
                  :class="{ 'is-invalid': submitted && $v.login.email.$error }"
                />
                <div
                  v-if="submitted && $v.login.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.login.email.required">Email is required.</span>
                  <span v-if="!$v.login.email.email">Please enter valid email.</span>
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="password">Password</label>
                <div class="input-group input-group-merge">
                  <input
                    v-model="login.password"
                    :type="type"
                    id="password"
                    class="form-control"
                    placeholder="Enter your password"
                    :class="{ 'is-invalid': submitted && $v.login.password.$error }"
                  />

                  <div class="input-group-append" data-password="false" @click.prevent="type == 'password'? type ='text':type= 'password'">
                    <div class="input-group-text">
                      <span class="password-eye"></span>
                    </div>
                  </div>
                  <div
                    v-if="submitted && !$v.login.password.required"
                    class="invalid-feedback"
                  >
                    Password is required.
                  </div>
                </div>
              </div>

              <div class="form-group mb-3">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="checkbox-signin"
                    checked
                  />
                  <label class="custom-control-label" for="checkbox-signin"
                    >Remember me</label
                  >
                </div>
              </div>

              <div class="form-group mb-0 text-center">
                <button class="btn btn-primary btn-block" type="button" @click.prevent="tryToLogIn">
                  Log In
                </button>
              </div>
            </form>

          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Auth>
</template>
