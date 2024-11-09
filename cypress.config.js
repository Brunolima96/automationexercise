const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: "cypress/reports/html",
    overwrite: true,
    html: true,
    json: true,
    reportFilename: "index.html"  // define o nome do arquivo HTML final
  },
  e2e: {
    baseUrl: "https://automationexercise.com/",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});