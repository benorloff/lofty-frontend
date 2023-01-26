import Header from '../Header';
import { render, screen } from "@testing-library/react";
import 

jest.mock('next-auth/react')
import { useSession, signIn, signOut } from 'next-auth/react'

const mockUseSession = useSession as jest.Mock
;(signIn as jest.Mock).mockImplementation(() => jest.fn())
;(signOut as jest.Mock).mockImplementation(() => jest.fn())

describe('Header', () => {

    const renderHeader = () => {
        render(<Header />)

        const signInButton = screen.queryByRole('button', {
            name: 'Sign In',
        })
        const signOutButton = screen.queryByRole('button', {
            name: 'Sign Out',
        })

        return {
            signInButton,
            signOutButton,
        }
    }

    it()
})