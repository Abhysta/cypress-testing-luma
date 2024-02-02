describe("Choose Product", () => {
  it("passes", () => {
    cy.chooseProduct(Cypress.env("email"), Cypress.env("passwordValid"));
  });
  it("Fail", () => {
    cy.chooseProductFail(Cypress.env("email"), Cypress.env("passwordValid"));
  });
});
