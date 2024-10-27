import { render, screen } from "@testing-library/react";
import Card from "../../src/components/Card/Card";
import { MemoryRouter } from "react-router-dom";

test("renders Card component", () => {
  render(
    <MemoryRouter>
      <Card title="Job Title" skillIds={[{ id: "1" }]} id={"1"} />
    </MemoryRouter>
  );
  const titleElement = screen.getByText(/Job Title/i);
  expect(titleElement).toBeInTheDocument();
});
