import loginPage from './../../page/loginPage'
import mainPage from './../../page/mainPage'
import cartPage from './../../page/cartPage'

describe('Verify that a user can', () => {

    const product = Math.floor(Math.random() * 22) + 1
    beforeEach(() => {
        cy.visit('/')
        loginPage.elements.signInBtn().click()
        loginPage.login('duran@user.com', 'NewPassword!23')
    })

    it('add a single product to the cart', () => {
        mainPage.elements.addToCartBtn(product).should('include.text', 'Add To Cart')
        cy.wait(3000)
        mainPage.elements.addToCartBtn(product).click()
        cy.visit('/products#/cart')
        cartPage.elements.shoppingBagIcon().should('have.text', ' 1 ')
    })
    it('add multiple products to the cart', () => {
        mainPage.elements.addToCartBtn(product).should('include.text', 'Add To Cart')
        cy.wait(3000)
        mainPage.elements.addToCartBtn(product).click()
        cy.visit('/products#/cart')
        cartPage.elements.continueShopping().click()
        mainPage.elements.addToCartBtn(product + 1).click()
        cy.visit('/products#/cart')
        cartPage.elements.shoppingBagIcon().should('have.text', ' 2 ')
    })
    it('add multiple of the same product adn it only increased the product quantity', () => {
        mainPage.elements.addToCartBtn(product).should('include.text', 'Add To Cart')
        cy.wait(3000)
        mainPage.elements.addToCartBtn(product).click()
        cy.visit('/products#/cart')
        cartPage.elements.continueShopping().click()
        mainPage.elements.addToCartBtn(product).click()
        cy.visit('/products#/cart')
        cartPage.elements.itemQuantityCount().should('have.text', '2')
    })
})