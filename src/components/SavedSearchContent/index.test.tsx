import React from "react";
import { render, screen } from "@testing-library/react";
import SavedSearchContent from "./index";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter

import '@testing-library/jest-dom/extend-expect';

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(() => mockDispatch), // Provide the mockDispatch function
}));

const mockSavedSearches = {
  1: {
    id: 1,
    breeds: ["Breed1"],
    cities: ["City1"],
    states: ["State1"],
    cityStates: ["CityState1"],
    additionalLocations: [1, 2],
    tagStack: ["Tag1"],
  },
};

describe("SavedSearchContent Component", () => {
  // Mock useDispatch and provide a mock dispatch function
  const mockDispatch = jest.fn();
  beforeEach(() => {
    mockDispatch.mockReturnValue(mockDispatch);
  });

  it("renders no saved searches message when there are no saved searches", () => {
    render(
      <MemoryRouter>
        <SavedSearchContent
          savedSearches={{}}
          onRemoveSearch={() => {}}
          closeModal={() => {}}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("No saved searches yet")).toBeInTheDocument();
  });

  it("renders saved searches with data", () => {
    render(
      <MemoryRouter>
        <SavedSearchContent
          savedSearches={mockSavedSearches}
          onRemoveSearch={() => {}}
          closeModal={() => {}}
        />
      </MemoryRouter>
    );
    // Check if elements from the first saved search are rendered
    expect(screen.getByText("Breeds:")).toBeInTheDocument();
    expect(screen.getByText("Cities:")).toBeInTheDocument();
    expect(screen.getByText("States:")).toBeInTheDocument();

    // Check if buttons are rendered
    expect(screen.getByText("Search Again")).toBeInTheDocument();
  });

});
