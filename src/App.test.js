import {render, screen} from '@testing-library/react'

import App from './App'

describe("Routing", () => {

    it('displays homepage at /', () => {
        render(<App />)
        const homePage = screen.getByTestId("home-page")
        expect(homePage).toBeInTheDocument()
    })

    it('does not display SignUp page when at /', () => {
        render(<App />)
        const signUpPage = screen.queryByTestId("signup-page")
        expect(signUpPage).not.toBeInTheDocument()
    })

    it('displays signup page at /signup', () => {
        window.history.pushState({}, "", "/signup")
        render(<App />)
        const signUpPage = screen.queryByTestId("signup-page")
        expect(signUpPage).toBeInTheDocument()
    })

    it('does not display homepage component at /signup', () => {
        window.history.pushState({}, "", "/signup")
        render(<App />)
        const homePage = screen.queryByTestId("home-page")
        expect(homePage).not.toBeInTheDocument()
    })
})