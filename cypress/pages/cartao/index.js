import { faker } from '@faker-js/faker';

class Cartao{

    preencherDadosCartao(){
        cy.get('[data-qa="name-on-card"]').type(faker.person.fullName())
        cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
        cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
        cy.get('[data-qa="expiry-month"]').type(10)
        cy.get('[data-qa="expiry-year"]').type(2030)
        cy.get('[data-qa="pay-button"]').click()

    }
    
}

export default new Cartao();