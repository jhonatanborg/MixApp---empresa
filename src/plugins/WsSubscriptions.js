import Vue from "vue";

const userTopicSubscriptions = (id) => {
  if (id) {
    let subscription = Vue.ws.socket.getSubscription(`sock:${id}`);
    if (!subscription) {
      subscription = Vue.ws.subscribe(`sock:${id}`);
    }
    subscription.on("message", (data) => {
      console.log("message event", data);
    });
  }
};

export default async () => {
  return new Promise((resolve, reject) => {
    console.log(reject);

    Vue.ws.disconnect();
    Vue.ws.connect(
      {
        wsDomain: "ws://192.168.0.104:3333",
        jwtToken: null,
      },
      {
        path: "adonis-ws",
        reconnectionAttempts: 300,
        reconnectionDelay: 5000,
      }
    );
    Vue.ws.socket.on("open", () => {
      if (localStorage.getItem("companyId")) {
        userTopicSubscriptions(localStorage.getItem("companyId"));
        resolve();
      }
    });
  });
};
