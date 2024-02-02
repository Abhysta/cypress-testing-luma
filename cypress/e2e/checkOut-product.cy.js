describe("Check Out Product", () => {
  it("Pass", () => {
    cy.checkOut(Cypress.env("email"), Cypress.env("passwordValid"));
  });
  it("Fail", () => {
    cy.checkOutFail(Cypress.env("email"), Cypress.env("passwordValid"));
  });
});
