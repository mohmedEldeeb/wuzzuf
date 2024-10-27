import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "../../components/src/Card/Card";
test("renders Card component", () => {
  render(<Card title="Job Title" skillIds={[]} id={1} />);
  const titleElement = screen.getByText(/Job Title/i);
  expect(titleElement).toBeInTheDocument();
});
