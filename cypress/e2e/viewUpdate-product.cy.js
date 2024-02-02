describe("View and Update Product", () => {
  it("passes", () => {
    cy.viewUpdate(Cypress.env("email"), Cypress.env("passwordValid"));
  });

  it("Fail", () => {
    cy.viewUpdateFail(Cypress.env("email"), Cypress.env("passwordValid"));
  });
});
