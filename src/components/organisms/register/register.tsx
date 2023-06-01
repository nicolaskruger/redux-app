import { useState } from "react";
import { SelectImage } from "../../molecules/select-img/select-img";

const Register = () => {
  const selector = useState("");

  return (
    <form action="submit">
      <label htmlFor="name">name:</label>
      <input type="text" id="name" date-testid="input-name" />
      <label htmlFor="email">email:</label>
      <input type="text" id="email" data-testid="input-email" />
      <label
        htmlFor="pass
      word"
      >
        password: <button data-testid="button-hide">hide</button>
      </label>
      <input type="password" id="password" data-testid="input-password" />
      <label>img:</label>
      <SelectImage selector={selector} />
      <button data-testid="button-register">submit</button>
    </form>
  );
};

export { Register };
