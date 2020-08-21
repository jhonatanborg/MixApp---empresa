import Axios from "axios";
import Idb from "./IndexedDb";

const actions = {
  request(context, payload) {
    const config = {
      url: `${process.env.VUE_APP_BASE_URL_SERVER_LOCAL}${payload.url}`,
      method: payload.method,
      headers: null || {
        Authorization: `Bearer ${localStorage.getItem("acess-token")}`,
      },
      params: null || payload.params,
      data: null || payload.data,
    };

    if (payload.idb) {
      if (payload.method === "post") {
        if (
          context.state.saleIdb.length > 0 &&
          context.state.saleIdb[0].company_id === payload.idb.data.company_id
        ) {
          Idb.IndexedDB.indexedDBRequest(
            payload.idb.table,
            payload.idb.data,
            payload.method
          );
        } else if (
          context.state.saleIdb.length > 0 &&
          context.state.saleIdb[0].company_id !== payload.idb.data.company_id
        ) {
          context.commit("showAlert", true, { root: true });
        } else {
          localStorage.setItem("saleCompany", JSON.stringify(payload.company));
          context.commit("setSaleCompany", payload.company);

          Idb.IndexedDB.indexedDBRequest(
            payload.idb.table,
            payload.idb.data,
            payload.method
          ).then(() => {
            Idb.IndexedDB.indexedDBRequest(
              payload.idb.table,
              null,
              "getAll"
            ).then((data) => {
              context.commit("request", {
                state: payload.state,
                data: data,
              });
            });
          });
        }
      } else if (payload.method === "getAll") {
        const idb = Idb.IndexedDB.indexedDBRequest(
          payload.idb.table,
          null,
          "getAll"
        );
        idb.then((data) => {
          context.commit("request", {
            state: payload.state,
            data: data,
          });
        });

        context.commit(
          "setSaleCompany",
          JSON.parse(localStorage.getItem("saleCompany"))
        );
      } else {
        Idb.IndexedDB.indexedDBRequest(
          payload.idb.table,
          payload.idb.data,
          payload.method
        );
      }
    }

    if (payload.url) {
      const request = Axios(config);
      request
        .then((resp) => {
          context.commit("request", {
            state: payload.state,
            data: resp.data,
          });
          context.commit("message", resp.data.success, { root: true });
        })
        .catch((err) => {
          if (err.response && err.response.data[0])
            context.commit("error", err.response.data[0].message, {
              root: true,
            });
          else if (err.response && err.response.data.message)
            context.commit("error", err.response.data.message, { root: true });
          else context.commit("error", err.response.data, { root: true });
        });

      return request;
    }
  },
};

export default actions;
