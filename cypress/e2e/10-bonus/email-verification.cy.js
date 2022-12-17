/// <reference types="cypress-mailslurp" />

const loginPage = require("../../page/loginPage");

describe("Mailbox", function () {
  before(function () {
    return cy
      .mailslurp()
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
      .then(email => expect(email.subject).to.contain("Verify your email"))
      // extract the confirmation code from the email body
      .then((email) => {
        let emailBody = email.body;
        let link = emailBody.substring(
          emailBody.indexOf('text-decoration:none" >') + 23,
          emailBody.lastIndexOf("</a></div>"));
        cy.visit(link);
      })
    });
});
