import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {rest} from 'msw'
import {setupServer} from 'msw/node'

import SignUpPage from './SignUpPage'


const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

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

describe("Interactions", () => {

    let signUpButton

    const init = () => {
        render(<SignUpPage />)
        const usernameInput = screen.getByLabelText("Username")
        const emailInput = screen.getByLabelText("Email")
        const passwordInput = screen.getByLabelText("Password")
        const confirmPasswordInput = screen.getByLabelText("Confirm Password")

        userEvent.type(usernameInput, 'hoge')
        userEvent.type(emailInput, 'hoge@hoge.com')
        userEvent.type(passwordInput, '123')
        userEvent.type(confirmPasswordInput, '123')

        signUpButton = screen.queryByRole("button", { name: "Sign Up"})
        
        userEvent.click(signUpButton)
    }

    it("enables the sign up button when password field and confirm password field has same value", () => {
        render(<SignUpPage />)
        const passwordInput = screen.getByLabelText("Password")
        const confirmPasswordInput = screen.getByLabelText("Confirm Password")

        userEvent.type(passwordInput, '123')
        userEvent.type(confirmPasswordInput, '123')

        const button = screen.queryByRole("button", { name: "Sign Up"})
        expect(button).not.toBeDisabled()
    })

    it('sends username, email and password to backend, returns 200 and matching body', async() => {
        let requestBody
        server.use(
            rest.post('http://localhost:8000/api/user/signup', (req,res,ctx) => {
                requestBody = { username: req.body.username, email: req.body.email }
                return res(ctx.status(200), ctx.json({ username: "hoge", email: "hoge@hoge.com"}))
            })
        )

        init()

        await new Promise((resolve) => setTimeout(resolve, 0))
        expect(requestBody).toEqual({ username: "hoge", email: "hoge@hoge.com"}) // {} === {}
    })


    it('sends body to backend with a result status of 400', async() => {

        server.use(
            rest.post('http://localhost:8000/api/user/signup', (req,res,ctx) => {
                return res(ctx.status(400))
            })
        )

        // const container = init()
        // const removeButton = container.querySelector('.delete')
        // userEvent.click(removeButton)

        init()

        const closeButton = await waitFor(() => screen.findByRole('alertdialog'))
        userEvent.click(closeButton)

        expect(screen.queryByText(/Error Signing Up!/i)).toBeNull()
    })

    it('disables button when there is an ongoing api call', async() => {
        let counter = 0
        server.use(
            rest.post('http://localhost:8000/api/user/signup', (req,res,ctx) => {
                counter += 1
                return res(ctx.status(200))
            })
        )

        init()
        userEvent.click(signUpButton)

        await new Promise((resolve) => setTimeout(resolve, 0))
        expect(counter).toBe(1)

        // screen.debug()
    })

    it('displays a spinner while api is in progress',  async() => {
        server.use(
            rest.post('http://localhost:8000/api/user/signup', (req,res,ctx) => {
                return res(ctx.status(200))
            })
        )

        init()

        const loadingText = await screen.findByText(/Loading.../i)
        expect(loadingText).toBeInTheDocument()

        // screen.debug()
    })

    it('does not display spinner when there is no api request', () => {
        expect(screen.queryByText(/Loading.../i)).toBeNull()
    })

    it('displays sign up success message', async() => {
        server.use(
            rest.post('http://localhost:8000/api/user/signup', (req,res,ctx) => {
                return res(ctx.status(200), ctx.json({ username: "hoge", email: "hoge@hoge.com"}))
            })
        )

        init()

        const successMessage = await screen.findByText(/Signed Up Successfully/i)
        expect(successMessage).toBeInTheDocument()
    })

})