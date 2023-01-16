import faker from 'faker'
import * as Http from '../../support/login-mocks'
import * as FormHelper from '../../support/form-helper'

const populateFields = (): void => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(9))
}

const simulateValidSubmit = (): void => {
    populateFields()
    cy.getByTestId('submit').click()
}

describe('Login', () => {
    beforeEach(() => {
        cy.visit('login')
    })

    it('Should load with correct initial state', () => {
        cy.getByTestId('email').should('have.attr', 'readOnly')
        FormHelper.testInputStatus('email', 'Campo obrigatório')

        cy.getByTestId('password').should('have.attr', 'readOnly')
        FormHelper.testInputStatus('password', 'Campo obrigatório')

        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present error state if form is invalid', () => {
        cy.getByTestId('email').focus().type(faker.random.word())
        FormHelper.testInputStatus('email', 'Valor inválido')

        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
        FormHelper.testInputStatus('password', 'Valor inválido')

        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present valid state if form is valid', () => {
        cy.getByTestId('email').focus().type(faker.internet.email())
        FormHelper.testInputStatus('email')

        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(9))
        FormHelper.testInputStatus('password')

        cy.getByTestId('submit').should('not.have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present invalid credentials error on 401', () => {
        Http.mockInvalidCredentialsError()
        simulateValidSubmit()
        FormHelper.testMainError('Credenciais inválidas')
        FormHelper.testUrl('/login')
    })

    it('Should present UnexpectedError on 400', () => {
        Http.mockUnexpectedError()
        simulateValidSubmit()
        FormHelper.testMainError('Algo deu errado. Tente novamente em breve.')
        FormHelper.testUrl('/login')
    })

    it('Should present save account if valid credentials are provided', () => {
        Http.mockOK()
        simulateValidSubmit()
        cy.getByTestId('error-wrap').should('not.have.descendants')
        FormHelper.testUrl('/')
        FormHelper.testLocalStorageItem('account')
    })

    it('Should prevent multiple submits', () => {
        Http.mockOK()
        populateFields()
        cy.getByTestId('submit').dblclick()
        FormHelper.testHttpCallsCount(1)
    })

    it('Should present UnexpectedError if invalid data is returned', () => {
        Http.mockInvalidData()
        simulateValidSubmit()
        FormHelper.testMainError('Algo deu errado. Tente novamente em breve.')
        FormHelper.testUrl('/login')
    })

    it('Should not call submits if form is invalid', () => {
        Http.mockOK()
        cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
        FormHelper.testHttpCallsCount(0)
    })
})
