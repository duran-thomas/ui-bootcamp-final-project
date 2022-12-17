import loginPage from './../../page/loginPage'
import mainPage from './../../page/mainPage'

describe('Verify that each product', () => {
    beforeEach(() => {
        cy.visit('/')
        loginPage.elements.signInBtn().click()
        loginPage.login('duran@user.com', 'NewPassword!23')
    })

    it('Verify that each product has a title', () => {
        mainPage.elements.productContainer().each(($el, index, $list) => {
            cy.wrap($el).children('.chakra-stack.css-n21gh5')
            .children('.chakra-stack.css-46p1lt').children('.chakra-stack.css-1oeb4ru')
            .children('p.chakra-text.css-1n64n71').should('exist')
        })
    })
    it('Verify that each product has a price', () => {
        mainPage.elements.productContainer().each(($el, index, $list) => {
            cy.wrap($el).children('.chakra-stack.css-n21gh5')
            .children('.chakra-stack.css-46p1lt').children('.chakra-stack.css-1ieohnc')
            .children('p.chakra-text.css-0').should('exist')
        })
    })
    it('Verify that each product has a category', () => {
        mainPage.elements.productContainer().each(($el, index, $list) => {
            cy.wrap($el).children('.chakra-stack.css-n21gh5')
            .children('.chakra-stack.css-46p1lt').children('.chakra-stack.css-1ieohnc')
            .children('.css-1ccau2i').should('exist')
        })
    })
})