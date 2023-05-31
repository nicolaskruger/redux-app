import type { NextPage } from "next";

import styles from "../styles/Home.module.css";
import { Login } from "../components/organisms/login/login";

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Login />
    </div>
  );
};

export default IndexPage;
