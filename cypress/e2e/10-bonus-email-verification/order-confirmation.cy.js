/// <reference types="cypress-mailslurp" />

import loginPage from '../../page/loginPage'
import mainPage from './../../page/mainPage'
import cartPage from './../../page/cartPage'
import checkoutPage from './../../page/checkout'

describe("Order confirmation email verification", function () {
  before(function () {
    return cy.mailslurp()
      .then((mailslurp) => mailslurp.createInbox())
      .then((inbox) => {
        // save inbox id and email address to this (make sure you use function and not arrow syntax)
        cy.wrap(inbox.id).as("inboxId");
        cy.wrap(inbox.emailAddress).as("emailAddress");
      });
  });
  it('add product to cart and complete checkout flow', function() {
    cy.visit('/')
    loginPage.elements.signInBtn().click()
    loginPage.login('duran@user.com', "NewPassword!23")
    cy.url().should('eq', 'https://ui-automation-camp.vercel.app/products')
    cy.wait(2000)
    mainPage.addToCart()
    cartPage.elements.checkoutBtn().click()
    checkoutPage.completeCheckout('Duran Thomas', this.emailAddress, 'Liguanea Avenue', '123', ' ', '12345')
    checkoutPage.elements.continueToPaymentBtn().click()
    cy.iframe('.snipcart-payment-card-form iframe').find('#card-number').should('be.visible')
    cy.iframe('.snipcart-payment-card-form iframe').find('#card-number').type('4242 4242 4242 4242')
    cy.iframe('.snipcart-payment-card-form iframe').find('#expiry-date').type('05/26')
    cy.iframe('.snipcart-payment-card-form iframe').find('#cvv').type('123')
    checkoutPage.elements.placeOrderBtn().click()
    checkoutPage.elements.orderConfirmationHeader().should('be.visible')
    checkoutPage.elements.orderConfirmationHeader().should('have.text', 'Thank you for your order')
  })
  it('verify order confirmation email', function () {
    cy.mailslurp()
      .then((mailslurp) => mailslurp.waitForLatestEmail(this.inboxId, 30000, true))
      // extract the confirmation code from the email body
      .then((email) => {
        let emailBody = email.body;
        expect(emailBody).to.contain('Thank you for your order on ui-automation-camp.vercel.app.')
        expect(emailBody).to.contain(this.emailAddress)
      })
  })
});
