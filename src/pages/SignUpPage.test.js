import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {rest} from 'msw'
import {setupServer} from 'msw/node'

import SignUpPage from './SignUpPage'

describe("Layout", () => {

it('has a header', () => {
    render(<SignUpPage />)
    const header = screen.queryByRole("heading", { name: "Sign Up"})
    expect(header).toBeInTheDocument()
})

it('has a username input', () => {
    render(<SignUpPage />)
    const input = screen.getByLabelText("Username")
    expect(input).toBeInTheDocument()
})


})
