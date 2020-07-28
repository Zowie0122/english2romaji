import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";
import "firebase/auth";
import router from "../router/index";

import axios from "axios";

Vue.use(Vuex);

const romaji_chart = {
  あ: "a",
  い: "i",
  う: "u",
  え: "e",
  お: "o",
  か: "ka",
  き: "ki",
  く: "ku",
  け: "ke",
  こ: "ko",
  さ: "sa",
  し: "shi",
  す: "su",
  せ: "se",
  そ: "so",
  た: "ta",
  ち: "chi",
  つ: "tsu",
  て: "te",
  と: "to",
  な: "na",
  に: "ni",
  ぬ: "nu",
  ね: "ne",
  の: "no",
  は: "ha",
  ひ: "hi",
  ふ: "hu",
  へ: "he",
  ほ: "ho",
  ま: "ma",
  み: "mi",
  む: "mu",
  め: "me",
  も: "mo",
  や: "ya",
  ゆ: "yu",
  よ: "yo",
  ら: "la",
  り: "li",
  る: "lu",
  れ: "le",
  ろ: "lo",
  わ: "wa",
  が: "ga",
  ぎ: "gi",
  ぐ: "gu",
  げ: "ge",
  ご: "go",
  ざ: "za",
  じ: "ji",
  ず: "zu",
  ぜ: "ze",
  ぞ: "zo",
  だ: "da",
  ぢ: "ji",
  づ: "dzu",
  で: "de",
  ど: "do",
  ば: "ba",
  び: "bi",
  ぶ: "bu",
  べ: "be",
  ぼ: "bo",
  ぱ: "pa",
  ぴ: "pi",
  ぷ: "pu",
  ぺ: "pe",
  ぽ: "po",
  きゃ: "kya",
  きゅ: "kyu",
  きょ: "kyo",
  しゃ: "sha",
  しゅ: "shu",
  しょ: "sho",
  ちゃ: "cha",
  ちゅ: "chu",
  ちょ: "cho",
  にゃ: "nya",
  にゅ: "nyu",
  にょ: "nyo",
  みゃ: "mya",
  みゅ: "myu",
  みょ: "myo",
  りゃ: "lia",
  りゅ: "lyu",
  りょ: "lyo",
  ぎゃ: "gya",
  ぎゅ: "gyu",
  ぎょ: "gyo",
  じゃ: "jya",
  じゅ: "jyu",
  じょ: "jyo",
  びゃ: "bya",
  びゅ: "byu",
  びょ: "byo",
  ぴゃ: "pya",
  ぴゅ: "pyu",
  ぴょ: "pyo",
  ん: "n",

  ア: "a",
  イ: "i",
  ウ: "u",
  エ: "e",
  オ: "o",
  カ: "ka",
  キ: "ki",
  ク: "ku",
  ケ: "ke",
  コ: "ko",
  サ: "sa",
  シ: "shi",
  ス: "su",
  セ: "se",
  ソ: "so",
  タ: "ta",
  チ: "chi",
  ツ: "tsu",
  テ: "te",
  ト: "to",
  ナ: "na",
  ニ: "ni",
  ヌ: "nu",
  ネ: "ne",
  ノ: "no",
  ハ: "ha",
  ヒ: "hi",
  フ: "hu",
  ヘ: "he",
  ホ: "ho",
  マ: "ma",
  ミ: "mi",
  ム: "mu",
  メ: "me",
  モ: "mo",
  ヤ: "ya",
  ユ: "yu",
  ヨ: "yo",
  ラ: "la",
  リ: "li",
  ル: "lu",
  レ: "le",
  ロ: "lo",
  ワ: "wa",
  ガ: "ga",
  ギ: "gi",
  グ: "gu",
  ゲ: "ge",
  ゴ: "go",
  ザ: "za",
  ジ: "ji",
  ズ: "zu",
  ゼ: "ze",
  ゾ: "zo",
  ダ: "da",
  ヂ: "ji",
  ヅ: "dzu",
  デ: "de",
  ド: "do",
  バ: "ba",
  ビ: "bi",
  ブ: "bu",
  ベ: "be",
  ボ: "bo",
  パ: "pa",
  ピ: "pi",
  プ: "pu",
  ペ: "pe",
  ポ: "po",
  キャ: "kya",
  キュ: "kyu",
  キョ: "kyo",
  シャ: "sha",
  シュ: "shu",
  ショ: "sho",
  チャ: "cha",
  チュ: "chu",
  チョ: "cho",
  ニャ: "nya",
  ニュ: "nyu",
  ニョ: "nyo",
  ミャ: "mya",
  ミュ: "myu",
  ミョ: "myo",
  リャ: "lia",
  リュ: "lyo",
  リョ: "lyo",
  ギャ: "gya",
  ギュ: "gyu",
  ギョ: "gyo",
  ジャ: "jya",
  ジュ: "jyu",
  ジョ: "jyo",
  ビャ: "bya",
  ビュ: "byu",
  ビョ: "byo",
  ピャ: "pya",
  ピュ: "pyu",
  ピョ: "pyo",
  ー: "-",
  ン: "n",
};

