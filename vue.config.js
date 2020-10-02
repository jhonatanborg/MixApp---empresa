module.exports = {
  transpileDependencies: ["vuetify", "vue-tel-input-vuetify"],

  pwa: {
    themeColor: "#000000",
    name: "Mix Entregas",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "sw.js",
    },
  },
};
