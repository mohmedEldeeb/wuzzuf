import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import JobComponent from "../../src/components/JobComponent/JobComponent";

describe("JobComponent", () => {
  test("renders JobComponent with correct title", () => {
    render(
      <BrowserRouter>
        <JobComponent id="1" />
      </BrowserRouter>
    );

    // Since we don't have actual data, we should mock the API call and response
    const titleElement = screen.getByText(/3.7/i); // Adjust this based on your mocked data
    expect(titleElement).toBeInTheDocument();
  });
});
