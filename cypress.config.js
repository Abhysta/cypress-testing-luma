const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://magento.softwaretestingboard.com/",
  },
  env: {
    firstName: "ays",
    lastName: "ta",
    email: "ays@gmail.com",
    passwordValid: "Ays1234567",
    passwordInvalid: "ays123",
  },
});
