import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SearchHistory from "../../src/components/SearchHistory/SearchHistory";
import { RootState } from "../../src/store/store";

// Initialize mock store
const mockStore = configureStore<RootState>();

describe("SearchHistory component", () => {
  it("renders search history items", () => {
    // Set up initial state for the mock store
    const initialState = {
      searchHistory: [
        "Frontend Developer",
        "Backend Developer",
        "Fullstack Developer",
      ],
    };

    // Create the store with the initial state
    const store = mockStore<RootState>(initialState);

    // Render component with Redux provider
    render(
      <Provider store={store}>
        <SearchHistory />
      </Provider>
    );

    // Check if the title is displayed
    expect(screen.getByText("Search History")).toBeInTheDocument();

    // Check if each search history item is displayed
    initialState.searchHistory.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
