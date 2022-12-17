class ContactPage {

    elements = {
        
        inputFirstName : () => cy.get('#firstName'),
        inputLastName : () => cy.get('#lastName'),
        inputEmail : () => cy.get('#email'),
        inputSubject: () => cy.get('#subject'),
        inputMessage : () => cy.get('#message'),
        SendMessageBtn : () => cy.get('div.css-1pdqelo > button'),

        errorMessage : () => cy.get('div.css-170ki1a'),
        successPopup :()=> cy.get('.css-dixmdy'),
        successMessage : () => cy.get('.css-zycdy9')
    }

    completeContactForm(firstname, lastname, email, subject, message){
        this.elements.inputFirstName().type(firstname)
        this.elements.inputLastName().type(lastname)
        this.elements.inputEmail().type(email),
        this.elements.inputSubject().type(subject),
        this.elements.inputMessage().type(message)
        this.elements.SendMessageBtn().click()
    }
}

module.exports = new ContactPage()