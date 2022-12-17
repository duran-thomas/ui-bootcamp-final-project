import cartPage from '../../page/cartPage'
import loginPage from './../../page/loginPage'
import mainPage from './../../page/mainPage'
import checkoutPage from './../../page/checkout'

describe('verify that', () => {
    beforeEach(() => {
        cy.visit('/')
        loginPage.elements.signInBtn().click()
        loginPage.login('duran@user.com', 'NewPassword!23')
        cy.wait(3000)
    })

    it('all required fields has to be filled out before moving to payment', () => {
        mainPage.addToCart()
        cartPage.elements.checkoutBtn().click()
        checkoutPage.completeCheckout('Duran', ' ', 'Liguanea Avenue', '123', ' ', ' ')
        checkoutPage.elements.continueToPaymentBtn().click()
        checkoutPage.elements.emailErrorMessage().should('contain', 'This field is required')
        checkoutPage.elements.zipErrorMessage().should('contain', 'This field is required')
    })
    it('a user is able to proceed to payment after filling out billing form', () => {
        mainPage.addToCart()
        cartPage.elements.checkoutBtn().click()
        checkoutPage.completeCheckout('Duran', 'duran@user.com', 'Liguanea Avenue', '123', ' ', '12345')
        checkoutPage.elements.continueToPaymentBtn().click()
        cy.iframe('.snipcart-payment-card-form iframe').find('#card-number').should('be.visible')
    })
    it('a user is taken to the order summary screen after successful payment', () => {
        mainPage.addToCart()
        cartPage.elements.checkoutBtn().click()
        checkoutPage.completeCheckout('Duran', 'duran@user.com', 'Liguanea Avenue', '123', ' ', '12345')
        checkoutPage.elements.continueToPaymentBtn().click()
        cy.iframe('.snipcart-payment-card-form iframe').find('#card-number').should('be.visible')
        cy.iframe('.snipcart-payment-card-form iframe').find('#card-number').type('4242 4242 4242 4242')
        cy.iframe('.snipcart-payment-card-form iframe').find('#expiry-date').type('05/26')
        cy.iframe('.snipcart-payment-card-form iframe').find('#cvv').type('123')
        checkoutPage.elements.placeOrderBtn().click()
        checkoutPage.elements.orderConfirmationHeader().should('be.visible')
        checkoutPage.elements.orderConfirmationHeader().should('have.text', 'Thank you for your order')
    })
})