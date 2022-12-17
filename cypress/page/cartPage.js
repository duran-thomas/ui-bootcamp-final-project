class CartPage {

    elements = {
        continueShopping : () => cy.get('#snipcart > div > div > header > button'),
        shoppingBagIcon : () => cy.get('#snipcart > div > div > header > div.snipcart-cart-header__options > button'),
        itemQuantityCount : () => cy.get('div.snipcart-item-quantity > div > div > span'),
        increaseItemQuantityBtn : () => cy.get('button[title="Increment quantity"]'),
        decreaseItemQuantityBtn : () => cy.get('button[title="Decrement quantity"]'),
        deleteItemBtn : () => cy.get('button[title="Remove item"]'),
        emptyCartMessage : () => cy.get('#snipcart > div > div > div.snipcart-layout__content > section > h1'),
        checkoutBtn : () => cy.get('footer > button.snipcart-base-button')
    }
}

module.exports = new CartPage()