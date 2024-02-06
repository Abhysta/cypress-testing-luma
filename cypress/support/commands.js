// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("Create", (firstName, lastName, email, password) => {
  cy.visit("/");
  cy.contains("Create an Account").click();
  cy.get("input[id=firstname]").type(firstName);
  cy.get("input[id=lastname]").type(lastName);
  cy.get("input[id=email_address]").type(email);
  cy.get("input[id=password]").type(password);
  cy.get("input[id=password-confirmation]").type(password);

  cy.get("button span")
    .should("contain", "Create an Account")
    .click({ multiple: true, force: true });
});

Cypress.Commands.add(
  "CreateFail",
  (firstName, lastName, email, passwordValid, passwordInvalid) => {
    cy.visit("/");
    cy.contains("Create an Account").click();
    cy.get("input[id=firstname]").type(firstName);
    cy.get("input[id=lastname]").type(lastName);
    cy.get("input[id=email_address]").type(email);
    cy.get("input[id=password]").type(passwordValid);
    cy.get("input[id=password-confirmation]").type(passwordInvalid);

    cy.get("button span")
      .should("contain", "Create an Account")
      .click({ multiple: true, force: true });

    cy.contains("Please enter the same value again.");
  }
);

Cypress.Commands.add("login", (email, passwordValid) => {
  cy.visit("/");
  cy.clearCookie("section_data_ids");
  cy.contains("Sign In").click();
  cy.get("input[id=email]").type(email);
  cy.get("input[id=pass]").type(passwordValid);
  cy.get("button[id=send2]").click();
  cy.wait(5000);
  cy.contains("Welcome");
});

Cypress.Commands.add("loginFail", (email, passwordInvalid) => {
  cy.visit("/");
  cy.contains("Sign In").click();
  cy.get("input[id=email]").type(email);
  cy.get("input[id=pass]").type(passwordInvalid);
  cy.get("button[id=send2]").click();
  cy.contains(
    "The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later."
  );
});

Cypress.Commands.add("toMyAccount", (email, passwordValid) => {
  cy.login(email, passwordValid);
  cy.get("button[data-action=customer-menu-toggle]").click({
    multiple: true,
    force: true,
  });
  cy.get(".header .links li a:first").should("contain", "My Account").click({
    multiple: true,
    force: true,
  });
});

Cypress.Commands.add("editInformation", (email, passwordValid) => {
  cy.toMyAccount(email, passwordValid);
  cy.get(".box-information >.box-actions > .action.edit span")
    .should("contain", "Edit")
    .click({
      force: true,
    });

  cy.get("input[id=firstname]").clear().type("ays");
  cy.get("input[id=lastname]").clear().type("ta");
  cy.get(".primary > .save > span")
    .should("contain", "Save")
    .click({ multiple: true });
  cy.contains("You saved the account information.");
});

Cypress.Commands.add("editInformationFail", (email, passwordValid) => {
  cy.toMyAccount(email, passwordValid);
  cy.get(".box-information >.box-actions > .action.edit span")
    .should("contain", "Edit")
    .click({
      force: true,
    });

  cy.get("input[id=firstname]").clear().type("ays");
  cy.get("input[id=lastname]").clear();
  cy.get(".primary > .save > span")
    .should("contain", "Save")
    .click({ multiple: true });
  cy.contains("This is a required field.");
});

Cypress.Commands.add("editAddress", (email, passwordValid) => {
  cy.toMyAccount(email, passwordValid);
  cy.get(".box-billing-address >.box-actions > .action.edit span")
    .should("contain", "Edit Address")
    .click({
      force: true,
    });

  cy.get("input[id=company]").clear().type("SanberCode");
  cy.get("input[id=telephone]").clear().type("08123456789");
  cy.get("input[id=street_1]").clear().type("111 US");
  cy.get("input[id=city]").clear().type("Virginia");
  cy.get("select[id=region_id]").select("Virginia").should("have.value", "61");
  cy.get("input[id=zip]").clear().type("12345");
  cy.get("select[id=country]")
    .select("United States")
    .should("have.value", "US");
  cy.get("button[data-action=save-address]").click();
  cy.contains("You saved the address.");
});

