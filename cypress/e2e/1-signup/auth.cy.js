import loginData from './../../fixtures/signin.json'
import loginPage from './../../page/loginPage'

describe('Should attempt to login with', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    loginData.forEach(element => {
        it(`${element.userType}`, () => {
            loginPage.elements.signInBtn().click()
            loginPage.login(element.email, element.password)
            if(element.userType === 'valid'){
                cy.url().should('eq', 'https://ui-automation-camp.vercel.app/products')
            }
            if(element.userType === 'invalid password'){
                loginPage.elements.topErrorMessage().should('have.text', element.message)
            }
            if(element.userType === 'invalid username'){
                loginPage.elements.emailErrorMessage().should('have.text', element.message)
            }
        })
    })
})