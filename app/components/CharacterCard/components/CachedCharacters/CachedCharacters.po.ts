export class CachedCharactersPO {
  static get root() {
    return cy.getByTestId('cached-characters')
  }

  static get cleasAllButton() {
    return cy.getByTestId('clear-all-btn')
  }

  static get cachedCharacterItems() {
    return cy.getByTestId('cached-character-item')
  }
}