function restructureKana(array) {
  let result = [];
  for (const letter of array) {
    console.log(letter);
    if (letter == "ッ") {
      continue;
    }
    if (
      letter == "ャ" ||
      letter == "ュ" ||
      letter == "ョ" ||
      letter == "ゃ" ||
      letter == "ゅ" ||
      letter == "ょ"
    ) {
      result[result.length - 1] += letter;
    } else {
      result.push(letter);
    }
  }
  console.log(result);
  return result;
}

const intialState = {
  user_email: "",
  user_password: "",
  user_id: "",
  user_search: "",
  search_result: "",
  user_saved_words: "",
  google_token: "",
  user_data: {
    display_name: "",
    cards: [],
  },
  showModal: false,
};

export default new Vuex.Store({
  state: { ...intialState },
  getters: {
    email: (state) => {
      return state.user_email;
    },
    password: (state) => {
      return state.user_password;
    },
    search: (state) => {
      return state.user_search;
    },
    showResult: (state) => {
      return state.showModal;
    },
  },
  mutations: {
    updateEmail: (state, payload) => {
      state.user_email = payload;
    },
    updatePassword: (state, payload) => {
      state.user_password = payload;
    },
    updateUID: (state, payload) => {
      state.user_id = payload;
    },
    updateSearch: (state, payload) => {
      state.user_search = payload;
    },
    toDashboard: () => {
      router.push({ name: "Dashboard" });
    },
    backHome: () => {
      router.push({ name: "Home" });
    },
    clearUserInfo: (state) => {
      state.user_email = "";
      (state.user_id = ""), (state.user_password = "");
    },
    googleLogin: (state, payload) => {
      state.user_email = payload.user.email;
      state.user_id = payload.user.uid;
      state.google_token = payload.token;
      router.push({ name: "Dashboard" });
    },
    googleSignUp: (state, payload) => {
      state.user_email = payload.user.email;
      state.user_password = "google";
      state.user_id = payload.userId;
      state.google_token = payload.token;
    },
    setSearchResult: (state, payload) => {
      state.search_result = payload.romaji;
      state.showModal = true;
    },
    getUpdated: () => {
      return;
    },
    setUserSavedWords: (state, payload) => {
      state.user_saved_words = payload;
    },
    closeModal(state) {
      state.showModal = false;
      console.log("user search", state.user_search);
    },
    notFound(state) {
      state.search_result = "Sorry,the word is not found";
      state.showModal = true;
    },
  },

  actions: {
    updateEmail({ commit }, payload) {
      commit("updateEmail", payload);
    },
    updatePassword({ commit }, payload) {
      commit("updatePassword", payload);
    },
    async emailSignup({ commit }) {
      try {
        const res = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.state.user_email,
            this.state.user_password
          );
        await firebase
          .database()
          .ref("/users/" + res.user.uid)
          .set({
            email: res.user.email,
          });

        commit("toDashboard");
      } catch (err) {
        console.log(err);
      }
    },

    async googleSignup({ commit }) {
      try {
        var provider = new firebase.auth.GoogleAuthProvider();
        await firebase
          .auth()
          .signInWithPopup(provider)
          .then(function(result) {
            const token = result.credential.accessToken;
            const user = result.user;
            const userId = result.user.uid;
            const payload = { user, userId, token };
            commit("googleSignUp", payload);
          });

        commit("toDashboard");
      } catch (err) {
        console.log(err);
      }
    },

    async emailLogin({ commit }) {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(
            this.state.user_email,
            this.state.user_password
          );
        commit("toDashboard");
      } catch (error) {
        console.log(error);
      }
    },
    async googleLogin({ commit }) {
      try {
        var provider = new firebase.auth.GoogleAuthProvider();
        await firebase
          .auth()
          .signInWithPopup(provider)
          .then(function(result) {
            const token = result.credential.accessToken;
            const user = result.user;
            const payload = { user, token };

            commit("googleLogin", payload);
          });
      } catch (err) {
        console.log(err);
      }
    },

    async handleSearch({ commit }) {
      try {
        const userInputWithoutSpace = this.state.user_search.trim();
        const res = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://jisho.org/api/v1/search/words?keyword=${userInputWithoutSpace}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers":
                "X-Requested-With, Origin, X-Csrftoken, Content-Type, Accept", // この辺は使うフレームワークにより異なるが許可するヘッダーを定義しておく。
            },
            mode: "no-cors",
          }
        );
        console.log(res);
        if (res.data.data.length === 0) {
          console.log("not found");
          commit("notFound");
        } else {
          const kana = res.data.data[0].japanese[0].reading;
          const array = kana.split("");
          const kanaArray = restructureKana(array);
          const romajiArray = kanaArray.map((ele) => romaji_chart[ele]);
          const romaji = romajiArray.join(" ");
          commit("setSearchResult", { romaji });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getUserInfoWhenRefresh({ commit }) {
      try {
        const user = await firebase.auth().currentUser;
        console.log(user);
        if (user) {
          console.log(user);
          commit("updateEmail", user.email);
          commit("updateUID", user.uid);
        } else {
          console.log("The user is not signed in");
          commit("backHome");
        }

        var starCountRef = await firebase
          .database()
          .ref("/users/" + this.state.user_id);
        starCountRef.on("value", function(snapshot) {
          commit("setUserSavedWords", snapshot.val().cards);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async saveWord({ commit }) {
      try {
        const newWord = {
          word: this.state.user_search,
          result: this.state.search_result,
        };

        var newCardKey = await firebase
          .database()
          .ref("/users/" + this.state.user_id)
          .child("cards")
          .push().key;
        var updates = {};
        updates["/cards/" + newCardKey] = newWord;
        commit("getUpdated");
        return firebase
          .database()
          .ref("/users/" + this.state.user_id)
          .update(updates);
      } catch (error) {
        console.log(error);
      }
    },
    async removeCard({ commit }, payload) {
      try {
        await firebase
          .database()
          .ref("/users/" + this.state.user_id)
          .child("cards")
          .child(payload)
          .remove();
        commit("getUpdated");
      } catch (error) {
        console.log(error);
      }
    },
    async logout({ commit }) {
      try {
        commit("clearUserInfo");
        await firebase.auth().signOut();
        commit("backHome");
      } catch (err) {
        console.log(err);
      }
    },
    openModal({ commit }) {
      commit("openModal");
    },
    hideModal({ commit }) {
      commit("closeModal");
      console.log(this.state.user_search);
    },
  },
});
