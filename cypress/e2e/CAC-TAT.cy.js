
//Suite de testes automatizados para a Central de Atendimento ao Cliente TAT

describe('Suite de testes: Central de Atendimento ao Cliente TAT', () => {
  
  beforeEach(() => {// antes de cada teste execute
      cy.visit('./src/index.html')// site que visita
  })

  it('TESTE CASE 001: Verifica o título da aplicação', () => {

    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT') //buca a tag Title no HTML
  })
 
  it('TESTE CASE 002: Preenche os campos obrigatórios e envia o formulário', () => {  //it.only -> executa somente aquele teste
    // na tela do cypress clicar na "mira" e colocar em cima dos campos para encontrar o selector CSS de cada um, use com cautela
    cy.get('#firstName').type('Vitória') //busca o campo pelo ID e preenche com o nome
    cy.get('#lastName').type('Fonseca') //busca o campo pelo ID e preenche com o sobrenome
    cy.get('#email').type('vi.fon@example.com') //busca o campo pelo ID e preenche com o email
    cy.get('#open-text-area').type('Exemplo de conteúdo muito muito muito muito muito muito muito muito grande', {delay: 0}) //busca o campo pelo ID e preenche com o texto
    //para achar o nome do botão: acessa o site online, inspeciona o btn, em elemnts busca o type dele  que é submit
    cy.get('button[type = submit]').click() //clica na tag button do type submit

    // verificar a mensagem de sucesso
    cy.get('.success').should('be.visible') //busca a classe success e verifica se está visível
  })

  it('TESTE CASE 003: Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    cy.get('#firstName').type('Vitória') 
    cy.get('#lastName').type('Fonseca') 
    cy.get('#email').type('vi.fon@example') //email fora do padrão
    cy.get('#open-text-area').type('Exemplo de conteúdo')
    cy.get('button[type = submit]').click()

    cy.get('.error').should('be.visible') //busca a classe error e verifica se está visível
  })

  it('TESTE CASE 004: Campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#firstName').type('Vitória') 
    cy.get('#lastName').type('Fonseca') 
    cy.get('#email').type('vi.fon@example.com') 
    cy.get('#phone').type('abc!@') //campo telefone preenchido com letras
    cy.get('#open-text-area').type('Exemplo de conteúdo')
    cy.get('button[type = submit]').click()

    cy.get('.success').should('be.visible') 
  })

  it('TESTE CASE 005:  Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Vitória') 
    cy.get('#lastName').type('Fonseca') 
    cy.get('#email').type('vi.fon@example.com') 
    cy.get('#open-text-area').type('Exemplo de conteúdo')
    cy.get('#phone-checkbox').click()
    cy.get('button[type = submit]').click()

    cy.get('.error').should('be.visible') //busca a classe error e verifica se está visível
  })

  it('TESTE CASE 006: Envia formulário com campos obrigatórios vazios', () => {
    cy.get('button[type = submit]').click()
    cy.get('.error').should('be.visible') //busca a classe error e verifica se está visível
  })

  it('TESTE CASE 007: Envia o formulário com todos os dados obrigatórios com suceso usando um comando customizado', () => {
    //criado o comando customizado fillMandatoryFieldsAndSubmit no arquivo commands.js, que preenche os campos obrigatórios e envia o formulário
    cy.fillMandatoryFieldsAndSubmit() //chama o comando customizado criado no arquivo commands.js
    cy.get('.success').should('be.visible') //busca a classe success e verifica se está visível
  })

  it('TESTE CASE 008: Envia o formulário com todos os dados obrigatórios com suceso usando um comando customizado que pode ser preenchido de formas diferentes', () => {
    const data = {
      firstName: 'Vitória',
      lastName: 'Fonseca',
      email: 'vi.fon@example.com',
      text: 'Exemplo de conteúdo muito muito muito muito muito muito muito muito grande'
    }
    cy.fillMandatoryFieldsAndSubmit2(data) //chama o comando customizado criado no arquivo commands.js, passando os dados como parâmetro
    cy.get('.success').should('be.visible') //busca a classe success e verifica se está visível
  })

  it('TESTE CASE 009: Envia o formulário com todos os dados obrigatórios com suceso usando um comando customizado que pode ser preenchido de formas diferentes e com valores default', () => {
    const data = {
      firstName: 'Vitória',
      lastName: 'Fonseca',
      email: 'vi.fon@example.com',
      text: 'Exemplo de conteúdo muito muito muito muito muito muito muito muito grande'
    }
    cy.fillMandatoryFieldsAndSubmit3(data) //chama o comando customizado criado no arquivo commands.js, passando os dados como parâmetro
    cy.get('.success').should('be.visible') //busca a classe success e verifica se está visível
  })

  it('TESTE CASE 010: Envia o formulário com todos os dados obrigatórios com suceso usando um comando customizado que pode ser preenchido de formas diferentes e com valores default', () => {
    cy.fillMandatoryFieldsAndSubmit3() //chama o comando customizado criado no arquivo commands.js
    cy.get('.success').should('be.visible') //busca a classe success e verifica se está visível
  })
  
  it('TESTE CASE 011: Envia o formulário buscando o nome do botão pelo contains', () => {
  cy.get('#firstName').type('Vitória') 
  cy.get('#lastName').type('Fonseca') 
  cy.get('#email').type('vi.fon@example.com')
  cy.get('#open-text-area').type('Exemplo de conteúdo') 
  cy.contains('button', 'Enviar').click() 
  cy.get('.success').should('be.visible')
  })  

  it('TESTE012: seleciona um produto (YouTube) por seu texto', () => {
    cy.get('select').select('YouTube').should('have.value', 'youtube') //seleciona o produto YouTube pelo texto
  })

  it('TESTE013: seleciona um produto (Mentoria) por seu valor', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria') //seleciona o produto Mentoria pelo texto
  })

  it('TESTE014: seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog') //seleciona o produto Blog pelo texto
  })

  it('TESTE015: marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked') //marca o tipo de atendimento Feedback
  })

  it('TESTE016: Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
    .each(typeOfServices=> {//each -> percorre cada elemento do array (typeOfServices) de elementos encontrados
        cy.wrap(typeOfServices) //wrap -> envolve o elemento para que possamos interagir com ele, empacota os elementos para que possamos interagir com eles
          .check().should('be.checked') //marca o tipo de atendimento Feedback
    })
  })

  it('TESTE017: Marca ambos os checkbox e depois desmarca o último', () => {
    //cy.get('#email-checkbox')
    //cy.get('#phone-checkbox')
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked') //marca ambos os checkbox
    .last()
    .uncheck()
    .should('not.be.checked') //desmarca o último checkbox
  })

  it('TESTE018 : Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Vitória') 
    cy.get('#lastName').type('Fonseca') 
    cy.get('#email').type('vi.fon@example.com') 
    cy.get('#open-text-area').type('Exemplo de conteúdo')  
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click() 
    cy.get('.error').should('be.visible')

  })

  it('TESTE019 : Selecionando arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should(input =>{
      expect(input[0].files[0].name).to.equal('example.json')//compara se o nome do arquivo enviado é de fato o mesmo do arquivo selecionado
    }) //seleciona o arquivo example.json da pasta fixtures
  })
   
  it('TESTE020 : Selecionando arquivo simulando um drag and drop', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop' })//simula como se o usuário estivesse arrastando o arquivo para a área de upload
    //primeiro argumento é o arquivo de upload, e o segundo é o objeto de configuração, que nesse caso é o action: 'drag-drop' que simula o arrastar e soltar
    .should(input =>{
      expect(input[0].files[0].name).to.equal('example.json')//compara se o nome do arquivo enviado é de fato o mesmo do arquivo selecionado
    }) //seleciona o arquivo example.json da pasta fixtures
  })

  it('TESTE021 : Selecionando arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile') //cria um alias para o arquivo example.json da pasta fixtures
    cy.get('#file-upload')
    .selectFile('@sampleFile')
    .should(input =>{
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('TESTE022: Verifica que a política de privacidade abre em outra aba sem a necessdiade de um click', () =>{
    cy.contains('a', 'Política de Privacidade')//clica no link de política de privacidade
      .should('have.attr','href', 'privacy.html')//tem o atributo que o link abre a página privacy.html
      .and('have.attr', 'target', '_blank')// e verifrica se ele abre em uma nova aba ( target -> nova aba)
      //and substitui um segundo should
  })

  it('TESTE023: Acessa a página de política de privacidade removendo o target e então clicando no link', () =>{
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr','target')//remove a ida para outra página e clica no link
      .click()
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')//busca o texto do titulo da págian de política
  })








})
