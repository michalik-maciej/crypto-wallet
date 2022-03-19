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
    let oldBalance
    cy.get(`[data-testid=portfolio-green-netCost] > .MuiChip-label`).then(
      ($balance) => (oldBalance = $balance.text())
    )

    // go to homepage, search and select coin
    cy.findByRole('button', { name: /back to homepage/i }).click()
    cy.findByRole('textbox', { name: /coin search/i })
      .click()
      .type('cardano')
    cy.get(`#coinSearchField-option-0`).click()
    cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(1)').click()

    // add price and amount and click add transaction

    const coinQty = 100
    const coinPrice = 0.99

    cy.findByRole('radio', { name: /deposit/i }).click()
    cy.get(`#coinQuantity`).click().type(coinQty.toString())
    cy.get(`#pricePerCoin`).click().clear().type(coinPrice.toString())
    cy.findByRole('button', { name: /add transaction/i }).click()

    // go to portfolio
    cy.findByRole('button', { name: /user portfolio/i }).click()

    // verify change in portfolio balance on selected coin
    cy.get(`[data-testid=portfolio-green-netCost] > .MuiChip-label`).then(
      ($balance) => {
        console.log($balance.text())
        const convertedOldBalance = parseFloat(oldBalance.replace(/\$|,/g, ''))
        const convertedNewBalance = parseFloat(
          $balance.text().replace(/\$|,/g, '')
        )
        expect(convertedNewBalance - convertedOldBalance).to.equal(
          coinPrice * coinQty
        )
      }
    )
  })
})