Cypress.Commands.add("editAddressFail", (email, passwordValid) => {
  cy.toMyAccount(email, passwordValid);
  cy.get(".box-billing-address >.box-actions > .action.edit span")
    .should("contain", "Edit Address")
    .click({
      force: true,
    });

  cy.get("input[id=company]").clear().type("SanberCode");
  cy.get("input[id=telephone]").clear();
  cy.get("input[id=street_1]").clear().type("111 US");
  cy.get("input[id=city]").clear().type("Virginia");
  cy.get("select[id=region_id]").select("Virginia").should("have.value", "61");
  cy.get("input[id=zip]").clear().type("12345");
  cy.get("select[id=country]")
    .select("United States")
    .should("have.value", "US");
  cy.get("button[data-action=save-address]").click();
  cy.contains("This is a required field.");
});

Cypress.Commands.add("chooseProduct", (email, passwordValid) => {
  cy.login(email, passwordValid);
  cy.get("a[id=ui-id-3]").click({
    multiple: true,
  });
  cy.get(
    "#maincontent > div.columns > div.sidebar.sidebar-main > div > div > ul:nth-child(4) > li:nth-child(2) > a"
  ).click({
    multiple: true,
  });
  cy.get(
    "div.products.wrapper.grid.products-grid > ol > li:nth-child(1) > div > div > strong > a"
  )
    .should("contain", "Proteus Fitness Jackshirt")
    .click();
  cy.get("div[id=option-label-size-143-item-168]").click();
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  cy.get("div[id=option-label-color-93-item-50]").click();
  cy.get("button[id=product-addtocart-button]").click();
});

Cypress.Commands.add("chooseProductFail", (email, passwordValid) => {
  cy.login(email, passwordValid);
  cy.get("a[id=ui-id-3]").click({
    multiple: true,
  });
  cy.get(
    "#maincontent > div.columns > div.sidebar.sidebar-main > div > div > ul:nth-child(4) > li:nth-child(2) > a"
  ).click({
    multiple: true,
  });
  cy.get(
    "div.products.wrapper.grid.products-grid > ol > li:nth-child(1) > div > div > strong > a"
  )
    .should("contain", "Proteus Fitness Jackshirt")
    .click();
  cy.get("div[id=option-label-size-143-item-168]").click();
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  cy.get("button[id=product-addtocart-button]").click();
  cy.contains("This is a required field.");
});

Cypress.Commands.add("viewCart", (email, passwordValid) => {
  cy.login(email, passwordValid);
  cy.get("div[data-block=minicart]").click();
  cy.get("div.block-content > div:nth-child(7) > div > a > span").click();
});

Cypress.Commands.add("viewUpdate", (email, passwordValid) => {
  cy.viewCart(email, passwordValid);
  cy.get("input[data-cart-item-id=MJ12-M-Blue]").clear().type("3");
  cy.get("button[data-cart-item-update]").click();
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
});

Cypress.Commands.add("viewUpdateFail", (email, passwordValid) => {
  cy.viewCart(email, passwordValid);
  cy.get("input[data-cart-item-id=MJ12-M-Blue]").clear().type("0");
  cy.get("button[data-cart-item-update]").click();
  cy.contains("This is a required field.");
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
});

Cypress.Commands.add("checkOut", (email, passwordValid) => {
  cy.viewCart(email, passwordValid);
  cy.wait(5000);
  cy.get("div.cart-summary > ul > li:nth-child(1) > button > span").click({
    force: true,
  });
  cy.wait(20000);
  cy.get("input[name=ko_unique_2]").click();
  cy.get("button[data-role=opc-continue]").click();
  cy.wait(15000);
  cy.get("button.action.primary.checkout").click();
  cy.contains("Thank you for your purchase!");
});

Cypress.Commands.add("checkOutFail", (email, passwordValid) => {
  cy.viewCart(email, passwordValid);
  cy.wait(5000);
  cy.get("div.cart-summary > ul > li:nth-child(1) > button > span").click({
    force: true,
  });
  cy.wait(20000);
  cy.get("input[name=ko_unique_2]").click();
  cy.get("button[data-role=opc-continue]").click();
  cy.wait(15000);
  cy.get("input[name=billing-address-same-as-shipping]").click();
  cy.get("button.action.primary.checkout").should("have.class", "disabled");
});
