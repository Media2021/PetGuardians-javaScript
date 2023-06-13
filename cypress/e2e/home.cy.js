
describe('home page ', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
  
    describe('Home component', () => {
        it('searches for pets by type', () => {
          const searchInput = 'CAT'; 
          cy.get('input[placeholder="             Search by pet type (CAT or DOG)"]').type(searchInput);
         
        });
    
        it('redirects to the login page when the "Adopt" button is clicked', () => {
            cy.get('.pet-card').first().within(() => {
              cy.contains('Adopt').click();
            });
          
            cy.url().should('include', '/login');
            
          });
          
      });
    });
  