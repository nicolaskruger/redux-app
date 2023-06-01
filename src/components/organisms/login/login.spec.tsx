import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Login } from "./login";
import { makeStore } from "../../../store";
import mockRouter from "next-router-mock";
import user from "@testing-library/user-event";

jest.mock("next/router", () => require("next-router-mock"));

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

describe("<Login/>", () => {
  beforeEach(() => {
    const store = makeStore();

    mockRouter.push("/");

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
  });
  it("renders the component", () => {
    expect(screen.getByText("password:")).toBeInTheDocument();
    expect(screen.getByText("email:")).toBeInTheDocument();
  });
  it("show password", () => {
    const inputPassword =
      screen.getByTestId<HTMLInputElement>("input-password");
    expect(inputPassword.type).toBe("password");
    user.click(screen.getByTestId("button-hide-password"));
    expect(inputPassword.type).toBe("text");
    user.click(screen.getByTestId("button-hide-password"));
    expect(inputPassword.type).toBe("password");
  });
  it("don't login", async () => {
    const inputPassword =
      screen.getByTestId<HTMLInputElement>("input-password");
    const inputEmail = screen.getByTestId<HTMLInputElement>("input-email");
    const button = screen.getByTestId<HTMLButtonElement>("button-login");
    const p = screen.getByText<HTMLParagraphElement>(
      "email or password incorrect !"
    );

    user.type(inputEmail, "user@email.com");
    user.type(inputPassword, "123");

    expect(p.style.visibility).toBe("hidden");

    user.click(button);

    expect(p.style.visibility).toBe("visible");

    await delay(4000);

    expect(p.style.visibility).toBe("hidden");
  });

  it("login", async () => {
    const inputPassword =
      screen.getByTestId<HTMLInputElement>("input-password");
    const inputEmail = screen.getByTestId<HTMLInputElement>("input-email");
    const button = screen.getByTestId<HTMLButtonElement>("button-login");

    user.type(inputEmail, "punpun@email.com");
    user.type(inputPassword, "123");
    user.click(button);

    expect(mockRouter.asPath).toBe("/post");
  });
});
