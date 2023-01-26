import UploadModal from '../UploadModal';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { rest } from 'msw';
import { setupServer } from "msw/node";
import "@testing-library/jest-dom" 
import 'whatwg-fetch'

jest.mock('next/router', () => require('next-router-mock'));

const server = setupServer(
    rest.post("http://catstagram.lofty.codes/api/posts/", (req, res, ctx) => 
        res(ctx.json([{ status: 'ok', pk: 1, name: "test", comments: [], image: "test.jpg"}]))
    )
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Upload Modal Component", () => {
    it("Returns loading message when upload is clicked", async () => {
        const { container } = render(<UploadModal open={true} handleClose={null} />)
        const user = userEvent.setup()

        const uploadButton = screen.queryByRole('button', {
            name: 'Upload'
        })

        await user.click(uploadButton)

        expect(screen.getByText("Sending your cat on a journey.")).toBeInTheDocument();
    })
})