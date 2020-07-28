<template>
  <div>
    <div class="container-login100 background-image">
      <b-input-group class="mt-3">
        <b-form-input type="text" v-model="search" size="lg" placeholder="Get Romaji"></b-form-input>
        <b-button
          size="lg"
          variant="warning"
          v-on:click="
            handleSearch
          "
        >Search</b-button>
      </b-input-group>

      <b-modal v-model="showResult" hide-footer title="Search Result">
        <div class="d-block text-center">
          <h3>{{ search_result }}</h3>
        </div>
        <b-button variant="dark" block @click="hideModal">Close</b-button>
        <b-button
          v-show="search_result !== 'Sorry,the word is not found'"
          variant="warning"
          block
          v-on:click="saveWord();hideModal()"
        >Save word</b-button>
      </b-modal>

      <div class="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30 cardMargin">
        <!-- <b-container class="bv-example-row mb-3">
        <b-row cols="4">-->
        <template v-for="(value, key, index) in saved_words">
          <b-card bg-variant="light" class="text-center m-3" v-bind:key="index">
            <b-card-text v-bind:key="index">{{ value.word }}</b-card-text>
            <b-card-text v-bind:key="index">{{ value.result }}</b-card-text>
            <b-button variant="dark" v-bind:key="key" v-on:click="removeCard(key)">Remove</b-button>
          </b-card>
        </template>
        <!-- </b-row>
        </b-container>-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Dashboard",
  computed: {
    email() {
      return this.$store.state.user_email;
    },
    search_result() {
      return this.$store.state.search_result;
    },
    search: {
      get() {
        return this.$store.getters.user_search;
      },
      set(value) {
        console.log(value);
        this.$store.commit("updateSearch", value);
      }
    },
    showResult: {
      get() {
        return this.$store.getters.showResult;
      }
    },
    saved_words() {
      return this.$store.state.user_saved_words;
    }
  },
  created() {
    this.getUserInfoWhenRefresh();
  },
  methods: {
    ...mapActions([
      "logout",
      "handleSearch",
      "getUserInfoWhenRefresh",
      "saveWord",
      "removeCard",
      "hideModal"
    ])
  }
};
</script>

<style lang="scss" scoped>
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";

.cardMargin {
  margin-top: 3rem;
}
</style>
