describe('Navbar', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('navigates to the Login page when the Login button is clicked', () => {
      cy.contains('Login').click();
      cy.url().should('include', '/login');
    });
  
    it('navigates to the Sign up page when the Sign up button is clicked', () => {
      cy.contains('Sign up').click();
      cy.url().should('include', '/addUser');
    });
  
    it('navigates to the Home page when the Home button is clicked', () => {
      cy.contains('Home').click();
      cy.url().should('eq', 'http://localhost:3000/');
    });
  
    it('logs out and navigates to the root page when the Logout button is clicked', () => {
      
      cy.contains('Login').click();
      cy.get('input[name="username"]').type('admin');
      cy.get('input[name="password"]').type('password');
      cy.contains('Login').click();
  
     
      cy.contains('Logout').click();
  
     
      cy.url().should('eq', 'http://localhost:3000/');
    });
  });
  