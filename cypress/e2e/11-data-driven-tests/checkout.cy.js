import cartPage from '../../page/cartPage'
import loginPage from './../../page/loginPage'
import mainPage from './../../page/mainPage'
import checkoutPage from './../../page/checkout'
import checkoutData from './../../fixtures/checkout.json'

describe('', () => {
    beforeEach(() => {
        cy.visit('/')
        loginPage.elements.signInBtn().click()
        loginPage.login('duran@user.com', 'NewPassword!23')
        cy.wait(3000)
        mainPage.addToCart()
        cartPage.elements.checkoutBtn().click()
    })

    checkoutData.forEach(element => {
        it(`should test for ${element.usertype}`, () => {
            if(element.usertype === 'blank form'){
                checkoutPage.completeCheckout(element.name, element.email, element.street, element.apt, element.city, element.zip)
                // checkoutPage.elements.emailErrorMessage().should('contain', element.emailError)
                checkoutPage.elements.zipErrorMessage().should('contain', element.zipError)
            }else{
                checkoutPage.completeCheckout(element.name, element.email, element.street, element.apt, element.city, element.zip)
                checkoutPage.elements.continueToPaymentBtn().click()
                if(element.usertype === 'completed billing form'){
                    cy.iframe('.snipcart-payment-card-form iframe').find('#card-number').should('be.visible')
                }else{
                    cy.iframe('.snipcart-payment-card-form iframe').find('#card-number').should('be.visible')
                    cy.iframe('.snipcart-payment-card-form iframe').find('#card-number').type(element.ccNum)
                    cy.iframe('.snipcart-payment-card-form iframe').find('#expiry-date').type(element.ccExpDate)
                    cy.iframe('.snipcart-payment-card-form iframe').find('#cvv').type(element.ccCvv)
                    checkoutPage.elements.placeOrderBtn().click()
                    checkoutPage.elements.orderConfirmationHeader().should('be.visible')
                    checkoutPage.elements.orderConfirmationHeader().should('have.text', element.confirmationText)
                }
            }
        })
    });

})