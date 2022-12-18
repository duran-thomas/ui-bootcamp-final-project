/// <reference types="cypress-mailslurp" />

import loginPage from '../../page/loginPage'

describe("Signup email verification", function () {
  before(function () {
    return cy.mailslurp()
      .then((mailslurp) => mailslurp.createInbox())
      .then((inbox) => {
        // save inbox id and email address to this (make sure you use function and not arrow syntax)
        cy.wrap(inbox.id).as("inboxId");
        cy.wrap(inbox.emailAddress).as("emailAddress");
      });
  });
  it("signup using email address", function () {
    cy.visit("/");
    loginPage.elements.signInBtn().click();
    loginPage.elements.signupTabLink().click();
    loginPage.elements.inputEmail().type(this.emailAddress);
    loginPage.elements.inputPassword().type("NewPassword!23");
    loginPage.elements.loginBtn().click();
  });
  it("should receive confirmation email", function () {
    cy.mailslurp()
      .then((mailslurp) => mailslurp.waitForLatestEmail(this.inboxId, 30000, true))
      // extract the confirmation code from the email body
      .then((email) => {
        let emailBody = email.body;
        expect(emailBody).to.contain('Verify Your Account')
      })
    });
  it('should be able to login using the credentials above', function () {
    cy.visit('/')
    loginPage.elements.signInBtn().click()
    loginPage.login(this.emailAddress, "NewPassword!23")
    cy.url().should('eq', 'https://ui-automation-camp.vercel.app/products')
  })
});
