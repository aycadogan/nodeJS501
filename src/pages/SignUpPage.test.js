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

    it('has an email input', () => {
        render(<SignUpPage />)
        const input = screen.getByLabelText("Email")
        expect(input).toBeInTheDocument()
    })

    it('has a password input', () => {
        render(<SignUpPage />)
        const input = screen.getByLabelText("Password")
        expect(input).toBeInTheDocument()
    })

    it('has a password type for password input', () => {
        render(<SignUpPage />)
        const input = screen.getByLabelText("Password")
        expect(input.type).toBe("password")
    })

    it('has a confirm password input', () => {
        render(<SignUpPage />)
        const input = screen.getByLabelText("Confirm Password")
        expect(input).toBeInTheDocument()
    })

    it('has a password type for confirm password input', () => {
        render(<SignUpPage />)
        const input = screen.getByLabelText("Confirm Password")
        expect(input.type).toBe("password")
    })

    it('has a Sign Up button', () => {
        render(<SignUpPage />)
        const button = screen.queryByRole("button", { name: "Sign Up" })
        expect(button).toBeInTheDocument()
    })

    it('disables the button initially', () => {
        render(<SignUpPage />)
        const button = screen.queryByRole("button", { name: "Sign Up" })
        expect(button).toBeDisabled()
    })

})
