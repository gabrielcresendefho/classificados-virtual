import Vue from "vue";

export const userKey = "__classificados_user";
export const baseApiUrl =
  "https://us-central1-classificados-virtual.cloudfunctions.net/app";

export function showError(e) {
  if (e && e.response && e.response.data) {
    Vue.toasted.global.defaultError({ msg: e.response.data.message });
  } else if (typeof e === "string") {
    Vue.toasted.global.defaultError({ msg: e });
  } else {
    Vue.toasted.global.defaultError();
  }
}

export default { baseApiUrl, showError, userKey };
