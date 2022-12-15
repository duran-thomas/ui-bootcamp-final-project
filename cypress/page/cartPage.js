class CartPage {

    elements = {
        continueShopping : () => cy.get('#snipcart > div > div > header > button'),
        shoppingBagIcon : () => cy.get('#snipcart > div > div > header > div.snipcart-cart-header__options > button'),
        itemQuantityCount : () => cy.get('div.snipcart-item-quantity > div > div > span')
    }
}

module.exports = new CartPage()