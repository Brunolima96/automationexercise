/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';
import cadastro from '../pages/cadastro';
import login from '../pages/login';
import menu from '../pages/menu';
import contato from '../pages/contato';
import subscricao from '../pages/subscricao';
import produtos from '../pages/produtos';
import cartao from '../pages/cartao';

describe('Automation Exercise', () => {

    const emailCadastrado = 'qa@hotmail.com'
    const senhaCadastrada = '12345'
    beforeEach('Visitar o site da aplicação',() =>{

        cy.visit('/');
    })

    it('Test Case 1: Cadastrar um usuário', () =>{
        cadastro.preencherFormulario();
        cy.get('i.fa-user').parent().should('contain',Cypress.env('signUpName'))
    })

    it('Test Case 2: Login User with correct  email and password', () => {
        
        
        menu.irParaLoginCadastro()

        login.preencherLogin(emailCadastrado,senhaCadastrada)

        cy.get('i.fa-user').parent().should('contain','rodolfo')
    });

    it('Test Case 3: Login User with incorrect  email and password', () => {
        
        menu.irParaLoginCadastro()   

        login.preencherLogin(emailCadastrado,'Senha incorreta')


        cy.get('.login-form form p').should('contain','Your email or password is incorrect!') 
    });

    it('Test Case 4: Logout User', () => {
        
        menu.irParaLoginCadastro()

        login.preencherLogin(emailCadastrado,senhaCadastrada)

        cy.contains('Logout').click()

        cy.url().should('contain','login')
        cy.contains("Login to your account").should("be.visible");
    })

    it('Test Case 5: Register User with existing email', () => {
        
        
        menu.irParaLoginCadastro()

        cadastro.iniciarCadastro(emailCadastrado)

        cy.get('.signup-form form p').should('be.visible').and('contain','Email Address already exist!')
    })

    it('Test Case 6:  Contact Us Form', () => {
              
        contato.preencherFormularioDeContato()

    })

    it('Test Case 8:  Verify All Products and product detail page', () => {
        
        menu.irParaProdutos();
        
        cy.url().should('contains','products')
        cy.get('.title').should('be.visible')

        cy.get('.single-products').should('be.visible').and('have.length.at.least', 1).first().parent().contains('View Product').click()

        cy.get('.product-information > h2').should('be.visible')
        cy.get('.product-information p').should('be.visible').and('have.length',4)
        cy.get('.product-information span span').should('be.visible')
    })

    it('Test Case 9: Search Product', () => {
        
        menu.irParaProdutos()
        produtos.pesquisarProdutos('Shirt')

        cy.get('.title').should('be.visible').and('contain','Searched Products')

        cy.get('.single-products').should('be.visible').and('have.length.at.least', 1)


    })

    it('Test Case 10:  Verify subscription in home page', () => {
        
        subscricao.enviarEmail();

    })

    it('Test Case 15:  Place Order: Register before Checkout', () => {
        
        cadastro.preencherFormulario()
        menu.irParaProdutos()
        produtos.adicionarProduto()
        cy.contains('h2','Address Details').should('be.visible')
        cy.contains('h2','Review Your Order').should('be.visible')
        produtos.buttonRealizarPedido()
      
        cartao.preencherDadosCartao()
        

        cy.get('[data-qa="order-placed"]').should('be.visible')

        cy.get('a[href="/delete_account"]').click()
        cy.get('[data-qa="account-deleted"]').should('have.text','Account Deleted!')
        cy.get('[data-qa="continue-button"]').click()
    })
});