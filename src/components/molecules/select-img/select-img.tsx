import { useEffect } from "react";
import { IMG_URL } from "./constants";
import { classNames } from "../../../utils/classnames";
import styles from "./select-img.module.css";

type SelectImageProps = {
  selector: [string, (value: string) => void];
};

const SelectImage = ({ selector }: SelectImageProps) => {
  const [img, setImg] = selector;

  useEffect(() => {
    setImg(IMG_URL[0]);
  }, []);

  const renderImg = IMG_URL.map((val, index) => (
    <li key={val}>
      <button
        className={classNames(img === val && styles.selectedImg)}
        data-testid={`button-select-img-${index}`}
        type="button"
        onClick={() => setImg(val)}
      >
        <img src={val} alt={val} />
      </button>
    </li>
  ));

  return <ul>{renderImg}</ul>;
};

export { SelectImage };
