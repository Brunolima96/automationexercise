class Contato{

    preencherFormularioDeContato(){

        cy.contains('Contact us').click()

        cy.get('.contact-form h2').should('be.visible').and('have.text','Get In Touch')

        cy.get('[data-qa="name"]')
        cy.get('[data-qa="email"]')
        cy.get('[data-qa="subject"]')
        cy.get('[data-qa="message"]')

        cy.fixture('example.json').as('File')
        cy.get('input[name="upload_file"]').selectFile("@File")
    }
}

export default new Contato();