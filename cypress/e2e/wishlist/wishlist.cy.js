import wishlist from '../../page/wishlist'
import loginPage from './../../page/loginPage'
import mainPage from './../../page/mainPage'
import productDetailsPage from './../../page/productDetails'

describe('Verify that a user', () => {
    const product = Math.floor(Math.random() * 22) + 1
    beforeEach(() => {
        cy.visit('/')
        loginPage.elements.signInBtn().click()
        loginPage.login('duran@user.com', 'NewPassword!23')
        cy.wait(2000)
    })
    it('is able to add a single product to favorites', () =>{
        wishlist.elements.addToFavoritesBtn(product).click()
        wishlist.elements.addProductPopUp().should('be.visible')
        wishlist.elements.favoritesNavBarLink().click()
        mainPage.elements.allProductTitles().should('be.visible')
    })
    it('is able to add multiple products to favorites', () =>{
        wishlist.elements.addToFavoritesBtn(product).click()
        wishlist.elements.addProductPopUp().should('be.visible')
        if(product === 22){
            wishlist.elements.addToFavoritesBtn(product - 1).click()
        }else{
            wishlist.elements.addToFavoritesBtn(product + 1).click()
        }
        wishlist.elements.addProductPopUp().should('be.visible')
        wishlist.elements.favoritesNavBarLink().click()
        mainPage.elements.allProductTitles().should('have.length', 2)
    })
    it('is able to remove a product from favorites', () =>{
        wishlist.elements.addToFavoritesBtn(product).click()
        wishlist.elements.addProductPopUp().should('be.visible')
        wishlist.elements.favoritesNavBarLink().click()
        mainPage.elements.allProductTitles().should('be.visible')
        wishlist.elements.removeFromFavoritesBtn().click()
        wishlist.elements.removeProductPopUp().should('be.visible')
        mainPage.elements.allProductTitles().should('not.exist')
    })
    it('is unable to add a product to favorites with a quantity greater than 1', () => {
        wishlist.elements.productQuantityInput(product).type('{backSpace}'+ product)
        wishlist.elements.addToFavoritesBtn(product).click()
        wishlist.elements.addProductPopUp().should('be.visible')
        wishlist.elements.favoritesNavBarLink().click()
        mainPage.elements.allProductTitles().should('be.visible')
        wishlist.elements.productQuantityInput(1).should('not.eq', product)
    })
    it('is unable to search for products in favorites by typing favorites in the search bar', () =>{
        mainPage.elements.inputSearch().type('favorites')
        mainPage.elements.allProductTitles().should('not.exist')
    })
})