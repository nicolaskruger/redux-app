import { useEffect, useState } from "react";
import { IMG_URL } from "./constants";
import { classNames } from "../../../utils/classnames";
import styles from "./select-img.module.css";
import axios from "axios";

type SelectImageProps = {
  selector: [string, (value: string) => void];
};

const SelectImage = ({ selector }: SelectImageProps) => {
  const [img, setImg] = selector;

  const [imgList, setImgList] = useState<string[]>([]);

  const fetchImg = async () => {
    const response = await axios.get<string[]>("/api/avatars");
    setImgList(response.data);
    setImg(response.data[0]);
  };

  useEffect(() => {
    fetchImg();
  }, []);

  const renderImg = imgList.map((val, index) => (
    <li key={val}>
      <button
        className={styles.button}
        data-testid={`button-select-img-${index}`}
        type="button"
        onClick={() => setImg(val)}
      >
        <img
          className={classNames(img === val && styles.selectedImg, styles.img)}
          src={val}
          alt={val}
        />
      </button>
    </li>
  ));

  return <ul className={styles.ul}>{renderImg}</ul>;
};

export { SelectImage };
