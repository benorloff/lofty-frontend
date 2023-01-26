import Home from '../index';
import { render, screen } from "@testing-library/react";

import * as nextAuthReact from 'next-auth/react';

jest.mock('next-auth/client');

test("home renders with posts", () => {
    render(<Home />);
    const title = screen.getByText(/Lofty Frontend/i)
    expect(title).toBeInTheDocument();
})