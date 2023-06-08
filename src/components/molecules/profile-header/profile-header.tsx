import { useSelector } from "react-redux";
import { ProfileImg } from "../../atom/profile-img/profile-img";
import { selectLoginUser } from "../../../features/login/loginSlice";

const ProfileHeader = () => {
  const user = useSelector(selectLoginUser);

  if (!user) return <></>;

  const { email, name, url } = user;

  return (
    <div>
      <ProfileImg size={100} src={url} alt={name} />
      <div>
        <p>{name}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};

export { ProfileHeader };
