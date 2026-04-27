export class CharacterDecriptionPO {
  static get root() {
    return cy.getByTestId('character-description')
  }

  static get characterImage() {
    return cy.getByTestId('character-image')
  }

  static get characterName() {
    return cy.getByTestId('character-name')
  }

  static get errorMessage() {
    return cy.getByTestId('error-message')
  }
}
