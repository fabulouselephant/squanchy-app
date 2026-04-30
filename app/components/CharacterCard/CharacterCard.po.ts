export class CharacterCardPO {
  static get root() {
    return cy.getByTestId('character-card')
  }

  static get searchInput() {
    return cy.getByTestId('search-input')
  }

  static get searchButton() {
    return cy.getByTestId('search-btn')
  }
}
