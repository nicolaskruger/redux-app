import { FormEvent, useState } from "react";
import styles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUserByEmailAndPassword } from "../../../features/user/userSlice";
import { loginWithUser } from "../../../features/login/loginSlice";
import { useRouter } from "next/router";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { push } = useRouter();

  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState<"visible" | "hidden">("hidden");

  const selectedUser = useSelector(
    selectUserByEmailAndPassword(email, password)
  );

  const [hide, setHide] = useState<"password" | "text">("password");

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedUser) {
      setVisibility("visible");
      setTimeout(() => setVisibility("hidden"), 3000);
      return;
    }
    dispatch(loginWithUser(selectedUser));
    push("/post");
  };

  return (
    <form onSubmit={login} className={styles.form} action="submit">
      <label className={styles.label} htmlFor="email">
        email:
      </label>
      <input
        className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        type="text"
      />
      <label className={styles.label2} htmlFor="password">
        password:
        <button
          onClick={() => setHide(hide === "password" ? "text" : "password")}
          type="button"
        >
          {hide === "password" ? "show" : "hide"}
        </button>
      </label>
      <input
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={hide}
        id="password"
      />
      <button className={styles.button}>login</button>
      <p style={{ visibility }} className={styles.error}>
        email or password incorrect !
      </p>
    </form>
  );
};
