import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import AuthForm from "./AuthForm";
import store from "../../store/redux-store";

describe("Auth Form component", () => {
  // 1
  test("Renders Sign up", () => {
    render(
      <Provider store={store}>
        <AuthForm />
      </Provider>
    );

    const text = screen.getByText('Sign Up')
    expect(text).toBeInTheDocument();
  });

  // 2
  test("Render Login when the login div was clicked", () => {
    render(
      <Provider store={store}>
        <AuthForm />
      </Provider>
    );

    const divElement = screen.getByRole('div');
    userEvent.click(divElement);

    const text = screen.getByText('Login');
    expect(text).toBeInTheDocument();

    // 3
    test("do not render Sign up when div Element was clicked", () => {
      render(
        <Provider store={store}>
          <AuthForm />
        </Provider>
      );

      const divElement = screen.getByRole('div');
      userEvent.click(divElement);

      const text = screen.queryByText('Sign Up');
      expect(text).toBeNull();
    })

    // 4
    test("do not render Login", () => {
      render(
        <Provider store={store}>
          <AuthForm />
        </Provider>
      );

      const text = screen.queryByText('Login');
      expect(text).toBeNull();
    })

    // 5
    test("render email id placeholder ", () => {
      render(
        <Provider store={store}>
          <AuthForm />
        </Provider>
      );

      const placeHolderText = screen.getByPlaceholderText('email id', { exact: false })
      expect(placeHolderText).toBeInTheDocument();
    })

    // 6
    test("render password placeholder ", () => {
      render(
        <Provider store={store}>
          <AuthForm />
        </Provider>
      );

      const placeHolderText = screen.getByPlaceholderText('password', { exact: false })
      expect(placeHolderText).toBeInTheDocument();
    })

    // 7
    test("render confirm password placeholder ", () => {
      render(
        <Provider store={store}>
          <AuthForm />
        </Provider>
      );

      const placeHolderText = screen.getByPlaceholderText('confirm password', { exact: false })
      expect(placeHolderText).toBeInTheDocument();
    })

    // 8
    test("render forgot password when login div element clicked", () => {
      render(
        <Provider store={store}>
          <AuthForm />
        </Provider>
      );

      const divElement = screen.getByRole('div');
      userEvent.click(divElement);

      const forgotPasswordLink = screen.getAllByDisplayValue('forgot password', { exact: false });
      expect(forgotPasswordLink).toBeInTheDocument();
    })

    // 9
    test("render submitting form data loading text when submit button clicked", () => {
      render(
        <Provider store={store}>
          <AuthForm />
        </Provider>
      );

      const submitButton = screen.getByRole('button');
      userEvent.click(submitButton);

      const submitformloadingtext = screen.getAllByDisplayValue('submitting form data', { exact: false });
      expect(submitformloadingtext).toBeInTheDocument();
    })

    // 10
    test("not render submitting form data loading text when submit button not clicked", () => {
      render(
        <Provider store={store}>
          <AuthForm />
        </Provider>
      );

      const submitformloadingtext = screen.queryByDisplayValue('submitting form data', { exact: false });
      expect(submitformloadingtext).toBeNull();
    })
  })
});