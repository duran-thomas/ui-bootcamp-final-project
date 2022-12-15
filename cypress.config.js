const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'https://ui-automation-camp.vercel.app',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
