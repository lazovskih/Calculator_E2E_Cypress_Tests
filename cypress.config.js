const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    specPattern: "src/**/*.cy.js",
  },
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.js",
    setupNodeEvents(on, config) {},
  },
  env: {
    baseUrl: "https://www.theonlinecalculator.com/",
  },
  video: true,
  videoCompression: 10,
  scrollBehavior: false,
  allowCypressEnv: false,
});
