import {render, screen} from '@testing-library/react'

import {rest} from 'msw'
import {setupServer} from 'msw/node'

import TestPage from './TestPage'

const server = setupServer(
    rest.get('http://jsonplaceholder.typicode.com/todos/1', async(req, res, ctx) => {
        return res(ctx.status(200))        
    })
);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Test jsonplaceholder return', () => {
    test('loads and displays a text', async () => {
        render(<TestPage />)
        await screen.findByText('delectus aut autem')
    })
})