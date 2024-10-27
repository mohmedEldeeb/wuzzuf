// RelatedSkills.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RelatedSkills from "../../components/src/RelatedSkills/RelatedSkills";

// Mock data for testing
const mockData = {
  attributes: {
    title: "Sample Job Title",
  },
};
const id = 123;

// Mock the navigate function
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("RelatedSkills component", () => {
  beforeEach(() => {
    render(
      <Router>
        <RelatedSkills data={mockData} id={id} />
      </Router>
    );
  });

  it("renders the component with correct data", () => {
    // Check if the title displays correctly
    expect(screen.getByText("Sample Job Title")).toBeInTheDocument();

    // Check if importance and level values display correctly
    expect(screen.getByText("importance:")).toBeInTheDocument();
    expect(screen.getByText("3.7")).toBeInTheDocument();
    expect(screen.getByText("level:")).toBeInTheDocument();
    expect(screen.getByText("2.3")).toBeInTheDocument();
  });

  it("navigates to the correct URL on header click", () => {
    const header = screen.getByText("Sample Job Title");
    fireEvent.click(header);

    expect(mockNavigate).toHaveBeenCalledWith(`/job/${id}`);
  });
});
