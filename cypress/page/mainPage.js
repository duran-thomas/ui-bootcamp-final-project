class MainPage {

    elements = {
        addToCartBtn : (index) => cy.get(`div.css-12qzrsi > div:nth-child(${index}) > button`),
        productTitle : (index) => cy.get(`div .css-12qzrsi > div:nth-child(${index}) > div.css-n21gh5 > div > div > p.css-1n64n71`),
        productPrice : (index) => cy.get(`div .css-12qzrsi > div:nth-child(${index}) > div.css-n21gh5 > div > div:nth-child(3) > p.css-0`),
        productContainer : () => cy.get('.chakra-stack.css-uaqjf')
    }

    addToCart(){
        const product = Math.floor(Math.random() * 22) + 1
        this.elements.addToCartBtn(product).should('include.text', 'Add To Cart')
        cy.wait(3000)
        this.elements.addToCartBtn(product).click()
        cy.visit('/products#/cart')
    }
}

module.exports = new MainPage() 