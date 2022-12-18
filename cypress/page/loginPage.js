class LoginPage {

    elements ={
        signInBtn : () => cy.get('.css-betff9'),
        inputEmail : () => cy.get('.auth0-lock-input-email > div > input'),
        inputPassword : () => cy.get('.auth0-lock-input-password > div > input'),
        loginBtn : () => cy.get('button[type="submit"]'),
        topErrorMessage : () => cy.get('div .auth0-global-message > span  > span'),
        emailErrorMessage : () => cy.get('div #auth0-lock-error-msg-email .auth0-lock-error-invalid-hint'),

        signupTabLink : () => cy.get('ul.auth0-lock-tabs > li:nth-child(2)')

    }

    login(username, password){
        this.elements.inputEmail().type(username)
        this.elements.inputPassword().type(password)
        this.elements.loginBtn().click()
    }
}

module.exports = new LoginPage()