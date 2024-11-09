class Produtos{

    pesquisarProdutos(nomeProduto){

        cy.get('input#search_product').type(nomeProduto)
        cy.get('button#submit_search').click()
    }

    adicionarProduto(){

        cy.contains('Add to cart').click()
        cy.contains('View Cart').click()
        cy.url().should('contain','view_cart')
        cy.get('#do_action .check_out').should('be.visible').as('buttonCheckout')
        cy.get('@buttonCheckout').click()
        cy.get('#ordermsg').type('Descrição de pagamento')
    }
    buttonRealizarPedido(){
        cy.get('a[href="/payment"]').click()
    }
}

export default new Produtos()