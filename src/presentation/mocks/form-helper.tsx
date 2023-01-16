import faker from 'faker'
import { fireEvent, screen } from '@testing-library/react'

export const testStatusForField = (fieldName: string, validationError: string = ''): void => {
    const wrap = screen.queryByTestId(`${fieldName}-wrap`)
    const field = screen.queryByTestId(fieldName)
    const label = screen.queryByTestId(`${fieldName}-label`)

    expect(wrap).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid')
    expect(field).toHaveProperty('title', validationError)
    expect(label).toHaveProperty('title', validationError)
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
    const input = screen.queryByTestId(fieldName)
    fireEvent.input(input, { target: { value } })
}
