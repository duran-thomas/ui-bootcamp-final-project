import { faker } from '@faker-js/faker';
import signUpData from './../../fixtures/signup.json'
import loginPage from './../../page/loginPage'

describe('Using data driven test to automate signup functionality', () => {
    beforeEach(() => {
        cy.visit('/')
        loginPage.elements.signInBtn().click()
    })

    signUpData.forEach(element => {
        it(`attempt to signup as a ${element.userType} user`, () => {
            loginPage.elements.signupTabLink().should('be.visible')
            loginPage.elements.signupTabLink().click()
            if(element.email === 'faker'){
                loginPage.login(faker.internet.email(), element.password)
                if(element.userType === 'standard'){
                    cy.url().should('eq', element.expectedUrl)
                }else{
                    loginPage.elements.passwordErrorMessage().should('have.text', element.message)
                }
            }else{
                loginPage.login(element.email, element.password)
                loginPage.elements.emailErrorMessage().should('have.text', element.message)
            }
        })
    });
})