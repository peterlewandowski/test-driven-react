import SignUpPage from "./SignUpPage";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"

describe("Sign Up Page", () => {
  it("has header", () => {
    render(<SignUpPage />);
    const header = screen.queryByRole("heading", { name: "Sign Up" });
    expect(header).toBeInTheDocument();
  });
  it("has username input", () => {
    render(<SignUpPage />);
    const input = screen.getByLabelText("Username")
    expect(input).toBeInTheDocument();
  });
  it("has email input", () => {
    render(<SignUpPage />);
    const input = screen.getByLabelText("E-mail")
    expect(input).toBeInTheDocument();
  });
  it("has password type for password input", () => {
    render(<SignUpPage />);
    const input = screen.getByLabelText("Password")
    expect(input.type).toBe('password');
  });
  it("has password repeat input", () => {
    render(<SignUpPage />);
    const input = screen.getByLabelText("E-mail")
    expect(input).toBeInTheDocument();
  });
  it("has password type for password repeat input", () => {
    render(<SignUpPage />);
    const input = screen.getByLabelText("Password Repeat")
    expect(input.type).toBe('password');
  });
  it("has Sign Up button", () => {
    render(<SignUpPage />);
    const button = screen.queryByRole("button", { name: "Sign Up" });
    expect(button).toBeInTheDocument();
  });
  it("disables button initially", () => {
    render(<SignUpPage />);
    const button = screen.queryByRole("button", { name: "Sign Up" });
    expect(button).toBeDisabled();
  });
  describe("Interactions", () => {
      it("enables the button when password and password repeat fields have the same value", () => {
          render(<SignUpPage />);
          const passwordInput = screen.getByLabelText("Password")
          const passwordRepeatInput = screen.getByLabelText("Password Repeat")
          userEvent.type(passwordInput, "Password")
          userEvent.type(passwordRepeatInput, "Password")
          const button = screen.queryByRole("button", { name: "Sign Up" });
          expect(button).toBeEnabled()
      })
  })
});
