import { useSelector } from "react-redux";
import { ProfileImg } from "../../atom/profile-img/profile-img";
import { selectLoginUser } from "../../../features/login/loginSlice";
import styles from "./profile-header.module.css";

const ProfileHeader = () => {
  const user = useSelector(selectLoginUser);

  if (!user) return <></>;

  const { email, name, url } = user;

  return (
    <div className={styles.container}>
      <ProfileImg size={100} src={url} alt={name} />
      <div className={styles.infoContainer}>
        <p className={styles.bold}>{name}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};

export { ProfileHeader };
