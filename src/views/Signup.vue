<template>
  <div class="container-login100 background-image">
    <div class="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30">
      <form @submit.prevent class="login100-form validate-form">
        <span class="login100-form-title p-b-37">Sign Up</span>
        <div class="wrap-input100 validate-input m-b-20" data-validate="Enter username or email">
          <input class="input100" type="email" v-model="email" placeholder="Set your email" />
        </div>
        <div class="wrap-input100 validate-input m-b-25" data-validate="Enter password">
          <input
            class="input100"
            type="password"
            v-model="password"
            placeholder="Set your password"
          />
        </div>
        <div class="container-login100-form-btn">
          <button v-on:click="emailSignup" class="login100-form-btn">SIGN UP</button>
        </div>
        <div class="text-center p-t-57 p-b-20">
          <span class="txt1">Or Sign up with</span>
        </div>
        <div class="flex-c p-b-45">
          <div class="login100-social-item">
            <img src="../assets/icon-google.png" alt="google" v-on:click="googleSignup" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Signup",
  computed: {
    email: {
      get() {
        return this.$store.getters.email;
      },
      set(value) {
        this.$store.dispatch("updateEmail", value);
      }
    },
    password: {
      get() {
        return this.$store.getters.password;
      },
      set(value) {
        this.$store.dispatch("updatePassword", value);
      }
    }
  },

  methods: {
    ...mapActions(["emailSignup", "googleSignup"])
  }
};
</script>

<style scoped></style>
