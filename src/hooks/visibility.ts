import { useState } from "react";

type Visibility = "visible" | "hidden";

export const useVisibility = (): [
  Visibility,
  (v: Visibility) => void,
  () => void
] => {
  const [visibility, setVisibility] = useState<Visibility>("hidden");

  const toggle = () => {
    setVisibility("visible");
    setTimeout(() => {
      setVisibility("hidden");
    }, 3000);
  };

  return [visibility, setVisibility, toggle];
};
