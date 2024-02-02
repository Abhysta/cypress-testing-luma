describe("Create Account", () => {
  it("passes", () => {
    cy.Create(
      Cypress.env("firstName"),
      Cypress.env("lastName"),
      Cypress.env("email"),
      Cypress.env("passwordValid")
    );
  });

  it("Fail", () => {
    cy.CreateFail(
      Cypress.env("firstName"),
      Cypress.env("lastName"),
      Cypress.env("email"),
      Cypress.env("passwordValid"),
      Cypress.env("passwordInvalid")
    );
  });
});
