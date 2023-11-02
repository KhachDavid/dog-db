import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import jest-dom for additional matchers
import CustomCard from "./index";
import { useDispatch } from "react-redux";

// Mock useDispatch and useSelector
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock your Redux selectors and actions
jest.mock("../../store/sagas/selectors", () => ({
  selectFavorites: jest.fn(),
}));
jest.mock("../../store/actions/dog.actions", () => ({
  addFavoritesRequest: jest.fn(),
  removeFavoritesSuccess: jest.fn(),
}));

describe("CustomCard Component", () => {
  it("renders correctly with dog data", () => {
    const dog = {
      img: "dog-image.jpg",
      name: "Rex",
      id: "123",
      age: 3,
      zip_code: "12345",
      breed: "Labrador",
    };

    // Mock useSelector to return an empty favorites array
    jest
      .spyOn(require("../../store/sagas/selectors"), "selectFavorites")
      .mockReturnValue([]);

    render(
      <CustomCard dog={dog} index={0} locationDetails={{}} noFavorite={false} />
    );

    // Check if the dog name is displayed
    expect(screen.getByText("Rex")).toBeInTheDocument();
  });

  it("adds a dog to favorites when clicking the heart icon", () => {
    const dog = {
      img: "dog-image.jpg",
      name: "Rex",
      id: "123",
      age: 3,
      zip_code: "12345",
      breed: "Labrador",
    };

    // Mock useSelector to return an empty favorites array
    useDispatch.mockReturnValue(jest.fn()); // Mock the dispatch function
    jest
      .spyOn(require("../../store/sagas/selectors"), "selectFavorites")
      .mockReturnValue([]);

    const { container } = render(
      <CustomCard dog={dog} index={0} locationDetails={{}} noFavorite={false} />
    );

    // Find and click the heart icon
    const heartIcon = container.querySelector(
      "button[aria-label='Add to favorites']"
    );
    if (heartIcon) {
      fireEvent.click(heartIcon);
    } else {
      // Log a message or throw an error if the element is not found
      console.error("Heart icon element not found");
    }

    // Check if addFavoritesRequest action is called with the correct dog ID
    expect(
      require("../../store/actions/dog.actions").addFavoritesRequest
    ).toHaveBeenCalledWith("123");
  });

});
