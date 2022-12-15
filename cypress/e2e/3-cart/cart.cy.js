import loginPage from './../../page/loginPage'
import mainPage from './../../page/mainPage'
import cartPage from './../../page/cartPage'

describe('Verify that ', () => {
    const product = Math.floor(Math.random() * 22) + 1
    beforeEach(() => {
        cy.visit('/')
        loginPage.elements.signInBtn().click()
        loginPage.login('duran@user.com', 'NewPassword!23')
    })

    it('clicking the increase quantity button increases the product quantity', () => {
        mainPage.addToCart()
        cartPage.elements.itemQuantityCount().should('have.text', '1')
        cartPage.elements.increaseItemQuantityBtn().click()
        cartPage.elements.itemQuantityCount().should('have.text', '2')
    })
    it('clicking the decrease quantity button decreases the product quantity', () => {
        mainPage.elements.addToCartBtn(product).should('include.text', 'Add To Cart')
        cy.wait(3000)
        mainPage.elements.addToCartBtn(product).click()
        cy.visit('/products#/cart')
        cartPage.elements.continueShopping().click()
        mainPage.elements.addToCartBtn(product).click()
        cy.visit('/products#/cart')
        cartPage.elements.itemQuantityCount().should('have.text', '2')
        cartPage.elements.decreaseItemQuantityBtn().click()
        cartPage.elements.itemQuantityCount().should('have.text', '1')
    })
    it('the user is able to remove a product from the cart', () => {
        mainPage.addToCart()
        cy.wait(3000)
        cartPage.elements.deleteItemBtn().click()
        cartPage.elements.emptyCartMessage().should('have.text', ' Your cart is empty. ')
    })
})

