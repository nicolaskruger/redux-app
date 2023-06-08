import styles from "./profile-img.module.css";

type ProfileImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  size: number;
};

const ProfileImg = ({ size, ...props }: ProfileImgProps) => {
  return (
    <img
      className={styles.img}
      style={{ width: size, height: size }}
      {...props}
    />
  );
};

export { ProfileImg };
