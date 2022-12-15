class MainPage {

    elements = {
        addToCartBtn : (index) => cy.get(`div.css-12qzrsi > div:nth-child(${index}) > button`),
        productTitle : (index) => cy.get(`div .css-12qzrsi > div:nth-child(${index}) > div.css-n21gh5 > div > div > p.css-1n64n71`),
        productPrice : (index) => cy.get(`div .css-12qzrsi > div:nth-child(${index}) > div.css-n21gh5 > div > div:nth-child(3) > p.css-0`),
    }
}

module.exports = new MainPage() 