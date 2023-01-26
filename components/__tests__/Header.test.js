import Header from '../Header'
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

jest.mock('next/router', () => require('next-router-mock'))

jest.mock("next-auth/react", () => {
    const originalModule = jest.requireActual('next-auth/react')
    const mockSession = {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: { username: "admin"}
    }
    return {
        __esModule: true,
        ...originalModule,
        useSession: jest.fn(() => {
            return { data: mockSession, status: 'unauthenticated'}
        })
    }
})

describe('Header Component', () => {

    it('Show Log In when no session', async () => {

        const { container } = render(<Header />)

        expect(container).toMatchSnapshot()
        expect(screen.getByText("Log In")).toBeInTheDocument()

    })
})