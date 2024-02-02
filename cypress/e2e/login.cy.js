describe("Login Feature", () => {
  it("Passes Login", () => {
    cy.login(Cypress.env("email"), Cypress.env("passwordValid"));
  });

  it("Fail Login", () => {
    cy.loginFail(Cypress.env("email"), Cypress.env("passwordInvalid"));
  });
});
