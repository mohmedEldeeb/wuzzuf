import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import JobForRelatedComponent from "../../src/components/jobForRelatedComponent/JobForRelatedComponent";
import { MemoryRouter } from "react-router-dom";
import api from "../../src/services/api";
import { vi } from "vitest";
// Mock the API module using vi.mock instead of jest.mock
vi.mock("../../src/services/api");
const mockedApi = api as jest.Mocked<typeof api>;

// Create a mock navigate functionimport { vi } from 'vitest';
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("JobForRelatedComponent", () => {
  const mockJobData = {
    data: {
      data: {
        job: {
          attributes: {
            title: "Frontend Developer",
          },
        },
      },
    },
  };

  beforeEach(() => {
    mockedApi.get.mockResolvedValue(mockJobData);
    mockNavigate.mockClear(); // Clear any previous calls to navigate
  });

  it("renders job data and handles navigation correctly", async () => {
    render(
      <MemoryRouter>
        <JobForRelatedComponent id="1" />
      </MemoryRouter>
    );

    // Wait for data to load and check if title is displayed
    await waitFor(() => {
      expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    });

    // Simulate click on list item to test navigation
    fireEvent.click(screen.getByText("Frontend Developer"));
    expect(mockNavigate).toHaveBeenCalledWith("/job/1");
  });
});
