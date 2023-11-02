import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AdvancedSort from "./index";
import "@testing-library/jest-dom";

describe("AdvancedSort Component", () => {
  // Mock the changeSelectedSort function
  const changeSelectedSort = jest.fn();

  it("renders the component with the initial selectedSort", () => {
    const selectedSort = "breed:asc";

    render(
      <AdvancedSort selectedSort={selectedSort} changeSelectedSort={changeSelectedSort} />
    );

    // Check if the selectedSort option is displayed
    let label = screen.getByText("Breed: A to Z"); 
    expect(label).toBeInTheDocument();
  });

  it("calls the changeSelectedSort function on change", () => {
    const selectedSort = "breed:asc";
    const newSelectedSort = "name:asc";

    render(
      <AdvancedSort selectedSort={selectedSort} changeSelectedSort={changeSelectedSort} />
    );

    const selectElement = screen.getByLabelText("Sort By");

    // Change the selected option
    fireEvent.change(selectElement, { target: { value: newSelectedSort } });

    // Check if the changeSelectedSort function was called with the new value
    expect(changeSelectedSort).toHaveBeenCalledWith(newSelectedSort);
  });
});
