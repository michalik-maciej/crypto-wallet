/* eslint-disable no-return-assign */
/* eslint-disable no-undef */

describe('transaction', () => {
  it('should create a transaction', () => {
    // login
    cy.visit('http://localhost:3000/')
    cy.findByRole('button', { name: /login form/i }).click()
    cy.findByRole('textbox', { name: /email address/i }).type('test@e.mail')
    cy.findByLabelText(/password/i).type('1234')
    cy.findByRole('button', { name: /login/i }).click()

    // check portfolio balance
    cy.findByRole('button', { name: /user portfolio/i }).click()
    let accountBalanceOld = 0
    cy.get(`[data-testid=portfolio-heading]`).then(
      (balance) => (accountBalanceOld += balance.text())
    )
    // go to homepage, search and select coin
    cy.findByRole('button', { name: /back to homepage/i }).click()
    cy.findByRole('textbox', { name: /coin search/i })
      .click()
      .type('cardano')
    cy.get(`#coinSearchField-option-0`).click()
    cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(1)').click()

    // add price and amount and click add transaction
    cy.findByRole('radio', { name: /deposit/i }).click()
    cy.get(`#coinQuantity`).click().type('100')
    cy.get(`#pricePerCoin`).click().clear().type('0.99')
    cy.findByRole('button', { name: /add transaction/i }).click()

    // go to portfolio
    cy.findByRole('button', { name: /user portfolio/i }).click()

    // verify change in portfolio balance on selected coin
  })
})
