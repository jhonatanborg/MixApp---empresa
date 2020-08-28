module.exports = {
  apps: [
    {
      name: "personal",
      // cwd: "./food-service-admin",
      script: "npm",
      args: "run deploy",
      watch: false,
      env_production: {
        NODE_ENV: "production",
        VUE_APP_BASE_URL_SERVER_LOCAL: `https://server.mixentregas.com.br`,
        VUE_APP_WS: `wss://server.mixentregas.com.br`,
        VUE_APP_COMPANY_OBJECT_ID: 'emporio-do-caldo--caldos-e-massas-1598365451786',
        VUE_APP_COMPANY_ID: 36,
        VUE_APP_COMPANY_NAME: 'Empório do Caldo',
        VUE_APP_PORT: 8082
      }
    }
  ],
  deploy: {
    personal: {
      key: "~/.ssh/id_rsa",
      ssh_options: "ForwardAgent=yes",
      user: "node",
      host: "www.mixentregas.com.br",
      ref: "origin/master",
      repo: "git@github.com:jhonatanborg/MixApp---empresa.git",
      path: "/home/node/mixentregas/MixApp---empresa/",
      "pre-setup": "",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 startOrRestart ecosystem.config.js --env production"
    }
  }
};
