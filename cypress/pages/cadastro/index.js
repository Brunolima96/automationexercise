import { faker } from '@faker-js/faker';

class Cadastro {

    preencherFormulario(){

        const timestamp = new Date().getTime()
        const signUpName = 'Teste Qa'

        Cypress.env('signUpName',signUpName)
        
        cy.get('a[href="/login"]').click()
        cy.get('[data-qa="signup-name"]').type(Cypress.env('signUpName'))
        cy.get('[data-qa="signup-email"]').type(`TesteQa${timestamp}@hotmail.com`)
        cy.contains('button','Signup').click()
        cy.get('#id_gender2').check() 
        cy.get('[type="password"]').type('12345',{log: false})

        cy.get('[data-qa="days"]').select(5)
        cy.get('[data-qa = "months"]').select('November')
        cy.get('[data-qa="years"]').select('1993')
        cy.get('#newsletter').check()
        cy.get('#optin').check()
        cy.get('[data-qa="first_name"]').type(faker.person.firstName())
        cy.get('[data-qa="last_name"]').type(faker.person.lastName())
        cy.get('[data-qa="company"]').type(faker.company.name())
        cy.get('[data-qa="address"]').type(faker.location.streetAddress())
        cy.get('[data-qa="country"]').select('United States')
        cy.get('[data-qa="state"]').type(faker.location.state())
        cy.get('[data-qa="city"]').type(faker.location.city())
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type('111 222 333')
        cy.get('[data-qa="create-account"]').click()
        cy.url().should('include','account_created')
        cy.get('[data-qa="account-created"]').should('have.text','Account Created!')
    
        cy.get('[data-qa="continue-button"]').click()
    

    }

    iniciarCadastro(email){
        cy.get('[data-qa="signup-name"]').type(faker.person.fullName())
        cy.get('[data-qa="signup-email"]').type(email)

        cy.contains('button','Signup').click()
    }
}

export default new Cadastro()