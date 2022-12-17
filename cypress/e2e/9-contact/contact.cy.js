import contactPage from '../../page/contactPage'
import loginPage from './../../page/loginPage'
import mainPage from './../../page/mainPage'

describe('Verify that a user', () => {
    beforeEach(() => {
        cy.visit('/')
        loginPage.elements.signInBtn().click()
        loginPage.login('duran@user.com', 'NewPassword!23')
        mainPage.elements.contactNavBarLink().click()
    })

    it('is unable to submit the form without filling out the required fields', () => {
        contactPage.elements.SendMessageBtn().should('exist')
        contactPage.elements.SendMessageBtn().click()
        contactPage.elements.errorMessage().should((error) => {
            for (let index = 0; index < error.length; index++) {
               expect(error[index].innerText).to.equal('Field is required!')
            }
        })
    })
    it('can only send message using a valid email address', () => {
        contactPage.completeContactForm('Duran', 'Thomas', 'duran', 'UI Bootcamp', 'UI bootcamp final project')
        contactPage.elements.errorMessage().should('have.text', 'Email is invalid')
    }) 
    it('is notified when a message is successfully sent', () => {
        contactPage.completeContactForm('Duran', 'Thomas', 'duran@user.com', 'UI Bootcamp', 'UI bootcamp final project')
        contactPage.elements.successPopup().should('be.visible', {setTimeout: 1000})
        contactPage.elements.successMessage().should((message) => {
            expect(message.text()).to.equal('Your message has been sent!')
        })
    })
})