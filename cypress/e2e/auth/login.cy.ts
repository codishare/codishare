const email = Cypress.env('CYPRESS_EMAIL')
const password = Cypress.env('CYPRESS_PASSWORD')

describe('Account login attempt', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/es/auth/login')
    })

    it('required email', () => { 
        cy.get('button[type="submit"]').click()

        cy.get('.notification-content').first().should('contain.text', 'El correo electrónico es obligatorio') 
    })
    
    it('required password', () => {
        cy.get('input[name="email"]').type('admin@cypress.com')
        cy.get('button[type="submit"]').click()

        cy.get('.notification-content').first().should('contain.text', 'La contraseña es obligatoria')
    })

    it('should not login with invalid credentials', () => {
        cy.get('input[name="email"]').type('test@cypress.com')
        cy.get('input[name="password"]').type('random_password')
        cy.get('button[type="submit"]').click()
        cy.get('.notification-content').first().should('contain.text', 'Estas credenciales no coinciden con nuestros registros')
    })

    it('should login with valid credentials', () => {
        cy.get('input[name="email"]').type(email)
        cy.get('input[name="password"]').type(password)
        cy.get('button[type="submit"]').click()
        cy.url().should('include', 'http://localhost:3000/es')
    })
})