const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl: "https://ui-automation-camp.vercel.app",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  env: {
    CYPRESS_MAILSLURP_API_KEY : "cee47b255c6c6be47ca71d644c357c64df32fdbedaea0b914dc0b055a037cc15",
    MAILSLURP_API_KEY: "cee47b255c6c6be47ca71d644c357c64df32fdbedaea0b914dc0b055a037cc15"
  },
  defaultCommandTimeout: 30000,
  responseTimeout: 30000,
  requestTimeout: 30000
});
