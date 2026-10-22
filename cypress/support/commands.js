Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => { //cria um comando customizado chamado fillMandatoryFieldsAndSubmit
  cy.get('#firstName').type('Vitória') //busca o campo pelo ID e preenche com o nome
  cy.get('#lastName').type('Fonseca') //busca o campo pelo ID e preenche com o sobrenome
  cy.get('#email').type('vi.fon@example.com') //busca o campo pelo ID e preenche com o email
    cy.get('#open-text-area').type('Exemplo de conteúdo muito muito muito muito muito muito muito muito grande') //busca o campo pelo ID e preenche com o texto
    //para achar o nome do botão: acessa o site online, inspeciona o btn, em elemnts busca o type dele  que é submit
    cy.get('button[type = submit]').click() //clica na tag button do type submit

    // verificar a mensagem de sucesso
    cy.get('.success').should('be.visible')
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit2', data => { //cria um comando customizado chamado fillMandatoryFieldsAndSubmit
  cy.get('#firstName').type(data.firstName) //busca o campo pelo ID e preenche com o nome
  cy.get('#lastName').type(data.lastName) //busca o campo pelo ID e preenche com o sobrenome
  cy.get('#email').type(data.email) //busca o campo pelo ID e preenche com o email
    cy.get('#open-text-area').type(data.text) //busca o campo pelo ID e preenche com o texto
    //para achar o nome do botão: acessa o site online, inspeciona o btn, em elemnts busca o type dele  que é submit
    cy.get('button[type = submit]').click() //clica na tag button do type submit

    // verificar a mensagem de sucesso
    cy.get('.success').should('be.visible')
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit3', (data = {
  firstName: 'Lara',
  lastName: 'Roque',
  email: 'la.ro@example.com',
  text: 'Exemplo de conteúdo '
}) => { 
  cy.get('#firstName').type(data.firstName) 
  cy.get('#lastName').type(data.lastName)
  cy.get('#email').type(data.email)
  cy.get('#open-text-area').type(data.text) 
  cy.get('button[type = submit]').click() 
  cy.get('.success').should('be.visible')
})