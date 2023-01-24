import Home from '../index';
import { render, screen } from "@testing-library/react";

test("home renders with posts", () => {
    render(<Home />);
})