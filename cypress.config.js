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
    MAILSLURP_API_KEY: "5338fd8dc2ae9fba79a2ae4e6ae0aed84899996c976310381798b2c2643d0da7"
  },
  defaultCommandTimeout: 30000,
  responseTimeout: 30000,
  requestTimeout: 30000
});
