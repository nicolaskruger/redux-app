import { render, screen } from "@testing-library/react";
import { SelectImage } from "./select-img";
import { IMG_URL } from "./constants";
import user from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

describe("<SelectImg/>", () => {
  let img = "img";

  let select: [string, (val: string) => void] = [
    img,
    (val) => {
      img = val;
    },
  ];

  beforeEach(async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("/api/avatars").reply(200, IMG_URL);
    render(<SelectImage selector={select} />);
    await delay(2000);
  });

  it("render the component", () => {
    IMG_URL.forEach((v, index) => {
      expect(
        screen.getByTestId(`button-select-img-${index}`)
      ).toBeInTheDocument();
    });
  });
  it("the initial state of the component should be de first IMG_URL", () => {
    expect(img).toBe(IMG_URL[0]);
  });

  it("select the correct img", () => {
    const button = screen.getByTestId<HTMLButtonElement>(`button-select-img-2`);
    user.click(button);

    expect(img).toBe(IMG_URL[2]);
  });
});
