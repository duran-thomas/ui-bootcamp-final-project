class Wishlist{

    elements = {

        addToFavoritesBtn : (index) => cy.get(`div .css-12qzrsi > div:nth-child(${index}) > div.css-n21gh5 > div > div > div.css-1m8iww1`),
        favoritesNavBarLink : () => cy.get('#top-favorite'),
        removeFromFavoritesBtn : () => cy.get('#remove-favorite-btn'),
        addProductPopUp : () => cy.get('div.css-hk9y3l'),
        removeProductPopUp : () => cy.get('div.css-10e2zkr'),
        productQuantityInput : (index) => cy.get(`div .css-12qzrsi > div:nth-child(${index}) > div.css-n21gh5 > div > div:nth-child(2) > input`)
    }
}

module.exports = new Wishlist()