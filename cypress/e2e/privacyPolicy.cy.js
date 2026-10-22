describe('Suite de testes: Política de Privacidade', () => {
  beforeEach(() => {// antes de cada teste execute
      cy.visit('./src/privacy.html')// site que visita
  })

  it.only('TESTE01: Testa a política de privacidade de forma independente', () =>{
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    cy.contains('p', 'Talking About Testing').should('be.visible')
  })





})