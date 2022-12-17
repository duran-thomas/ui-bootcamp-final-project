

class CheckoutPage {

    elements = {
        inputFullName : () => cy.get('input[name="name"]'),
        inputEmail : () => cy.get('input[name="email"]'),
        inputStreetAddress : () => cy.get('input[name="address1"]'),
        streetDropDown : () => cy.get('ul.snipcart-typeahead__suggestions'),
        inputAptSuite : () => cy.get('input[name="address2"]'),
        inputCity : () => cy.get('input[name="city"]'),
        countryDropDown : () => cy.get('div.snipcart-form__select-wrapper > div > input.snipcart-typeahead__dropdown--no-focus'),
        inputProvince : () => cy.get('input[name="province"]'),
        inputZip : () => cy.get('input[name="postalCode"]'),

        emailErrorMessage : () => cy.xpath('//*[@id="snipcart-billing-form"]/div/fieldset/div[2]/div[2]'),
        cityErrorMessage : () => cy.xpath('//*[@id="snipcart-billing-form"]/div/div[2]/fieldset/div[2]/div[2]'),
        zipErrorMessage : () => cy.xpath('//*[@id="snipcart-billing-form"]/div/div[2]/fieldset/div[4]/div[2]/div[2]'),

        continueToPaymentBtn : () => cy.get('div.snipcart-form__footer > button'),
        placeOrderBtn : () => cy.get('div.snipcart-form__footer > button'),

        orderConfirmationHeader : () => cy.get('div.snipcart__box--title > div:nth-child(2) > h1')
    }

    completeCheckout(fullname, email, address, apt, city, zip){
        this.elements.inputFullName().type(fullname)
        this.elements.inputEmail().type(email),
        this.elements.inputStreetAddress().type(address)
        this.elements.streetDropDown().should('be.visible')
        this.elements.inputStreetAddress().type('{downArrow}')
        this.elements.inputStreetAddress().type('{enter}')
        this.elements.inputAptSuite().type(apt)
        this.elements.inputCity().type(city)
        this.elements.inputZip().type(zip)
    }
}

module.exports = new CheckoutPage()