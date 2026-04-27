import { CharacterCardPO } from "../../app/components/CharacterCard/CharachterCard.po"
import { CharacterDecriptionPO } from '../../app/components/CharacterCard/components/CharacterDescription/CharacterDescription.po'
import  {CachedCharactersPO} from '../../app/components/CharacterCard/components/CachedCharacters/CachedCharacters.po'

describe('Check squancy app', () => {
    beforeEach(() => {                                                                                                                                                                                   
        cy.clearLocalStorage()                                                                                                                                                                           
        cy.visit('http://localhost:3000')                                                                                                                                                                  
    })    
    
    it('tries to input not a number into search field', () => {
        CharacterCardPO.root.should('be.visible')
        CharacterCardPO.searchInput.type('August and May')
        CharacterCardPO.searchInput.find('input').should('not.have.value')
    })

    it('inputs a numeric value into search, uploads 2 characters', () => {
        cy.intercept('GET', '**/api/character/**').as('characterApi')

        CharacterCardPO.root.should('be.visible')
        CharacterCardPO.searchInput.type('1')
        CharacterCardPO.searchInput.find('input').should('have.value', '1')
        CharacterCardPO.searchButton.click()
        cy.get('@characterApi.all').should('have.length', 1)
        CharacterDecriptionPO.characterName.should('contain', 'Rick Sanchez')
        CharacterDecriptionPO.characterImage.should('have.attr', 'src').and('include', '1.jpeg')
        CachedCharactersPO.root.should('be.visible')

        CharacterCardPO.searchInput.find('input').clear()
        CharacterCardPO.searchInput.type('120')
        CharacterCardPO.searchButton.click()
        cy.wait('@characterApi')
        CachedCharactersPO.cachedCharacterItems.should('have.length', 2) 

        cy.log('Type 1 in input gield, check there was no api call')
        cy.intercept('GET', '**/api/character/**').as('cachedCheck')
        CharacterCardPO.searchInput.find('input').clear()
        CharacterCardPO.searchInput.type('1')
        CharacterCardPO.searchButton.click()
        CharacterDecriptionPO.characterName.should('contain', 'Rick Sanchez')
        CharacterDecriptionPO.characterImage.should('have.attr', 'src').and('include', '1.jpeg')
        cy.get('@cachedCheck.all').should('have.length', 0)

    })


    it('it fires error when chracter is not found', () => {
        cy.intercept('GET', '**/api/character/**', { statusCode: 404 }).as('characterApi')

        CharacterCardPO.searchInput.type('1200')
        CharacterCardPO.searchButton.click()
        cy.wait('@characterApi')
    })

    it('clears all cache', () => {
        cy.intercept('GET', '**/api/character/**').as('characterApi')
        CharacterCardPO.searchInput.type('1')
        CharacterCardPO.searchButton.click()
        cy.wait('@characterApi')
        CachedCharactersPO.cachedCharacterItems.should('have.length', 1)
        
        CachedCharactersPO.cleasAllButton.click()
        CachedCharactersPO.cachedCharacterItems.should('have.length', 0)
    })
})