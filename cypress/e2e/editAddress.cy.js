describe("Edit Address", () => {
  it("passes", () => {
    cy.editAddress(Cypress.env("email"), Cypress.env("passwordValid"));
  });

  it("fail", () => {
    cy.editAddressFail(Cypress.env("email"), Cypress.env("passwordValid"));
  });
});
