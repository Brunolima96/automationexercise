class Subscricao{

    enviarEmail(){

        cy.get('input#susbscribe_email').scrollIntoView()
        cy.get('#susbscribe_email').type('Testee@Teste.com')
        cy.get('#subscribe').click()
        cy.get('.alert-success').should('contain','You have been successfully subscribed!')
    }
}

export default new Subscricao();