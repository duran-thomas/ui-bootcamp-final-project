class ProductDetails {

    elements = {
        addToCartBtn : () => cy.get('#add-to-cart'),
        backToProductsBtn : () => cy.get('h2.css-18j379d'),
        selectProduct : (index) => cy.get(`div.css-12qzrsi > div:nth-child(${index}) > div.css-5ge9zd`),
        productDescription : () => cy.get('div.css-egoftb > p'),
        productDetailsTitle: () => cy.get('div.css-84zodg > h2.css-1dklj6k'),
        productDetailsTitleContainer : () => cy.get('div.css-84zodg')
    }
}

module.exports = new ProductDetails()