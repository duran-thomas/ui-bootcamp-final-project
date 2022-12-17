import mainPage from './../../page/mainPage'
import loginPage from './../../page/loginPage'
import productDetailsPage from './../../page/productDetails'
import cartPage from './../../page/cartPage'

describe('Verify that', () => {
    
    const product = Math.floor(Math.random() * 22) + 1
    beforeEach(() => {
        cy.visit('/')
        loginPage.elements.signInBtn().click()
        loginPage.login('duran@user.com', 'NewPassword!23')
        cy.wait(3000)
    })
    it('a user is able to add products to the cart from the product details page', () => {
        
        productDetailsPage.elements.selectProduct(product).click()
        productDetailsPage.elements.productDescription().should('be.visible')
        productDetailsPage.elements.addToCartBtn().click()
        cy.wait(3000)
        cy.visit('/products#/cart')
        cartPage.elements.shoppingBagIcon().should('have.text', ' 1 ')
    })
    it('a user is able to add products to the cart from the product details page', () => {
        productDetailsPage.elements.selectProduct(product).click()
        productDetailsPage.elements.productDescription().should('be.visible')
        productDetailsPage.elements.backToProductsBtn().click()
        cy.url().should('eq', 'https://ui-automation-camp.vercel.app/products')
        mainPage.elements.headerText().should('be.visible')
    })
    it('the product title is visible on the product details page', () => {
        let titleText
        const removeSpaces = (s) => s.replace(/\s/g, '')
        mainPage.elements.singleProductContainer(product)
        .find('.css-1n64n71')
        .then(($title) => {
            titleText = removeSpaces($title.text())
        })
        productDetailsPage.elements.selectProduct(product).click()
        productDetailsPage.elements.productDetailsTitleContainer()
        .find('.css-1dklj6k')
        .should(($prodDetailsTitle) => {
            const prodTitle = removeSpaces($prodDetailsTitle.text())
            expect(prodTitle, 'ID').to.equal(titleText)
        })
        
    })
})