// LoginPage.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import LoginPage from "./index";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";
import { fireEvent } from "@testing-library/react";

const initialState = {
  user: null,
  loading: false,
  error: null,
  currentName: "",
  currentEmail: "",
};

// Mock Redux store
const mockStore = configureStore([]);
const store = mockStore({
  auth: initialState, // Replace 'auth' with your actual reducer name
});

describe("LoginPage component renders and interacts correctly", () => {
  it("renders default state", async () => {
    const mockOnChange = jest.fn(); // Create a mock function to replace the actual onChange handler

    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const inputs = screen.getAllByRole("textbox");

    inputs.forEach((input) => {
      fireEvent.change(input, { target: { value: "new value" } });
      expect(mockOnChange).toHaveBeenCalledWith('new value');

    });
  });

  it("check label presence", () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    const label = screen.getByTestId("Full Name");

    // Assert that the label is found in the document
    expect(label).toBeInTheDocument();
  });
});
