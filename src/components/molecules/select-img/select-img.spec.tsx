import { render, screen } from "@testing-library/react";
import { SelectImage } from "./select-img";
import { IMG_URL } from "./constants";
import user from "@testing-library/user-event";

describe("<SelectImg/>", () => {
  let img = "img";

  let select: [string, (val: string) => void] = [
    img,
    (val) => {
      img = val;
    },
  ];

  beforeEach(() => {
    render(<SelectImage selector={select} />);
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
