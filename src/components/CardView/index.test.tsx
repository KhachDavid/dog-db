import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CardView from "./index";
import { useDispatch, useSelector } from "react-redux"; // Import the Redux hooks

// Mock useDispatch and useSelector
jest.mock("react-redux", () => ({
...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock your Redux selectors and actions
jest.mock("../../store/sagas/selectors", () => ({
  selectLocationDetails: jest.fn(),
  isLoadingNewLocation: jest.fn(),
  isLoadingDogs: jest.fn(),
}));
jest.mock("../../store/actions/location.actions", () => ({
  fetchLocationsRequest: jest.fn(),
}));

describe("CardView Component", () => {
  it("renders loading spinner when isLoading is true", () => {
    // Mock isLoading and isLoadingDoggies as true
    useDispatch.mockReturnValue(jest.fn()); // Mock the dispatch function
    useSelector.mockReturnValue("mockedValue"); // Mock the selector value

    jest.spyOn(require("../../store/sagas/selectors"), "isLoadingNewLocation").mockReturnValue(true);
    jest.spyOn(require("../../store/sagas/selectors"), "isLoadingDogs").mockReturnValue(true);

    render(<CardView dogs={[]} />);

    // Check if loading spinners are rendered
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders dog cards when isLoading is false", () => {
    // Mock isLoading and isLoadingDoggies as false
    jest.spyOn(require("../../store/sagas/selectors"), "isLoadingNewLocation").mockReturnValue(false);
    jest.spyOn(require("../../store/sagas/selectors"), "isLoadingDogs").mockReturnValue(false);

    // Mock other useSelector and useDispatch as needed
    useDispatch.mockReturnValue(jest.fn()); // Mock the dispatch function
    useSelector.mockReturnValue("mockedValue"); // Mock the selector value
    render(<CardView dogs={[]} />);

    // Check if dog cards are rendered
    expect(screen.queryAllByTestId("dog-card")).toHaveLength(0);
  });
});
