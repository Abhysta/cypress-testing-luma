describe("Edit Account", () => {
  it("passes", () => {
    cy.editInformation(Cypress.env("email"), Cypress.env("passwordValid"));
  });

  it("fail", () => {
    cy.editInformationFail(Cypress.env("email"), Cypress.env("passwordValid"));
  });
});
