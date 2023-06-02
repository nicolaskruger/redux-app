import { ChangeEvent, FormEvent, useState } from "react";
import { SelectImage } from "../../molecules/select-img/select-img";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../../store";
import { addUser, selectUserByEmail } from "../../../features/user/userSlice";
import { useSelector } from "react-redux";
import { useVisibility } from "../../../hooks/visibility";
import styles from "./register.module.css";

const Register = () => {
  const selector = useState("");

  const [url] = selector;

  const dispatch = useAppDispatch();

  const { push } = useRouter();

  const handleChange =
    (setValue: (value: string) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visibility, setVisibility, toggleVisibility] = useVisibility();

  const [hidePassword, setHidePassword] = useState(true);

  const userWithSameEmail = useSelector(selectUserByEmail(email));

  const serializeData = [name, email, password, url, !userWithSameEmail];

  const validateData = serializeData.every((data) => data);

  const errorMessage = () => {
    const message = [
      "empty name",
      "empty email",
      "empty password",
      "avatar not selected",
      "email already in use",
    ];

    const error = serializeData
      .map((value, index) => (!value ? message[index] : false))
      .filter((v) => v)
      .join(", ")
      .replace(/(\b, \b)(?!.*\1)/, " and ");

    return `you have the follow errors: ${error}.`;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (validateData) {
      dispatch(
        addUser({
          name,
          email,
          password,
          url,
        })
      );
      push({
        pathname: "/",
        query: {
          email,
        },
      });
    } else {
      toggleVisibility();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} action="submit">
      <h1>Register</h1>
      <label htmlFor="name">name:</label>
      <input
        type="text"
        id="name"
        date-testid="input-name"
        value={name}
        onChange={handleChange(setName)}
      />
      <label htmlFor="email">email:</label>
      <input
        type="text"
        id="email"
        data-testid="input-email"
        value={email}
        onChange={handleChange(setEmail)}
      />
      <label
        className={styles.labelPassword}
        htmlFor="pass
      word"
      >
        password:{" "}
        <button
          className={styles.button}
          type="button"
          onClick={() => setHidePassword(!hidePassword)}
          data-testid="button-hide"
        >
          {hidePassword ? "show" : "hide"}
        </button>
      </label>
      <input
        type={hidePassword ? "password" : "text"}
        id="password"
        data-testid="input-password"
        value={password}
        onChange={handleChange(setPassword)}
      />
      <label>img:</label>
      <SelectImage selector={selector} />
      <button className={styles.button} data-testid="button-register">
        submit
      </button>
      <p className={styles.p} style={{ visibility }} data-testid="error">
        {errorMessage()}
      </p>
    </form>
  );
};

export { Register };
