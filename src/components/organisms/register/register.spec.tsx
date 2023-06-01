import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { makeStore } from "../../../store";
import mockRouter from "next-router-mock";
import user from "@testing-library/user-event";
import { Register } from "./register";

jest.mock("next/router", () => require("next-router-mock"));

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

type FetchInfoProps = {
  name: string;
  email: string;
  password: string;
};

const fetchInfo = ({ name, email, password }: FetchInfoProps) => {
  const inputName = screen.getByTestId<HTMLInputElement>("input-password");
  const inputPassword = screen.getByTestId<HTMLInputElement>("input-password");
  const inputEmail = screen.getByTestId<HTMLInputElement>("input-email");
  const button = screen.getByTestId<HTMLButtonElement>("button-register");
  const p = screen.getByText<HTMLParagraphElement>("-");

  user.type(inputName, name);
  user.type(inputEmail, email);
  user.type(inputPassword, password);

  return {
    inputName,
    inputEmail,
    inputPassword,
    button,
    p,
  };
};

describe("<Register/>", () => {
  beforeEach(() => {
    const store = makeStore();

    mockRouter.push("/register");

    render(
      <Provider store={store}>
        <Register />
      </Provider>
    );
  });
  it("renders the component", () => {
    expect(screen.getByText("name:")).toBeInTheDocument();
    expect(screen.getByText("password:")).toBeInTheDocument();
    expect(screen.getByText("email:")).toBeInTheDocument();
  });
  it("show password", () => {
    const inputPassword =
      screen.getByTestId<HTMLInputElement>("input-password");
    expect(inputPassword.type).toBe("password");
    user.click(screen.getByTestId("button-hide"));
    expect(inputPassword.type).toBe("text");
    user.click(screen.getByTestId("button-hide"));
    expect(inputPassword.type).toBe("password");
  });
  it("email already in use !", async () => {
    const { button, p } = fetchInfo({
      name: "punpun",
      email: "punpun@email.com",
      password: "123",
    });
    expect(p.style.visibility).toBe("hidden");

    user.click(button);

    expect(p.style.visibility).toBe("visible");
    expect(p.innerText).toBe("email already in use !");

    await delay(4000);

    expect(p.style.visibility).toBe("hidden");
  });

  it("register !!!", () => {
    const { button, p } = fetchInfo({
      name: "Mamimi",
      email: "mamimi@email.com",
      password: "123",
    });
    user.click(button);

    expect(mockRouter.asPath).toBe("/");
  });
});
