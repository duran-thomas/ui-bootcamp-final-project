class MainPage {

    elements = {
        addToCartBtn : (index) => cy.get(`div.css-12qzrsi > div:nth-child(${index}) > button`),
        productTitle : (index) => cy.get(`div .css-12qzrsi > div:nth-child(${index}) > div.css-n21gh5 > div > div > p.css-1n64n71`),
        productPrice : (index) => cy.get(`div .css-12qzrsi > div:nth-child(${index}) > div.css-n21gh5 > div > div:nth-child(3) > p.css-0`),
        productContainer : () => cy.get('.chakra-stack.css-uaqjf'),
        singleProductContainer : (index) => cy.get(`div .css-12qzrsi > div:nth-child(${index})`),
        headerText : () => cy.get('.css-122rm4p'),
        sortOptions : () => cy.get('#sort'),
        categoryOptions : () => cy.get('#category'),
        allProductPrices: () => cy.get('div .css-12qzrsi > div > div.css-n21gh5 > div > div:nth-child(3) > p.css-0'),
        allProductTitles: () => cy.get('div .css-12qzrsi > div > div.css-n21gh5 > div > div > p.css-1n64n71'),
        allProductCategories: () => cy.get('div .css-12qzrsi > div > div.css-n21gh5 > div > div:nth-child(3) > span'),
        resetBtn : () => cy.get('#reset'),
        inputSearch : () => cy.get('#search'),
        contactNavBarLink : () => cy.get('#top-contact')
    }

    addToCart(){
        const product = Math.floor(Math.random() * 22) + 1
        this.elements.addToCartBtn(product).should('include.text', 'Add To Cart')
        cy.wait(3000)
        this.elements.addToCartBtn(product).click()
        cy.visit('/products#/cart')
    }

    getProductList(selector) {
        let prices = [];
        return new Cypress.Promise((resolve) => {
          cy.get(selector)
            .each(($el, $index) => {
              let price = $el.text().replace("$", "");
              prices.push(Number(price));
            })
            .then(() => resolve(prices));
        });
      }
}

module.exports = new MainPage() 