import loginPage from './../../page/loginPage'
import mainPage from './../../page/mainPage'

describe('Verify that ', () => {
    const product = Math.floor(Math.random() * 22) + 1
    beforeEach(() => {
        cy.visit("/");
        loginPage.elements.signInBtn().click();
        loginPage.login("duran@user.com", "NewPassword!23");
    })
    it('a user is able to search for a product by name', () => {
        mainPage.elements.productTitle(product).then((title) => {
            let searchTerm = title.text()

            mainPage.elements.inputSearch().type(searchTerm)
            mainPage.elements.allProductTitles().then((resultTitle) => {
                expect(resultTitle.text()).to.be.equal(searchTerm)
            })
        })
    })
    it('a product is not returned if the search term is invalid', () => {
        mainPage.elements.inputSearch().type('Random')
        mainPage.elements.allProductTitles().should('not.exist')
    })
    it('a product is displayed for partial searches', () => {
        mainPage.elements.inputSearch().type('mac')
        mainPage.elements.allProductTitles().then((title) => {
            expect(title.text()).to.be.equal('Mackbook Pro')
        })
    })
})