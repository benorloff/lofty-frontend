import Footer from '../Footer'
import { render, screen } from '@testing-library/react'
import "@testing-library/jest-dom"

describe('Footer Component', () => {

    it('Contains Contact Us', async () => {

        const { container } = render(<Footer />)

        expect(container).toMatchSnapshot();
        expect(screen.getByText("Contact Us")).toBeInTheDocument()
    })
})